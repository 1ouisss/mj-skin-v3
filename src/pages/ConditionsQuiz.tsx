import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Flower2, Check } from "lucide-react";

const ConditionsQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (condition: string) => {
    localStorage.setItem('conditions', JSON.stringify(condition));
    navigate("/concernsquiz");
  };

  return (
    <div 
      className="flex items-center justify-center px-4 min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/ada41ff7-d054-4869-8e8a-8138b7c1aa81.png')`,
        backgroundSize: '150%', // Zoomed out for better quality
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" /> {/* Added subtle overlay for better text readability */}
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-[#222222] text-center mb-12"
          >
            Avez-vous une condition particulière ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 mt-8">
            {[
              { text: "Acné", icon: Sparkles },
              { text: "Eczéma", icon: Flower2 },
              { text: "Aucune", icon: Check },
            ].map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionClick(option.text)}
                className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-[#222222] rounded-full py-4 px-6 shadow-lg transition-colors"
              >
                <option.icon className="w-6 h-6 stroke-[1.5]" />
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsQuiz;