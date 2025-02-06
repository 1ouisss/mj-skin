
import { SkinCondition, SkinRecommendation } from "../types/skincare";
import { skinProducts } from "./products";

export const conditionRecommendations: Record<SkinCondition, Partial<SkinRecommendation>> = {
  "Peau mixte": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauRomarin,
      skinProducts.gelSebo,
      skinProducts.serumRose
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Tonification avec Eau de Romarin → 3. Application de Gel Sébo → 4. Sérum Rose pour une hydratation équilibrée.",
    eveningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Application de Gel Sébo → 3. Sérum Rose → 4. Masque Exfopur pour purifier les zones grasses."
  },
  "Peau grasse": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauOrange,
      skinProducts.gelSebo,
      skinProducts.serumChanvre
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Tonification avec Eau d'Orange → 3. Application de Gel Sébo → 4. Sérum Chanvre & Chrysanthème pour équilibrer.",
    eveningRoutine: "1. Double nettoyage avec Huile Nettoyante → 2. Application de Gel Sébo → 3. Masque Exfopur → 4. Sérum Chanvre & Chrysanthème pour régulation."
  },
  "Déshydratation": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauNeroli,
      skinProducts.lotusSacre,
      skinProducts.serumImmortelle
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Application de l'Eau de Néroli enrichie → 3. Application de Lotus Sacré → 4. Sérum Immortelle pour sceller l'hydratation.",
    eveningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Application de l'Eau de Néroli → 3. Sérum Immortelle → 4. Masque TYPE collagène avec Karité chaud."
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
  "Aucune": {
    products: [],
    morningRoutine: "Suivre les recommandations selon votre type de peau",
    eveningRoutine: "Suivre les recommandations selon votre type de peau"
  }
};
