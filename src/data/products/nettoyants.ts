import { Product } from "../../types/skincare";

export const nettoyants: Product[] = [
  {
    id: "huile-nettoyante",
    name: "Huile Nettoyante",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
    ingredients: "Simmondsia chinensis (Jojoba) seed oil, Prunus armeniaca kernel (Abricot) oil, Hippophae rhamnoides (Argousier) oil, Pelargonium x asperum (Géranium bourbon) leaf oil, Cananga odorata (Ylang-ylang) flower oil, Santalum album (Bois de santal) oil.",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Grasse", "Mixte", "Sensible", "Normale"],
    timeOfDay: "both"
  },
  {
    id: "eau-micellaire",
    name: "Eau Micellaire",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/eau-micellaire",
    ingredients: "Aqua, Glycerin, Decyl Glucoside, Aloe Barbadensis Leaf Juice, Chamomilla Recutita Flower Extract",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sensible", "Normale", "Mixte"],
    timeOfDay: "both"
  }
];