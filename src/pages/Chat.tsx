import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, ArrowLeft } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! 👋 I'm your University of Lincoln course advisor. I'm here to answer any questions about your matched courses, entry requirements, campus life, or anything else you'd like to know!",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom on focus (mobile keyboard)
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        scrollToBottom();
        // Ensure input is in view
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      return () => input.removeEventListener('focus', handleFocus);
    }
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Blur input to hide mobile keyboard after send
    inputRef.current?.blur();

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        role: "bot",
        content: getBotResponse(inputValue),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('entry') || input.includes('requirement') || input.includes('ucas')) {
      return "Entry requirements vary by course, but typically range from 96-112 UCAS points. Most BSc courses require specific subjects at A-level. Would you like me to check the requirements for a specific course you're interested in?";
    }
    if (input.includes('campus') || input.includes('accommodation') || input.includes('facilities')) {
      return "Our Lincoln campus is located in the heart of the historic city, featuring state-of-the-art facilities including modern lecture halls, specialized labs, a world-class library, and student accommodation within walking distance. We also have dedicated spaces for social activities and student support services!";
    }
    if (input.includes('apply') || input.includes('application')) {
      return "Applications are made through UCAS. The deadline for September entry is typically in January, but we recommend applying earlier (October-December) for the best chance. I can help you understand what's needed for your application - just ask!";
    }
    if (input.includes('course') || input.includes('program') || input.includes('study')) {
      return "We offer over 150 undergraduate courses across 8 schools. Each course combines theoretical knowledge with hands-on experience. You'll work on real-world projects and have access to industry-standard equipment. Which subject area interests you most?";
    }
    if (input.includes('fee') || input.includes('tuition') || input.includes('cost') || input.includes('price')) {
      return "Tuition fees for UK students are £9,250 per year. International fees vary by course. We offer various scholarships and bursaries - would you like to know more about financial support options?";
    }
    if (input.includes('support') || input.includes('help') || input.includes('service')) {
      return "We provide comprehensive student support including academic tutoring, career guidance, mental health services, disability support, and international student assistance. Our Student Wellbeing Centre is here for you 24/7!";
    }

    return "That's a great question! For detailed information, I'd recommend speaking with our admissions team directly. You can also explore specific course pages on our website, or feel free to ask me anything else about University of Lincoln!";
  };

  const handleBack = () => {
    navigate("/course-details");
  };

  const quickQuestions = [
    "Tell me about entry requirements",
    "What are the campus facilities?",
    "How do I apply?",
    "What support services are available?"
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] flex flex-col overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#cd1f80] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
      </div>

      {/* Header - Fixed */}
      <div className="relative z-10 bg-gradient-to-r from-[#1a0a2e]/90 to-[#2d1b3d]/90 backdrop-blur-sm border-b border-white/10 shadow-xl flex-shrink-0">
        <div className="max-w-4xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-all duration-200 active:scale-95 flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            {/* Bot Info */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a0a2e]" />
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1a0a2e]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm sm:text-base font-bold text-white truncate">
                  Lincoln Course Advisor
                </h2>
                <p className="text-xs text-white/70 truncate">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container - Scrollable */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-5 pb-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "bot" ? (
                <div className="flex gap-2 max-w-[90%] sm:max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="w-4 h-4 text-[#1a0a2e]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl rounded-tl-md px-3 py-2.5 sm:px-4 sm:py-3 border border-white/20 shadow-lg">
                      <p className="text-sm sm:text-base text-white leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-xs text-white/50 px-2">{message.timestamp}</span>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 max-w-[90%] sm:max-w-[80%]">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-gradient-to-br from-[#fddb35] to-[#ffd700] rounded-2xl rounded-tr-md px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg">
                      <p className="text-sm sm:text-base text-[#1a0a2e] font-medium leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-xs text-white/50 px-2">{message.timestamp}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border-2 border-white/30">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-4 h-4 text-[#1a0a2e]" />
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3 border border-white/20">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions (shown when no messages from user yet) */}
        {messages.length === 1 && (
          <div className="max-w-4xl mx-auto px-3 pb-4 sm:px-4">
            <p className="text-xs text-white/70 mb-3 text-center">Quick questions:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(question);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/30 text-xs text-white transition-all duration-200 active:scale-95"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="relative z-10 flex-shrink-0 border-t border-white/10 bg-gradient-to-r from-[#1a0a2e]/90 to-[#2d1b3d]/90 backdrop-blur-sm" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="max-w-4xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-2 border border-white/30 shadow-lg">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-sm sm:text-base text-white placeholder:text-white/50 h-10"
                disabled={isTyping}
                autoComplete="off"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg flex-shrink-0 ${
                  inputValue.trim() && !isTyping
                    ? 'bg-gradient-to-br from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] active:scale-90'
                    : 'bg-white/10 cursor-not-allowed opacity-50'
                }`}
                aria-label="Send message"
              >
                <Send className={`w-5 h-5 ${inputValue.trim() && !isTyping ? 'text-[#1a0a2e]' : 'text-white/50'}`} />
              </button>
            </div>
          </div>
          <p className="text-xs text-white/50 text-center mt-2">
            Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
