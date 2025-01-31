import { Product } from "../../types/skincare";

export const nettoyants: Product[] = [
  {
    id: "huile-nettoyante",
    name: "Huile Nettoyante",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/huile-nettoyante",
    ingredients: "Simmondsia chinensis seed oil, Prunus armeniaca kernel oil",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Grasse", "Mixte", "Sensible", "Normale"],
    timeOfDay: "both"
  },
  {
    id: "creme-fraiche-nettoyante",
    name: "Crème Fraîche",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/creme-fraiche-nettoyante",
    ingredients: "Aqua, Glycerin, Decyl Glucoside",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Sensible", "Normale"],
    timeOfDay: "both"
  },
  {
    id: "eau-micellaire",
    name: "Eau Micellaire",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/eau-micellaire",
    ingredients: "Aqua, Glycerin, Decyl Glucoside",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sensible", "Normale", "Mixte"],
    timeOfDay: "both"
  }
];