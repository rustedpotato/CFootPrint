import { useState } from 'react';
import Assistant from './Assistant';
import { Activity, Zap, TrendingDown } from 'lucide-react';

const ACTIONS = [
  { id: 1, label: 'Ate a vegetarian meal', points: 10, icon: '🥗' },
  { id: 2, label: 'Biked to work', points: 25, icon: '🚴' },
  { id: 3, label: 'Used reusable bags', points: 5, icon: '🛍️' },
  { id: 4, label: 'Turned off AC for 4 hours', points: 15, icon: '🌬️' },
];

export default function Dashboard({ initialScore }) {
  const [currentScore, setCurrentScore] = useState(initialScore);
  const [loggedActions, setLoggedActions] = useState([]);

  const logAction = (action) => {
    setLoggedActions(prev => [{ ...action, timestamp: new Date() }, ...prev]);
    setCurrentScore(prev => Math.max(0, prev - action.points));
  };

  const scoreStatus = currentScore > 800 ? 'Needs Improvement' : currentScore > 400 ? 'Average' : 'Excellent';
  const statusColor = currentScore > 800 ? 'var(--color-danger)' : currentScore > 400 ? 'var(--color-warning)' : 'var(--color-primary)';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 'var(--spacing-6)', marginTop: 'var(--spacing-6)' }}>
      
      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        
        {/* Score Card */}
        <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-1)' }}>Your Footprint Score</h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: statusColor, lineHeight: 1 }}>
                {currentScore} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>kg CO₂e</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-1)', backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-2) var(--spacing-3)', borderRadius: 'var(--radius-full)', fontWeight: 500, color: statusColor }}>
                <Activity size={18} />
                {scoreStatus}
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: 'var(--spacing-6)', height: '8px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              backgroundColor: statusColor, 
              width: `${Math.min(100, (currentScore / 1200) * 100)}%`,
              transition: 'width 1s ease-in-out, background-color 0.5s ease'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-1)' }}>
            <span>0 (Ideal)</span>
            <span>1200+ (High)</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-6)', animationDelay: '100ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
            <Zap size={24} color="var(--color-warning)" />
            <h3 style={{ margin: 0 }}>Log a Quick Action</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--spacing-3)' }}>
            {ACTIONS.map(action => (
              <button 
                key={action.id} 
                className="btn btn-secondary" 
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', padding: 'var(--spacing-3)', height: '100%' }}
                onClick={() => logAction(action)}
              >
                <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                <span style={{ fontSize: '0.9rem', textAlign: 'center' }}>{action.label}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>-{action.points} pts</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Actions List */}
        {loggedActions.length > 0 && (
          <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-6)', animationDelay: '200ms' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
               <TrendingDown size={24} color="var(--color-primary)" />
               <h3 style={{ margin: 0 }}>Recent Reductions</h3>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                {loggedActions.slice(0, 3).map((action, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-3)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                      <span style={{ fontSize: '1.2rem' }}>{action.icon}</span>
                      <span>{action.label}</span>
                    </div>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>-{action.points}</span>
                  </div>
                ))}
             </div>
          </div>
        )}

      </div>

      {/* Sidebar - Assistant */}
      <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <Assistant currentScore={currentScore} />
      </div>

    </div>
  );
}
