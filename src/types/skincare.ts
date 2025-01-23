
import { z } from "zod";

export type SkinType = 'Sèche' | 'Grasse' | 'Mixte' | 'Sensible' | 'Terne' | 'Normale';
export type Condition = 'Acné' | 'Eczéma' | 'Aucune';
export type Concern = 
  | 'Rides' 
  | 'Rougeurs' 
  | 'Points noirs' 
  | 'Cernes' 
  | 'Taches pigmentaires'
  | 'Boutons' 
  | 'Imperfections' 
  | 'Pores dilatés' 
  | 'Perte de fermeté';
export type TexturePreference = 'Légère' | 'Fluide' | 'Crémeuse' | 'Riche';
export type ScentPreference = 'Avec parfum naturel' | 'Sans huiles essentielles';

export interface QuizAnswers {
  skinType: SkinType;
  conditions: Condition;
  concerns: Concern[];
  texturePreference: TexturePreference;
  scentPreference: ScentPreference;
  newsletter?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  usage?: string;
  ingredients?: string[];
  benefits?: string[];
  price?: number;
}

export interface Routine {
  Matin: string[];
  Soir: string[];
  Résultat: string;
}

export interface RecommendationResult {
  Products: Product[];
  Routine: Routine;
}

export const QuizAnswersSchema = z.object({
  skinType: z.enum(['Sèche', 'Grasse', 'Mixte', 'Sensible', 'Terne', 'Normale']),
  conditions: z.enum(['Acné', 'Eczéma', 'Aucune']),
  concerns: z.array(z.enum([
    'Rides', 'Rougeurs', 'Points noirs', 'Cernes', 'Taches pigmentaires',
    'Boutons', 'Imperfections', 'Pores dilatés', 'Perte de fermeté'
  ])),
  texturePreference: z.enum(['Légère', 'Fluide', 'Crémeuse', 'Riche']),
  scentPreference: z.enum(['Avec parfum naturel', 'Sans huiles essentielles']),
  newsletter: z.string().optional()
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  usage: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  price: z.number().optional()
});

export const RoutineSchema = z.object({
  Matin: z.array(z.string()),
  Soir: z.array(z.string()),
  Résultat: z.string()
});

export const RecommendationResultSchema = z.object({
  Products: z.array(ProductSchema),
  Routine: RoutineSchema
});
