
export type SkinType = 
  | "Acnéique"
  | "Asphyxiée"
  | "Atonique"
  | "Sensible"
  | "Très sensible"
  | "Rougeurs"
  | "Normale"
  | "Mixte"
  | "Grasse"
  | "Sèche"
  | "Terne";

export type SkinCondition = 
  | "Boutons" 
  | "Peau mixte" 
  | "Peau grasse" 
  | "Déshydratation"
  | "Acné"
  | "Rides"
  | "Taches"
  | "Eczéma"
  | "Cernes"
  | "Rougeurs"
  | "Aucune";

export type RoutineDuration = "< 5 minutes" | "5-10 minutes" | "> 10 minutes";
export type TexturePreference = "Légère" | "Fluide" | "Crémeuse" | "Riche" | "Huile légère";
export type ProductType = "Hydratant" | "Sérum" | "Masque" | "Nettoyant" | "Tonique" | "Traitement";
export type TimeOfDay = "morning" | "evening" | "both";

export interface Product {
  id: string;
  name: string;
  url: string;
  type: ProductType;
  description: string;
  ingredients: string;
  texture: TexturePreference;
  duration: RoutineDuration;
  hasEssentialOils: boolean;
  conditions: SkinCondition[];
  skinTypes: SkinType[];
  timeOfDay: TimeOfDay;
  format: string;
  image: string;
  benefits: string[];
}

export interface SkinRecommendation {
  products: Product[];
  morningRoutine: string;
  eveningRoutine: string;
  results?: string;
}
