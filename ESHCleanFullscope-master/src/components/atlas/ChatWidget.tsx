import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { AtlasConversation, AtlasMessage, sendMessage, startConversation } from '../../services/atlasService';
import Button from '../shared/Button';

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
}

interface StreamingMessageState {
  id: string;
  fullContent: string;
  visibleContent: string;
}

export default function ChatWidget({ 
  position = 'bottom-right',
  primaryColor = '#D4AF37'
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversation, setConversation] = useState<AtlasConversation | null>(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageIdRef = useRef<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState<StreamingMessageState | null>(null);

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

  useEffect(() => {
    if (!conversation?.messages?.length) {
      return;
    }
    const lastAssistant = [...conversation.messages].reverse().find(msg => msg.role === 'assistant');
    if (!lastAssistant) {
      return;
    }
    if (streamingMessage && streamingMessage.id === lastAssistant.id) {
      return;
    }
    if (lastAssistantMessageIdRef.current === lastAssistant.id) {
      return;
    }
    setStreamingMessage({
      id: lastAssistant.id,
      fullContent: lastAssistant.content,
      visibleContent: ''
    });
  }, [conversation?.messages, streamingMessage]);

  useEffect(() => {
    if (!streamingMessage) {
      return;
    }
    if (streamingMessage.visibleContent.length >= streamingMessage.fullContent.length) {
      lastAssistantMessageIdRef.current = streamingMessage.id;
      setStreamingMessage(null);
      return;
    }
    const timeout = setTimeout(() => {
      setStreamingMessage(prev => {
        if (!prev) {
          return null;
        }
        const nextLength = Math.min(prev.visibleContent.length + 2, prev.fullContent.length);
        return {
          ...prev,
          visibleContent: prev.fullContent.slice(0, nextLength)
        };
      });
    }, 20);
    return () => clearTimeout(timeout);
  }, [streamingMessage]);

  useEffect(() => {
    if (streamingMessage) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [streamingMessage?.visibleContent]);

  const initConversation = async () => {
    const newConversation = await startConversation();
    setConversation(newConversation);
    const lastAssistant = [...newConversation.messages].reverse().find(msg => msg.role === 'assistant');
    if (lastAssistant) {
      lastAssistantMessageIdRef.current = lastAssistant.id;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !conversation) return;

    if (streamingMessage) {
      lastAssistantMessageIdRef.current = streamingMessage.id;
      setStreamingMessage(null);
    }

    const userMessage = inputValue.trim();
    setInputValue('');

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
            {conversation?.messages.map(msg => {
              const isStreamingCurrent = streamingMessage?.id === msg.id;
              const displayContent = isStreamingCurrent
                ? streamingMessage.visibleContent || ' '
                : msg.content;
              const quickReplies = msg.quickReplies ?? [];
              const showQuickReplies = quickReplies.length > 0 && !isStreamingCurrent;

              return (
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
                    <p className="text-sm whitespace-pre-wrap">
                      {displayContent}
                      {isStreamingCurrent && (
                        <span className="inline-block w-2 h-4 bg-zinc-300 align-baseline animate-pulse ml-1" />
                      )}
                    </p>
                    {showQuickReplies && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {quickReplies.map((reply, idx) => (
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
              );
            })}

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
