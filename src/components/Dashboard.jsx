import { useState, useMemo } from 'react';
import Assistant from './Assistant';
import { Activity, Zap, TrendingDown, Car, Utensils, Lightbulb } from 'lucide-react';

const ACTIONS = [
  { id: 1, label: 'Ate a vegetarian meal', points: 50, icon: '🥗', category: 'diet' },
  { id: 2, label: 'Biked to work', points: 100, icon: '🚴', category: 'transport' },
  { id: 3, label: 'Turned off AC for 4 hours', points: 60, icon: '🌬️', category: 'energy' },
];

export default function Dashboard({ initialData }) {
  const [categoryData, setCategoryData] = useState(initialData);
  const [loggedActions, setLoggedActions] = useState([]);

  const totalScore = categoryData.transport + categoryData.diet + categoryData.energy;

  const logAction = (action) => {
    setLoggedActions(prev => [{ ...action, timestamp: new Date() }, ...prev]);
    setCategoryData(prev => ({
      ...prev,
      [action.category]: Math.max(0, prev[action.category] - action.points)
    }));
  };

  const scoreStatus = totalScore > 1000 ? 'Needs Improvement' : totalScore > 500 ? 'Average' : 'Excellent';
  const statusColor = totalScore > 1000 ? 'var(--color-danger)' : totalScore > 500 ? 'var(--color-warning)' : 'var(--color-primary)';

  // Find max category
  const maxCategory = useMemo(() => {
    const categories = Object.entries(categoryData).sort((a, b) => b[1] - a[1]);
    return categories[0]; // [name, value]
  }, [categoryData]);

  const getCategoryColor = (cat) => {
    if (cat === 'transport') return 'var(--color-secondary-light)';
    if (cat === 'diet') return 'var(--color-primary-light)';
    return 'var(--color-warning)';
  };

  const getCategoryIcon = (cat) => {
    if (cat === 'transport') return <Car size={16} />;
    if (cat === 'diet') return <Utensils size={16} />;
    return <Lightbulb size={16} />;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--spacing-6)', marginTop: 'var(--spacing-6)' }}>
      
      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        
        {/* Score Card & Breakdown */}
        <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-6)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--spacing-6)' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-1)' }}>Total Footprint Score</h2>
              <div style={{ fontSize: '3.5rem', fontWeight: '800', color: statusColor, lineHeight: 1 }}>
                {totalScore} <span style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>pts</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-1)', backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-2) var(--spacing-4)', borderRadius: 'var(--radius-full)', fontWeight: 700, color: statusColor, boxShadow: 'var(--shadow-sm)' }}>
                <Activity size={18} />
                {scoreStatus}
              </div>
            </div>
          </div>
          
          <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-4)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              Carbon Use Breakdown
            </h3>
            
            {/* Horizontal Bar Chart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              {Object.entries(categoryData).map(([cat, val]) => (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'capitalize' }}>
                      {getCategoryIcon(cat)} {cat}
                    </span>
                    <span>{val} pts</span>
                  </div>
                  <div style={{ height: '12px', backgroundColor: '#F1F5F9', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      backgroundColor: getCategoryColor(cat), 
                      width: `${Math.min(100, (val / 1000) * 100)}%`,
                      transition: 'width 1s ease-in-out'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--spacing-4)', paddingTop: 'var(--spacing-4)', borderTop: '1px solid #E2E8F0', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Highest emission area today: </span>
              <strong style={{ textTransform: 'capitalize', color: getCategoryColor(maxCategory[0]) }}>{maxCategory[0]}</strong>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-6)', animationDelay: '100ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
            <Zap size={24} color="var(--color-warning)" />
            <h3 style={{ margin: 0 }}>Log a Quick Action</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 'var(--spacing-3)' }}>
            {ACTIONS.map(action => (
              <button 
                key={action.id} 
                className="btn btn-secondary" 
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', padding: 'var(--spacing-4)', height: '100%' }}
                onClick={() => logAction(action)}
              >
                <span style={{ fontSize: '1.8rem' }}>{action.icon}</span>
                <span style={{ fontSize: '0.95rem', textAlign: 'center', fontWeight: 600 }}>{action.label}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold', background: 'var(--color-primary-light)', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>
                  -{action.points} pts
                </span>
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
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-3)', backgroundColor: 'var(--color-surface)', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                      <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                      <span style={{ fontWeight: 600 }}>{action.label}</span>
                    </div>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>-{action.points}</span>
                  </div>
                ))}
             </div>
          </div>
        )}

      </div>

      {/* Sidebar - Assistant */}
      <div className="animate-fade-in" style={{ animationDelay: '300ms', height: '100%' }}>
        <Assistant categoryData={categoryData} maxCategory={maxCategory[0]} />
      </div>

    </div>
  );
}
