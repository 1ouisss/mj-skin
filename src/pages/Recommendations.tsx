import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { LoadingScreen } from '../components/LoadingScreen';
import { QuizAnswers, RecommendationResult } from '../types/skincare';
import skincareDb from '../data/skincare-db.json';

export default function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state as { answers?: QuizAnswers } || {};
  const [hasRedirected, setHasRedirected] = React.useState(false);

  React.useEffect(() => {
    if (!answers && !hasRedirected) {
      setHasRedirected(true);
      const savedAnswers = localStorage.getItem('validatedAnswers');
      if (savedAnswers) {
        navigate('/recommendations', { 
          state: { answers: JSON.parse(savedAnswers) },
          replace: true
        });
      } else {
        toast.error('Données manquantes. Veuillez refaire le quiz.');
        navigate('/skintype', { replace: true });
      }
    }
  }, [answers, navigate, hasRedirected]);

  if (!answers) {
    return <LoadingScreen />;
  }

  const recommendations = useMemo<RecommendationResult | null>(() => {
    if (!answers) return null;

    try {
      const { skinType, conditions, concerns, texturePreference, scentPreference } = answers;
      
      if (!skinType || !conditions || !concerns) {
        throw new Error('Données requises manquantes');
      }
      
      let result = skincareDb?.SkinType?.[skinType];
      
      if (conditions && result?.Condition?.[conditions]) {
        result = result.Condition[conditions];
      }
      
      if (concerns && result?.Concern?.[concerns]) {
        result = result.Concern[concerns];
      }

      if (!result?.Products || !result?.Routine) {
        console.warn('Invalid recommendation structure:', { result });
        return {
          Products: [],
          Routine: {
            Matin: [],
            Soir: [],
            Résultat: "Aucune recommandation trouvée pour vos critères."
          }
        };
      }

      const finalResult = {
        ...result,
        Products: result.Products.filter(product => {
          const matchesTexture = !texturePreference || product.toLowerCase().includes(texturePreference.toLowerCase());
          const matchesScent = !scentPreference || product.toLowerCase().includes(scentPreference.toLowerCase());
          return matchesTexture && matchesScent;
        })
      };

      return finalResult;
    } catch (error) {
      console.error('Error processing recommendations:', error);
      toast.error('Une erreur est survenue lors du traitement des recommandations');
      return null;
    }
  }, [answers]);

  if (!recommendations) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-playfair mb-8"
        >
          Vos recommandations personnalisées
        </motion.h1>
        
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Produits recommandés</h2>
          {recommendations.Products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.Products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm"
                >
                  <h3 className="font-medium mb-2">{product}</h3>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-[#666] italic">Aucun produit trouvé pour vos critères.</p>
          )}
        </section>
        
        <section>
          <h2 className="text-2xl mb-4">Votre routine</h2>
          {recommendations.Routine && Object.entries(recommendations.Routine).map(([time, steps], index) => (
            <div key={time} className="mb-8">
              <h3 className="text-xl mb-4 capitalize">{time}</h3>
              {Array.isArray(steps) && steps.length > 0 ? (
                <ol className="space-y-4">
                  {steps.map((step, stepIndex) => (
                    <motion.li
                      key={stepIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: stepIndex * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <span className="bg-[#4A4A4A] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </motion.li>
                  ))}
                </ol>
              ) : (
                <p className="text-[#666] italic">Aucune étape trouvée pour cette partie de la routine.</p>
              )}
            </div>
          ))}
        </section>
      </div>
    </motion.div>
  );
}