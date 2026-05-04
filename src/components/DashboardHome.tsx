import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideSparkles, LucideCheckCircle, LucideDollarSign, LucideBookOpen, LucideCamera, LucideTrendingUp, LucideBot } from "lucide-react";
import { weeklySchedule, beginnerTasks } from "@/lib/starterData";
import type { Business, Task, ContentIdea, Product } from "@/types";
import { useBusinesses, useTasks, useContent, useProducts } from "@/hooks/useLocalData";
// Simple personalized recommendation utility
function getRecommendations({ businesses, tasks, content, products }: {
  businesses: Business[];
  tasks: Task[];
  content: ContentIdea[];
  products: Product[];
}) {
  // Recommend the business with the most tasks
  const businessCount: Record<string, number> = {};
  tasks.forEach(t => {
    businessCount[t.business] = (businessCount[t.business] || 0) + 1;
  });
  const topBusiness = Object.entries(businessCount).sort((a, b) => b[1] - a[1])[0]?.[0];

  // Recommend the first unfinished task
  const nextTask = tasks.find(t => t.status !== "Done");

  // Recommend a content idea that isn't posted
  const nextContent = content.find(c => c.status !== "Posted");

  // Recommend a product that isn't sold
  const nextProduct = products.find(p => p.status !== "Sold");

  return {
    topBusiness,
    nextTask,
    nextContent,
    nextProduct,
  };
}
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const today = new Date();
const dayName = today.toLocaleDateString(undefined, { weekday: "long" });
const dateString = today.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
const dailyQuote = "You are the CEO of your life. Level up!";

