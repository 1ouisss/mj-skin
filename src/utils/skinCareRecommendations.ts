interface SkinCareProduct {
  id: string;
  name: string;
  type: string;
  suitableFor: string[];
  addresses: string[];
  texture: string;
  scent: string;
  step: number;
  timeOfUse: 'AM' | 'PM' | 'Both';
  price: number;
}

interface UserPreferences {
  skinType: string;
  condition: string[];
  concerns: string[];
  texturePreference: string;
  scentPreference: string;
}

interface RecommendationResult {
  morningRoutine: SkinCareProduct[];
  eveningRoutine: SkinCareProduct[];
  topRecommendations: SkinCareProduct[];
}

interface ValidationError {
  field: string;
  message: string;
}

interface RecommendationResponse {
  success: boolean;
  data?: RecommendationResult;
  errors?: ValidationError[];
  message?: string;
}

// Sample product database
const skinCareProducts: SkinCareProduct[] = [
  {
    id: '1',
    name: 'Gentle Foam Cleanser',
    type: 'Cleanser',
    suitableFor: ['Sensitive', 'Combination', 'Oily'],
    addresses: ['Acne-Prone', 'Pores'],
    texture: 'Light',
    scent: 'Unscented',
    step: 1,
    timeOfUse: 'Both',
    price: 24.99
  },
  {
    id: '2',
    name: 'Hydrating Toner',
    type: 'Toner',
    suitableFor: ['Dry', 'Normal', 'Sensitive'],
    addresses: ['Dehydrated', 'Texture'],
    texture: 'Light',
    scent: 'Floral',
    step: 2,
    timeOfUse: 'Both',
    price: 28.99
  },
  // Add more products as needed
];

// Validation function for user preferences
function validatePreferences(preferences: UserPreferences): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check for required fields
  if (!preferences.skinType) {
    errors.push({
      field: 'skinType',
      message: 'Skin type is required'
    });
  }

  if (!preferences.condition || preferences.condition.length === 0) {
    errors.push({
      field: 'condition',
      message: 'At least one skin condition must be selected'
    });
  }

  if (!preferences.concerns || preferences.concerns.length === 0) {
    errors.push({
      field: 'concerns',
      message: 'At least one skin concern must be selected'
    });
  }

  if (!preferences.texturePreference) {
    errors.push({
      field: 'texturePreference',
      message: 'Texture preference is required'
    });
  }

  if (!preferences.scentPreference) {
    errors.push({
      field: 'scentPreference',
      message: 'Scent preference is required'
    });
  }

  // Validate values against allowed options
  const validSkinTypes = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'];
  if (preferences.skinType && !validSkinTypes.includes(preferences.skinType)) {
    errors.push({
      field: 'skinType',
      message: 'Invalid skin type selected'
    });
  }

  const validTextures = ['Light', 'Rich', 'Gel', 'Cream', 'Oil'];
  if (preferences.texturePreference && !validTextures.includes(preferences.texturePreference)) {
    errors.push({
      field: 'texturePreference',
      message: 'Invalid texture preference selected'
    });
  }

  const validScents = ['Unscented', 'Floral', 'Fresh', 'Herbal', 'Citrus'];
  if (preferences.scentPreference && !validScents.includes(preferences.scentPreference)) {
    errors.push({
      field: 'scentPreference',
      message: 'Invalid scent preference selected'
    });
  }

  return errors;
}

export function generateSkinCareRecommendations(
  preferences: UserPreferences
): RecommendationResponse {
  try {
    // Validate input
    const validationErrors = validatePreferences(preferences);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
        message: 'Please correct the following errors:'
      };
    }

    // Check if we have enough products in database
    if (!skinCareProducts || skinCareProducts.length === 0) {
      return {
        success: false,
        message: 'Product database is empty or unavailable'
      };
    }

    // Initialize scoring system with error handling
    const scoredProducts = skinCareProducts.map(product => {
      try {
        let score = 0;

        // Score based on skin type compatibility
        if (product.suitableFor.includes(preferences.skinType)) {
          score += 3;
        }

        // Score based on addressing conditions and concerns
        const addressedIssues = [...preferences.condition, ...preferences.concerns];
        product.addresses.forEach(issue => {
          if (addressedIssues.includes(issue)) {
            score += 2;
          }
        });

        // Score based on texture preference
        if (product.texture === preferences.texturePreference) {
          score += 1;
        }

        // Score based on scent preference
        if (product.scent === preferences.scentPreference) {
          score += 1;
        }

        return { ...product, score };
      } catch (error) {
        console.error(`Error scoring product ${product.id}:`, error);
        return { ...product, score: 0 };
      }
    });

    // Sort products by score
    const sortedProducts = [...scoredProducts].sort((a, b) => b.score - a.score);

    // Check if we have enough matching products
    if (sortedProducts.filter(p => p.score > 0).length === 0) {
      return {
        success: false,
        message: 'No matching products found for your preferences'
      };
    }

    // Create routines with error handling
    const morningRoutine = sortedProducts
      .filter(product => product.timeOfUse === 'AM' || product.timeOfUse === 'Both')
      .sort((a, b) => a.step - b.step)
      .slice(0, 5);

    const eveningRoutine = sortedProducts
      .filter(product => product.timeOfUse === 'PM' || product.timeOfUse === 'Both')
      .sort((a, b) => a.step - b.step)
      .slice(0, 5);

    // Verify minimum routine requirements
    if (morningRoutine.length < 2 || eveningRoutine.length < 2) {
      return {
        success: false,
        message: 'Not enough products available to create complete routines'
      };
    }

    // Get top recommendations
    const topRecommendations = sortedProducts
      .filter(product => product.score > 3)
      .slice(0, 3);

    return {
      success: true,
      data: {
        morningRoutine,
        eveningRoutine,
        topRecommendations,
        morningSteps: getRoutineSteps(morningRoutine),
        eveningSteps: getRoutineSteps(eveningRoutine)
      }
    };

  } catch (error) {
    console.error('Recommendation generation error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while generating recommendations'
    };
  }
}

// Helper function to get routine steps description
export function getRoutineSteps(products: SkinCareProduct[]): string[] {
  return products.map(product => {
    return `Step ${product.step}: ${product.name} - ${product.type}`;
  });
}

// Update the API function to handle errors
export async function getPersonalizedRecommendations(
  preferences: UserPreferences
): Promise<RecommendationResponse> {
  try {
    const recommendations = generateSkinCareRecommendations(preferences);
    return recommendations;
  } catch (error) {
    console.error('Recommendation error:', error);
    return {
      success: false,
      message: 'Failed to generate recommendations. Please try again.'
    };
  }
} 