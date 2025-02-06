import { Product } from "../../types/skincare";

export const huiles: Product[] = [
  {
    id: "huile-jojoba",
    name: "Huile de Jojoba",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/huile-jojoba",
    ingredients: "Simmondsia chinensis seed oil",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Acné"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both"
  },
  {
    id: "huile-tamanu",
    name: "Huile Tamanu",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/huile-tamanu",
    ingredients: "Calophyllum inophyllum seed oil",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Acné", "Eczéma"],
    skinTypes: ["Sensible", "Grasse"],
    timeOfDay: "evening"
  }
];
