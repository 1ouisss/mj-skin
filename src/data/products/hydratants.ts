import { Product } from "../../types/skincare";

export const hydratants: Product[] = [
  {
    id: "gel-aloes",
    name: "Gel d'Aloès",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-aloes",
    ingredients: "Aloe barbadensis leaf juice",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both"
  },
  {
    id: "gel-sebo",
    name: "Gel Sébo",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-sebo",
    ingredients: "Aloe barbadensis leaf juice, Salvia officinalis extract",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Acné"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both"
  },
  {
    id: "gel-coup-eclat",
    name: "Gel Coup d'éclat",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-coup-eclat",
    ingredients: "Aloe barbadensis leaf juice, Citrus extract",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Terne"],
    timeOfDay: "morning"
  },
  {
    id: "hydrogel",
    name: "Hydrogel",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/hydrogel",
    ingredients: "Aqua, Aloe barbadensis leaf juice",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both"
  },
  {
    id: "lotus-sacre",
    name: "Lotus Sacré",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/lotus-sacre",
    ingredients: "Nelumbo nucifera flower extract",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both"
  },
  {
    id: "sublimateur",
    name: "Sublimateur",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/sublimateur",
    ingredients: "Pearl powder, Natural extracts",
    texture: "Fluide",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Terne"],
    timeOfDay: "morning"
  },
  {
    id: "phytocomplexe",
    name: "Phytocomplexe",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/phytocomplexe",
    ingredients: "Plant extracts complex",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Rides"],
    skinTypes: ["Normale", "Sèche"],
    timeOfDay: "both"
  },
  {
    id: "fluide-tenseur-triphase",
    name: "Fluide tenseur Triphase",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/fluide-tenseur-triphase",
    ingredients: "Triple phase complex",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Rides"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both"
  }
];