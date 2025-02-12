
import { Product } from "../../types/skincare";

export const yeux: Product[] = [
  {
    id: "cocktail-contour",
    name: "Cocktail contour",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/cocktail-contour",
    description: "Soin spécifique pour le contour des yeux",
    ingredients: "Specialized eye area complex",
    format: "10 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Cernes"],
    skinTypes: ["Normale", "Sensible"],
    timeOfDay: "both",
    image: "/lovable-uploads/0a6bd174-0d69-4a45-94fd-1056582257b6.png",
    benefits: ["Atténue les cernes", "Décongestionne", "Rafraîchit le regard"]
  },
  {
    id: "soin-jeunesse-contour",
    name: "Soin jeunesse contour",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/soin-contour-jeunesse-yeux",
    description: "Soin anti-âge spécifique pour le contour des yeux",
    ingredients: "Anti-aging eye complex",
    format: "7,5 g",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Cernes", "Rides"],
    skinTypes: ["Normale", "Sèche"],
    timeOfDay: "both",
    image: "/lovable-uploads/3d5a223e-b8c1-42b2-9311-b605bb539492.png",
    benefits: ["Lisse les rides", "Atténue les cernes", "Effect tenseur"]
  }
];
