import { SkinType, SkinRecommendation } from "../types/skincare";
import { skinProducts } from "./products";

export const routineRecommendations: Record<SkinType, SkinRecommendation> = {
  "Sèche": {
    products: [
      skinProducts.cremeFraiche,
      skinProducts.eauNeroli,
      skinProducts.lotusSacre,
      skinProducts.serumImmortelle
    ],
    morningRoutine: "Nettoyage avec Crème Fraîche → Application de l'Eau de Néroli enrichie → Application de Lotus Sacré → Sérum Immortelle pour sceller l'hydratation.",
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
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau d'Orange → Application de Gel Sébo → Hydratation avec Gel d'Aloès.",
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
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau de Romarin → Application de Gel Sébo → Sérum Rose pour une hydratation équilibrée.",
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
    morningRoutine: "Nettoyage doux avec Huile Nettoyante → Application de l'Eau de Rose → Sérum Rose pour apaiser → Hydratation avec Crème Fraîche.",
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
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau d'Orange → Application de Gel Coup d'Éclat → Sérum Magnolia pour une peau lumineuse.",
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
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau de Magnolia → Application de Crème Fraîche → Sérum Immortelle pour préserver l'hydratation.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Sérum Immortelle → Masque TYPE collagène avec Karité chaud pour revitaliser.",
    results: "Peau équilibrée et naturellement éclatante. 😊"
  }
};