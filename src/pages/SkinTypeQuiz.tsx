import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Flower2, Check } from "lucide-react";
import { useSkinType } from "@/contexts/SkinTypeContext";
import { type SkinType } from "../types/skincare";
import ProgressHeader from "@/components/ProgressHeader";

const SkinTypeQuiz = () => {
  const navigate = useNavigate();
  const { setSelectedSkinType } = useSkinType();

  const handleOptionClick = (skinType: SkinType) => {
    setSelectedSkinType(skinType);
    navigate("/conditions-quiz");
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
      <ProgressHeader currentStep={1} />
      
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="w-full max-w-2xl mx-auto relative z-10 pt-16 px-4 md:px-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-title text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-12"
        >
          Quel est votre type de peau ?
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 mt-6 md:mt-8">
          {[
            { text: "Sèche", type: "Sèche" as SkinType, icon: Flower2 },
            { text: "Grasse", type: "Grasse" as SkinType, icon: Sparkles },
            { text: "Mixte", type: "Mixte" as SkinType, icon: Check },
            { text: "Sensible", type: "Sensible" as SkinType, icon: Check },
            { text: "Terne", type: "Terne" as SkinType, icon: Check },
            { text: "Normale", type: "Normale" as SkinType, icon: Check },
          ].map((option) => (
            <motion.button
              key={option.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => handleOptionClick(option.type)}
              className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-[#222222] rounded-full py-5 md:py-6 px-6 md:px-8 shadow-lg transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:shadow-xl w-full text-left"
            >
              <option.icon className="w-6 h-6 stroke-[1.5] flex-shrink-0" />
              <span className="text-base md:text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;