import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SkinTypeQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/daily-routine-quiz");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side with image */}
        <div className="relative">
          <img 
            src="/lovable-uploads/8a909872-4a03-4f57-bed1-013473c03d8b.png"
            alt="Woman portrait"
            className="w-full h-auto rounded-3xl"
          />
        </div>

        {/* Right side with question and options */}
        <div className="space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light text-white tracking-wider leading-tight"
          >
            Quel est votre type de peau principal ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 mt-8">
            {[
              { text: "Sèche", icon: "💧" },
              { text: "Sensible", icon: "🪶" },
              { text: "Grasse", icon: "👤" },
              { text: "Mixte", icon: "✨" },
              { text: "Normale", icon: "⚖️" },
            ].map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={handleOptionClick}
                className="flex items-center gap-4 bg-white rounded-full py-4 px-6 hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-lg text-gray-900">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;