import { Product } from "../../types/skincare";

export const serums: Product[] = [
  {
    id: "serum-immortelle",
    name: "Sérum Immortelle",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-immortelle-30-ml",
    ingredients: "Rosa canina (Rose musquée) fruit oil...",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: true,
    conditions: ["Rides"],
    skinTypes: ["Sèche", "Normale"]
  },
  // ... autres sérums
];