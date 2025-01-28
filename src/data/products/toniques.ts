import { Product } from "../../types/skincare";

export const toniques: Product[] = [
  {
    id: "eau-neroli",
    name: "Eau de Néroli enrichie",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-de-neroli-enrichie",
    ingredients: "Citrus sinensis (Orange) water, Glycerin (Glycérine végétale), Citrus aurantium var amara (Néroli) flower oil, Citrus aurantium (Petit grain) leaf/twig oil.",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: true,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "morning"
  },
  {
    id: "eau-orange",
    name: "Eau d'Orange",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-florale-d-orange",
    ingredients: "Eau d'orange (Citrus sinensis).",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte", "Sensible", "Normale"],
    timeOfDay: "morning"
  }
];