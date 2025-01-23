
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizStep } from '../../components/QuizStep';
import { QuizProvider } from '../../context/QuizContext';

describe('QuizStep', () => {
  it('renders quiz step correctly', () => {
    const mockProps = {
      title: 'Test Step',
      options: ['Option 1', 'Option 2'],
      selectedOption: '',
      onSelect: vi.fn(),
      onNext: vi.fn()
    };

    render(
      <QuizProvider>
        <QuizStep {...mockProps} />
      </QuizProvider>
    );

    expect(screen.getByText('Test Step')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('calls onSelect when option is clicked', () => {
    const mockOnSelect = vi.fn();
    
    render(
      <QuizProvider>
        <QuizStep
          title="Test"
          options={['Option 1']}
          selectedOption=""
          onSelect={mockOnSelect}
          onNext={vi.fn()}
        />
      </QuizProvider>
    );

    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnSelect).toHaveBeenCalledWith('Option 1');
  });
});
