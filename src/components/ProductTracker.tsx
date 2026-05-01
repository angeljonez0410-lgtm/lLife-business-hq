import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucidePlus, LucideBox } from "lucide-react";

export default function ProductTracker() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-black">Product Tracker</h2>
        <Button className="bg-gold text-black rounded-full shadow-glass flex items-center gap-2">
          <LucidePlus className="w-4 h-4" /> Add Product
        </Button>
      </div>
      <Card className="p-4 rounded-3xl shadow-glass border-gold bg-glass backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2">
          <LucideBox className="text-black w-6 h-6" />
          <span className="font-bold">Product tracking features coming soon...</span>
        </div>
      </Card>
    </div>
  );
}