export default function DashboardHome() {
  const [businesses] = useBusinesses();
  const [tasks] = useTasks();
  const [content] = useContent();
  const [products] = useProducts();
  const recs = getRecommendations({ businesses, tasks, content, products });
  // AI Onboarding Assistant Modal
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  useEffect(() => {
    // Show onboarding only for new users (no onboardingSeen in localStorage)
    if (typeof window !== "undefined" && !window.localStorage.getItem("onboardingSeen")) {
      setShowOnboarding(true);
      window.localStorage.setItem("onboardingSeen", "true");
    }
  }, []);

  // Real AI response using OpenAI API route
  const handleAskAI = async () => {
    setAiResponse("Thinking...");
    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiInput }),
      });
      const data = await res.json();
      setAiResponse(data.answer || "Sorry, I couldn't generate a response.");
    } catch (e) {
      setAiResponse("Sorry, there was a problem connecting to the AI.");
    }
  };

  // Clear all localStorage and reload the page
  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear ALL your data? This cannot be undone.')) {
      window.localStorage.clear();
      window.location.replace(window.location.href);
    }
  };

  return (
    <>
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="max-w-lg bg-gradient-to-br from-pink/90 to-gold/90 text-black border-4 border-gold shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <LucideBot className="w-8 h-8 text-pink drop-shadow" />
              <DialogTitle className="text-2xl font-extrabold text-pink">Welcome to Boss HQ!</DialogTitle>
            </div>
            <DialogDescription className="text-base text-black/80 font-semibold">
              Meet your AI onboarding assistant. Ask anything about getting started, features, or tips!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-2">
            <input
              className="rounded-lg border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-pink"
              placeholder="Ask me anything..."
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
            />
            <button
              className="bg-pink text-white font-bold rounded-lg px-4 py-2 mt-1 hover:bg-pink-dark transition"
              onClick={handleAskAI}
              disabled={!aiInput.trim()}
            >
              Ask AI
            </button>
            {aiResponse && (
              <div className="bg-white/80 rounded-lg p-3 mt-2 text-black shadow-inner border border-gold animate-fade-in">
                {aiResponse}
              </div>
            )}
          </div>
          <DialogClose asChild>
            <button className="absolute top-2 right-2 text-black bg-gold rounded-full p-2 hover:bg-pink transition" aria-label="Close">
              ×
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-12 space-y-6 sm:space-y-10">
      <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-pink drop-shadow-lg tracking-tight mb-1">Welcome, Boss!</h1>
        <p className="text-lg sm:text-2xl font-semibold text-gold mb-1">{dateString}</p>
        <Badge className="bg-gradient-to-r from-pink to-gold text-black text-base sm:text-lg py-2 sm:py-3 px-4 sm:px-8 rounded-4xl shadow-glass font-bold border-2 border-gold animate-pulse">
          {dailyQuote}
        </Badge>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="bg-gold/80 border-2 border-pink rounded-2xl px-6 py-4 shadow-lg max-w-xl w-full animate-fade-in">
          <div className="font-bold text-lg text-pink mb-1 flex items-center gap-2">
            <LucideSparkles className="w-5 h-5 text-gold" /> Personalized Recommendations
          </div>
          <ul className="text-black text-base font-semibold space-y-1">
            {recs.topBusiness && <li>🔥 Focus on <span className="text-pink font-bold">{recs.topBusiness}</span>—it’s your most active business!</li>}
            {recs.nextTask && <li>✅ Next task to crush: <span className="text-pink font-bold">{recs.nextTask.title}</span></li>}
            {recs.nextContent && <li>🎬 Try posting: <span className="text-pink font-bold">{recs.nextContent.title}</span></li>}
            {recs.nextProduct && <li>📦 Move this product: <span className="text-pink font-bold">{recs.nextProduct.productName}</span></li>}
            {!recs.topBusiness && !recs.nextTask && !recs.nextContent && !recs.nextProduct && <li>You're all caught up! Add new goals to keep growing 🚀</li>}
          </ul>
        </div>
        <button
          className="bg-destructive text-white rounded-full px-4 py-2 font-bold shadow-glass hover:bg-destructive/80 transition"
          onClick={handleClearAllData}
        >
          Clear All Data
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
        <Card className="bg-glass backdrop-blur-2xl p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold hover:scale-[1.03] transition-transform">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <LucideSparkles className="text-pink w-6 sm:w-8 h-6 sm:h-8 drop-shadow" />
            <span className="font-bold text-base sm:text-lg text-pink">Today’s Top 3</span>
          </div>
          <ul className="list-disc ml-4 sm:ml-8 text-sm sm:text-base space-y-1">
            {beginnerTasks.slice(0, 3).map((task, i) => (
              <li key={i} className="font-medium text-foreground/90">{task.title}</li>
            ))}
          </ul>
        </Card>
        <Card className="bg-glass backdrop-blur-2xl p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold hover:scale-[1.03] transition-transform">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <LucideDollarSign className="text-gold w-6 sm:w-8 h-6 sm:h-8 drop-shadow" />
            <span className="font-bold text-base sm:text-lg text-gold">Money Task</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-foreground/90">{beginnerTasks.find(t => t.type === 'Money')?.title || 'No money task today.'}</p>
        </Card>
        <Card className="bg-glass backdrop-blur-2xl p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold hover:scale-[1.03] transition-transform">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <LucideCamera className="text-pink w-6 sm:w-8 h-6 sm:h-8 drop-shadow" />
            <span className="font-bold text-base sm:text-lg text-pink">Content Task</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-foreground/90">{beginnerTasks.find(t => t.type === 'Content')?.title || 'No content task today.'}</p>
        </Card>
        <Card className="bg-glass backdrop-blur-2xl p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold md:col-span-3 mt-2 hover:scale-[1.01] transition-transform">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <LucideBookOpen className="text-gold w-6 sm:w-8 h-6 sm:h-8 drop-shadow" />
            <span className="font-bold text-base sm:text-lg text-gold">Learning Task</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-foreground/90">{beginnerTasks.find(t => t.type === 'Learning')?.title || 'No learning task today.'}</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <Card className="bg-glass backdrop-blur-2xl p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold hover:scale-[1.03] transition-transform">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <LucideTrendingUp className="text-gold w-6 sm:w-8 h-6 sm:h-8 drop-shadow" />
            <span className="font-bold text-base sm:text-lg text-gold">Progress</span>
          </div>
          <Progress value={40} className="h-3 sm:h-4 bg-cream rounded-full" />
          <p className="text-xs sm:text-base mt-2 sm:mt-3 text-muted-foreground font-semibold">40% of weekly goals complete</p>
        </Card>
        <Card className="bg-glass backdrop-blur-2xl p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold hover:scale-[1.03] transition-transform">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <LucideCheckCircle className="text-pink w-6 sm:w-8 h-6 sm:h-8 drop-shadow" />
            <span className="font-bold text-base sm:text-lg text-pink">Weekly Focus</span>
          </div>
          <ul className="list-disc ml-4 sm:ml-8 text-sm sm:text-base space-y-1">
            {weeklySchedule.map((d, i) => (
              <li key={i} className={d.day === dayName ? "font-bold text-pink text-base sm:text-lg" : "text-foreground/90"}>
                {d.day}: {d.focus}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
    </>
  );
}
