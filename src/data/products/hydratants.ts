import { Product } from "../../types/skincare";

export const hydratants: Product[] = [
  {
    id: "creme-fraiche",
    name: "Crème Fraîche",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/creme-fraiche",
    ingredients: "Citrus sinensis (Orange) water, Simmondsia chinensis (Jojoba) seed oil...",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Sensible", "Normale"],
    timeOfDay: "both"
  },
  // ... autres hydratants
];