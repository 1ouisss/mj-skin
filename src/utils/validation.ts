export interface ValidationError {
  field: string;
  message: string;
  type: 'required' | 'invalid' | 'combination' | 'system';
  severity: 'error' | 'warning';
}

export interface ValidationRules {
  skinTypes: string[];
  conditions: string[];
  concerns: string[];
  textures: string[];
  scents: string[];
  incompatibleCombinations: {
    condition: string[];
    products: string[];
  }[];
}

// Comprehensive validation rules
export const validationRules: ValidationRules = {
  skinTypes: ['Sèche', 'Grasse', 'Mixte', 'Sensible', 'Terne', 'Normale'],
  conditions: ['Acné', 'Eczéma'],
  concerns: [
    'Rides', 'Rougeurs', 'Points noirs', 'Cernes', 
    'Taches pigmentaires', 'Boutons', 'Imperfections', 
    'Pores dilatés', 'Perte de fermeté'
  ],
  textures: ['Légère', 'Fluide', 'Crémeuse', 'Riche'],
  scents: ['Avec parfum naturel', 'Sans huiles essentielles'],
  incompatibleCombinations: [
    {
      condition: ['Eczéma'],
      products: ['Exfopur', 'Gel Sébo'] // Products not suitable for eczema
    },
    {
      condition: ['Sensible'],
      products: ['Dermopur Acné'] // Products too harsh for sensitive skin
    }
  ]
};

export function validatePreferences(preferences: UserPreferences): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required Fields Validation
  if (!preferences.skinType) {
    errors.push({
      field: 'skinType',
      message: 'Le type de peau est requis',
      type: 'required',
      severity: 'error'
    });
  }

  // Valid Options Validation
  if (preferences.skinType && !validationRules.skinTypes.includes(preferences.skinType)) {
    errors.push({
      field: 'skinType',
      message: 'Type de peau invalide',
      type: 'invalid',
      severity: 'error'
    });
  }

  // Conditions Validation
  preferences.condition.forEach(condition => {
    if (!validationRules.conditions.includes(condition)) {
      errors.push({
        field: 'condition',
        message: `Condition invalide: ${condition}`,
        type: 'invalid',
        severity: 'error'
      });
    }
  });

  // Concerns Validation
  preferences.concerns.forEach(concern => {
    if (!validationRules.concerns.includes(concern)) {
      errors.push({
        field: 'concerns',
        message: `Préoccupation invalide: ${concern}`,
        type: 'invalid',
        severity: 'error'
      });
    }
  });

  // Texture Validation
  if (preferences.texturePreference && !validationRules.textures.includes(preferences.texturePreference)) {
    errors.push({
      field: 'texturePreference',
      message: 'Texture invalide',
      type: 'invalid',
      severity: 'error'
    });
  }

  // Scent Validation
  if (preferences.scentPreference && !validationRules.scents.includes(preferences.scentPreference)) {
    errors.push({
      field: 'scentPreference',
      message: 'Préférence de parfum invalide',
      type: 'invalid',
      severity: 'error'
    });
  }

  // Combination Validations
  if (preferences.skinType === 'Sensible' && preferences.condition.includes('Acné')) {
    errors.push({
      field: 'combination',
      message: 'Attention: Peau sensible avec acné nécessite des produits très doux',
      type: 'combination',
      severity: 'warning'
    });
  }

  // Maximum Selections Validation
  if (preferences.concerns.length > 3) {
    errors.push({
      field: 'concerns',
      message: 'Veuillez sélectionner maximum 3 préoccupations',
      type: 'invalid',
      severity: 'error'
    });
  }

  return errors;
}

export function validateProductRecommendations(
  recommendations: SkinCareProduct[], 
  preferences: UserPreferences
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check for incompatible products
  validationRules.incompatibleCombinations.forEach(({ condition, products }) => {
    if (preferences.condition.some(c => condition.includes(c))) {
      recommendations.forEach(product => {
        if (products.includes(product.name)) {
          errors.push({
            field: 'product',
            message: `${product.name} n'est pas recommandé pour votre condition`,
            type: 'combination',
            severity: 'warning'
          });
        }
      });
    }
  });

  // Validate routine completeness
  if (recommendations.length < 2) {
    errors.push({
      field: 'recommendations',
      message: 'Routine incomplète - minimum 2 produits requis',
      type: 'system',
      severity: 'error'
    });
  }

  return errors;
} 