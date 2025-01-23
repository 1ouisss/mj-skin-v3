import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

interface QuizStepProps {
  title: string;
  children: React.ReactNode;
  stepNumber: number;
  totalSteps: number;
}

export const QuizStep: React.FC<QuizStepProps> = ({
  title,
  children,
  stepNumber,
  totalSteps
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen w-full p-4 max-w-4xl mx-auto"
    >
      <Card className="w-full">
        <CardContent className="pt-6">
          <h1 className="text-3xl font-playfair text-center mb-8">{title}</h1>
          <div className="text-center mb-6 text-sm text-gray-500">
            Étape {stepNumber} sur {totalSteps}
          </div>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizStep;