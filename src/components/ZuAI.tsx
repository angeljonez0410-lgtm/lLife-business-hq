import { Card } from "@/components/ui/card";
import { LucideBot } from "lucide-react";

export default function ZuAI() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <LucideBot className="text-pink w-8 h-8" />
        <h2 className="text-2xl font-bold text-pink">Zu AI Assistant</h2>
      </div>
      <Card className="p-4 rounded-3xl shadow-glass border-gold bg-glass backdrop-blur-xl">
        <div className="text-sm text-muted-foreground">Chat with Zu (AI assistant) coming soon...</div>
      </Card>
    </div>
  );
}
