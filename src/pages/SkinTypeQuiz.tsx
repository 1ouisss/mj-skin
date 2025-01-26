import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower2, Droplets, Scale, Cloud, Sparkles } from "lucide-react";
import { useSkinType } from "@/contexts/SkinTypeContext";
import { type SkinType } from "@/utils/skinRecommendations";
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
      <ProgressHeader currentStep={1} />
      
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
              { text: "Sèche", type: "Sèche" as SkinType, icon: Flower2 },
              { text: "Grasse", type: "Grasse" as SkinType, icon: Droplets },
              { text: "Mixte", type: "Mixte" as SkinType, icon: Scale },
              { text: "Sensible", type: "Sensible" as SkinType, icon: Cloud },
              { text: "Terne", type: "Terne" as SkinType, icon: Cloud },
              { text: "Normale", type: "Normale" as SkinType, icon: Sparkles },
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
    </div>
  );
};

export default SkinTypeQuiz;