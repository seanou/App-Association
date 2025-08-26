"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type FiltersProps = {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (category: string) => void;
};

export default function Filters({
  categories,
  selectedCategories,
  onSelectCategory,
}: FiltersProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-3">
        {categories.map((category) => (
            <Button
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "secondary"}
            onClick={() => onSelectCategory(category)}
            className={cn(
                "rounded-full",
                selectedCategories.includes(category) ? 'bg-primary/90 text-primary-foreground' : 'bg-card'
            )}
            >
            {category}
            </Button>
        ))}
         {selectedCategories.length > 0 && (
            <Button
                variant="ghost"
                onClick={() => onSelectCategory(selectedCategories[0])}
                className="rounded-full"
            >
                Effacer
            </Button>
         )}
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
