import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower2, Droplets, Scale, Cloud, Sparkles } from "lucide-react";
import { useQuiz } from '../context/QuizContext';

const SkinTypeQuiz = () => {
  const navigate = useNavigate();
  const { updateAnswers } = useQuiz();

  const handleOptionClick = (skinType: string) => {
    try {
      updateAnswers({ skinType });
      navigate("/conditionsquiz");
    } catch (error) {
      console.error('Error handling skin type selection:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="space-y-6 max-w-2xl w-full">
        <h1 className="text-3xl text-center mb-8">Quel est votre type de peau ?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { text: "Sèche", icon: Flower2 },
            { text: "Grasse", icon: Droplets },
            { text: "Mixte", icon: Scale },
            { text: "Sensible", icon: Cloud },
            { text: "Terne", icon: Cloud },
            { text: "Normale", icon: Sparkles }
          ].map((option) => (
            <button
              key={option.text}
              onClick={() => handleOptionClick(option.text)}
              className="flex items-center gap-2 p-4 w-full bg-white hover:bg-gray-50 rounded-lg border"
            >
              <option.icon className="w-5 h-5" />
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;