import { Product } from "../../types/skincare";

export const toniques: Product[] = [
  {
    id: "eau-neroli",
    name: "Eau de Néroli",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-neroli",
    description: "Tonique apaisant à l'eau de néroli",
    ingredients: "Citrus aurantium flower water",
    format: "100 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Apaise", "Tonifie", "Rafraîchit"]
  },
  {
    id: "eau-orange",
    name: "Eau d'Orange",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-orange",
    ingredients: "Citrus sinensis flower water",
    format: "100 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "morning",
    image: "/placeholder.svg",
    description: "Tonique revitalisant à l'eau d'orange",
    benefits: ["Revitalise", "Équilibre", "Illumine"]
  },
  {
    id: "eau-helichryse",
    name: "Eau d'Hélichryse",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-helichryse",
    ingredients: "Helichrysum italicum flower water",
    format: "100 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs"],
    skinTypes: ["Sensible"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    description: "Tonique calmant à l'eau d'hélichryse",
    benefits: ["Calme les rougeurs", "Apaise", "Protège"]
  }
];
