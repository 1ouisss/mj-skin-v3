
import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { RecommendationResult } from '../types/skincare';
import { validateRecommendationResponse } from '../utils/recommendationValidator';

const Recommendations = () => {
  const { state } = useQuiz();
  const { answers, completed } = state;
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!completed || !answers.skinType) {
      toast.error('Veuillez compléter le questionnaire');
      navigate('/', { replace: true });
      return;
    }
  }, [completed, answers, navigate]);

  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();

    const fetchRecommendations = async () => {
      if (!completed || !answers.skinType) return;

      try {
        if (isSubscribed) {
          setLoading(true);
          setError(null);
        }

        const params = new URLSearchParams({
          skinType: answers.skinType,
          conditions: answers.conditions || '',
          concerns: answers.concerns || ''
        });

        const response = await fetch(`/api/recommendations?${params}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Aucune recommandation trouvée pour ces critères');
          } else if (response.status === 429) {
            throw new Error('Trop de requêtes, veuillez réessayer plus tard');
          } else {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
          }
        }

        const data = await response.json();
        const validatedData = validateRecommendationResponse(data);
        
        if (!validatedData) {
          throw new Error('Format de données invalide');
        }
        
        setRecommendations(validatedData);
        console.log('Recommendations fetched successfully:', validatedData);
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : error instanceof DOMException && error.name === 'AbortError'
            ? 'La requête a pris trop de temps'
            : 'Une erreur inattendue est survenue';
            
        console.error('Recommendation fetch error:', {
          error,
          answers,
          timestamp: new Date().toISOString()
        });
        
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [answers, completed, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-xl font-semibold text-red-600">Erreur</h2>
            <p className="text-gray-600">{error}</p>
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen w-full p-4 max-w-4xl mx-auto"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-playfair text-center">
            Vos Recommandations Personnalisées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendations && (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Résultats de l'Analyse</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>Type de peau: {answers.skinType}</p>
                  {answers.conditions && <p>Condition: {answers.conditions}</p>}
                  {answers.concerns && <p>Préoccupations: {answers.concerns}</p>}
                </div>
              </section>

              {recommendations.Products && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Produits Recommandés</h2>
                  <ul className="space-y-4">
                    {recommendations.Products.map((product, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        {product}
                      </motion.li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}

          <div className="flex justify-center pt-6">
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Recommendations;
