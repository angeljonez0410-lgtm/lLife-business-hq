import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucidePlus, LucideBox } from "lucide-react";

export default function ProductTracker() {
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
        <h2 className="text-2xl sm:text-4xl font-extrabold text-black drop-shadow-lg tracking-tight">Product Tracker</h2>
        <div className="flex gap-2">
          <Button className="bg-gold text-black rounded-full shadow-glass flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-bold hover:bg-gold/80 transition">
            <LucidePlus className="w-5 sm:w-6 h-5 sm:h-6" /> Add Product
          </Button>
          <Button variant="destructive" className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-bold" onClick={handleClearAllData}>
            Clear All Data
          </Button>
        </div>
      </div>
      <Card className="p-4 sm:p-8 rounded-4xl shadow-glass border-2 border-gold bg-glass backdrop-blur-2xl hover:scale-[1.01] transition-transform">
        <div className="flex items-center gap-2 sm:gap-4 mb-2">
          <LucideBox className="text-black w-8 sm:w-10 h-8 sm:h-10 drop-shadow" />
          <span className="font-bold text-base sm:text-lg text-black">Product tracking features coming soon...</span>
        </div>
      </Card>
    </div>
  );
}
