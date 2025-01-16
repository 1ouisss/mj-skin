import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SkinTypeQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/daily-routine-quiz");  // Mise à jour de la navigation vers la page 3
  };

  return (
    <div className="min-h-screen bg-[#F8F2EA] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side with question and options */}
        <div className="space-y-12">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-center lg:text-left"
          >
            Quel est votre type de peau ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4">
            {[
              "Peau sèche",
              "Peau normale",
              "Peau mixte",
              "Peau grasse",
              "Je ne sais pas",
            ].map((option, index) => (
              <motion.button
                key={option}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={handleOptionClick}
                className="bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 shadow-md transition-colors w-full max-w-md mx-auto"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right side with image */}
        <div className="hidden lg:block">
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="/lovable-uploads/cadfa63b-0022-4e84-b723-153102d8e54f.png"
            alt="Skin type illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;