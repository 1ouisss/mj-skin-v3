
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { 
  Waves, 
  Eye, 
  Circle, 
  Sun, 
  Heart, 
  Zap, 
  Sparkles, 
  Search, 
  ArrowDown 
} from "lucide-react";

const ConcernsQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (concern: string) => {
    localStorage.setItem('concerns', JSON.stringify(concern));
    navigate("/zonesquiz");
    console.log('Navigating to zones quiz');
  };

  const concerns = [
    { text: "Rides", icon: Waves },
    { text: "Cernes", icon: Eye },
    { text: "Points noirs", icon: Circle },
    { text: "Taches pigmentaires", icon: Sun },
    { text: "Rougeurs", icon: Heart },
    { text: "Boutons", icon: Zap },
    { text: "Imperfections", icon: Sparkles },
    { text: "Pores dilatés", icon: Search },
    { text: "Perte de fermeté", icon: ArrowDown },
  ];

  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/c4404277-0805-453c-8dde-ca2ab249f514.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >      
      <div className="w-full h-full flex items-center justify-center p-4 pt-20">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-white"
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
                  onClick={() => handleOptionClick(option.text)}
                  className="concerns-button"
                >
                  <option.icon className="w-6 h-6 stroke-current" />
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
                onClick={() => handleOptionClick(option.text)}
                className="concerns-button"
              >
                <option.icon className="w-6 h-6 stroke-current" />
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernsQuiz;
