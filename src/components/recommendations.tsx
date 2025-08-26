
"use client";

// This component is no longer used in the application.
// We are keeping the file to avoid breaking potential imports,
// but in a real-world scenario, you would delete this file.

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { getRecommendations } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type RecommendationEngineProps = {
  onRecommendations: (names: string[]) => void;
};

export default function RecommendationEngine({ onRecommendations }: RecommendationEngineProps) {
  const [interests, setInterests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interests.trim()) {
      toast({
        title: "Champ vide",
        description: "Veuillez décrire vos centres d'intérêt.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    onRecommendations([]); // Clear previous recommendations
    try {
      const results = await getRecommendations(interests);
      if (results && results.length > 0) {
        onRecommendations(results);
         toast({
          title: "Recommandations trouvées!",
          description: "Les associations correspondantes sont mises en évidence ci-dessous.",
        });
      } else {
        toast({
          title: "Aucune recommandation",
          description: "Nous n'avons pas trouvé d'association correspondant à vos intérêts.",
        });
      }
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la récupération des recommandations.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <Card className="bg-card/80 backdrop-blur-sm hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 text-accent-foreground rounded-lg">
                <Sparkles className="h-6 w-6" />
            </div>
            <div>
                <CardTitle className="font-headline">Besoin d'inspiration ?</CardTitle>
                <CardDescription>Décrivez vos centres d'intérêt et nous vous suggérerons des associations.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <Textarea
            placeholder="Ex: J'aime la randonnée en nature, la musique et aider les autres..."
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? "Recherche..." : "Trouver des associations"}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
