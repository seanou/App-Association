
import type { Association } from "@/lib/types";
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
import { ArrowRight } from "lucide-react";

type AssociationCardProps = {
  association: Association;
  onSelect: () => void;
};

export default function AssociationCard({
  association,
  onSelect,
}: AssociationCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300 rounded-2xl hover:-translate-y-2 hover:rotate-[-3deg]"
      )}
    >
      <CardHeader>
        <CardTitle className="font-headline text-lg">{association.name}</CardTitle>
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
