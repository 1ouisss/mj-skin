export interface Product {
  name: string;
  url: string;
}

export interface SkinRecommendation {
  products: Product[];
  morningRoutine: string;
  eveningRoutine: string;
  results: string;
}

export type SkinType = "Sèche" | "Grasse" | "Mixte" | "Sensible" | "Terne" | "Normale";

const productUrls = {
  "Crème Fraîche": "https://maisonjacynthe.ca/en/creme-fraiche",
  "Eau de Néroli enrichie": "https://maisonjacynthe.ca/en/eau-de-neroli-enrichie",
  "Lotus Sacré": "https://maisonjacynthe.ca/en/lotus-sacre",
  "Sérum Immortelle": "https://maisonjacynthe.ca/en/serum-immortelle",
  "Huile Nettoyante": "https://maisonjacynthe.ca/en/huile-nettoyante",
  "Eau de Rose": "https://maisonjacynthe.ca/en/eau-de-rose",
  "Sérum Magnolia": "https://maisonjacynthe.ca/en/serum-magnolia",
  "Karité Vanillé": "https://maisonjacynthe.ca/en/karite-vanille",
  "Eau d'Orange": "https://maisonjacynthe.ca/en/eau-d-orange",
  "Gel Sébo": "https://maisonjacynthe.ca/en/gel-sebo",
  "Gel d'Aloès": "https://maisonjacynthe.ca/en/gel-d-aloes",
  "Masque Exfopur": "https://maisonjacynthe.ca/en/masque-exfopur",
  "Eau de Romarin": "https://maisonjacynthe.ca/en/eau-de-romarin",
  "Sérum Rose": "https://maisonjacynthe.ca/en/serum-rose",
  "Gel Coup d'Éclat": "https://maisonjacynthe.ca/en/gel-coup-d-eclat",
  "Eau de Magnolia": "https://maisonjacynthe.ca/en/eau-de-magnolia"
};

export const skinRecommendations: Record<SkinType, SkinRecommendation> = {
  "Sèche": {
    products: [
      { name: "Crème Fraîche", url: productUrls["Crème Fraîche"] },
      { name: "Eau de Néroli enrichie", url: productUrls["Eau de Néroli enrichie"] },
      { name: "Lotus Sacré", url: productUrls["Lotus Sacré"] },
      { name: "Sérum Immortelle", url: productUrls["Sérum Immortelle"] }
    ],
    morningRoutine: "Nettoyage avec Crème Fraîche → Application de l'Eau de Néroli enrichie → Application de Lotus Sacré → Sérum Immortelle pour sceller l'hydratation.",
    eveningRoutine: "Nettoyage avec l'Huile Nettoyante → Tonification avec Eau de Rose → Application de Sérum Magnolia → Masque Collagène avec Karité Vanillé.",
    results: "Hydratation profonde et confort immédiat. 😊"
  },
  "Grasse": {
    products: [
      { name: "Huile Nettoyante", url: productUrls["Huile Nettoyante"] },
      { name: "Eau d'Orange", url: productUrls["Eau d'Orange"] },
      { name: "Gel Sébo", url: productUrls["Gel Sébo"] },
      { name: "Gel d'Aloès", url: productUrls["Gel d'Aloès"] }
    ],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau d'Orange → Application de Gel Sébo → Hydratation avec Gel d'Aloès.",
    eveningRoutine: "Double nettoyage avec Huile Nettoyante → Application de Gel Sébo → Masque Exfopur pour purifier → Sérum Huile Nettoyante pour régulation du sébum.",
    results: "Contrôle du sébum et réduction des imperfections. 🍊"
  },
  "Mixte": {
    products: [
      { name: "Huile Nettoyante", url: productUrls["Huile Nettoyante"] },
      { name: "Eau de Romarin", url: productUrls["Eau de Romarin"] },
      { name: "Gel Sébo", url: productUrls["Gel Sébo"] },
      { name: "Sérum Rose", url: productUrls["Sérum Rose"] }
    ],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau de Romarin → Application de Gel Sébo → Sérum Rose pour une hydratation équilibrée.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Gel Sébo → Sérum Rose → Masque Exfopur pour purifier les zones grasses.",
    results: "Peau équilibrée et éclatante. ✨"
  },
  "Sensible": {
    products: [
      { name: "Huile Nettoyante", url: productUrls["Huile Nettoyante"] },
      { name: "Eau de Rose", url: productUrls["Eau de Rose"] },
      { name: "Sérum Rose", url: productUrls["Sérum Rose"] },
      { name: "Crème Fraîche", url: productUrls["Crème Fraîche"] }
    ],
    morningRoutine: "Nettoyage doux avec Huile Nettoyante → Application de l'Eau de Rose → Sérum Rose pour apaiser → Hydratation avec Crème Fraîche.",
    eveningRoutine: "Nettoyage doux avec Huile Nettoyante → Application de l'Eau de Rose → Sérum Rose → Masque apaisant pour calmer les rougeurs.",
    results: "Apaisement immédiat et réduction des irritations. 🌼"
  },
  "Terne": {
    products: [
      { name: "Huile Nettoyante", url: productUrls["Huile Nettoyante"] },
      { name: "Eau d'Orange", url: productUrls["Eau d'Orange"] },
      { name: "Gel Coup d'Éclat", url: productUrls["Gel Coup d'Éclat"] },
      { name: "Sérum Magnolia", url: productUrls["Sérum Magnolia"] }
    ],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau d'Orange → Application de Gel Coup d'Éclat → Sérum Magnolia pour une peau lumineuse.",
    eveningRoutine: "Double nettoyage avec Huile Nettoyante → Sérum Magnolia → Masque éclaircissant pour un boost d'éclat.",
    results: "Peau lumineuse et revitalisée. ✨"
  },
  "Normale": {
    products: [
      { name: "Huile Nettoyante", url: productUrls["Huile Nettoyante"] },
      { name: "Eau de Magnolia", url: productUrls["Eau de Magnolia"] },
      { name: "Crème Fraîche", url: productUrls["Crème Fraîche"] },
      { name: "Sérum Immortelle", url: productUrls["Sérum Immortelle"] }
    ],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau de Magnolia → Application de Crème Fraîche → Sérum Immortelle pour préserver l'hydratation.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Sérum Immortelle → Masque Collagène pour revitaliser.",
    results: "Peau équilibrée et naturellement éclatante. 😊"
  }
};