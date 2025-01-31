import { Product } from "../../types/skincare";

export const baumes: Product[] = [
  {
    id: "mousseline-kukui",
    name: "Mousseline Kukui",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/mousseline-kukui",
    ingredients: "Aleurites moluccana seed oil",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Mixte", "Normale"],
    timeOfDay: "both"
  },
  {
    id: "creme-magnolia",
    name: "Crème Magnolia",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/creme-magnolia",
    ingredients: "Magnolia grandiflora extract",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Terne"],
    timeOfDay: "both"
  },
  {
    id: "hydra-teint",
    name: "Hydra teint",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/hydra-teint",
    ingredients: "Mineral pigments, Hydrating complex",
    texture: "Fluide",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Sèche"],
    timeOfDay: "morning"
  }
];