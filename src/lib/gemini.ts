import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ VITE_GEMINI_API_KEY not found. Chat will use fallback responses.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// System prompt with University of Lincoln context
const SYSTEM_PROMPT = `You are a friendly and knowledgeable University of Lincoln course advisor chatbot. Your role is to help prospective students learn about courses, entry requirements, campus life, and the application process.

Key Information:
- University: University of Lincoln, UK
- Location: Historic city of Lincoln, England
- Courses: 150+ undergraduate courses across 8 schools
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

export async function getChatResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  // Fallback if no API key
  if (!genAI) {
    return getFallbackResponse(userMessage);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      systemInstruction: SYSTEM_PROMPT
    });

    // Build conversation history for context
    // Filter out the initial bot greeting (Gemini requires history to start with user)
    const firstUserIndex = conversationHistory.findIndex(m => m.role === "user");

    // If no user messages yet, start with empty history
    if (firstUserIndex === -1) {
      const chat = model.startChat({
        history: [],
      });
      const result = await chat.sendMessage(userMessage);
      return result.response.text();
    }

    // Get messages starting from first user message
    const filteredHistory = conversationHistory.slice(firstUserIndex);

    const chatHistory = filteredHistory.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getFallbackResponse(userMessage);
  }
}

// Fallback responses when API is not available
function getFallbackResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  if (input.includes('entry') || input.includes('requirement') || input.includes('ucas')) {
    return "Entry requirements vary by course, but typically range from 96-112 UCAS points. Most BSc courses require specific subjects at A-level. Would you like me to check the requirements for a specific course you're interested in?";
  }
  if (input.includes('campus') || input.includes('accommodation') || input.includes('facilities')) {
    return "Our Lincoln campus is located in the heart of the historic city, featuring state-of-the-art facilities including modern lecture halls, specialized labs, a world-class library, and student accommodation within walking distance. We also have dedicated spaces for social activities and student support services! 🏛️";
  }
  if (input.includes('apply') || input.includes('application')) {
    return "Applications are made through UCAS. The deadline for September entry is typically in January, but we recommend applying earlier (October-December) for the best chance. I can help you understand what's needed for your application - just ask! 📝";
  }
  if (input.includes('course') || input.includes('program') || input.includes('study')) {
    return "We offer over 150 undergraduate courses across 8 schools. Each course combines theoretical knowledge with hands-on experience. You'll work on real-world projects and have access to industry-standard equipment. Which subject area interests you most? 📚";
  }
  if (input.includes('fee') || input.includes('tuition') || input.includes('cost') || input.includes('price')) {
    return "Tuition fees for UK students are £9,250 per year. International fees vary by course. We offer various scholarships and bursaries - would you like to know more about financial support options? 💰";
  }
  if (input.includes('support') || input.includes('help') || input.includes('service')) {
    return "We provide comprehensive student support including academic tutoring, career guidance, mental health services, disability support, and international student assistance. Our Student Wellbeing Centre is here for you 24/7! 🤝";
  }

  return "That's a great question! For detailed information, I'd recommend speaking with our admissions team directly. You can also explore specific course pages on our website, or feel free to ask me anything else about University of Lincoln! 😊";
}
