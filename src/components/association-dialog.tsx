import type { Association } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Euro,
  Link as LinkIcon,
  Calendar,
  Info
} from "lucide-react";

type AssociationDialogProps = {
  association: Association | null;
  isOpen: boolean;
  onClose: () => void;
};

const InfoSection = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="text-primary pt-1">{icon}</div>
        <div className="flex-1">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <div className="text-sm text-muted-foreground whitespace-pre-wrap">{children}</div>
        </div>
    </div>
);


export default function AssociationDialog({
  association,
  isOpen,
  onClose,
}: AssociationDialogProps) {
  if (!association) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{association.name}</DialogTitle>
          <DialogDescription>{association.description}</DialogDescription>
          <div className="flex flex-wrap gap-2 pt-2">
            {association.categories.map((cat) => (
              <Badge key={cat} variant="secondary">{cat}</Badge>
            ))}
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6 -mr-6">
          <div className="space-y-6">
            {association.contacts && (
                <InfoSection icon={<Users size={20} />} title="Contacts">
                    {association.contacts.map((c, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                            <p className="font-medium text-foreground/90">{c.name}{c.role && ` - ${c.role}`}</p>
                            {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-2 hover:text-primary"><Phone size={14} /> {c.phone}</a>}
                            {c.email && <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-primary"><Mail size={14} /> {c.email}</a>}
                            {c.notes && <p className="text-xs italic">{c.notes}</p>}
                        </div>
                    ))}
                </InfoSection>
            )}

            {association.schedule && (
                <InfoSection icon={<Clock size={20} />} title="Horaires">
                    {association.schedule}
                </InfoSection>
            )}

            {association.location && (
                <InfoSection icon={<MapPin size={20} />} title="Lieu">
                    {association.location}
                </InfoSection>
            )}
            
            {association.fee && (
                <InfoSection icon={<Euro size={20} />} title="Tarifs / Adhésion">
                    {association.fee}
                </InfoSection>
            )}

            {association.website && (
                <InfoSection icon={<LinkIcon size={20} />} title="Site Web">
                    <a href={`http://${association.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{association.website}</a>
                </InfoSection>
            )}
            
            {association.events && association.events.length > 0 && (
                <InfoSection icon={<Calendar size={20} />} title="Événements">
                    {association.events.map((e,i) => <p key={i}>{e.name}{e.date && ` - ${e.date}`}</p>)}
                </InfoSection>
            )}

            {association.notes && (
                <InfoSection icon={<Info size={20} />} title="Notes">
                    {association.notes}
                </InfoSection>
            )}

            {association.activities && association.activities.length > 0 && (
              <div>
                <Separator className="my-4" />
                <h3 className="text-lg font-semibold mb-3 font-headline">Activités</h3>
                <div className="space-y-4">
                  {association.activities.map((activity, i) => (
                    <div key={i}>
                      <h4 className="font-semibold text-md text-foreground mb-2">{activity.category}</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {activity.items.map((item, j) => (
                          <li key={j}>
                            <span className="font-medium text-foreground/90">{item.name}:</span> {item.details} ({item.price})
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
