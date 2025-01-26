import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

const NewsletterQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (choice: string) => {
    console.log("Newsletter choice:", choice);
    navigate("/recommendations");
  };

  return (
    <div 
      className="min-h-screen w-full flex"
      style={{
        background: `url('/lovable-uploads/a33d5244-470c-46e4-aedc-b08a04f5ecbb.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ProgressHeader currentStep={8} />
      
      {/* Left content section */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center backdrop-blur-sm bg-white/30">
        <div className="max-w-xl w-full">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="elegant-title text-4xl md:text-5xl font-light tracking-wider leading-tight text-center mb-16 text-[#4A4A4A]"
          >
            Souhaitez-vous recevoir la lettre de Jacynthe avec des rituels beauté par saison et des inspirations ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {[
              { text: "Oui", value: "yes", icon: Sparkles },
              { text: "Non", value: "no", icon: Heart },
            ].map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionClick(option.value)}
                className="elegant-button bg-white/80 backdrop-blur-sm hover:bg-white/90 text-[#4A4A4A] border border-[#4A4A4A]/20 py-6"
              >
                <option.icon className="w-6 h-6 mr-2 stroke-current" />
                <span className="text-lg tracking-wider">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Right image section */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src="/lovable-uploads/58c8f277-7b88-4ca7-b0b1-ebf83f82f290.png"
          alt="Portrait élégant"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default NewsletterQuiz;