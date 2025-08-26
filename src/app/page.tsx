"use client";

import { useState, useMemo } from "react";
import type { Association } from "@/lib/types";
import { associations, allCategories } from "@/lib/associations";
import Header from "@/components/layout/header";
import AssociationCard from "@/components/association-card";
import AssociationDialog from "@/components/association-dialog";
import Filters from "@/components/filters";
import RecommendationEngine from "@/components/recommendations";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAssociation, setSelectedAssociation] =
    useState<Association | null>(null);
  const [recommended, setRecommended] = useState<string[]>([]);

  const filteredAssociations = useMemo(() => {
    return associations.filter((asso) => {
      const matchesSearch =
        asso.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asso.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => asso.categories.includes(cat));
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-8 h-full flex flex-col">
          <RecommendationEngine onRecommendations={setRecommended} />

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-headline">
              Annuaire des Associations
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Input
                type="search"
                placeholder="Rechercher une association..."
                className="max-w-sm bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Filters
                categories={allCategories}
                selectedCategories={selectedCategories}
                onSelectCategory={handleSelectCategory}
              />
            </div>
          </div>
          <ScrollArea className="flex-1 pr-4 -mr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAssociations.map((asso) => (
                <AssociationCard
                  key={asso.id}
                  association={asso}
                  onSelect={() => setSelectedAssociation(asso)}
                  isRecommended={recommended.includes(asso.name)}
                />
              ))}
            </div>
            {filteredAssociations.length === 0 && (
                <div className="text-center py-16 text-muted-foreground col-span-full">
                    <p className="text-lg">Aucune association ne correspond à votre recherche.</p>
                </div>
            )}
          </ScrollArea>
        </div>
      </main>
      <AssociationDialog
        association={selectedAssociation}
        isOpen={!!selectedAssociation}
        onClose={() => setSelectedAssociation(null)}
      />
    </div>
  );
}
