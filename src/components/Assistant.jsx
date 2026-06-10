import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function Assistant({ currentScore }) {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi! I'm your EcoTrack AI Assistant. Based on your assessment, your carbon score is ${currentScore}. How can I help you reduce it today?`, sender: 'ai' }
  ]);
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
    if (text.includes('drive') || text.includes('car')) {
      return "Driving is a major source of emissions. Could you try carpooling or biking for short trips? Even replacing one drive a week can save ~50 points!";
    }
    if (text.includes('eat') || text.includes('food') || text.includes('meat')) {
      return "Diet plays a big role. Going meatless just one day a week (like Meatless Monday) can significantly lower your carbon footprint.";
    }
    if (text.includes('energy') || text.includes('electricity') || text.includes('heat')) {
      return "Try lowering your thermostat by 1-2 degrees in winter or using LED bulbs. It saves money and reduces carbon emissions.";
    }
    return "That's a great question! Small consistent actions like reducing waste, buying local, and saving energy all add up. Let's tackle one thing at a time.";
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
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '400px', overflow: 'hidden' }}>
      <div style={{ padding: 'var(--spacing-3)', borderBottom: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'var(--color-primary-light)', color: 'white', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Bot size={24} />
        <h3 style={{ margin: 0, color: 'white' }}>Eco Assistant</h3>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-2)', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            {msg.sender === 'ai' && <div style={{ background: 'var(--color-primary)', color: 'white', padding: 'var(--spacing-1)', borderRadius: '50%' }}><Bot size={16} /></div>}
            
            <div style={{
              backgroundColor: msg.sender === 'user' ? 'var(--color-secondary)' : 'var(--color-surface)',
              color: msg.sender === 'user' ? 'white' : 'var(--color-text)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              borderRadius: 'var(--radius-lg)',
              borderBottomRightRadius: msg.sender === 'user' ? 0 : 'var(--radius-lg)',
              borderBottomLeftRadius: msg.sender === 'ai' ? 0 : 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {msg.text}
            </div>
            
            {msg.sender === 'user' && <div style={{ background: 'var(--color-secondary)', color: 'white', padding: 'var(--spacing-1)', borderRadius: '50%' }}><User size={16} /></div>}
          </div>
        ))}
        {isTyping && (
           <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', alignSelf: 'flex-start' }}>
             <div style={{ background: 'var(--color-primary)', color: 'white', padding: 'var(--spacing-1)', borderRadius: '50%' }}><Bot size={16} /></div>
             <div className="animate-pulse" style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-2) var(--spacing-3)', borderRadius: 'var(--radius-lg)' }}>
               Typing...
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', padding: 'var(--spacing-3)', borderTop: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'var(--color-surface)' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for advice..." 
          className="input-field" 
          style={{ flex: 1, marginBottom: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        />
        <button type="submit" className="btn btn-primary" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
