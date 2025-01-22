
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import { getRecommendations } from '../utils/recommendations';

import { SkinType, Condition, Concern, TexturePreference, ScentPreference, RecommendationResult } from '../types/skincare';
import { ErrorBoundary } from '../components/ErrorBoundary';

interface RecommendationsProps {
  selectedAnswers: {
    skinType: SkinType;
    condition: Condition;
    concern: Concern;
    texturePreference: TexturePreference;
    scentPreference: ScentPreference;
  };
}

const Recommendations: React.FC<RecommendationsProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedAnswers = location.state?.selectedAnswers;
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!selectedAnswers) {
    navigate('/');
    return null;
  }

  useEffect(() => {
    try {
      const result = getRecommendations(
        selectedAnswers.skinType,
        selectedAnswers.condition,
        selectedAnswers.concern,
        selectedAnswers.texturePreference,
        selectedAnswers.scentPreference
      );

      if (result.error) {
        setError(result.error);
      } else {
        setRecommendation(result);
      }
    } catch (err) {
      setError('Une erreur est survenue lors du chargement des recommandations.');
    } finally {
      setLoading(false);
    }
  }, [selectedAnswers]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-playfair text-[#4A4A4A]">Chargement des recommandations...</p>
      </div>
    );
  }

  if (error || !recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-playfair text-[#4A4A4A]">{error || 'Aucune recommandation trouvée.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-12 md:py-20"
      style={{
        backgroundImage: `url('/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-center mb-12 text-[#4A4A4A]">
            Vos Produits Recommandés
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendation.Products?.map((product: string, index: number) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="text-lg text-[#4A4A4A] text-center font-playfair">
                    {product}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-playfair text-center mb-8 text-[#4A4A4A]">
                Votre Routine Recommandée
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl mb-4 font-playfair text-[#4A4A4A]">Matin</h3>
                  <ul className="space-y-2">
                    {recommendation.Routine?.Matin?.map((step: string, index: number) => (
                      <li key={index} className="text-lg text-[#4A4A4A]">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl mb-4 font-playfair text-[#4A4A4A]">Soir</h3>
                  <ul className="space-y-2">
                    {recommendation.Routine?.Soir?.map((step: string, index: number) => (
                      <li key={index} className="text-lg text-[#4A4A4A]">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-lg italic text-[#4A4A4A] text-center mt-6">
                  {recommendation.Routine?.Résultat}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default function RecommendationsWithErrorBoundary(props: RecommendationsProps) {
  return (
    <ErrorBoundary>
      <Recommendations {...props} />
    </ErrorBoundary>
  );
}
