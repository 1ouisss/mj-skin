
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cloud, Droplet, Sun, Zap, CloudFog, Smile } from "lucide-react";
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
      
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
      
      <div className="w-full max-w-[800px] mx-auto relative z-10 pt-16 px-4 md:px-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="elegant-title text-3xl md:text-4xl lg:text-5xl">
            Quel est votre type de peau ?
          </h1>
          <p className="elegant-subtitle text-lg text-gray-200/90">
            Sélectionnez l'option qui correspond le mieux à votre peau
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
          {[
            { type: "Sèche" as SkinType, icon: Cloud, desc: "Tiraillements, rugosité, manque de confort" },
            { type: "Grasse" as SkinType, icon: Droplet, desc: "Excès de sébum, brillance, pores dilatés" },
            { type: "Mixte" as SkinType, icon: Sun, desc: "Zone T grasse, joues sèches" },
            { type: "Sensible" as SkinType, icon: Zap, desc: "Rougeurs, irritations, réactivité" },
            { type: "Terne" as SkinType, icon: CloudFog, desc: "Manque d'éclat, teint irrégulier" },
            { type: "Normale" as SkinType, icon: Smile, desc: "Équilibrée, peu de problèmes" },
          ].map((option) => (
            <motion.button
              key={option.type}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => handleOptionClick(option.type)}
              className="flex flex-col items-start gap-2 bg-white/95 backdrop-blur-sm hover:bg-white 
                         text-gray-800 rounded-2xl p-6 shadow-lg transition-all duration-300 
                         hover:transform hover:translate-y-[-2px] hover:shadow-xl w-full"
            >
              <div className="flex items-center gap-4 w-full">
                <option.icon className="w-6 h-6 stroke-[1.5]" />
                <span className="text-xl font-light">{option.type}</span>
              </div>
              <p className="text-sm text-gray-600 pl-10">{option.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;
