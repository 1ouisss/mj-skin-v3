
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

describe('Quiz Flow Integration', () => {
  it('completes full quiz flow and shows recommendations', async () => {
    const mockFetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          Products: ['Test Product'],
          Routine: {
            Matin: ['Step 1'],
            Soir: ['Step 1'],
            Résultat: 'Test Result'
          }
        })
      })
    );
    
    global.fetch = mockFetch;

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Start quiz
    fireEvent.click(screen.getByText('Commencer'));

    // Complete quiz steps
    const steps = [
      'Sèche',
      'Acné',
      'Taches brunes',
      'Visage',
      'Crème',
      'Sans parfum',
      'Oui'
    ];

    for (const answer of steps) {
      await waitFor(() => {
        const option = screen.getByText(answer);
        fireEvent.click(option);
        fireEvent.click(screen.getByText('Suivant'));
      });
    }

    // Verify recommendations are shown
    await waitFor(() => {
      expect(screen.getByText('Vos Recommandations Personnalisées')).toBeInTheDocument();
    });
  });
});
