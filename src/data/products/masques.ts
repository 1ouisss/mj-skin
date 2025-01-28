import { Product } from "../../types/skincare";

export const masques: Product[] = [
  {
    id: "masque-purifiant",
    name: "Masque Purifiant",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-purifiant",
    ingredients: "Argile, Charbon actif...",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Acné"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "evening"
  },
  {
    id: "masque-collagene",
    name: "Masque TYPE collagène avec Karité chaud",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-collagene",
    ingredients: "Beurre de karité, Collagène marin, Huile d'argan",
    texture: "Riche",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Sensible"],
    timeOfDay: "evening"
  },
  {
    id: "masque-liftant",
    name: "Masque liftant au miel",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-liftant",
    ingredients: "Miel bio, Gelée royale, Propolis",
    texture: "Riche",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Sensible"],
    timeOfDay: "evening"
  },
  {
    id: "masque-hydratant",
    name: "Masque Hydratant",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-hydratant",
    ingredients: "Acide hyaluronique, Aloe vera",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening"
  }
];
