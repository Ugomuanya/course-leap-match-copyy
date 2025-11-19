import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { Send, Minimize2 } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi! I've been programmed to tell you everything you could need to know about this course.\n\nWhere should we start?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const name = localStorage.getItem("studentName") || "Student";

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputValue },
      {
        role: "bot",
        content: "Great! Let's start here...\n\nThis course offers hands-on experience with industry-standard tools and techniques. You'll work on real-world projects and build a portfolio that showcases your skills.",
      },
    ]);
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-ocean)] p-6 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-[hsl(var(--accent))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col relative z-10 pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[hsl(var(--lavender))] flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <h2 className="text-xl font-bold text-white">Swanny</h2>
          </div>
          <IconButton
            variant="lavender"
            size="sm"
            onClick={() => navigate("/course-details")}
          >
            <Minimize2 className="w-5 h-5" />
          </IconButton>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {message.role === "bot" ? (
                <div className="bg-[hsl(var(--ocean-medium))]/90 backdrop-blur-md rounded-3xl p-6 shadow-[var(--shadow-card)] border border-white/20">
                  <p className="font-semibold text-white mb-2">Swanny</p>
                  <p className="text-white/90 whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>
              ) : (
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg ml-12">
                  <p className="font-semibold text-[hsl(var(--secondary))] mb-2">{name}</p>
                  <p className="text-[hsl(var(--ocean-deep))]">{message.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-xl flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type here....."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base placeholder:text-muted-foreground"
          />
          <IconButton
            variant="default"
            size="default"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;
