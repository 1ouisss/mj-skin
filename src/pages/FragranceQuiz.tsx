import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower, Leaf } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

const FragranceQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (fragrance: string) => {
    navigate("/routine-quiz");
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative"
      style={{
        background: `url('/lovable-uploads/9db36b67-5238-454f-bda3-39222bd9fecc.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >      
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
      
      <ProgressHeader currentStep={6} />
      
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-title mb-12"
        >
          Préférez-vous des produits avec ou sans odeur ?
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
          {[
            { text: "Avec parfum naturel", icon: Flower },
            { text: "Sans huiles essentielles", icon: Leaf },
          ].map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.text)}
              className="flex items-center gap-4 bg-white/20 backdrop-blur-md hover:bg-white/30 
                         text-white border border-white/30 rounded-full py-6 px-8 
                         transition-all duration-300 hover:scale-105"
            >
              <option.icon className="w-6 h-6 stroke-current" />
              <span className="text-lg tracking-wide">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FragranceQuiz;