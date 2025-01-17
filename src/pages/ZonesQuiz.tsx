import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ZonesQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/next-step");
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-start px-4 py-12"
      style={{
        background: `url('/lovable-uploads/4fec63cd-430a-4969-8e2d-6ba9fff216af.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="elegant-title"
      >
        Quelles zones nécessitent une <em>attention particulière</em> ?
      </motion.h1>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 gap-4 mt-8">
        {[
          { text: "Contour des yeux", icon: "👁️" },
          { text: "Front", icon: "✨" },
          { text: "Joues", icon: "🌸" },
          { text: "Menton", icon: "💫" },
          { text: "Cou", icon: "🌟" },
        ].map((option, index) => (
          <motion.button
            key={option.text}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
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
  );
};

export default ZonesQuiz;