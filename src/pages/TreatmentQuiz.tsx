import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather, Droplets, Flower2, Sparkles } from "lucide-react";

const TreatmentQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (texture: string) => {
    localStorage.setItem('texturePreference', JSON.stringify(texture));
    navigate("/fragrancequiz");
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
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="treatment-title"
        >
          Quel type de texture préférez-vous pour vos produits ?
        </motion.h1>

        <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto mt-12">
          {[
            { text: "Légère", icon: Feather },
            { text: "Fluide", icon: Droplets },
            { text: "Crémeuse", icon: Flower2 },
            { text: "Riche", icon: Sparkles },
          ].map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.text)}
              className="treatment-button"
            >
              <option.icon className="w-6 h-6 stroke-[1.5]" />
              <span className="text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentQuiz;