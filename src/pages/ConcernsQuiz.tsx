import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Waves, 
  Eye, 
  Circle, 
  Sun, 
  Heart, 
  Zap, 
  Sparkles, 
  Search, 
  ArrowDown 
} from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

const ConcernsQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/zones-quiz");
  };

  const concerns = [
    { text: "Rides", icon: Waves },
    { text: "Cernes", icon: Eye },
    { text: "Points noirs", icon: Circle },
    { text: "Taches pigmentaires", icon: Sun },
    { text: "Rougeurs", icon: Heart },
    { text: "Boutons", icon: Zap },
    { text: "Imperfections", icon: Sparkles },
    { text: "Pores dilatés", icon: Search },
    { text: "Perte de fermeté", icon: ArrowDown },
  ];

  return (
    <div 
      className="concerns-page flex items-center justify-center px-4"
      style={{
        background: `url('/lovable-uploads/fb3ff92a-8049-4229-b2ce-8e9a41f262f1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
    >      
      <ProgressHeader currentStep={3} />
      
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start relative z-10 py-12">
        <div className="lg:pl-12 flex items-center h-full">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="concerns-title text-left"
          >
            Quelles sont vos principales préoccupations ?
          </motion.h1>
        </div>

        <div className="w-full max-w-xl grid grid-cols-1 gap-4">
          {concerns.map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={handleOptionClick}
              className="concerns-button"
            >
              <option.icon className="w-6 h-6 stroke-current" />
              <span className="text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcernsQuiz;