import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ConcernsQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/zones-quiz");
  };

  const concerns = [
    { text: "Rides", icon: "🌊" },
    { text: "Cernes", icon: "👁" },
    { text: "Points noirs", icon: "⚫" },
    { text: "Taches pigmentaires", icon: "🔆" },
    { text: "Rougeurs", icon: "🔴" },
    { text: "Boutons", icon: "💢" },
    { text: "Imperfections", icon: "✨" },
    { text: "Pores dilatés", icon: "🔍" },
    { text: "Perte de fermeté", icon: "↘️" },
  ];

  return (
    <div 
      className="concerns-page flex items-center justify-center px-4"
      style={{
        background: `url('/lovable-uploads/1d440ab2-18af-4c01-8e87-95330abe6284.png')`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
    >
      <div className="concerns-overlay" />
      
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start relative z-10 pt-12 pb-12">
        <div className="space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="concerns-title"
          >
            Quelles sont vos principales préoccupations ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {concerns.map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={handleOptionClick}
                className="concerns-button"
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-1 gap-4">
          {concerns.map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={handleOptionClick}
              className="concerns-button"
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

export default ConcernsQuiz;