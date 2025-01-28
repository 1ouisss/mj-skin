import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Flower2, Heart, Check } from "lucide-react";
import { useSkinType } from "@/contexts/SkinTypeContext";
import type { SkinCondition } from "@/contexts/SkinTypeContext";
import ProgressHeader from "@/components/ProgressHeader";

const SkinConditionQuiz = () => {
  const navigate = useNavigate();
  const { setSkinCondition } = useSkinType();

  const handleOptionClick = (condition: SkinCondition) => {
    setSkinCondition(condition);
    navigate("/concerns-quiz");
  };

  return (
    <div 
      className="skintype-page flex flex-col items-center justify-center px-4 min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/686da753-061a-4c41-8ca0-ddada141a419.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ProgressHeader currentStep={2} />
      
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="w-full max-w-2xl mx-auto relative z-10 pt-20">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-title mb-16"
        >
          Avez-vous une condition particulière ?
        </motion.div>

        <div className="grid grid-cols-1 gap-4 mt-8">
          {[
            { text: "Acné", type: "Acné" as SkinCondition, icon: Sparkles },
            { text: "Eczéma", type: "Eczéma" as SkinCondition, icon: Flower2 },
            { text: "Rougeurs", type: "Rougeurs" as SkinCondition, icon: Heart },
            { text: "Aucune", type: "Aucune" as SkinCondition, icon: Check },
          ].map((option) => (
            <motion.button
              key={option.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => handleOptionClick(option.type)}
              className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-[#222222] rounded-full py-4 px-6 shadow-lg transition-colors"
            >
              <option.icon className="w-6 h-6 stroke-[1.5]" />
              <span className="text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinConditionQuiz;