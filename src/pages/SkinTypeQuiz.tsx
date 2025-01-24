import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower2, Droplets, Scale, Cloud, Sparkles } from "lucide-react";
import { useQuiz } from '../context/QuizContext';
import type { SkinType } from '../types/skincare';

const SkinTypeQuiz = () => {
  const navigate = useNavigate();
  const { updateAnswers } = useQuiz();

  const handleOptionClick = (skinType: SkinType) => {
    try {
      updateAnswers({ skinType });
      navigate("/conditionsquiz");
    } catch (error) {
      console.error('Error handling skin type selection:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="space-y-6 max-w-2xl w-full">
        <h1 className="text-3xl text-center mb-8">Quel est votre type de peau ?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { text: "Sèche" as SkinType, icon: Flower2 },
            { text: "Grasse" as SkinType, icon: Droplets },
            { text: "Mixte" as SkinType, icon: Scale },
            { text: "Sensible" as SkinType, icon: Cloud },
            { text: "Terne" as SkinType, icon: Cloud },
            { text: "Normale" as SkinType, icon: Sparkles }
          ].map((option) => (
            <button
              key={option.text}
              onClick={() => handleOptionClick(option.text)}
              className="flex items-center gap-2 p-4 w-full bg-white hover:bg-gray-50 rounded-lg border"
            >
              <option.icon className="w-5 h-5" />
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;