
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '../components/ErrorBoundary';

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations;

  useEffect(() => {
    if (!recommendations) {
      navigate('/skin-type-quiz');
    }
  }, [recommendations, navigate]);

  if (!recommendations) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light mb-8">Vos recommandations personnalisées</h1>

        <section className="mb-12">
          <h2 className="text-2xl mb-4">Produits recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.Products?.map((product: string, index: number) => (
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
              {Object.entries(recommendations.Routine).map(([time, steps]: [string, any], index: number) => (
                <motion.div
                  key={time}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 bg-gray-50 rounded-lg"
                >
                  <h3 className="text-xl mb-4 capitalize">{time}</h3>
                  <ol className="space-y-2">
                    {Array.isArray(steps) && steps.map((step: string, stepIndex: number) => (
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
