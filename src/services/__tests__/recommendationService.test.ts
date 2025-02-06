
import { describe, it, expect } from 'vitest';
import { getFilteredRecommendations } from '../recommendationService';
import { generateRoutine } from '../../data/skinRoutines';
import { skinProducts } from '../../data/products';
import { SkinType, SkinCondition } from '../../types/skincare';

describe('Recommendation Service', () => {
  // Test pour les types de peau
  describe('Skin Type Recommendations', () => {
    const skinTypes: SkinType[] = [
      "Acnéique",
      "Asphyxiée",
      "Atonique",
      "Sensible",
      "Très sensible",
      "Rougeurs",
      "Normale",
      "Mixte",
      "Grasse",
      "Sèche",
      "Terne"
    ];

    skinTypes.forEach(skinType => {
      it(`should generate valid recommendations for ${skinType} skin type`, () => {
        const recommendations = getFilteredRecommendations({
          skinType,
          conditions: ["Aucune"]
        });

        expect(recommendations).toBeDefined();
        expect(Array.isArray(recommendations)).toBe(true);
        expect(recommendations.length).toBeGreaterThan(0);

        // Vérifie que chaque produit recommandé est compatible avec le type de peau
        recommendations.forEach(product => {
          expect(product.skinTypes).toContain(skinType);
        });
      });
    });
  });

  // Test pour les conditions spécifiques
  describe('Skin Condition Recommendations', () => {
    const conditions: SkinCondition[] = [
      "Boutons",
      "Peau mixte",
      "Peau grasse",
      "Déshydratation",
      "Acné",
      "Rides",
      "Taches",
      "Eczéma",
      "Cernes",
      "Rougeurs",
      "Aucune"
    ];

    conditions.forEach(condition => {
      it(`should generate valid recommendations for condition: ${condition}`, () => {
        const recommendations = getFilteredRecommendations({
          skinType: "Normale",
          conditions: [condition]
        });

        expect(recommendations).toBeDefined();
        expect(Array.isArray(recommendations)).toBe(true);

        if (condition !== "Aucune") {
          const hasConditionProducts = recommendations.some(product => 
            product.conditions.includes(condition)
          );
          expect(hasConditionProducts).toBe(true);
        }
      });
    });
  });

  // Test pour la génération de routine
  describe('Routine Generation', () => {
    it('should generate complete routine for acneic skin', () => {
      const routine = generateRoutine("Acnéique", ["Boutons"]);
      
      expect(routine.nettoyage).toBeDefined();
      expect(routine.eauFlorale).toBeDefined();
      expect(routine.hydratation).toBeDefined();
    });

    it('should include specific treatments for conditions', () => {
      const routine = generateRoutine("Normale", ["Acné"]);
      
      const hasAcneTreatment = Object.values(routine).some(step => 
        step?.products.some(productId => {
          const product = skinProducts[productId];
          return product?.conditions.includes("Acné");
        })
      );
      
      expect(hasAcneTreatment).toBe(true);
    });
  });
});
