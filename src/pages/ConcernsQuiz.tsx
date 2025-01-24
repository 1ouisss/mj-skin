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
        background: `url('/lovable-uploads/c4404277-0805-453c-8dde-ca2ab249f514.png')`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
    >      
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10 pt-12 pb-12">
        <div className="lg:pl-12">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="concerns-title text-left"
          >
            Quelles sont vos principales préoccupations ?
          </motion.h1>
        </div>

        <div className="w-full max-w-xl mx-auto grid grid-cols-1 gap-4">
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