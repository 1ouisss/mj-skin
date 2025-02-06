
import { Product } from "../../types/skincare";

export const baumes: Product[] = [
  {
    id: "mousseline-kukui",
    name: "Mousseline Kukui",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/mousseline-kukui",
    description: "Une mousseline légère et hydratante à base d'huile de kukui",
    ingredients: "Aleurites moluccana seed oil",
    format: "50 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Mixte", "Normale"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: [
      "Hydratation profonde",
      "Texture légère",
      "Apaise la peau"
    ]
  },
  {
    id: "creme-magnolia",
    name: "Crème Magnolia",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/creme-magnolia",
    description: "Une crème riche et nourrissante au magnolia",
    ingredients: "Magnolia grandiflora extract",
    format: "50 ml",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Terne"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: [
      "Nourrit intensément",
      "Redonne de l'éclat",
      "Protège la peau"
    ]
  },
  {
    id: "hydra-teint",
    name: "Hydra teint",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/hydra-teint",
    description: "Un soin hydratant teinté pour un effet naturel",
    ingredients: "Mineral pigments, Hydrating complex",
    format: "30 ml",
    texture: "Fluide",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Sèche"],
    timeOfDay: "morning",
    image: "/placeholder.svg",
    benefits: [
      "Hydrate la peau",
      "Unifie le teint",
      "Effet naturel"
    ]
  }
];
