import { SkinCondition, SkinRecommendation } from "../types/skincare";
import { skinProducts } from "./products";

export const conditionRecommendations: Record<SkinCondition, Partial<SkinRecommendation>> = {
  "Acné": {
    products: [
      skinProducts.exfopur,
      skinProducts.gelSebo,
      skinProducts.masquePurifiant,
      skinProducts.hydrogelRafraichissant
    ],
    morningRoutine: "Nettoyage doux → Application de Gel Sébo → Protection solaire non comédogène",
    eveningRoutine: "Double nettoyage → Application d'Exfopur → Hydratant léger non comédogène"
  },
  "Eczéma": {
    products: [
      skinProducts.baumeApaisant,
      skinProducts.huileJojoba
    ],
    morningRoutine: "Nettoyage très doux → Application de Baume Apaisant → Protection",
    eveningRoutine: "Nettoyage doux → Application d'Huile de Jojoba → Baume Apaisant"
  },
  "Rougeurs": {
    products: [
      skinProducts.eauRose,
      skinProducts.serumRose,
      skinProducts.cremeApaisante,
      skinProducts.huileKukui
    ],
    morningRoutine: "Nettoyage doux → Eau de Rose → Sérum Rose → Crème Apaisante",
    eveningRoutine: "Nettoyage doux → Eau de Rose → Sérum Rose → Masque apaisant (2x/semaine)"
  },
  "Aucune": {
    products: [],
    morningRoutine: "Suivre les recommandations selon votre type de peau",
    eveningRoutine: "Suivre les recommandations selon votre type de peau"
  }
};
