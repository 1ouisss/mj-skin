
import { Product } from "../../types/skincare";

export const huiles: Product[] = [
  {
    id: "huile-abricot",
    name: "Huile d'Abricot",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/huile-abricot",
    ingredients: "Prunus armeniaca kernel oil",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Asphyxiée", "Normale", "Atonique"],
    timeOfDay: "both"
  },
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
    skinTypes: ["Grasse", "Mixte", "Asphyxiée", "Atonique"],
    timeOfDay: "both"
  },
  {
    id: "huile-kukui",
    name: "Huile de Kukui",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/huile-kukui",
    ingredients: "Aleurites moluccana seed oil",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Atonique"],
    timeOfDay: "both"
  },
  {
    id: "huile-moringa",
    name: "Huile de Moringa",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/huile-moringa",
    ingredients: "Moringa oleifera seed oil",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Atonique"],
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
    skinTypes: ["Sensible", "Grasse", "Asphyxiée"],
    timeOfDay: "evening"
  }
];
