import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DailyRoutineQuiz = () => {
  const navigate = useNavigate();

  const options = [
    { label: "Nettoyant", id: "cleanser" },
    { label: "Sérum", id: "serum" },
    { label: "Crème hydratante", id: "moisturizer" },
    { label: "Soin complet", id: "complete" },
    { label: "Rien", id: "none" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F2EA] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side with title and options */}
        <div className="space-y-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide leading-tight">
            Quelle est votre routine quotidienne actuelle ?
          </h1>
          
          <div className="space-y-4 max-w-xl">
            {options.map((option) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate("/next-question")}
                className="w-full bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 shadow-sm transition-colors text-lg"
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right side with image */}
        <div className="order-first lg:order-last">
          <img 
            src="/lovable-uploads/88274395-eb09-4160-8156-474562fc37fb.png"
            alt="Sérum skincare"
            className="w-full h-auto rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DailyRoutineQuiz;