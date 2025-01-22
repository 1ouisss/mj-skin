
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';

interface PreviewAnswersProps {
  selectedAnswers: {
    skinType: string;
    condition: string;
    concern: string;
    texturePreference: string;
    scentPreference: string;
  };
}

const PreviewAnswers = ({ selectedAnswers }: PreviewAnswersProps) => {
  const navigate = useNavigate();

  const translateKey = (key: string): string => {
    const translations: { [key: string]: string } = {
      skinType: 'Type de peau',
      condition: 'Condition',
      concern: 'Préoccupation',
      texturePreference: 'Préférence de texture',
      scentPreference: 'Préférence de parfum'
    };
    return translations[key] || key;
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url('/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      
      <motion.div 
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-4xl font-playfair text-center mb-8 text-[#4A4A4A]">
              Confirmez vos réponses
            </h2>
            
            <div className="space-y-4 mb-8">
              {Object.entries(selectedAnswers).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 border-b border-gray-200">
                  <span className="font-medium text-[#4A4A4A]">{translateKey(key)}</span>
                  <span className="text-[#666]">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-[#4A4A4A] text-[#4A4A4A] rounded-md hover:bg-gray-100 transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={() => navigate('/recommendations')}
                className="px-6 py-2 bg-[#4A4A4A] text-white rounded-md hover:bg-[#3A3A3A] transition-colors"
              >
                Voir les recommandations
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PreviewAnswers;
