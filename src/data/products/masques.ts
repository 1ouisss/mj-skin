import { Product } from "../../types/skincare";

export const masques: Product[] = [
  {
    id: "masque-purifiant",
    name: "Masque purifiant au charbon",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-purifiant",
    ingredients: "Charbon actif, Argile, Aloe vera",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte", "Sensible"],
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
    id: "masque-apaisant",
    name: "Masque TYPE apaisant",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-apaisant",
    ingredients: "Aloe vera, Camomille, Calendula, Eau florale de rose",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs", "Eczéma"],
    skinTypes: ["Sensible", "Sèche", "Mixte"],
    timeOfDay: "evening"
  }
];