
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather, Droplets, Flower2, Sparkles } from "lucide-react";
import { useSkinType } from "@/contexts/SkinTypeContext";
import ProgressHeader from "@/components/ProgressHeader";
import { TexturePreference } from "@/types/skincare";
import { toast } from "sonner";

const TreatmentQuiz = () => {
  const navigate = useNavigate();
  const { selectedTextures, setSelectedTextures } = useSkinType();

  const handleTextureSelect = (texture: TexturePreference) => {
    setSelectedTextures([texture]);
    navigate("/recommendations");
  };

  const textureOptions: { text: TexturePreference; icon: any; desc: string }[] = [
    { text: "Légère", icon: Feather, desc: "Pour une sensation de légèreté" },
    { text: "Fluide", icon: Droplets, desc: "Une texture qui pénètre rapidement" },
    { text: "Crémeuse", icon: Flower2, desc: "Une texture douce et nourrissante" },
    { text: "Riche", icon: Sparkles, desc: "Pour une hydratation intense" },
  ];

  return (
    <div 
      className="flex items-center justify-center px-4 min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/e4d6398e-4d46-4f6c-9e47-7bf72ff4a9a9.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ProgressHeader currentStep={4} />
      
      <div className="w-full max-w-4xl mx-auto relative z-10 p-12 bg-white/80 backdrop-blur-sm rounded-[32px] shadow-lg">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-light text-gray-900">
            Quelle texture préférez-vous pour vos produits ?
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Sélectionnez la texture qui vous convient le mieux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {textureOptions.map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleTextureSelect(option.text)}
              className="flex flex-col items-start gap-2 bg-white hover:bg-gray-50 
                       text-gray-800 rounded-2xl p-6 shadow-md transition-all duration-300 
                       group border border-gray-100"
            >
              <div className="flex items-center gap-4 w-full">
                <option.icon className="w-6 h-6 stroke-[1.5] text-gray-700" />
                <span className="text-xl font-playfair">{option.text}</span>
              </div>
              <p className="text-sm text-gray-600 pl-10 font-light">{option.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentQuiz;
