import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideSparkles, LucideCheckCircle, LucideDollarSign, LucideBookOpen, LucideCamera, LucideTrendingUp } from "lucide-react";
import { weeklySchedule, beginnerTasks } from "@/lib/starterData";

const today = new Date();
const dayName = today.toLocaleDateString(undefined, { weekday: "long" });
const dateString = today.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
const dailyQuote = "You are the CEO of your life. Level up!";

export default function DashboardHome() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-3xl font-bold text-pink drop-shadow">Welcome, Boss!</h1>
        <p className="text-lg font-medium text-gold">{dateString}</p>
        <Badge className="bg-gradient-pink-gold text-black text-base py-2 px-4 rounded-3xl shadow-glass font-semibold">
          {dailyQuote}
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-glass backdrop-blur-xl p-4 rounded-3xl shadow-glass border-gold">
          <div className="flex items-center gap-2 mb-2">
            <LucideSparkles className="text-pink w-6 h-6" />
            <span className="font-bold">Today’s Top 3</span>
          </div>
          <ul className="list-disc ml-6 text-sm">
            {beginnerTasks.slice(0, 3).map((task, i) => (
              <li key={i}>{task.title}</li>
            ))}
          </ul>
        </Card>
        <Card className="bg-glass backdrop-blur-xl p-4 rounded-3xl shadow-glass border-gold">
          <div className="flex items-center gap-2 mb-2">
            <LucideDollarSign className="text-gold w-6 h-6" />
            <span className="font-bold">Money Task</span>
          </div>
          <p className="text-sm">{beginnerTasks.find(t => t.type === 'Money')?.title || 'No money task today.'}</p>
        </Card>
        <Card className="bg-glass backdrop-blur-xl p-4 rounded-3xl shadow-glass border-gold">
          <div className="flex items-center gap-2 mb-2">
            <LucideCamera className="text-pink w-6 h-6" />
            <span className="font-bold">Content Task</span>
          </div>
          <p className="text-sm">{beginnerTasks.find(t => t.type === 'Content')?.title || 'No content task today.'}</p>
        </Card>
        <Card className="bg-glass backdrop-blur-xl p-4 rounded-3xl shadow-glass border-gold md:col-span-3">
          <div className="flex items-center gap-2 mb-2">
            <LucideBookOpen className="text-gold w-6 h-6" />
            <span className="font-bold">Learning Task</span>
          </div>
          <p className="text-sm">{beginnerTasks.find(t => t.type === 'Learning')?.title || 'No learning task today.'}</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-glass backdrop-blur-xl p-4 rounded-3xl shadow-glass border-gold">
          <div className="flex items-center gap-2 mb-2">
            <LucideTrendingUp className="text-gold w-6 h-6" />
            <span className="font-bold">Progress</span>
          </div>
          <Progress value={40} className="h-3 bg-cream" />
          <p className="text-xs mt-2 text-muted-foreground">40% of weekly goals complete</p>
        </Card>
        <Card className="bg-glass backdrop-blur-xl p-4 rounded-3xl shadow-glass border-gold">
          <div className="flex items-center gap-2 mb-2">
            <LucideCheckCircle className="text-pink w-6 h-6" />
            <span className="font-bold">Weekly Focus</span>
          </div>
          <ul className="list-disc ml-6 text-sm">
            {weeklySchedule.map((d, i) => (
              <li key={i} className={d.day === dayName ? "font-bold text-pink" : ""}>
                {d.day}: {d.focus}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
