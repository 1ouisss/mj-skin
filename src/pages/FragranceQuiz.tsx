
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower, Leaf } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";
import { useSkinType } from "@/contexts/SkinTypeContext";

const FragranceQuiz = () => {
  const navigate = useNavigate();
  const { setFragrancePreference } = useSkinType();

  const handleOptionClick = (fragrance: string) => {
    setFragrancePreference(fragrance);
    navigate("/recommendations");
  };

  const options = [
    { 
      text: "Avec parfum naturel", 
      icon: Flower, 
      desc: "Des parfums naturels et délicats" 
    },
    { 
      text: "Sans huiles essentielles", 
      icon: Leaf, 
      desc: "Formule neutre sans parfum" 
    }
  ];

  return (
    <div 
      className="flex items-center justify-center px-4 min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/9db36b67-5238-454f-bda3-39222bd9fecc.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >      
      <ProgressHeader currentStep={5} />
      
      <div className="w-full max-w-4xl mx-auto relative z-10 p-12 bg-white/80 backdrop-blur-sm rounded-[32px] shadow-lg">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-light text-gray-900">
            Préférez-vous des produits avec ou sans odeur ?
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Sélectionnez votre préférence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {options.map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.text)}
              className="flex flex-col items-start gap-2 bg-white hover:bg-gray-50 
                       text-gray-800 rounded-2xl p-6 shadow-md transition-all duration-300 
                       group border border-gray-100"
            >
              <div className="flex items-center gap-4 w-full">
                <option.icon className="w-6 h-6 stroke-[1.5] text-gray-700" />
                <span className="text-xl font-playfair">{option.text}</span>
              </div>
              <p className="text-sm text-gray-600 pl-10 font-light">{option.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FragranceQuiz;
