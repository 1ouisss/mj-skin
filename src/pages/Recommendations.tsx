import { useState, useEffect } from "react";
import { useQuiz } from '../context/QuizContext';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import data from "../data/skincare-db.json";

const Recommendations = () => {
  const { state } = useQuiz();
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const { skinType, conditions, concerns } = state;
        
        if (!skinType || !conditions || !concerns) {
          throw new Error("Informations manquantes");
        }

        const recommendationKey = `${skinType.toLowerCase()}`;
        if (!data.skinTypes?.[recommendationKey]) {
          throw new Error("Aucune recommandation trouvée");
        }

        console.log('[Recommendations] Loading data:', { skinType, conditions, concerns });
        setRecommendations(data.skinTypes[recommendationKey]);
        setError(null);
      } catch (err) {
        console.error('[Recommendations] Error:', err);
        setError(err.message);
        setRecommendations(null);
      }
    };

    loadRecommendations();
  }, [state]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Erreur: {error}</p>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl font-playfair text-center mb-8">
          Vos Recommandations Personnalisées
        </h1>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl mb-4">Produits Recommandés</h2>
            <div className="space-y-4">
              {recommendations.products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  {product}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl mb-4">Votre Routine</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-2">Matin</h3>
                <ul className="list-disc pl-6">
                  {recommendations.routine.Matin.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-2">Soir</h3>
                <ul className="list-disc pl-6">
                  {recommendations.routine.Soir.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Recommendations;