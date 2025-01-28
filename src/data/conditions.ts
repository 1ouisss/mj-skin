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
      skinProducts.huileJojoba,
      skinProducts.cremeApaisante
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
  "Cernes": {
    products: [
      skinProducts.masqueCollagene,
      skinProducts.soinJeunesse
    ],
    morningRoutine: "Application délicate du Soin jeunesse contour des yeux",
    eveningRoutine: "Application du Masque collagène (2x/semaine) → Soin jeunesse contour des yeux"
  },
  "Rides": {
    products: [
      skinProducts.cremeLotus,
      skinProducts.masqueLiftant,
      skinProducts.triphase,
      skinProducts.phytocomplexe
    ],
    morningRoutine: "Application de Crème Lotus → Triphase",
    eveningRoutine: "Application de Phytocomplexe → Masque liftant (2x/semaine)"
  },
  "Taches": {
    products: [
      skinProducts.serumEclat,
      skinProducts.gelClarifiant
    ],
    morningRoutine: "Application du Sérum éclat → Protection solaire",
    eveningRoutine: "Application du Gel clarifiant → Sérum éclat"
  },
  "Aucune": {
    products: [],
    morningRoutine: "Suivre les recommandations selon votre type de peau",
    eveningRoutine: "Suivre les recommandations selon votre type de peau"
  }
};