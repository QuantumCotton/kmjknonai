import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { AtlasConversation, AtlasMessage, sendMessage, startConversation } from '../../services/atlasService';
import Button from '../shared/Button';

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
}

export default function ChatWidget({ 
  position = 'bottom-right',
  primaryColor = '#D4AF37'
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversation, setConversation] = useState<AtlasConversation | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation when widget opens
  useEffect(() => {
    if (isOpen && !conversation) {
      initConversation();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const initConversation = async () => {
    const newConversation = await startConversation();
    setConversation(newConversation);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !conversation) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    const userMsg: AtlasMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, userMsg]
    } : null);

    try {
      const { conversation: updatedConversation } = await sendMessage(conversation.id, userMessage);
      setConversation(updatedConversation);
      // Ensure typing indicator hides before rendering quick replies
      setIsTyping(false);
    } catch (error) {
      console.error('[Atlas] Failed to send message', error);
      setConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, {
          id: `error_${Date.now()}`,
          role: 'assistant',
          content: 'I ran into a connection issue. Could we try that again in a moment?',
          timestamp: new Date()
        }]
      } : null);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'} 
          bg-esh-gold hover:bg-esh-gold-dark text-black rounded-full p-4 shadow-2xl
          transition-all duration-300 hover:scale-110 z-50 group`}
        style={{ backgroundColor: primaryColor }}
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'} 
        ${isMinimized ? 'h-16' : 'h-[600px]'} w-96 bg-white border border-zinc-300 
        shadow-2xl z-50 flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-black text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-esh-gold rounded-full flex items-center justify-center">
            <MessageCircle size={20} className="text-black" />
          </div>
          <div>
            <h3 className="font-semibold">Atlas AI</h3>
            <p className="text-xs text-zinc-400">Elite Service Hub Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-zinc-800 p-2 rounded"
          >
            <Minimize2 size={18} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-zinc-800 p-2 rounded"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
            {conversation?.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-zinc-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setInputValue(reply);
                            setTimeout(() => handleSend(), 100);
                          }}
                          className="px-3 py-1 text-xs border border-zinc-300 rounded-full hover:bg-zinc-100"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-black border border-zinc-200 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-esh-gold text-black bg-white"
              />
              <Button
                variant="accent"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="px-4"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-zinc-500 mt-2 text-center">
              Powered by Elite Service Hub
            </p>
          </div>
        </>
      )}
    </div>
  );
}
