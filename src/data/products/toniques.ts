import { Product } from "../../types/skincare";

export const toniques: Product[] = [
  {
    id: "eau-neroli",
    name: "Eau de Néroli",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-neroli",
    ingredients: "Citrus aurantium flower water",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both"
  },
  {
    id: "eau-orange",
    name: "Eau d'Orange",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-orange",
    ingredients: "Citrus sinensis flower water",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "morning"
  },
  {
    id: "eau-helichryse",
    name: "Eau d'Hélichryse",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-helichryse",
    ingredients: "Helichrysum italicum flower water",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs"],
    skinTypes: ["Sensible"],
    timeOfDay: "both"
  }
];