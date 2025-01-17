import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ZonesQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/results");
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{
        background: `url('/lovable-uploads/cf598709-aebb-43ae-a563-db5d85c45d4c.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="elegant-title text-white mb-16"
        >
          Quelles zones nécessitent une attention particulière ?
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { text: "Contour des yeux", icon: "👁️" },
            { text: "Front", icon: "✨" },
            { text: "Joues", icon: "🌸" },
            { text: "Menton", icon: "🎯" },
            { text: "Cou", icon: "💫" },
          ].map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={handleOptionClick}
              className="elegant-button"
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

export default ZonesQuiz;