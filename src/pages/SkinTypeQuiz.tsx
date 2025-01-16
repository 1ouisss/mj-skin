import { useNavigate } from "react-router-dom";
import { Droplets, Feather, Scale, Sparkles, User } from "lucide-react";

const SkinTypeQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/next-question");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side with image and sun icon */}
        <div className="relative">
          <div className="absolute -top-12 -left-12 w-32 h-32">
            <img 
              src="/lovable-uploads/2906bb34-a1e5-4f4e-966c-15e134a52004.png" 
              alt="Sun icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="rounded-3xl overflow-hidden">
            <img
              src="/lovable-uploads/1ca729f7-4515-45e6-8945-eab64e647c53.png"
              alt="Woman portrait"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Right side with question and options */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider leading-tight">
            Quel est votre type de peau principal ?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors"
            >
              <Droplets className="w-6 h-6" />
              <span className="text-lg">Sèche</span>
            </button>

            <button
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors"
            >
              <User className="w-6 h-6" />
              <span className="text-lg">Grasse</span>
            </button>

            <button
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors"
            >
              <Feather className="w-6 h-6" />
              <span className="text-lg">Sensible</span>
            </button>

            <button
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors"
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-lg">Mixte</span>
            </button>

            <button
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors md:col-span-2"
            >
              <Scale className="w-6 h-6" />
              <span className="text-lg">Normale</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;