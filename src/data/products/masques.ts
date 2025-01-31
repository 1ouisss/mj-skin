import { Product } from "../../types/skincare";

export const masques: Product[] = [
  {
    id: "karite-vanille-masque",
    name: "Karité vanillé en masque de type collagène",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/karite-vanille-masque",
    ingredients: "Butyrospermum parkii butter, Vanilla planifolia extract",
    texture: "Riche",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche"],
    timeOfDay: "evening"
  },
  {
    id: "masque-eclaircissant",
    name: "Masque éclaircissant",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-eclaircissant",
    ingredients: "Vitamin C, Pearl powder",
    texture: "Crémeuse",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Taches"],
    skinTypes: ["Terne"],
    timeOfDay: "evening"
  },
  {
    id: "masque-chocolat",
    name: "Masque au Chocolat",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-chocolat",
    ingredients: "Theobroma cacao powder",
    texture: "Crémeuse",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening"
  },
  {
    id: "masque-miel-cardamome",
    name: "Masque Miel Cardamome",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-miel-cardamome",
    ingredients: "Honey, Elettaria cardamomum seed extract",
    texture: "Riche",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening"
  },
  {
    id: "masque-miel-rose",
    name: "Masque Miel Rose de Bulgarie",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-miel-rose",
    ingredients: "Honey, Rosa damascena flower extract",
    texture: "Riche",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Sensible"],
    timeOfDay: "evening"
  }
];