import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DailyRoutineQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/next-question");
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
            Quelle est votre routine quotidienne actuelle ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4">
            {[
              { text: "Nettoyant", icon: "🧴" },
              { text: "Sérum", icon: "💧" },
              { text: "Crème hydratante", icon: "🌿" },
              { text: "Soin complet", icon: "✨" },
              { text: "Rien", icon: "⭕" },
            ].map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={handleOptionClick}
                className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 shadow-md transition-colors w-full max-w-md mx-auto"
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-lg">{option.text}</span>
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
            src="/lovable-uploads/b8f614db-126f-4f19-8854-b9650da4a3e8.png"
            alt="Serum"
            className="w-full h-auto rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DailyRoutineQuiz;