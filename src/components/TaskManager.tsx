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
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-pink">Task Manager</h2>
        <Button className="bg-pink text-white rounded-full shadow-glass flex items-center gap-2">
          <LucidePlus className="w-4 h-4" /> Add Task
        </Button>
      </div>
      <div className="space-y-4">
        {beginnerTasks.map((task, i) => (
          <Card key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-3xl shadow-glass border-gold bg-glass backdrop-blur-xl">
            <div>
              <div className="font-semibold text-lg text-black mb-1">{task.title}</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge className="bg-gold text-black">{task.business}</Badge>
                <Badge className="bg-cream text-black">{task.type}</Badge>
                <Badge className="bg-pink text-white">Priority: {task.priority}</Badge>
                <Badge className={statusColors[task.status] || "bg-muted text-black"}>{task.status}</Badge>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {task.status === "Not Started" && (
                <Button size="icon" className="bg-gold text-black"><LucideLoader className="w-4 h-4" /></Button>
              )}
              {task.status === "Doing" && (
                <Button size="icon" className="bg-pink text-white"><LucideCheck className="w-4 h-4" /></Button>
              )}
              {task.status !== "Done" && (
                <Button size="icon" variant="outline" className="border-destructive text-destructive"><LucideX className="w-4 h-4" /></Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
