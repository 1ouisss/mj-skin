
import { Product } from "../../types/skincare";

export const yeux: Product[] = [
  {
    id: "cocktail-contour",
    name: "Cocktail contour",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/cocktail-contour",
    description: "Soin spécifique pour le contour des yeux",
    ingredients: "Specialized eye area complex",
    format: "15 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Cernes"],
    skinTypes: ["Normale", "Sensible"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Atténue les cernes", "Décongestionne", "Rafraîchit le regard"]
  },
  {
    id: "soin-jeunesse-contour",
    name: "Soin jeunesse contour",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/soin-jeunesse-contour",
    description: "Soin anti-âge spécifique pour le contour des yeux",
    ingredients: "Anti-aging eye complex",
    format: "15 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Cernes", "Rides"],
    skinTypes: ["Normale", "Sèche"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Lisse les rides", "Atténue les cernes", "Effect tenseur"]
  }
];
