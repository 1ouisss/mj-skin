
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
      className="flex items-center justify-center px-4 min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/686da753-061a-4c41-8ca0-ddada141a419.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ProgressHeader currentStep={1} />
      
      <div className="w-full max-w-4xl mx-auto relative z-10 p-12 bg-white/80 backdrop-blur-sm rounded-[32px] shadow-lg">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-light text-gray-900">
            Quel est votre type de peau ?
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Sélectionnez l'option qui correspond le mieux à votre peau
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
              className="flex flex-col items-start gap-2 bg-white hover:bg-gray-50 
                       text-gray-800 rounded-2xl p-6 shadow-md transition-all duration-300 
                       group border border-gray-100"
            >
              <div className="flex items-center gap-4 w-full">
                <option.icon className="w-6 h-6 stroke-[1.5] text-gray-700" />
                <span className="text-xl font-playfair">{option.type}</span>
              </div>
              <p className="text-sm text-gray-600 pl-10 font-light">{option.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;

