import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NewsletterQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (choice: string) => {
    // Ici vous pourriez ajouter la logique pour gérer l'inscription à la newsletter
    console.log("Newsletter choice:", choice);
    // Pour l'instant, on navigue simplement vers la page suivante
    navigate("/");
  };

  return (
    <div 
      className="zones-page flex items-center justify-center px-4 min-h-screen w-full"
      style={{
        backgroundImage: `url('/lovable-uploads/97193a0c-73fe-4c13-8880-7cf2f1fa98a8.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
      }}
    >      
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="elegant-title text-4xl md:text-5xl font-light tracking-wider leading-tight text-center mb-16 text-[#4A4A4A]"
        >
          Souhaitez-vous recevoir la lettre de Jacynthe avec des rituels beauté par saison et des inspirations ?
        </motion.h1>

        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {[
            { text: "Oui", value: "yes", icon: "✨" },
            { text: "Non", value: "no", icon: "🤍" },
          ].map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.value)}
              className="elegant-button bg-white/80 backdrop-blur-sm hover:bg-white/90 text-[#4A4A4A] border border-[#4A4A4A]/20 py-6"
            >
              <span className="text-2xl mr-2">{option.icon}</span>
              <span className="text-lg tracking-wider">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsletterQuiz;