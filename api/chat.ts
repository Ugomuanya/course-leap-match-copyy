import { GoogleGenAI } from "@google/genai";

// Server-side Gemini proxy. The API key lives only here (GEMINI_API_KEY, a
// Vercel env var that is never sent to the browser). The old version read
// VITE_GEMINI_API_KEY in the browser, which baked the key into the public JS
// bundle where anyone could copy it and run up the Google Cloud bill.

const MODEL = "gemini-2.5-flash";
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY = 12;
const MAX_HISTORY_CHARS = 2000;
const MAX_OUTPUT_TOKENS = 400;
const RATE_LIMIT = 20; // requests per visitor per window
const RATE_WINDOW_MS = 10 * 60_000;

const SYSTEM_INSTRUCTION = `You are a friendly and knowledgeable University of Lincoln course advisor chatbot. Your role is to help prospective students learn about courses, entry requirements, campus life, and the application process.

Key Information:
- University: University of Lincoln, UK
- Location: Historic city of Lincoln, England
- Courses: 220+ undergraduate courses across 13 schools
- Entry Requirements: Typically 96-112 UCAS points (varies by course)
- Tuition Fees: £9,250/year for UK students
- Application: Through UCAS, deadline typically January for September entry
- Campus: Modern facilities in city center, student accommodation nearby
- Support: Academic tutoring, career guidance, mental health services, international student support

Your personality:
- Friendly, enthusiastic, and supportive
- Use emojis occasionally to be engaging
- Keep responses concise (2-4 sentences)
- Encourage students to explore courses they're interested in
- If you don't know something specific, suggest they contact admissions team

Always be positive about University of Lincoln and focus on helping students find their perfect course!`;

interface HistoryMessage {
  role: string;
  content: string;
}

// Best-effort per-visitor limit. Instances are reused between requests, so
// this stops casual abuse; the Google Cloud quota cap is the hard ceiling.
const hits = new Map<string, number[]>();

function rateLimited(visitor: string): boolean {
  const now = Date.now();
  const recent = (hits.get(visitor) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(visitor, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/** Only this site may call the proxy (blocks other sites embedding it). */
function sameSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin fetches may omit it
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function parseBody(raw: unknown): { message: string; history: HistoryMessage[] } | null {
  if (!raw || typeof raw !== "object") return null;
  const { message, history } = raw as { message?: unknown; history?: unknown };
  if (typeof message !== "string" || !message.trim() || message.length > MAX_MESSAGE_CHARS) return null;
  const cleanHistory = Array.isArray(history)
    ? history
        .filter(
          (m): m is HistoryMessage =>
            !!m && typeof m === "object" && typeof (m as HistoryMessage).role === "string" &&
            typeof (m as HistoryMessage).content === "string",
        )
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_HISTORY_CHARS) }))
    : [];
  return { message: message.trim(), history: cleanHistory };
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: "not_configured" }, 503);
  if (!sameSite(request)) return json({ error: "forbidden" }, 403);

  const visitor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(visitor)) return json({ error: "rate_limited" }, 429);

  let body: ReturnType<typeof parseBody>;
  try {
    body = parseBody(await request.json());
  } catch {
    body = null;
  }
  if (!body) return json({ error: "invalid_request" }, 400);

  // Gemini requires the conversation to start with a user turn.
  const firstUser = body.history.findIndex((m) => m.role === "user");
  const contents = (firstUser === -1 ? [] : body.history.slice(firstUser)).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));
  contents.push({ role: "user", parts: [{ text: body.message }] });

  try {
    const response = await new GoogleGenAI({ apiKey }).models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        // Short chat answers don't need "thinking"; it would also eat the
        // output budget (and cost) on 2.5 Flash.
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    return json({ text: response.text ?? "" });
  } catch (error) {
    console.error("[chat] Gemini error:", error instanceof Error ? error.message : String(error));
    return json({ error: "upstream_error" }, 502);
  }
}
