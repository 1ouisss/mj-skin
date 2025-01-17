import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RoutineQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (duration: string) => {
    // Navigate to the next step based on the answer
    navigate("/next-step");
  };

  return (
    <div 
      className="zones-page flex items-center justify-center px-4 min-h-screen w-full"
      style={{
        background: `url('/lovable-uploads/5401c816-4c02-4bd5-a9d6-da961b3e152d.png') center/cover no-repeat fixed`,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
      }}
    >      
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="zones-title"
        >
          Combien de temps consacrez-vous à votre routine beauté ?
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[
            { text: "Moins de 5 minutes", icon: "⚡" },
            { text: "5-10 minutes", icon: "⏱️" },
            { text: "Plus de 10 minutes", icon: "✨" },
          ].map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.text)}
              className="zones-button bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutineQuiz;