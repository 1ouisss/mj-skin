
import { SkinType, SkinRecommendation } from "../types/skincare";
import { skinProducts } from "./products";

export const routineRecommendations: Record<SkinType | "Acné", SkinRecommendation> = {
  "Asphyxiée": {
    products: [
      skinProducts.huileAbricot,
      skinProducts.huileJojoba,
      skinProducts.huileTamanu,
      skinProducts.huileNettoyante,
      skinProducts.exfopur,
      skinProducts.gelAloes,
      skinProducts.gelCoupEclat,
      skinProducts.mousselineKukui,
      skinProducts.mousselineTamanu
    ],
    morningRoutine: "1. Nettoyage avec Huile (Abricot/Jojoba/Tamanu/Nettoyante) → 2. Application de l'Eau Florale → 3. Hydratation avec Gel d'Aloès ou Gel Coup d'Éclat → 4. Protection avec Mousseline Kukui ou Tamanu",
    eveningRoutine: "1. Nettoyage avec Huile → 2. Masque Exfopur avec Eau Florale → 3. Application du Sérum choisi → 4. Protection avec Mousseline",
    results: "Peau décongestionnée et oxygénée 🌿"
  },
  "Acné": {
    products: [
      skinProducts.huileJojoba,
      skinProducts.gelAloes,
      skinProducts.eauNeroli,
      skinProducts.exfopur,
      skinProducts.gelSebo,
      skinProducts.dermopurAcne,
      skinProducts.huileTamanu,
      skinProducts.mousselineKukui
    ],
    morningRoutine: "1. Nettoyage avec Huile Jojoba et Gel d'Aloès → 2. Application de l'Eau de Néroli → 3. Gel Sébo + Dermopur Acné → 4. Protection avec Mousseline Kukui",
    eveningRoutine: "1. Nettoyage avec Huile Jojoba → 2. Masque Exfopur avec Eau Florale → 3. Application de l'Huile de Tamanu → 4. Protection avec Mousseline Kukui",
    results: "Peau purifiée et équilibrée 🌿"
  },
  "Sèche": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauNeroli,
      skinProducts.lotusSacre,
      skinProducts.serumImmortelle
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Application de l'Eau de Néroli enrichie → 3. Application de Lotus Sacré → 4. Sérum Immortelle pour sceller l'hydratation.",
    eveningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Application de l'Eau de Néroli → 3. Sérum Immortelle → 4. Masque TYPE collagène avec Karité chaud.",
    results: "Hydratation profonde et confort immédiat. 😊"
  },
  "Grasse": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauOrange,
      skinProducts.gelSebo,
      skinProducts.serumChanvre
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Tonification avec Eau d'Orange → 3. Application de Gel Sébo → 4. Sérum Chanvre & Chrysanthème pour équilibrer.",
    eveningRoutine: "1. Double nettoyage avec Huile Nettoyante → 2. Application de Gel Sébo → 3. Masque Exfopur → 4. Sérum Chanvre & Chrysanthème pour régulation.",
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
    eveningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Application de Gel Sébo → 3. Sérum Rose → 4. Masque Exfopur pour purifier les zones grasses.",
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
    eveningRoutine: "1. Nettoyage doux avec Huile Nettoyante → 2. Application de l'Eau de Rose → 3. Sérum Rose → 4. Masque TYPE collagène avec Karité chaud.",
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
    eveningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Application de Gel Coup d'Éclat → 3. Sérum Magnolia → 4. Masque TYPE collagène avec Karité chaud.",
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
    eveningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Sérum Immortelle → 3. Masque TYPE collagène avec Karité chaud → 4. Application de Crème Fraîche.",
    results: "Peau équilibrée et naturellement éclatante. 😊"
  }
};
