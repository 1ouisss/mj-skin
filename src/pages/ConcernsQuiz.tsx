import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { List, Heart, Sun, XOctagon, Hand } from "lucide-react";

const ConcernsQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/next-question");
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{
        background: `url('/lovable-uploads/35bdc8ad-d64b-4b0a-b419-486158d19e61.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0B0F17', // Fallback color
      }}
    >
      {/* Overlay pour assurer la lisibilité */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start relative z-10 pt-20">
        {/* Left side with question */}
        <div className="space-y-12">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-white"
          >
            Quelles sont vos principales préoccupations ?
          </motion.h1>

          {/* Buttons for mobile view */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {[
              { text: "Rides", icon: <List className="w-5 h-5" /> },
              { text: "Rougeurs", icon: <Heart className="w-5 h-5" /> },
              { text: "Taches pigmentaires", icon: <Sun className="w-5 h-5" /> },
              { text: "Imperfections", icon: <XOctagon className="w-5 h-5" /> },
              { text: "Perte de fermeté", icon: <Hand className="w-5 h-5" /> },
            ].map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={handleOptionClick}
                className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-black rounded-full py-4 px-6 shadow-lg transition-colors w-full"
              >
                {option.icon}
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right side with buttons for desktop view */}
        <div className="hidden lg:grid grid-cols-1 gap-4">
          {[
            { text: "Rides", icon: <List className="w-5 h-5" /> },
            { text: "Rougeurs", icon: <Heart className="w-5 h-5" /> },
            { text: "Taches pigmentaires", icon: <Sun className="w-5 h-5" /> },
            { text: "Imperfections", icon: <XOctagon className="w-5 h-5" /> },
            { text: "Perte de fermeté", icon: <Hand className="w-5 h-5" /> },
          ].map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-black rounded-full py-4 px-6 shadow-lg transition-colors w-full"
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