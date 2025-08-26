
import type { Association } from "@/lib/types";
import * as LucideIcons from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Star } from "lucide-react";

type AssociationCardProps = {
  association: Association;
  onSelect: () => void;
};

// A type guard to check if a key is a valid Lucide icon name
function isValidIcon(iconName: string): iconName is keyof typeof LucideIcons {
  return iconName in LucideIcons;
}

export default function AssociationCard({
  association,
  onSelect,
}: AssociationCardProps) {
  
  const Icon = isValidIcon(association.icon)
    ? LucideIcons[association.icon]
    : Star; // Fallback icon

  return (
    <Card
      onClick={onSelect}
      className={cn(
        "flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300 rounded-3xl hover:-translate-y-2 hover:rotate-[-6deg] border-2 border-transparent hover:border-primary",
        "bg-card text-card-foreground"
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="font-headline text-lg font-bold">{association.name}</CardTitle>
          <div className="p-3 bg-accent/20 text-accent rounded-full">
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <CardDescription className="line-clamp-3 h-[60px]">{association.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {association.categories.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-primary/90 font-semibold flex items-center group">
          Voir les détails
          <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </p>
      </CardFooter>
    </Card>
  );
}
