import { useState } from 'react';
import { Car, Home, Utensils, CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'transport',
    icon: Car,
    title: 'How do you usually commute?',
    options: [
      { label: 'Drive alone', value: 400 },
      { label: 'Carpool / Public Transit', value: 200 },
      { label: 'Walk / Bike', value: 0 },
    ]
  },
  {
    id: 'diet',
    icon: Utensils,
    title: 'What best describes your diet?',
    options: [
      { label: 'Meat heavy', value: 300 },
      { label: 'Average (Mixed)', value: 200 },
      { label: 'Vegetarian / Vegan', value: 100 },
    ]
  },
  {
    id: 'housing',
    icon: Home,
    title: 'What type of housing do you live in?',
    options: [
      { label: 'Large House', value: 400 },
      { label: 'Average House / Townhome', value: 250 },
      { label: 'Apartment', value: 150 },
    ]
  }
];

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      // Calculate total (mock logic: lower is better, standard is around 1000)
      const totalScore = Object.values({ ...answers, [questionId]: value }).reduce((a, b) => a + b, 0);
      setTimeout(() => onComplete(totalScore), 500);
    }
  };

  const question = QUESTIONS[currentStep];
  const Icon = question.icon;

  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-8)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-4)' }}>
          <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-full)', color: 'white' }}>
            <Icon size={48} />
          </div>
        </div>
        
        <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-2)' }}>{question.title}</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-6)' }}>
          Step {currentStep + 1} of {QUESTIONS.length}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          {question.options.map((opt, i) => (
            <button
              key={i}
              className="btn"
              style={{
                padding: 'var(--spacing-4)',
                border: '2px solid var(--color-surface-hover)',
                backgroundColor: answers[question.id] === opt.value ? 'var(--color-primary-light)' : 'var(--color-surface)',
                color: answers[question.id] === opt.value ? 'white' : 'var(--color-text)',
                justifyContent: 'flex-start',
                fontSize: '1.1rem'
              }}
              onClick={() => handleSelect(question.id, opt.value)}
            >
              {answers[question.id] === opt.value && <CheckCircle2 size={20} />}
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
