import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LucideCamera,
  LucidePin,
  LucidePlay,
  LucidePlus,
  LucideUsers,
  LucideVideo,
} from "lucide-react";

const platforms = [
  { name: "TikTok", icon: LucideVideo },
  { name: "Instagram", icon: LucideCamera },
  { name: "Facebook", icon: LucideUsers },
  { name: "YouTube Shorts", icon: LucidePlay },
  { name: "Pinterest", icon: LucidePin },
];

export default function ContentPlanner() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-pink">Content Planner</h2>
        <Button className="bg-pink text-white rounded-full shadow-glass flex items-center gap-2">
          <LucidePlus className="w-4 h-4" /> Add Content
        </Button>
      </div>
      <Card className="p-4 rounded-3xl shadow-glass border-gold bg-glass backdrop-blur-xl">
        <div className="flex flex-wrap gap-2 mb-2">
          {platforms.map(({ name, icon: Icon }) => (
            <Badge key={name} className="bg-gold text-black flex items-center gap-1">
              <Icon className="w-4 h-4" /> {name}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Content planning features coming soon...</div>
      </Card>
    </div>
  );
}
