import { Card } from "@/components/ui/card";
import { LucideBookOpen } from "lucide-react";

export default function LearningMode() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <LucideBookOpen className="text-gold w-8 h-8" />
        <h2 className="text-2xl font-bold text-gold">Learning Mode</h2>
      </div>
      <Card className="p-4 rounded-3xl shadow-glass border-gold bg-glass backdrop-blur-xl">
        <div className="text-sm text-muted-foreground">Beginner-friendly learning center coming soon...</div>
      </Card>
    </div>
  );
}
