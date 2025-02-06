import { Product } from "../../types/skincare";

export const hydratants: Product[] = [
  {
    id: "gel-aloes",
    name: "Gel d'Aloès",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-aloes",
    description: "L'aloès vera est un merveilleux outil pour équilibrer ou maintenir le pH de la peau",
    ingredients: "Aloe barbadensis leaf juice",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Équilibre le pH", "Adoucit la peau", "Raffermit la peau"]
  },
  {
    id: "gel-sebo",
    name: "Gel Sébo",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-sebo",
    description: "Gel spécialement conçu pour les peaux à tendance acnéique",
    ingredients: "Aloe barbadensis leaf juice, Salvia officinalis extract",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Acné"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Régule le sébum", "Purifie la peau", "Action antibactérienne"]
  },
  {
    id: "gel-coup-eclat",
    name: "Gel Coup d'éclat",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-coup-eclat",
    description: "Gel pour un effet coup d'éclat immédiat",
    ingredients: "Aloe barbadensis leaf juice, Citrus extract",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Terne"],
    timeOfDay: "morning",
    image: "/placeholder.svg",
    benefits: ["Illumine le teint", "Revitalise", "Hydrate"]
  },
  {
    id: "hydrogel",
    name: "Hydrogel",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/hydrogel",
    description: "Hydrogel pour une hydratation légère et fraîche",
    ingredients: "Aqua, Aloe barbadensis leaf juice",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Hydrate", "Rafraîchit", "Non gras"]
  },
  {
    id: "lotus-sacre",
    name: "Lotus Sacré",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/lotus-sacre",
    description: "Crème au lotus sacré pour une peau douce et hydratée",
    ingredients: "Nelumbo nucifera flower extract",
    format: "50 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Adoucit", "Hydrate", "Protège"]
  },
  {
    id: "sublimateur",
    name: "Sublimateur",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/sublimateur",
    description: "Fluide sublimateur pour un teint parfait",
    ingredients: "Pearl powder, Natural extracts",
    format: "30 ml",
    texture: "Fluide",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Terne"],
    timeOfDay: "morning",
    image: "/placeholder.svg",
    benefits: ["Sublime", "Illumine", "Unifie"]
  },
  {
    id: "phytocomplexe",
    name: "Phytocomplexe",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/phytocomplexe",
    description: "Complexe phyto-actif pour une peau revitalisée",
    ingredients: "Plant extracts complex",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Rides"],
    skinTypes: ["Normale", "Sèche"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Revitalise", "Raffermit", "Protège"]
  },
  {
    id: "fluide-tenseur-triphase",
    name: "Fluide tenseur Triphase",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/fluide-tenseur-triphase",
    description: "Fluide tenseur triphasé pour une peau liftée",
    ingredients: "Triple phase complex",
    format: "30 ml",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Rides"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Tenseur", "Lissant", "Raffermissant"]
  }
];
