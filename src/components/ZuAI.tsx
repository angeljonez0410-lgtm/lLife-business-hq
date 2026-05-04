import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeName } from "@/context/ThemeContext";
import { Card } from "@/components/ui/card";
import { LucideBot, LucideSend, LucideSparkles, LucideSettings2, LucideTrash2 } from "lucide-react";

interface Message {
  role: "user" | "zu";
  content: string;
}

function ZuAI() {
  const themes = [
    { name: "Bold Pink & Gold", value: "pink-gold" },
    { name: "Classic Cream", value: "cream" },
    { name: "Luxury Black & Gold", value: "black-gold" },
    { name: "Minimal White", value: "white" },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { role: "zu", content: "Hi! I'm Zu, your AI assistant. I can help you with anything in your Life + Business HQ. Ask me to plan, organize, upgrade, or even redesign your dashboard!" },
  ]);
  const [input, setInput] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Clear chat to fresh state
  function clearChat() {
    setMessages([
      { role: "zu", content: "Hi! I'm Zu, your AI assistant. I can help you with anything in your Life + Business HQ. Ask me to plan, organize, upgrade, or even redesign your dashboard!" },
    ]);
    setInput("");
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { role: "user", content: input },
      { role: "zu", content: "(Zu will soon respond with real AI and can even change your dashboard, add features, or upgrade your system!)" },
    ]);
    setInput("");
  }

  function handleThemeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTheme(e.target.value as ThemeName);
    setMessages((msgs) => [
      ...msgs,
      { role: "zu", content: `Theme changed to: ${themes.find(t => t.value === e.target.value)?.name}` },
    ]);
  }

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 flex flex-col min-h-[90vh]">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <LucideBot className="text-pink w-10 h-10 drop-shadow" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-pink tracking-tight">Zu AI Assistant</h2>
        <span className="ml-2 px-2 sm:px-3 py-1 rounded-full bg-gold text-black font-semibold text-xs shadow-glass">Full Dashboard Access</span>
        <button
          className="ml-auto bg-white/80 border border-gold rounded-full p-2 shadow-glass hover:bg-gold/20 transition"
          title="Change UI & Theme"
          onClick={() => setShowSettings((v) => !v)}
        >
          <LucideSettings2 className="w-6 h-6 text-gold" />
        </button>
        <button
          className="ml-2 bg-white/80 border border-pink rounded-full p-2 shadow-glass hover:bg-pink/20 transition"
          title="Clear Chat"
          onClick={clearChat}
        >
          <LucideTrash2 className="w-6 h-6 text-pink" />
        </button>
      </div>
      {showSettings && (
        <Card className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-3xl shadow-glass border-gold bg-glass backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <LucideSettings2 className="w-6 h-6 text-gold" />
            <span className="font-bold text-lg text-gold">Change UI & Theme</span>
          </div>
          <label className="block mb-2 font-semibold text-pink">Select Theme:</label>
          <select
            className="w-full rounded-xl border border-gold px-4 py-2 text-lg bg-white/80 focus:ring-2 focus:ring-pink"
            value={theme}
            onChange={handleThemeChange}
          >
            {themes.map((theme) => (
              <option key={theme.value} value={theme.value}>{theme.name}</option>
            ))}
          </select>
          <div className="mt-3 text-xs text-muted-foreground">(Zu can upgrade the look and feel of your site instantly!)</div>
        </Card>
      )}
      <Card className="flex-1 flex flex-col bg-glass backdrop-blur-2xl rounded-4xl shadow-glass border-gold p-0 overflow-hidden">
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-pink scrollbar-track-cream"
          style={{ maxHeight: "70vh", minHeight: "40vh" }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "zu" ? "justify-start" : "justify-end"}`}>
              <div className={`rounded-3xl px-4 sm:px-5 py-3 max-w-[95vw] sm:max-w-[80%] text-base sm:text-lg font-medium shadow ${msg.role === "zu" ? "bg-pink/10 text-pink" : "bg-gold text-black"}`}>
                {msg.role === "zu" && <LucideSparkles className="inline w-4 h-4 mr-2 text-pink align-text-bottom" />} {msg.content}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 border-t border-gold bg-cream sticky bottom-0 z-10">
          <input
            className="flex-1 rounded-full px-4 sm:px-5 py-4 sm:py-5 bg-white/80 border border-pink focus:ring-2 focus:ring-pink text-lg sm:text-xl placeholder:text-pink outline-none shadow-glass"
            placeholder="Type your message to Zu..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="bg-pink text-white rounded-full p-4 sm:p-5 shadow-glass hover:bg-pink-dark transition text-lg sm:text-xl">
            <LucideSend className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </form>
      </Card>
      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground">
        <span className="bg-gradient-pink-gold px-3 py-1 rounded-2xl shadow-glass font-semibold">Zu can now upgrade your dashboard, theme, and more!</span>
      </div>
    </div>
  );
}
