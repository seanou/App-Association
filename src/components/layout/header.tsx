import { Users } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 text-primary rounded-lg">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground font-headline">
              Allaire Associations
            </h1>
            <p className="text-muted-foreground">
              Le guide complet des associations d'Allaire 2025-2026
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
