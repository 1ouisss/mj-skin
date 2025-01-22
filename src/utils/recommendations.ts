
import { RecommendationResult, SkinType, Condition, Concern, TexturePreference, ScentPreference } from '../types/skincare';
import skincareDb from '../data/skincare-db.json';
import OpenAI from 'openai';

const memoizedResults = new Map();

const getJSONRecommendations = (
  skinType: SkinType,
  condition: Condition,
  concern: Concern,
  texturePreference: TexturePreference,
  scentPreference: ScentPreference
): RecommendationResult | null => {
  try {
    const result = skincareDb?.SkinType?.[skinType]?.Condition?.[condition]?.Concern?.[concern];
    return result || null;
  } catch (error) {
    console.error('Error fetching JSON recommendations:', error);
    return null;
  }
};

const getOpenAIRecommendations = async (
  skinType: SkinType,
  condition: Condition,
  concern: Concern,
  texturePreference: TexturePreference,
  scentPreference: ScentPreference
): Promise<RecommendationResult | null> => {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `Based on the following skincare profile, provide product recommendations:
      Skin Type: ${skinType}
      Condition: ${condition}
      Concern: ${concern}
      Texture Preference: ${texturePreference}
      Scent Preference: ${scentPreference}
      
      Format the response as JSON with Products array and Routine object containing Morning and Evening routines.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = JSON.parse(completion.choices[0].message.content);
    return response;
  } catch (error) {
    console.error('Error fetching OpenAI recommendations:', error);
    return null;
  }
};

export const getRecommendations = async (
  skinType: SkinType,
  condition: Condition,
  concern: Concern,
  texturePreference: TexturePreference,
  scentPreference: ScentPreference
): Promise<RecommendationResult> => {
  console.group('[getRecommendations]');
  console.log('Input:', { skinType, condition, concern, texturePreference, scentPreference });

  const cacheKey = `${skinType}-${condition}-${concern}-${texturePreference}-${scentPreference}`;
  
  if (memoizedResults.has(cacheKey)) {
    return memoizedResults.get(cacheKey);
  }

  // Try JSON first
  const jsonRecommendations = getJSONRecommendations(skinType, condition, concern, texturePreference, scentPreference);
  
  if (jsonRecommendations) {
    memoizedResults.set(cacheKey, jsonRecommendations);
    return jsonRecommendations;
  }

  // Fallback to OpenAI if JSON doesn't have the combination
  const openAIRecommendations = await getOpenAIRecommendations(skinType, condition, concern, texturePreference, scentPreference);
  
  if (openAIRecommendations) {
    memoizedResults.set(cacheKey, openAIRecommendations);
    return openAIRecommendations;
  }

  // Default fallback if both methods fail
  return {
    Products: [],
    Routine: {
      Matin: ['Nettoyant doux', 'Hydratant'],
      Soir: ['Nettoyant doux', 'Hydratant'],
      Résultat: "Recommandations par défaut pour votre type de peau."
    }
  };
};
