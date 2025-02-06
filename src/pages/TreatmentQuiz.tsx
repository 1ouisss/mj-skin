
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
      className="flex items-center justify-center px-4 min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/e4d6398e-4d46-4f6c-9e47-7bf72ff4a9a9.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ProgressHeader currentStep={4} />
      
      <div className="w-full max-w-2xl mx-auto relative z-10 p-12 bg-white/80 backdrop-blur-sm rounded-[32px] shadow-lg">
        <div className="space-y-8">
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

          <div className="grid grid-cols-1 gap-4 mt-8">
            {textureOptions.map((option, index) => (
              <motion.div
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleTextureSelect(option.text)}
                className={`flex items-center gap-4 bg-white hover:bg-gray-50 
                          rounded-2xl p-6 shadow-md transition-all duration-300 
                          group border border-gray-100 cursor-pointer
                          ${selectedTextures.includes(option.text) ? 'bg-gray-50 border-gray-300' : ''}`}
              >
                <option.icon className="w-6 h-6 stroke-[1.5] text-gray-700" />
                <span className="text-lg font-playfair">{option.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={handleNext}
              className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-6 rounded-full text-lg font-light"
              disabled={selectedTextures.length === 0}
            >
              Suivant
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentQuiz;

