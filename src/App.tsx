import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuizProvider } from './context/QuizContext';

// Lazy load components
const Index = React.lazy(() => import(/* webpackChunkName: "index" */ './pages/Index'));
const SkinTypeQuiz = React.lazy(() => import(/* webpackChunkName: "skintype" */ './pages/SkinTypeQuiz'));
const ConditionsQuiz = React.lazy(() => import(/* webpackChunkName: "conditions" */ './pages/ConditionsQuiz'));
const ConcernsQuiz = React.lazy(() => import(/* webpackChunkName: "concerns" */ './pages/ConcernsQuiz'));
const ZonesQuiz = React.lazy(() => import(/* webpackChunkName: "zones" */ './pages/ZonesQuiz'));
const TreatmentQuiz = React.lazy(() => import(/* webpackChunkName: "treatment" */ './pages/TreatmentQuiz'));
const FragranceQuiz = React.lazy(() => import(/* webpackChunkName: "fragrance" */ './pages/FragranceQuiz'));
const RoutineQuiz = React.lazy(() => import(/* webpackChunkName: "routine" */ './pages/RoutineQuiz'));
const NewsletterQuiz = React.lazy(() => import(/* webpackChunkName: "newsletter" */ './pages/NewsletterQuiz'));
const PreviewAnswers = React.lazy(() => import(/* webpackChunkName: "preview" */ './pages/PreviewAnswers'));
const Recommendations = React.lazy(() => import(/* webpackChunkName: "recommendations" */ './pages/Recommendations'));


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <Toaster position="top-center" />
        <div className="app-container">
          <Routes>
          <Route path="/" element={<React.Suspense fallback={<div>Loading...</div>}><Index /></React.Suspense>} />
          <Route path="/skintypequiz" element={<React.Suspense fallback={<div>Loading...</div>}><SkinTypeQuiz /></React.Suspense>} />
          <Route path="/conditionsquiz" element={<React.Suspense fallback={<div>Loading...</div>}><ConditionsQuiz /></React.Suspense>} />
          <Route path="/concernsquiz" element={<React.Suspense fallback={<div>Loading...</div>}><ConcernsQuiz /></React.Suspense>} />
          <Route path="/zonesquiz" element={<React.Suspense fallback={<div>Loading...</div>}><ZonesQuiz /></React.Suspense>} />
          <Route path="/treatmentquiz" element={<React.Suspense fallback={<div>Loading...</div>}><TreatmentQuiz /></React.Suspense>} />
          <Route path="/fragrancequiz" element={<React.Suspense fallback={<div>Loading...</div>}><FragranceQuiz /></React.Suspense>} />
          <Route path="/routinequiz" element={<React.Suspense fallback={<div>Loading...</div>}><RoutineQuiz /></React.Suspense>} />
          <Route path="/newsletterquiz" element={<React.Suspense fallback={<div>Loading...</div>}><NewsletterQuiz /></React.Suspense>} />
          <Route path="/preview" element={<React.Suspense fallback={<div>Loading...</div>}><PreviewAnswers /></React.Suspense>} />
          <Route path="/recommendations" element={<React.Suspense fallback={<div>Loading...</div>}><Recommendations /></React.Suspense>} />
        </Routes>
      </QuizProvider>
    </QueryClientProvider>
  );
}

export default App;