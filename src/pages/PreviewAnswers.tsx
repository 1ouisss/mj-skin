
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const PreviewAnswers = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = React.useState({
    skinType: '',
    conditions: '',
    concerns: '',
    texturePreference: '',
    scentPreference: '',
    newsletter: ''
  });

  React.useEffect(() => {
    try {
      const loadedAnswers = {
        skinType: localStorage.getItem('skinType') ? JSON.parse(localStorage.getItem('skinType') || '') : '',
        conditions: localStorage.getItem('conditions') ? JSON.parse(localStorage.getItem('conditions') || '') : '',
        concerns: localStorage.getItem('concerns') ? JSON.parse(localStorage.getItem('concerns') || '') : '',
        texturePreference: localStorage.getItem('texture') ? JSON.parse(localStorage.getItem('texture') || '') : '',
        scentPreference: localStorage.getItem('fragrance') ? JSON.parse(localStorage.getItem('fragrance') || '') : '',
        newsletter: localStorage.getItem('newsletter') || ''
      };

      console.log('Loaded answers:', loadedAnswers);
      setAnswers(loadedAnswers);

      if (!loadedAnswers.skinType || !loadedAnswers.conditions || !loadedAnswers.concerns) {
        navigate('/skin-type-quiz');
      }
    } catch (error) {
      console.error('Error loading answers:', error);
      toast.error('Une erreur est survenue lors du chargement de vos réponses.');
      navigate('/skin-type-quiz');
    }
  }, [navigate]);

  const questionsMap = {
    "Votre type de peau": answers.skinType,
    "Vos conditions particulières": answers.conditions,
    "Vos préoccupations principales": answers.concerns,
    "Vos préférences de texture": answers.texturePreference || '---',
    "Vos préférences de parfum": answers.scentPreference || '---'
  };

  const handleSeeRecommendations = async () => {
    try {
      const payload = {
        skinType: answers.skinType,
        conditions: answers.conditions,
        concerns: answers.concerns,
        texturePreference: answers.texturePreference || '',
        scentPreference: answers.scentPreference || ''
      };

      console.log('Processing payload:', payload);

      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get recommendations');
      }

      const data = await response.json();
      
      if (!data.recommendations) {
        throw new Error('No recommendations found');
      }

      navigate('/recommendations', {
        state: {
          recommendations: data.recommendations,
          answers: answers
        }
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast.error('Impossible d\'obtenir les recommandations. Veuillez réessayer.');
    }
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
              {Object.entries(questionsMap).map(([question, answer]) => (
                <div key={question} className="flex justify-between items-center p-3 border-b border-gray-200">
                  <span className="font-medium text-[#4A4A4A]">{question}</span>
                  <span className="text-[#666]">{answer}</span>
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
                onClick={handleSeeRecommendations}
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
