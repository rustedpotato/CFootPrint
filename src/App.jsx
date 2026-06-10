import { useState } from 'react';
import { Leaf } from 'lucide-react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [footprintScore, setFootprintScore] = useState(null);

  const handleAssessmentComplete = (score) => {
    setFootprintScore(score);
  };

  const handleReset = () => {
    setFootprintScore(null);
  };

  return (
    <div className="app-container">
      <header className="glass-panel" style={{ margin: 'var(--spacing-4)', padding: 'var(--spacing-4)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Leaf color="var(--color-primary)" size={32} />
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>
          EcoTrack AI
        </h1>
        {footprintScore !== null && (
          <button className="btn btn-secondary" style={{ marginLeft: 'auto' }} onClick={handleReset}>
            Retake Assessment
          </button>
        )}
      </header>

      <main className="container animate-fade-in">
        {footprintScore === null ? (
          <Onboarding onComplete={handleAssessmentComplete} />
        ) : (
          <Dashboard initialScore={footprintScore} />
        )}
      </main>
    </div>
  );
}

export default App;
