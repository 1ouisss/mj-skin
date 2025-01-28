import { Product } from "../../types/skincare";

export const serums: Product[] = [
  {
    id: "serum-immortelle",
    name: "Sérum Immortelle",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-immortelle",
    ingredients: "Rosa canina (Rose musquée) fruit oil...",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Rides"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening"
  },
  // ... autres sérums
];