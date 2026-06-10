import { useState } from 'react';
import { Leaf } from 'lucide-react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  // Now stores an object: { transport: number, diet: number, energy: number }
  const [footprintData, setFootprintData] = useState(null);

  const handleAssessmentComplete = (data) => {
    setFootprintData(data);
  };

  const handleReset = () => {
    setFootprintData(null);
  };

  return (
    <div className="app-container">
      <header className="glass-panel" style={{ margin: 'var(--spacing-4)', padding: 'var(--spacing-4)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', position: 'relative', zIndex: 10 }}>
        <Leaf color="var(--color-primary)" size={32} />
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>
          Ctracer
        </h1>
        {footprintData !== null && (
          <button className="btn btn-secondary" style={{ marginLeft: 'auto', padding: 'var(--spacing-2) var(--spacing-4)', fontSize: '0.9rem' }} onClick={handleReset}>
            Restart Day Recall
          </button>
        )}
      </header>

      <main className="container animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
        {footprintData === null ? (
          <Onboarding onComplete={handleAssessmentComplete} />
        ) : (
          <Dashboard initialData={footprintData} />
        )}
      </main>
    </div>
  );
}

export default App;
