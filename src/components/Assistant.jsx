import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function Assistant({ categoryData, maxCategory }) {
  // Initial message is now tailored to the user's specific highest footprint category
  const [messages, setMessages] = useState(() => {
    let openingText = `Hi! I'm your Eco Assistant. I noticed that **${maxCategory}** was your highest source of carbon emissions today (${categoryData[maxCategory]} pts). `;
    
    if (maxCategory === 'transport') {
      openingText += "Would you like some tips on reducing your commute footprint?";
    } else if (maxCategory === 'diet') {
      openingText += "Would you like to explore some lower-carbon meal options?";
    } else {
      openingText += "Would you like some quick tips to save energy at home?";
    }

    return [{ id: 1, text: openingText, sender: 'ai' }];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes('yes') || text.includes('sure') || text.includes('tips')) {
      if (maxCategory === 'transport') return "Awesome! Try taking public transit once a week or organizing a carpool. E-bikes are also a fantastic zero-emission alternative for short errands!";
      if (maxCategory === 'diet') return "Great! Swapping beef for chicken can halve that meal's footprint. Even better, try 'Meatless Mondays' using plant-based proteins like lentils or tofu.";
      if (maxCategory === 'energy') return "Perfect. Unplugging devices when not in use stops 'vampire drain'. Also, setting your AC a couple of degrees warmer can save up to 10% on energy!";
    }
    
    if (text.includes('drive') || text.includes('car')) {
      return "Driving is a major source of emissions. Even replacing one drive a week can save ~50 points!";
    }
    if (text.includes('eat') || text.includes('food') || text.includes('meat')) {
      return "Diet plays a big role. Plant-based meals generally require far less land and water to produce.";
    }
    
    return "That makes sense. Every small action counts towards a bigger goal. Let's tackle one area at a time!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI delay
    setTimeout(() => {
      const aiResponseText = generateAIResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponseText, sender: 'ai' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '500px', overflow: 'hidden' }}>
      <div style={{ padding: 'var(--spacing-4)', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: 'white', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '50%' }}>
          <Bot size={24} />
        </div>
        <div>
          <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>Eco Assistant</h3>
          <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Online</span>
        </div>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)' }}>
        {messages.map(msg => (
          <div key={msg.id} className="animate-fade-in" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            {msg.sender === 'ai' && <div style={{ background: 'var(--color-primary-light)', color: 'white', padding: 'var(--spacing-2)', borderRadius: '50%', flexShrink: 0 }}><Bot size={18} /></div>}
            
            <div style={{
              backgroundColor: msg.sender === 'user' ? 'var(--color-secondary)' : '#F1F5F9',
              color: msg.sender === 'user' ? 'white' : 'var(--color-text)',
              padding: 'var(--spacing-3) var(--spacing-4)',
              borderRadius: 'var(--radius-lg)',
              borderBottomRightRadius: msg.sender === 'user' ? 0 : 'var(--radius-lg)',
              borderBottomLeftRadius: msg.sender === 'ai' ? 0 : 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              fontSize: '0.95rem',
              lineHeight: 1.5
            }}>
              {/* Simple bold text parser for markdown-like bolding in initial message */}
              {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{textTransform: 'capitalize'}}>{part}</strong> : part)}
            </div>
          </div>
        ))}
        {isTyping && (
           <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', alignSelf: 'flex-start' }}>
             <div style={{ background: 'var(--color-primary-light)', color: 'white', padding: 'var(--spacing-2)', borderRadius: '50%' }}><Bot size={18} /></div>
             <div className="animate-pulse" style={{ backgroundColor: '#F1F5F9', padding: 'var(--spacing-3) var(--spacing-4)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-muted)' }}>
               Typing...
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', padding: 'var(--spacing-4)', borderTop: '1px solid #E2E8F0', backgroundColor: 'var(--color-surface)' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..." 
          className="input-field" 
          style={{ flex: 1, marginBottom: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 'none' }}
        />
        <button type="submit" className="btn btn-primary" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, padding: 'var(--spacing-2) var(--spacing-4)' }}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
