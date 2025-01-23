import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower, Leaf } from "lucide-react";

const FragranceQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (fragrance: string) => {
    localStorage.setItem('fragrance', JSON.stringify(fragrance));
    navigate("/routinequiz");
  };

  return (
    <div 
      className="zones-page flex items-center justify-center px-4"
      style={{
        background: `url('/lovable-uploads/92cbd281-4b9a-44d7-b3d1-06802348e434.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >      
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="zones-title"
        >
          Préférez-vous des produits avec ou sans odeur ?
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[
            { text: "Avec parfum naturel", icon: Flower },
            { text: "Sans huiles essentielles", icon: Leaf },
          ].map((option, index) => (
            <motion.button
              key={option.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.text)}
              className="zones-button bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
            >
              <option.icon className="w-6 h-6 stroke-current" />
              <span className="text-lg">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FragranceQuiz;