import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SkinTypeQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/daily-routine-quiz");
  };

  return (
    <div className="min-h-screen bg-[#F8F2EA] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side with question and options */}
        <div className="space-y-12 w-full">
          <div className="relative w-full">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="elegant-title mx-auto text-center w-full max-w-2xl"
            >
              Quel est votre type de peau ?
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { text: "Peau normale", icon: "✨" },
              { text: "Peau sèche", icon: "🌵" },
              { text: "Peau grasse", icon: "💧" },
              { text: "Peau mixte", icon: "🔄" },
              { text: "Peau sensible", icon: "🌸" },
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

        {/* Right side with serum image */}
        <div className="hidden lg:block">
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="/lovable-uploads/1dd473ed-1980-4235-9046-7547df6c278c.png"
            alt="Serum bottle"
            className="w-full h-auto rounded-full shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;