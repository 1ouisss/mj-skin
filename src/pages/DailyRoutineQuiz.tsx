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
          <div className="relative">
            {/* Left star */}
            <motion.img 
              src="/lovable-uploads/3aca9e03-e35f-4860-805c-482d5091bb61.png"
              alt="Decorative star"
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-16 h-16 opacity-80"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 0.8 }}
              transition={{ duration: 0.6 }}
            />
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-center lg:text-left"
            >
              Quelle est votre routine quotidienne actuelle ?
            </motion.h1>

            {/* Right star */}
            <motion.img 
              src="/lovable-uploads/3aca9e03-e35f-4860-805c-482d5091bb61.png"
              alt="Decorative star"
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 opacity-60"
              initial={{ rotate: 30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </div>

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

        {/* Right side with new serum image */}
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

export default DailyRoutineQuiz;