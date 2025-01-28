import { Product } from "../../types/skincare";

export const hydratants: Product[] = [
  {
    id: "creme-fraiche",
    name: "Crème Fraîche",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/creme-fraiche",
    ingredients: "Citrus sinensis (Orange) water, Simmondsia chinensis (Jojoba) seed oil, Cetearyl olivate (Olivate de cétéaryle) (et) Sorbitan olivate (Olivate de sorbitan), Butyrospermum parkii (Karité) butter, Mangifera indica (Mangue) seed butter, Vanillin (Vanilline), Glycerin (Glycérine végétale), Tocopherol (Vitamine E), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium).",
    texture: "Crémeuse",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Sensible", "Normale"],
    timeOfDay: "both"
  },
  {
    id: "gel-aloes",
    name: "Gel d'Aloès",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-d-aloes-pur-50-ml",
    ingredients: "Aqua (Eau distillée), Aloe barbadensis (Aloès) leaf juice, Xanthan gum (Gomme de xanthane), Glycerin (Glycérine), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium).",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Sensible", "Normale"],
    timeOfDay: "both"
  }
];