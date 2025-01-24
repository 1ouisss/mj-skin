import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const Recommendations = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 md:py-20"
      style={{
        backgroundImage: `url('/lovable-uploads/e7f53e65-98ef-4caa-81f1-4e780443f462.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Products Section */}
        <motion.section 
          className="results-section mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-center mb-12 text-[#4A4A4A] tracking-wide">
            Vos recommandations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {[1, 2, 3].map((index) => (
              <Card 
                key={index}
                className="product-card bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                data-product-placeholder={`product-${index}`}
              >
                <CardContent className="flex items-center justify-center p-8 h-48">
                  <p className="text-lg text-[#8E9196] text-center font-playfair">
                    Votre produit s'affiche ici
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Routine Section */}
        <motion.section 
          className="routine-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-center mb-12 text-[#4A4A4A] tracking-wide">
            Votre routine recommandée
          </h2>
          
          <Card className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <CardContent className="p-8">
              <div 
                className="min-h-[200px] flex items-center justify-center text-center"
                data-routine-placeholder="routine-text"
              >
                <p className="text-lg text-[#8E9196] font-playfair">
                  Votre routine personnalisée s'affiche ici
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Recommendations;