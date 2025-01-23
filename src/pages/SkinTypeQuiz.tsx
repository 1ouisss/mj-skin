import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower2, Droplets, Scale, Cloud, Sparkles } from "lucide-react";
import { useQuiz } from './QuizContext'; // Assuming this context exists

const SkinTypeQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (skinType: string) => {
    try {
      const { updateAnswers } = useQuiz();
      updateAnswers({ skinType });
      localStorage.setItem('skinType', skinType);
      navigate("/conditionsquiz");
    } catch (error) {
      console.error('Error saving skin type:', error);
    }
  };

  return (
    <div 
      className="skintype-page flex items-center justify-center px-4 min-h-screen w-full"
      style={{
        background: `url('/lovable-uploads/686da753-061a-4c41-8ca0-ddada141a419.png')`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-[#222222] text-center mb-12"
          >
            Quel est votre type de peau ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 mt-8">
            {[
              { text: "Sèche", icon: Flower2 },
              { text: "Grasse", icon: Droplets },
              { text: "Mixte", icon: Scale },
              { text: "Sensible", icon: Cloud },
              { text: "Terne", icon: Cloud },
              { text: "Normale", icon: Sparkles },
            ].map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionClick(option.text)}
                className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-[#222222] rounded-full py-4 px-6 shadow-lg transition-colors"
              >
                <option.icon className="w-6 h-6 stroke-[1.5]" />
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;