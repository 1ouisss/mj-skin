
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import skincareDb from '../data/skincare-db.json';
import { LoadingScreen } from '../components/LoadingScreen';

export default function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || {};

  const recommendations = useMemo(() => {
    if (!answers) return null;

    try {
      const { skinType, conditions } = answers;
      let result = skincareDb?.SkinType?.[skinType];
      
      if (conditions && result?.Condition?.[conditions]) {
        result = result.Condition[conditions];
      }

      if (!result?.Products || !result?.Routine) {
        toast.error('Aucune recommandation trouvée pour vos critères');
        return null;
      }

      return result;
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
        <h1 className="text-3xl font-playfair mb-8">Vos recommandations personnalisées</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Produits recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.Products?.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm"
              >
                <h3 className="font-medium mb-2">{product.name}</h3>
                <p className="text-[#666]">{product.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl mb-4">Votre routine</h2>
          {recommendations.Routine && Object.entries(recommendations.Routine).map(([time, steps], index) => (
            <div key={time} className="mb-8">
              <h3 className="text-xl mb-4 capitalize">{time}</h3>
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
            </div>
          ))}
        </section>
      </div>
    </motion.div>
  );
}
