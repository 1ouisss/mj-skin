
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import skincareDb from '../data/skincare-db.json';
import { LoadingScreen } from '../components/LoadingScreen';

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || {};

  const recommendations = useMemo(() => {
    if (!answers) return null;

    let result = skincareDb?.SkinType?.[answers.skinType];
    
    if (answers.conditions && result?.Condition?.[answers.conditions]) {
      result = result.Condition[answers.conditions];
    }

    if (answers.concerns && result?.Concern?.[answers.concerns]) {
      result = result.Concern[answers.concerns];
    }

    return result;
  }, [answers]);

  React.useEffect(() => {
    if (!answers) {
      navigate('/skin-type-quiz');
    }
  }, [answers, navigate]);

  if (!answers) {
    return <LoadingScreen />;
  }

  if (!recommendations) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm"
      >
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-playfair mb-4 text-[#4A4A4A]">
            Aucune recommandation trouvée
          </h2>
          <p className="text-[#666] mb-6">
            Nous n'avons pas trouvé de recommandations correspondant à vos critères.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.Products?.map((product, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg shadow-sm"
              >
                {product}
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl mb-4">Votre routine</h2>
          {recommendations.Routine && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(recommendations.Routine).map(([time, steps], index) => (
                <motion.div
                  key={time}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 bg-gray-50 rounded-lg"
                >
                  <h3 className="text-xl mb-4 capitalize">{time}</h3>
                  <ol className="space-y-2">
                    {Array.isArray(steps) && steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default Recommendations;
