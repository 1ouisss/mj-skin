import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Wrench, 
  EyeOff, 
  CircleDot, 
  Droplet, 
  Flame, 
  XCircle, 
  CirclePlus, 
  ArrowDown 
} from "lucide-react";

const ConcernsQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/zones-quiz");
  };

  const concerns = [
    { text: "Rides", icon: <Wrench className="w-5 h-5" /> },
    { text: "Cernes", icon: <EyeOff className="w-5 h-5" /> },
    { text: "Points noirs", icon: <CircleDot className="w-5 h-5" /> },
    { text: "Taches pigmentaires", icon: <Droplet className="w-5 h-5" /> },
    { text: "Rougeurs", icon: <Flame className="w-5 h-5" /> },
    { text: "Boutons", icon: <CircleDot className="w-5 h-5" /> },
    { text: "Imperfections", icon: <XCircle className="w-5 h-5" /> },
    { text: "Pores dilatés", icon: <CirclePlus className="w-5 h-5" /> },
    { text: "Perte de fermeté", icon: <ArrowDown className="w-5 h-5" /> },
  ];

  return (
    <div 
      className="concerns-page flex items-center justify-center px-4"
      style={{
        background: `url('/lovable-uploads/35bdc8ad-d64b-4b0a-b419-486158d19e61.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0B0F17',
      }}
    >
      <div className="concerns-overlay" />
      
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start relative z-10 pt-20 pb-20">
        <div className="space-y-12">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="concerns-title"
          >
            Quelles sont vos principales préoccupations ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {concerns.map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={handleOptionClick}
                className="concerns-button"
              >
                {option.icon}
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-1 gap-4">
          {concerns.map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={handleOptionClick}
              className="concerns-button"
            >
              {option.icon}
              <span className="text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcernsQuiz;