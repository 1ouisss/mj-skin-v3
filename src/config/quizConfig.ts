import { Flower2, Droplets, Scale, Cloud, Sparkles, Waves, Eye, Circle, Sun, Heart, Zap, Search, ArrowDown } from 'lucide-react';

export type QuizStep = {
  id: string;
  title: string;
  field: string;
  options: {
    text: string;
    icon?: any;
    value: string;
  }[];
  required?: boolean;
  backgroundImage?: string;
};

export const quizStepsDetailed: QuizStep[] = [
  {
    id: 'skintype',
    title: 'Quel est votre type de peau ?',
    field: 'skinType',
    required: true,
    backgroundImage: '/lovable-uploads/686da753-061a-4c41-8ca0-ddada141a419.png',
    options: [
      { text: 'Sèche', icon: Flower2, value: 'Sèche' },
      { text: 'Grasse', icon: Droplets, value: 'Grasse' },
      { text: 'Mixte', icon: Scale, value: 'Mixte' },
      { text: 'Sensible', icon: Cloud, value: 'Sensible' },
      { text: 'Terne', icon: Cloud, value: 'Terne' },
      { text: 'Normale', icon: Sparkles, value: 'Normale' }
    ]
  },
  {
    id: 'concerns',
    title: 'Quelles sont vos principales préoccupations ?',
    field: 'concerns',
    required: true,
    backgroundImage: '/lovable-uploads/c4404277-0805-453c-8dde-ca2ab249f514.png',
    options: [
      { text: 'Rides', icon: Waves, value: 'Rides' },
      { text: 'Cernes', icon: Eye, value: 'Cernes' },
      { text: 'Points noirs', icon: Circle, value: 'Points noirs' },
      { text: 'Taches pigmentaires', icon: Sun, value: 'Taches pigmentaires' },
      { text: 'Rougeurs', icon: Heart, value: 'Rougeurs' },
      { text: 'Boutons', icon: Zap, value: 'Boutons' },
      { text: 'Imperfections', icon: Sparkles, value: 'Imperfections' },
      { text: 'Pores dilatés', icon: Search, value: 'Pores dilatés' },
      { text: 'Perte de fermeté', icon: ArrowDown, value: 'Perte de fermeté' }
    ]
  }
  // Add other steps here...
];

export const quizSteps = [
  { id: 'skintypequiz', title: 'Type de Peau', component: 'SkinTypeQuiz' },
  { id: 'conditionsquiz', title: 'Conditions', component: 'ConditionsQuiz' },
  { id: 'concernsquiz', title: 'Préoccupations', component: 'ConcernsQuiz' },
  { id: 'zonesquiz', title: 'Zones', component: 'ZonesQuiz' },
  { id: 'treatmentquiz', title: 'Traitement', component: 'TreatmentQuiz' },
  { id: 'fragrancequiz', title: 'Parfum', component: 'FragranceQuiz' },
  { id: 'routinequiz', title: 'Routine', component: 'RoutineQuiz' },
  { id: 'newsletterquiz', title: 'Newsletter', component: 'NewsletterQuiz' }
];

export const getNextStepId = (currentStepId: string): string => {
  const currentIndex = quizSteps.findIndex(step => step.id === currentStepId);
  return currentIndex < quizSteps.length - 1 ? quizSteps[currentIndex + 1].id : 'preview';
};