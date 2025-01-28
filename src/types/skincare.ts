export type SkinType = "Sèche" | "Grasse" | "Mixte" | "Sensible" | "Terne" | "Normale";
export type SkinCondition = "Acné" | "Eczéma" | "Rougeurs" | "Cernes" | "Rides" | "Taches" | "Aucune";
export type RoutineDuration = "< 5 minutes" | "5-10 minutes" | "> 10 minutes";
export type TexturePreference = "Légère" | "Fluide" | "Crémeuse" | "Riche";
export type ProductType = "Hydratant" | "Sérum" | "Masque" | "Nettoyant" | "Tonique" | "Traitement";
export type TimeOfDay = "morning" | "evening" | "both";

export interface Product {
  id: string;
  name: string;
  url: string;
  type: ProductType;
  ingredients: string;
  texture: TexturePreference;
  duration: RoutineDuration;
  hasEssentialOils: boolean;
  conditions: SkinCondition[];
  skinTypes: SkinType[];
  timeOfDay: TimeOfDay;
}

export interface SkinRecommendation {
  products: Product[];
  morningRoutine: string;
  eveningRoutine: string;
  results?: string;
}