import { Product } from "../../types/skincare";

export const yeux: Product[] = [
  {
    id: "cocktail-contour",
    name: "Cocktail contour",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/cocktail-contour",
    ingredients: "Specialized eye area complex",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Cernes"],
    skinTypes: ["Normale", "Sensible"],
    timeOfDay: "both"
  },
  {
    id: "soin-jeunesse-contour",
    name: "Soin jeunesse contour",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/soin-jeunesse-contour",
    ingredients: "Anti-aging eye complex",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Cernes", "Rides"],
    skinTypes: ["Normale", "Sèche"],
    timeOfDay: "both"
  }
];