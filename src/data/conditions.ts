
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
      skinProducts.cremeApaisante,
      skinProducts.masqueApaisant
    ],
    morningRoutine: "Nettoyage très doux → Application de Baume Apaisant → Protection",
    eveningRoutine: "Nettoyage doux → Application d'Huile de Jojoba → Baume Apaisant"
  },
  "Rougeurs": {
    products: [
      skinProducts.huileJojoba,
      skinProducts.eauCamomille,
      skinProducts.eauRose,
      skinProducts.eauNeroli,
      skinProducts.mousselineCalendule,
      skinProducts.mousselineKukui,
      skinProducts.gelApaisant,
      skinProducts.serumChanvre
    ],
    morningRoutine: "1. Nettoyage avec Eau Florale + Jojoba → 2. Application d'Eau Florale (Camomille/Rose/Néroli) → 3. Hydratation (Eau Florale Camomille ou Gel Apaisant) → 4. Protection (Mousseline Calendule)",
    eveningRoutine: "1. Nettoyage avec Huile Jojoba + Eau Florale → 2. Application de Mousseline Calendule/Kukui → 3. Nutrition avec Sérum Chanvre & Chrysanthème ou Huile Jojoba"
  },
  "Boutons": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.huileTamanu,
      skinProducts.exfopur,
      skinProducts.gelSebo
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante/Tamanu → 2. Application d'Eau Florale → 3. Hydratation avec Gel Sébo",
    eveningRoutine: "1. Nettoyage avec Exfopur + Huile + Eau Florale → 2. Nutrition avec Huile Nettoyante/Tamanu"
  },
  "Cernes": {
    products: [
      skinProducts.masqueCollagene,
      skinProducts.soinJeunesse
    ],
    morningRoutine: "Application délicate du Soin jeunesse contour des yeux",
    eveningRoutine: "Application du Masque TYPE collagène (2x/semaine) → Soin jeunesse contour des yeux"
  },
  "Rides": {
    products: [
      skinProducts.cremeLotus,
      skinProducts.masqueLiftant,
      skinProducts.triphase,
      skinProducts.phytocomplexe
    ],
    morningRoutine: "Application de Crème Lotus → Triphase",
    eveningRoutine: "Application de Phytocomplexe → Masque TYPE liftant (2x/semaine)"
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
