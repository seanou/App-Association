export interface Contact {
  name: string;
  role?: string;
  phone?: string;
  email?: string;
}

export interface Activity {
  category: string;
  items: {
    name: string;
    details: string;
    price: string;
  }[];
}

export interface AssociationEvent {
  name: string;
  date: string;
}

export interface Association {
  id: string;
  name: string;
  description: string;
  categories: string[];
  schedule?: string;
  contacts?: Contact[];
  location?: string;
  website?: string;
  fee?: string;
  events?: AssociationEvent[];
  activities?: Activity[];
  notes?: string;
}
