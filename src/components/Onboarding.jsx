import { useState } from 'react';
import { Sun, CloudSun, Moon, Car, Utensils, Zap, CheckCircle2 } from 'lucide-react';

const TIMELINE = [
  {
    id: 'morning',
    title: 'Morning Routine',
    icon: Sun,
    cards: [
      { id: 'm1', title: 'Drove to Work', desc: 'Commuted alone in a gas car.', category: 'transport', impact: 400, icon: Car },
      { id: 'm2', title: 'Heavy Breakfast', desc: 'Ate a meat-heavy breakfast.', category: 'diet', impact: 150, icon: Utensils },
      { id: 'm3', title: 'Long Hot Shower', desc: 'Used the water heater for 20+ mins.', category: 'energy', impact: 100, icon: Zap },
      { id: 'm4', title: 'Biked to Work', desc: 'Zero emissions commute.', category: 'transport', impact: 0, icon: Car },
    ]
  },
  {
    id: 'afternoon',
    title: 'Afternoon Hustle',
    icon: CloudSun,
    cards: [
      { id: 'a1', title: 'Beef Burger Lunch', desc: 'High carbon footprint meal.', category: 'diet', impact: 300, icon: Utensils },
      { id: 'a2', title: 'AC on Max', desc: 'Cooled the whole office/house.', category: 'energy', impact: 150, icon: Zap },
      { id: 'a3', title: 'Salad Lunch', desc: 'Low carbon, plant-based meal.', category: 'diet', impact: 50, icon: Utensils },
      { id: 'a4', title: 'Delivery Run', desc: 'Drove for errands during lunch.', category: 'transport', impact: 100, icon: Car },
    ]
  },
  {
    id: 'evening',
    title: 'Evening Wind Down',
    icon: Moon,
    cards: [
      { id: 'e1', title: 'Drove Home', desc: 'Standard rush hour commute.', category: 'transport', impact: 400, icon: Car },
      { id: 'e2', title: 'Lights On All Night', desc: 'Forgot to turn off lights/screens.', category: 'energy', impact: 80, icon: Zap },
      { id: 'e3', title: 'Vegetarian Dinner', desc: 'Eco-friendly evening meal.', category: 'diet', impact: 50, icon: Utensils },
      { id: 'e4', title: 'Carpool Home', desc: 'Shared the ride with a coworker.', category: 'transport', impact: 150, icon: Car },
    ]
  }
];

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  const toggleCard = (card) => {
    setSelectedCards(prev => {
      const isSelected = prev.find(c => c.id === card.id);
      if (isSelected) return prev.filter(c => c.id !== card.id);
      return [...prev, card];
    });
  };

  const handleNext = () => {
    if (currentStep < TIMELINE.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate totals per category
      const totals = { transport: 0, diet: 0, energy: 0 };
      selectedCards.forEach(card => {
        totals[card.category] += card.impact;
      });
      // Ensure some base footprint even if nothing selected
      if (totals.transport === 0) totals.transport = 50;
      if (totals.diet === 0) totals.diet = 100;
      if (totals.energy === 0) totals.energy = 50;
      
      onComplete(totals);
    }
  };

  const stepData = TIMELINE[currentStep];
  const StepIcon = stepData.icon;

  return (
    <div style={{ maxWidth: '900px', margin: '3rem auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-2)' }}>Let's Recall Your Day</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>Select the activities that best match your day.</p>
        
        {/* Timeline Progress */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-6)' }}>
          {TIMELINE.map((step, idx) => (
            <div key={step.id} style={{ 
              display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)',
              opacity: idx === currentStep ? 1 : 0.5,
              fontWeight: idx === currentStep ? 700 : 400,
              color: idx === currentStep ? 'var(--color-primary)' : 'var(--color-text-muted)'
            }}>
              <step.icon size={24} />
              <span>{step.title}</span>
              {idx < TIMELINE.length - 1 && <div style={{ width: '40px', height: '2px', background: '#E2E8F0', marginLeft: 'var(--spacing-2)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-6)' }}>
          <StepIcon size={32} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{stepData.title}</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-6)' }}>
          {stepData.cards.map((card) => {
            const isSelected = selectedCards.some(c => c.id === card.id);
            const CardIcon = card.icon;
            return (
              <div 
                key={card.id} 
                className={`flashcard ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleCard(card)}
              >
                {isSelected && (
                  <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', padding: '4px', zIndex: 10 }}>
                    <CheckCircle2 size={24} />
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="flashcard-icon">
                    <CardIcon size={32} />
                  </div>
                  <span className={`tag ${card.category}`}>{card.category.toUpperCase()}</span>
                </div>
                
                <h4 className="flashcard-title">{card.title}</h4>
                <p className="flashcard-desc">{card.desc}</p>
                
                <div className="flashcard-meta">
                  <span style={{ color: 'var(--color-text-muted)' }}>Est. Impact</span>
                  <span style={{ color: card.impact > 200 ? 'var(--color-danger)' : card.impact > 100 ? 'var(--color-warning)' : 'var(--color-primary)' }}>
                    +{card.impact} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--spacing-8)', borderTop: '1px solid #E2E8F0', paddingTop: 'var(--spacing-6)' }}>
          <button className="btn btn-primary" onClick={handleNext}>
            {currentStep < TIMELINE.length - 1 ? 'Continue to Next Part of Day' : 'See My Footprint Breakdown'}
          </button>
        </div>
      </div>
      
    </div>
  );
}
