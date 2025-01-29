import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Timer, Sparkles } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

const RoutineQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (duration: string) => {
    navigate("/newsletter-quiz");
  };

  return (
    <div 
      className="zones-page flex items-center justify-center px-4 min-h-screen w-full overflow-y-auto pb-20 md:pb-0"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url('/lovable-uploads/5401c816-4c02-4bd5-a9d6-da961b3e152d.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
      }}
    >      
      <ProgressHeader currentStep={7} />
      
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-20 px-4 md:px-6">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-title mb-20 text-3xl md:text-4xl lg:text-5xl px-4 md:px-6"
        >
          Combien de temps consacrez-vous à votre routine beauté ?
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto mt-8 md:mt-16">
          {[
            { text: "Moins de 5 minutes", icon: Zap },
            { text: "5-10 minutes", icon: Timer },
            { text: "Plus de 10 minutes", icon: Sparkles },
          ].map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.text)}
              className="zones-button bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 py-4 px-6 rounded-full flex items-center justify-center gap-3 text-base md:text-lg"
            >
              <option.icon className="w-5 h-5 md:w-6 md:h-6 stroke-current" />
              <span>{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutineQuiz;