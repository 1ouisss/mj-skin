import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TreatmentQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (answer: boolean) => {
    // Navigate to the next step based on the answer
    navigate("/next-step");
  };

  return (
    <div 
      className="treatment-page flex items-center justify-center px-4"
      style={{
        background: `url('/lovable-uploads/e4d6398e-4d46-4f6c-9e47-7bf72ff4a9a9.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="treatment-overlay" />
      
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="treatment-title"
        >
          Êtes-vous actuellement sous traitement dermatologique ?
        </motion.h1>

        <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto mt-12">
          {[
            { text: "Oui", value: true },
            { text: "Non", value: false },
          ].map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.value)}
              className="treatment-button"
            >
              <span className="text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentQuiz;