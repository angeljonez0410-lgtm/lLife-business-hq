import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucidePlus, LucideDollarSign } from "lucide-react";

export default function MoneyTracker() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gold">Money Tracker</h2>
        <Button className="bg-gold text-black rounded-full shadow-glass flex items-center gap-2">
          <LucidePlus className="w-4 h-4" /> Add Entry
        </Button>
      </div>
      <Card className="p-4 rounded-3xl shadow-glass border-gold bg-glass backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2">
          <LucideDollarSign className="text-gold w-6 h-6" />
          <span className="font-bold">Income/Expense tracking coming soon...</span>
        </div>
      </Card>
    </div>
  );
}
