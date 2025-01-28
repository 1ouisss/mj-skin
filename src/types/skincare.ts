export type SkinType = "Sèche" | "Grasse" | "Mixte" | "Sensible" | "Terne" | "Normale";
export type SkinCondition = "Acné" | "Eczéma" | "Rougeurs" | "Cernes" | "Rides" | "Taches" | "Aucune";
export type RoutineDuration = "< 5 minutes" | "5-10 minutes" | "> 10 minutes";
export type TexturePreference = "Légère" | "Fluide" | "Crémeuse" | "Riche";

export interface Product {
  name: string;
  url: string;
  ingredients: string;
  texture?: "légère" | "fluide" | "crémeuse" | "riche";
  duration?: "rapide" | "standard";
  hasEssentialOils?: boolean;
}

export interface SkinRecommendation {
  products: Product[];
  morningRoutine: string;
  eveningRoutine: string;
  results: string;
}