export interface SkinRecommendation {
  products: string[];
  morningRoutine: string;
  eveningRoutine: string;
  results: string;
}

export type SkinType = "Sèche" | "Grasse" | "Mixte" | "Sensible" | "Terne" | "Normale";

export const skinRecommendations: Record<SkinType, SkinRecommendation> = {
  "Sèche": {
    products: ["Crème Fraîche", "Eau de Néroli enrichie", "Lotus Sacré", "Sérum Immortelle"],
    morningRoutine: "Nettoyage avec Crème Fraîche → Application de l'Eau de Néroli enrichie → Application de Lotus Sacré → Sérum Immortelle pour sceller l'hydratation.",
    eveningRoutine: "Nettoyage avec l'Huile Nettoyante → Tonification avec Eau de Rose → Application de Sérum Magnolia → Masque Collagène avec Karité Vanillé.",
    results: "Hydratation profonde et confort immédiat. 😊"
  },
  "Grasse": {
    products: ["Huile Nettoyante", "Eau d'Orange", "Gel Sébo", "Gel d'Aloès"],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau d'Orange → Application de Gel Sébo → Hydratation avec Gel d'Aloès.",
    eveningRoutine: "Double nettoyage avec Huile Nettoyante → Application de Gel Sébo → Masque Exfopur pour purifier → Sérum Huile Nettoyante pour régulation du sébum.",
    results: "Contrôle du sébum et réduction des imperfections. 🍊"
  },
  "Mixte": {
    products: ["Huile Nettoyante", "Eau de Romarin", "Gel Sébo", "Sérum Rose"],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau de Romarin → Application de Gel Sébo → Sérum Rose pour une hydratation équilibrée.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Gel Sébo → Sérum Rose → Masque Exfopur pour purifier les zones grasses.",
    results: "Peau équilibrée et éclatante. ✨"
  },
  "Sensible": {
    products: ["Huile Nettoyante", "Eau de Rose", "Sérum Rose", "Crème Fraîche"],
    morningRoutine: "Nettoyage doux avec Huile Nettoyante → Application de l'Eau de Rose → Sérum Rose pour apaiser → Hydratation avec Crème Fraîche.",
    eveningRoutine: "Nettoyage doux avec Huile Nettoyante → Application de l'Eau de Rose → Sérum Rose → Masque apaisant pour calmer les rougeurs.",
    results: "Apaisement immédiat et réduction des irritations. 🌼"
  },
  "Terne": {
    products: ["Huile Nettoyante", "Eau d'Orange", "Gel Coup d'Éclat", "Sérum Magnolia"],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau d'Orange → Application de Gel Coup d'Éclat → Sérum Magnolia pour une peau lumineuse.",
    eveningRoutine: "Double nettoyage avec Huile Nettoyante → Sérum Magnolia → Masque éclaircissant pour un boost d'éclat.",
    results: "Peau lumineuse et revitalisée. ✨"
  },
  "Normale": {
    products: ["Huile Nettoyante", "Eau de Magnolia", "Crème Fraîche", "Sérum Immortelle"],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau de Magnolia → Application de Crème Fraîche → Sérum Immortelle pour préserver l'hydratation.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Sérum Immortelle → Masque Collagène pour revitaliser.",
    results: "Peau équilibrée et naturellement éclatante. 😊"
  }
};