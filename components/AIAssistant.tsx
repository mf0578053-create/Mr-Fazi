
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm your AI Design Strategist. Want to know more about the design process behind these works?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.slice(-5); // Send last 5 for context
    const aiResponse = await geminiService.sendMessage(input, history);
    
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-white rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="p-4 bg-blue-600 border-b border-blue-700 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold text-sm text-white">Design Strategist AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-blue-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#2563EB] text-white rounded-tr-none' 
                    : 'bg-[#F3F4F6] text-[#111827] border border-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F3F4F6] border border-gray-200 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my process..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-[#2563EB] hover:bg-blue-700 text-white p-2 rounded-full transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative bg-[#2563EB] hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        >
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[#111827] shadow-xl border border-gray-100">
            Chat with my Design AI
          </span>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
