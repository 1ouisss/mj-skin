import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, User } from "lucide-react";

const ZonesQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    // Pour l'instant, nous naviguons vers la page suivante
    navigate("/next-step");
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-start px-4 py-12"
      style={{
        background: `url('/lovable-uploads/4dfa380b-7ab6-41fc-bc78-27e57769d3e5.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-center mb-16 max-w-3xl"
      >
        Quelles zones nécessitent une attention particulière ?
      </motion.h1>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 gap-4 mt-8">
        {[
          { text: "Contour des yeux", icon: <Eye className="w-5 h-5" /> },
          { text: "Front", icon: <User className="w-5 h-5" /> },
          { text: "Joues", icon: <User className="w-5 h-5" /> },
          { text: "Menton", icon: <User className="w-5 h-5" /> },
          { text: "Cou", icon: <User className="w-5 h-5" /> },
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
  );
};

export default ZonesQuiz;