import { Product } from "../../types/skincare";

export const toniques: Product[] = [
  {
    id: "eau-neroli",
    name: "Eau de Néroli enrichie",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-de-neroli-enrichie",
    ingredients: "Citrus sinensis (Orange) water, Glycerin (Glycérine végétale), Citrus aurantium var amara (Néroli) flower oil, Citrus aurantium (Petit grain) leaf/twig oil.",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: true,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "morning"
  },
  {
    id: "eau-orange",
    name: "Eau d'Orange",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-florale-d-orange",
    ingredients: "Eau d'orange (Citrus sinensis).",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Grasse", "Mixte", "Sensible", "Normale"],
    timeOfDay: "morning"
  },
  {
    id: "eau-rose",
    name: "Eau de Rose",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-de-rose",
    ingredients: "Rosa damascena flower water",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs", "Eczéma"],
    skinTypes: ["Sensible", "Sèche"],
    timeOfDay: "both"
  },
  {
    id: "eau-magnolia",
    name: "Eau de Magnolia",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-de-magnolia",
    ingredients: "Magnolia grandiflora flower water",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both"
  },
  {
    id: "eau-helichryse",
    name: "Eau d'Hélichryse",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-helichryse",
    ingredients: "Helichrysum italicum flower water",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs"],
    skinTypes: ["Sensible"],
    timeOfDay: "both"
  },
  {
    id: "eau-camomille",
    name: "Eau de Camomille romaine",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-camomille",
    ingredients: "Chamaemelum nobile flower water",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs", "Eczéma"],
    skinTypes: ["Sensible"],
    timeOfDay: "both"
  }
];