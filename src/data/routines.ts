import { SkinType, SkinRecommendation } from "../types/skincare";
import { skinProducts } from "./products";

export const routineRecommendations: Record<SkinType, SkinRecommendation> = {
  "Sèche": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauNeroli,
      skinProducts.lotusSacre,
      skinProducts.serumImmortelle
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Application de l'Eau de Néroli enrichie → 3. Application de Lotus Sacré → 4. Sérum Immortelle pour sceller l'hydratation.",
    eveningRoutine: "Nettoyage avec l'Huile Nettoyante → Tonification avec Eau de Rose → Application de Sérum Magnolia → Masque TYPE collagène avec Karité chaud.",
    results: "Hydratation profonde et confort immédiat. 😊"
  },
  "Grasse": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauOrange,
      skinProducts.gelSebo,
      skinProducts.gelAloes
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Tonification avec Eau d'Orange → 3. Application de Gel Sébo → 4. Sérum Chanvre & Chrysanthème pour équilibrer.",
    eveningRoutine: "Double nettoyage avec Huile Nettoyante → Application de Gel Sébo → Masque Exfopur pour purifier → Sérum Huile Nettoyante pour régulation du sébum.",
    results: "Contrôle du sébum et réduction des imperfections. 🍊"
  },
  "Mixte": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauRomarin,
      skinProducts.gelSebo,
      skinProducts.serumRose
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Tonification avec Eau de Romarin → 3. Application de Gel Sébo → 4. Sérum Rose pour une hydratation équilibrée.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Gel Sébo → Sérum Rose → Masque Exfopur pour purifier les zones grasses.",
    results: "Peau équilibrée et éclatante. ✨"
  },
  "Sensible": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauRose,
      skinProducts.serumRose,
      skinProducts.cremeFraiche
    ],
    morningRoutine: "1. Nettoyage doux avec Huile Nettoyante → 2. Application de l'Eau de Rose → 3. Sérum Rose pour apaiser → 4. Hydratation avec Crème Fraîche.",
    eveningRoutine: "Nettoyage doux avec Huile Nettoyante → Application de l'Eau de Rose → Sérum Rose → Masque TYPE collagène avec Karité chaud pour apaiser.",
    results: "Apaisement immédiat et réduction des irritations. 🌼"
  },
  "Terne": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauOrange,
      skinProducts.gelCoupEclat,
      skinProducts.serumMagnolia
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Tonification avec Eau d'Orange → 3. Application de Gel Coup d'Éclat → 4. Sérum Magnolia pour une peau lumineuse.",
    eveningRoutine: "Double nettoyage avec Huile Nettoyante → Sérum Magnolia → Masque TYPE collagène avec Karité chaud pour un boost d'éclat.",
    results: "Peau lumineuse et revitalisée. ✨"
  },
  "Normale": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauMagnolia,
      skinProducts.cremeFraiche,
      skinProducts.serumImmortelle
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Tonification avec Eau de Magnolia → 3. Application de Crème Fraîche → 4. Sérum Immortelle pour préserver l'hydratation.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Sérum Immortelle → Masque TYPE collagène avec Karité chaud pour revitaliser.",
    results: "Peau équilibrée et naturellement éclatante. 😊"
  }
};