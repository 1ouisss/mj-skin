import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather, Droplets, Flower2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSkinType } from "@/contexts/SkinTypeContext";
import ProgressHeader from "@/components/ProgressHeader";
import { TexturePreference } from "@/types/skincare";
import { toast } from "sonner";

const TreatmentQuiz = () => {
  const navigate = useNavigate();
  const { selectedTextures, setSelectedTextures } = useSkinType();

  const handleTextureSelect = (texture: TexturePreference) => {
    setSelectedTextures([texture]);
  };

  const handleNext = () => {
    if (selectedTextures.length === 0) {
      toast.error("Veuillez sélectionner une texture");
      return;
    }
    navigate("/fragrance-quiz");
  };

  const textureOptions: { text: TexturePreference; icon: any }[] = [
    { text: "Légère", icon: Feather },
    { text: "Fluide", icon: Droplets },
    { text: "Crémeuse", icon: Flower2 },
    { text: "Riche", icon: Sparkles },
  ];

  return (
    <div 
      className="treatment-page flex min-h-screen flex-col items-center px-4 py-8"
      style={{
        background: `url('/lovable-uploads/e4d6398e-4d46-4f6c-9e47-7bf72ff4a9a9.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >      
      <ProgressHeader currentStep={5} />
      
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center mb-8 glass-title"
        >
          Quelle texture préférez-vous pour vos produits ?
        </motion.h1>

        <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto mt-12">
          {textureOptions.map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleTextureSelect(option.text)}
              className={`flex items-center space-x-4 p-4 rounded-lg ${
                selectedTextures.includes(option.text)
                  ? "bg-primary text-white"
                  : "bg-white/80 backdrop-blur-sm"
              } shadow-md transition-all duration-300`}
            >
              <option.icon className="w-6 h-6 stroke-[1.5]" />
              <span className="text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <Button
            onClick={handleNext}
            className="px-8 py-2 bg-primary hover:bg-primary/90 text-white rounded-full"
          >
            Continuer
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TreatmentQuiz;