// Chat replies come from our own /api/chat function, which holds the Gemini
// key on the server. The key is never in the browser bundle any more.

export async function getChatResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, history: conversationHistory }),
    });
    if (!res.ok) {
      console.warn(`Chat API returned ${res.status}; using fallback response.`);
      return getFallbackResponse(userMessage);
    }
    const data: { text?: string } = await res.json();
    return data.text?.trim() || getFallbackResponse(userMessage);
  } catch (error) {
    console.error("Chat API error:", error);
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
    return "We offer over 220 undergraduate courses across 13 schools. Each course combines theoretical knowledge with hands-on experience. You'll work on real-world projects and have access to industry-standard equipment. Which subject area interests you most? 📚";
  }
  if (input.includes('fee') || input.includes('tuition') || input.includes('cost') || input.includes('price')) {
    return "Tuition fees for UK students are £9,250 per year. International fees vary by course. We offer various scholarships and bursaries - would you like to know more about financial support options? 💰";
  }
  if (input.includes('support') || input.includes('help') || input.includes('service')) {
    return "We provide comprehensive student support including academic tutoring, career guidance, mental health services, disability support, and international student assistance. Our Student Wellbeing Centre is here for you 24/7! 🤝";
  }

  return "That's a great question! For detailed information, I'd recommend speaking with our admissions team directly. You can also explore specific course pages on our website, or feel free to ask me anything else about University of Lincoln! 😊";
}
