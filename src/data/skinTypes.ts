import { SkinType, SkinRecommendation } from "../types/skincare";
import { skinProducts } from "./products";

export const skinTypeRecommendations: Record<SkinType, SkinRecommendation> = {
  "Acnéique": {
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
  "Atonique": {
    products: [
      skinProducts.huileAbricot,
      skinProducts.huileJojoba,
      skinProducts.huileKukui,
      skinProducts.huileMoringa,
      skinProducts.huileNettoyante,
      skinProducts.exfopur,
      skinProducts.gelAloes,
      skinProducts.gelCoupEclat,
      skinProducts.mousselineKukui,
      skinProducts.kariteVanille
    ],
    morningRoutine: "1. Nettoyage avec Huile (Abricot/Jojoba/Kukui/Moringa/Nettoyante) → 2. Application de l'Eau Florale → 3. Hydratation avec Gel d'Aloès ou Gel Coup d'Éclat → 4. Protection avec Mousseline Kukui ou Karité Vanillé",
    eveningRoutine: "1. Nettoyage avec Huile → 2. Mélangez 2 pompes d'huile avec 1 noix d'Exfopur → 3. Application du Sérum choisi → 4. Protection avec Mousseline ou Karité",
    results: "Peau revitalisée et tonifiée 🌿"
  },
  "Sensible": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauRose,
      skinProducts.serumRose,
      skinProducts.cremeFraiche
    ],
    morningRoutine: "1. Nettoyage doux avec Huile Nettoyante → 2. Application de l'Eau de Rose → 3. Sérum Rose pour apaiser → 4. Hydratation avec Crème Fraîche",
    eveningRoutine: "1. Nettoyage doux avec Huile Nettoyante → 2. Application de l'Eau de Rose → 3. Sérum Rose → 4. Masque TYPE collagène avec Karité chaud",
    results: "Apaisement immédiat et réduction des irritations 🌼"
  },
  "Très sensible": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauRose,
      skinProducts.eauCamomille,
      skinProducts.serumRose,
      skinProducts.cremeFraiche,
      skinProducts.masqueApaisant
    ],
    morningRoutine: "1. Nettoyage très doux avec Huile Nettoyante → 2. Application de l'Eau de Rose/Camomille → 3. Sérum Rose → 4. Crème Fraîche",
    eveningRoutine: "1. Nettoyage très doux avec Huile Nettoyante → 2. Application de l'Eau de Rose/Camomille → 3. Sérum Rose → 4. Masque Apaisant (1x/semaine)",
    results: "Peau apaisée et protégée 🌸"
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
    eveningRoutine: "1. Nettoyage avec Huile Jojoba + Eau Florale → 2. Application de Mousseline Calendule/Kukui → 3. Nutrition avec Sérum Chanvre & Chrysanthème ou Huile Jojoba",
    results: "Rougeurs atténuées et teint unifié 🌺"
  },
  "Normale": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauMagnolia,
      skinProducts.cremeFraiche,
      skinProducts.serumImmortelle
    ],
    morningRoutine: "1. Nettoyage avec Huile Nettoyante → 2. Tonification avec Eau de Magnolia → 3. Application de Crème Fraîche → 4. Sérum Immortelle",
    eveningRoutine: "1. Nettoyage → 2. Hydratation → 3. Sérum nourrissant",
    results: "Peau équilibrée et confortable 🌸"
  },
  "Mixte": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauRomarin,
      skinProducts.gelSebo,
      skinProducts.serumRose
    ],
    morningRoutine: "1. Nettoyage doux → 2. Tonification → 3. Hydratation légère",
    eveningRoutine: "1. Double nettoyage → 2. Soin équilibrant → 3. Hydratation ciblée",
    results: "Peau équilibrée et unifiée 🌿"
  },
  "Grasse": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauOrange,
      skinProducts.gelSebo,
      skinProducts.serumChanvre
    ],
    morningRoutine: "1. Nettoyage purifiant → 2. Tonification astringente → 3. Hydratation légère",
    eveningRoutine: "1. Double nettoyage → 2. Soin séborégulateur → 3. Hydratation légère",
    results: "Peau matifiée et purifiée 🍃"
  },
  "Sèche": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauNeroli,
      skinProducts.lotusSacre,
      skinProducts.serumImmortelle
    ],
    morningRoutine: "1. Nettoyage doux → 2. Tonification nourrissante → 3. Hydratation riche",
    eveningRoutine: "1. Nettoyage → 2. Sérum nourrissant → 3. Crème riche",
    results: "Peau nourrie et confortable 🌺"
  },
  "Terne": {
    products: [
      skinProducts.huileNettoyante,
      skinProducts.eauOrange,
      skinProducts.gelCoupEclat,
      skinProducts.serumMagnolia
    ],
    morningRoutine: "1. Nettoyage exfoliant doux → 2. Tonification vivifiante → 3. Soin éclat",
    eveningRoutine: "1. Double nettoyage → 2. Sérum éclat → 3. Soin revitalisant",
    results: "Peau lumineuse et éclatante ✨"
  }
};
