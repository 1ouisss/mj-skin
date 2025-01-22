import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { SkinType, Condition, Concern, QuizAnswers } from '../types/skincare';

export default function PreviewAnswers() {
  const navigate = useNavigate();
  console.log('[PreviewAnswers] Component mounted');

  const storedAnswers = localStorage.getItem('quizAnswers');
  console.log('[PreviewAnswers] Raw stored answers:', storedAnswers);

  const answers = storedAnswers ? JSON.parse(storedAnswers) as QuizAnswers : null;
  console.log('[PreviewAnswers] Parsed answers:', answers);

  const questionsMap = React.useMemo(() => {
    console.log('[PreviewAnswers] Building questionsMap with answers:', answers);
    if (!answers) return {};
    return {
      'Type de peau': answers.skinType || 'Non spécifié',
      'Condition': answers.conditions || 'Non spécifié',
      'Préoccupation': answers.concerns || 'Non spécifié',
      'Texture préférée': answers.texturePreference || 'Non spécifié',
      'Parfum préféré': answers.scentPreference || 'Non spécifié'
    };
  }, [answers]);

  const handleSeeRecommendations = () => {
    console.group('=== PreviewAnswers Debug ===');
    console.log('[PreviewAnswers] Current answers:', answers);
    console.log('[PreviewAnswers] Navigation state:', window.location);
    try {
      if (!answers) {
        console.error('[PreviewAnswers] No answers found, redirecting to quiz');
        toast.error('Veuillez compléter le quiz');
        navigate('/skintype');
        return;
      }

      // Validate required fields
      if (!answers.skinType || !answers.conditions || !answers.concerns) {
        console.error('[PreviewAnswers] Missing required answers');
        toast.error('Veuillez répondre à toutes les questions requises');
        navigate('/skintype');
        return;
      }

      const payload = {
        skinType: answers.skinType as SkinType,
        conditions: answers.conditions as Condition,
        concerns: answers.concerns as Concern,
        texturePreference: answers.texturePreference || '',
        scentPreference: answers.scentPreference || ''
      };

      // Validate type safety
      if (!Object.values(SkinType).includes(payload.skinType as any) ||
          !Object.values(Condition).includes(payload.conditions as any) ||
          !Object.values(Concern).includes(payload.concerns as any)) {
        console.error('[PreviewAnswers] Invalid answer types');
        toast.error('Données invalides. Veuillez refaire le quiz.');
        navigate('/skintype');
        return;
      }

      console.log('[PreviewAnswers] Setting validated answers:', payload);
      localStorage.setItem('validatedAnswers', JSON.stringify(payload));

      console.log('[PreviewAnswers] Navigating to recommendations with payload');
      navigate('/recommendations', { 
        state: { answers: payload },
        replace: true
      });

      // Add validation check
      const stateCheck = JSON.parse(localStorage.getItem('validatedAnswers') || '{}');
      if (!stateCheck.skinType) {
        console.error('[PreviewAnswers] State validation failed');
        toast.error('Une erreur est survenue. Veuillez réessayer.');
        return;
      }
    } catch (error) {
      console.error('[PreviewAnswers] Error:', error);
      toast.error('Une erreur est survenue');
      navigate('/skintype');
    }
  };

  const handleBack = () => {
    console.log('[PreviewAnswers] Navigating back');
    navigate(-1);
  };

  if (!answers) {
    console.log('[PreviewAnswers] No answers found, redirecting to initial quiz');
    navigate('/skintype');
    return null;
  }

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
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-4xl font-playfair text-center mb-8 text-[#4A4A4A]">
              Confirmez vos réponses
            </h2>
            <div className="space-y-4 mb-8">
              {Object.entries(questionsMap).map(([question, answer], index) => (
                <motion.div
                  key={question}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-4 rounded-lg bg-white/80 border border-gray-100"
                >
                  <span className="font-medium text-[#4A4A4A]">{question}</span>
                  <span className="text-[#666] font-light">{answer}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Modifier
              </Button>
              <Button
                onClick={handleSeeRecommendations}
                className="flex items-center gap-2 bg-[#4A4A4A] hover:bg-[#3A3A3A]"
              >
                <Check className="w-4 h-4" />
                Voir les recommandations
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}