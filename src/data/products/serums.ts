import { Product } from "../../types/skincare";

export const serums: Product[] = [
  {
    id: "lotus-sacre",
    name: "Lotus Sacré",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/booster-d-hydratation-acide-hyaluronique-lotus-sacre",
    ingredients: "Citrus sinensis (Orange) water, Aloe barbadensis (Aloès) leaf juice, Glycerin (Glycérine végétale), Hyaluronic acid (Acide hyaluronique), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium), Xanthan gum (Gomme xanthane), Nelumbo nucifera (Lotus rose) flower extract, Santalum album (Bois de santal) wood oil.",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Normale", "Mixte"],
    timeOfDay: "both"
  },
  {
    id: "serum-immortelle",
    name: "Sérum Immortelle",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-immortelle-30-ml",
    ingredients: "Rosa canina (Rose musquée) fruit oil, Triticum vulgare/aestivum (Blé) extract oil, Hippophae rhamnoides (Argousier) CO2 extract, Tocopherol (Tocophérol), Tocotrienol (Tocotriénol), Rosmarinus officinalis (Romarin) CO2 leaf extract, Calendula officinalis (Calendule) CO2 extract, Helichrysum italicum (Immortelle) oil, Eucalyptus radiata (Eucalyptus radié) leaf oil.",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Rides"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening"
  }
];