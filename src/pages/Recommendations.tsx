
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import skincareDb from '../data/skincare-db.json';

const Recommendations = ({ selectedAnswers }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const { skinType, condition, concern, texturePreference, scentPreference } = selectedAnswers || {};
      const result = skincareDb?.SkinType?.[skinType]?.Condition?.[condition]?.Concern?.[concern]
        ?.TexturePreference?.[texturePreference]?.ScentPreference?.[scentPreference];

      setRecommendation(result || null);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendation(null);
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

  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-playfair text-[#4A4A4A]">Aucune recommandation trouvée.</p>
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
            {recommendation.Products?.map((product, index) => (
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
                    {recommendation.Routine?.Matin?.map((step, index) => (
                      <li key={index} className="text-lg text-[#4A4A4A]">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl mb-4 font-playfair text-[#4A4A4A]">Soir</h3>
                  <ul className="space-y-2">
                    {recommendation.Routine?.Soir?.map((step, index) => (
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

export default Recommendations;
