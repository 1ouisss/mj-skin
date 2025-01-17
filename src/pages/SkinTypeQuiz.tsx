import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SkinTypeQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/concerns-quiz");
  };

  return (
    <div 
      className="skintype-page flex items-center justify-center px-4 min-h-screen"
      style={{
        background: `url('/lovable-uploads/023e5351-5cc1-4502-90a3-cd55c93e82c3.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-[#222222] text-center mb-12"
          >
            Quel est votre type de peau ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 mt-8">
            {[
              { text: "Sèche", icon: "🌵" },
              { text: "Grasse", icon: "💧" },
              { text: "Mixte", icon: "⚖️" },
              { text: "Sensible", icon: "🌸" },
              { text: "Terne", icon: "🌫️" },
              { text: "Normale", icon: "✨" },
            ].map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={handleOptionClick}
                className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-[#222222] rounded-full py-4 px-6 shadow-lg transition-colors"
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;