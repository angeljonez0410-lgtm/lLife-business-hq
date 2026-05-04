import { Card } from "@/components/ui/card";
import { LucideBookOpen } from "lucide-react";

export default function LearningMode() {
  // Clear all localStorage and reload the page
  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear ALL your data? This cannot be undone.')) {
      window.localStorage.clear();
      window.location.replace(window.location.href);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6 sm:py-12 space-y-6 sm:space-y-10">
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
        <LucideBookOpen className="text-gold w-8 sm:w-12 h-8 sm:h-12 drop-shadow" />
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gold drop-shadow-lg tracking-tight">Learning Mode</h2>
        <button
          className="bg-destructive text-white rounded-full px-4 py-2 font-bold shadow-glass hover:bg-destructive/80 transition ml-4"
          onClick={handleClearAllData}
        >
          Clear All Data
        </button>
      </div>
      <Card className="p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold bg-glass backdrop-blur-2xl hover:scale-[1.01] transition-transform">
        <div className="text-sm sm:text-lg text-muted-foreground font-semibold">Beginner-friendly learning center coming soon...</div>
      </Card>
    </div>
  );
}
