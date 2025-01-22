
import { SkinType, Condition, Concern, TexturePreference, ScentPreference } from './skincare';

export interface QuizAnswers {
  skinType: SkinType;
  conditions: Condition;
  concerns: Concern;
  texturePreference: TexturePreference | '';
  scentPreference: ScentPreference | '';
  newsletter?: string;
}

export interface Product {
  name: string;
  description?: string;
  usage?: string;
}

export interface Routine {
  Matin: string[];
  Soir: string[];
  Résultat: string;
}

export interface RecommendationResult {
  Products: string[];
  Routine: Routine;
  error?: string;
}

export type SkinType = 'Sèche' | 'Grasse' | 'Mixte' | 'Sensible' | 'Terne' | 'Normale';
export type Condition = 'Acné' | 'Eczéma' | 'Aucune';
export type Concern = 'Rides' | 'Rougeurs' | 'Points noirs' | 'Cernes' | 'Taches pigmentaires' | 
                     'Boutons' | 'Imperfections' | 'Pores dilatés' | 'Perte de fermeté';
export type TexturePreference = 'Légère' | 'Fluide' | 'Crémeuse' | 'Riche';
export type ScentPreference = 'Avec parfum naturel' | 'Sans huiles essentielles';
