import { getPersonalizedRecommendations } from '../utils/skinCareRecommendations';

export async function submitPreferences(preferences: UserPreferences) {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const recommendations = getPersonalizedRecommendations(preferences);
    return {
      success: true,
      data: recommendations
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to generate recommendations'
    };
  }
} 