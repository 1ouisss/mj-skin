
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { LoadingScreen } from '../components/LoadingScreen';
import { QuizAnswers, RecommendationResult } from '../types/skincare';
import skincareDb from '../data/skincare-db.json';

export default function Recommendations() {
  console.group('[Recommendations]');
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state as { answers?: QuizAnswers } || {};
  
  console.log('Location state:', location.state);
  console.log('Answers:', answers);

  React.useEffect(() => {
    if (!answers) {
      const savedAnswers = localStorage.getItem('validatedAnswers');
      if (savedAnswers) {
        navigate('/recommendations', { 
          state: { answers: JSON.parse(savedAnswers) },
          replace: true
        });
      } else {
        toast.error('Données manquantes. Veuillez refaire le quiz.');
        navigate('/skin-type-quiz');
      }
    }
  }, [answers, navigate]);

  const recommendations = useMemo<RecommendationResult | null>(() => {
    if (!answers) return null;

    try {
      const { skinType, conditions, concerns, texturePreference, scentPreference } = answers;
      
      // Get base recommendations by skin type
      let result = skincareDb?.SkinType?.[skinType];
      
      // Apply condition filter if available
      if (conditions && result?.Condition?.[conditions]) {
        result = result.Condition[conditions];
      }
      
      // Apply concern filter if available
      if (concerns && result?.Concern?.[concerns]) {
        result = result.Concern[concerns];
      }

      // Validate result structure
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

      // Apply texture and scent preferences (if implemented in data structure)
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

  if (!answers) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm"
      >
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-playfair mb-4 text-[#4A4A4A]">
            Données manquantes
          </h2>
          <p className="text-[#666] mb-6">
            Veuillez retourner au quiz pour obtenir vos recommandations.
          </p>
          <button
            onClick={() => navigate('/skin-type-quiz')}
            className="px-6 py-2 bg-[#4A4A4A] text-white rounded-md hover:bg-[#3A3A3A] transition-colors"
          >
            Recommencer le quiz
          </button>
        </div>
      </motion.div>
    );
  }

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
