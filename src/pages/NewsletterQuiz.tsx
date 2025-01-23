import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

const NewsletterQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = (choice: string) => {
    const answers = {
      "Newsletter": choice,
      "Choix Newsletter": choice === "yes" ? "Je souhaite recevoir la newsletter" : "Je ne souhaite pas recevoir la newsletter"
    };
    navigate("/recommendations", { 
      state: { 
        selectedAnswers: answers
      },
      replace: true
    });
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left content section */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center" style={{ paddingTop: '15vh' }}>
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
      <div className="hidden lg:block w-1/2 relative bg-gray-100">
        <img
          src="/lovable-uploads/IMG_3219 2.jpg"
          alt="Portrait élégant en noir et blanc"
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder.svg";
            console.error('Failed to load image');
          }}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default NewsletterQuiz;