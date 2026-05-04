import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucidePlus, LucideCheck, LucideLoader, LucideX } from "lucide-react";
import { beginnerTasks } from "@/lib/starterData";

const statusColors: Record<string, string> = {
  "Not Started": "bg-muted text-black",
  "Doing": "bg-gold text-black",
  "Done": "bg-pink text-white",
};

export default function TaskManager() {
  // Clear all localStorage and reload the page
  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear ALL your data? This cannot be undone.')) {
      window.localStorage.clear();
      window.location.replace(window.location.href);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6 sm:py-12 space-y-6 sm:space-y-10">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-pink drop-shadow-lg tracking-tight">Task Manager</h2>
        <div className="flex gap-2">
          <Button className="bg-pink text-white rounded-full shadow-glass flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-bold hover:bg-pink-dark transition">
            <LucidePlus className="w-5 sm:w-6 h-5 sm:h-6" /> Add Task
          </Button>
          <Button variant="destructive" className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-bold" onClick={handleClearAllData}>
            Clear All Data
          </Button>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {beginnerTasks.map((task, i) => (
          <Card key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold bg-glass backdrop-blur-2xl hover:scale-[1.01] transition-transform">
            <div>
              <div className="font-extrabold text-lg sm:text-2xl text-pink mb-1 sm:mb-2 drop-shadow">{task.title}</div>
              <div className="flex flex-wrap gap-2 sm:gap-3 text-sm sm:text-base">
                <Badge className="bg-gold text-black px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-semibold">{task.business}</Badge>
                <Badge className="bg-cream text-black px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-semibold">{task.type}</Badge>
                <Badge className="bg-pink text-white px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-semibold">Priority: {task.priority}</Badge>
                <Badge className={statusColors[task.status] || "bg-muted text-black px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-semibold"}>{task.status}</Badge>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-0">
              {task.status === "Not Started" && (
                <Button size="icon" className="bg-gold text-black hover:bg-gold/80"><LucideLoader className="w-5 sm:w-6 h-5 sm:h-6" /></Button>
              )}
              {task.status === "Doing" && (
                <Button size="icon" className="bg-pink text-white hover:bg-pink-dark"><LucideCheck className="w-5 sm:w-6 h-5 sm:h-6" /></Button>
              )}
              {task.status !== "Done" && (
                <Button size="icon" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10"><LucideX className="w-5 sm:w-6 h-5 sm:h-6" /></Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
