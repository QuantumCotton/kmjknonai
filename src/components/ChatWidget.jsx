import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { startKmjkConversation, sendKmjkMessage } from '@/services/kmjkChatService.js'

const defaultPosition = 'bottom-right'
const defaultColor = 'var(--brushed-gold)'

export default function ChatWidget({ position = defaultPosition, primaryColor = defaultColor }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [conversation, setConversation] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)
  const streamingMessageRef = useRef(null)
  const lastAssistantIdRef = useRef(null)
  const [streamingState, setStreamingState] = useState(null)

  useEffect(() => {
    if (isOpen && !conversation) {
      initConversation()
    }
  }, [isOpen, conversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages])

  useEffect(() => {
    if (!conversation?.messages?.length) return
    const lastAssistant = [...conversation.messages].reverse().find((msg) => msg.role === 'assistant')
    if (!lastAssistant) return
    if (lastAssistantIdRef.current === lastAssistant.id) return

    const fullContent = lastAssistant.content || ''
    const initialVisible = fullContent.slice(0, Math.min(2, fullContent.length))

    lastAssistantIdRef.current = lastAssistant.id
    if (fullContent.length === 0) {
      setStreamingState(null)
    } else if (initialVisible.length === fullContent.length) {
      setStreamingState({ id: lastAssistant.id, full: fullContent, visible: fullContent })
    } else {
      setStreamingState({ id: lastAssistant.id, full: fullContent, visible: initialVisible })
    }
  }, [conversation?.messages])

  useEffect(() => {
    if (!streamingState) return
    if (streamingState.visible.length >= streamingState.full.length) {
      setStreamingState(null)
      return
    }

    const timeout = setTimeout(() => {
      setStreamingState((prev) => {
        if (!prev) return null
        const increment = prev.full.length > 400 ? 4 : prev.full.length > 160 ? 3 : 2
        const nextLength = Math.min(prev.visible.length + increment, prev.full.length)
        return { ...prev, visible: prev.full.slice(0, nextLength) }
      })
    }, 14)

    return () => clearTimeout(timeout)
  }, [streamingState])

  useEffect(() => {
    if (streamingState) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [streamingState?.visible])

  const initConversation = async () => {
    const newConversation = await startKmjkConversation()
    setConversation(newConversation)
  }

  const handleSend = async (quickReply) => {
    if (!conversation) return

    const content = typeof quickReply === 'string' ? quickReply : inputValue.trim()
    if (!content) return

    setInputValue('')
    setIsSending(true)

    const { conversation: updatedConversation } = await sendKmjkMessage(conversation, content)
    setConversation(updatedConversation)
    setIsSending(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'} text-black rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-105 z-50 group`}
        style={{ backgroundColor: primaryColor }}
        aria-label="Open KMJK chat"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </button>
    )
  }

  return (
    <div
      className={`fixed ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'} ${isMinimized ? 'h-16' : 'h-[560px]'} w-96 bg-white border border-gray-200 shadow-2xl z-50 flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4 border-b bg-[var(--deep-charcoal)] text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
            <MessageCircle size={20} className="text-[var(--deep-charcoal)]" />
          </div>
          <div>
            <h3 className="font-semibold">KMJK Concierge</h3>
            <p className="text-xs text-gray-300">Here to plan your project</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized((prev) => !prev)}
            className="hover:bg-white/10 p-2 rounded"
            aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
          >
            <Minimize2 size={18} />
          </button>
          <button
            onClick={() => {
              setIsOpen(false)
              setIsMinimized(false)
            }}
            className="hover:bg-white/10 p-2 rounded"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {conversation?.messages?.map((msg, index) => {
              const isAssistant = msg.role === 'assistant'
              const isStreaming = streamingState?.id === msg.id
              const visibleContent = isStreaming ? streamingState.visible || ' ' : msg.content
              const shouldShowQuickReplies =
                isAssistant && index === 0 && Array.isArray(msg.quickReplies) && msg.quickReplies.length > 0

              return (
                <div key={msg.id} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap ${
                      isAssistant
                        ? 'bg-white border border-gray-200 text-[var(--deep-charcoal)]'
                        : 'bg-[var(--deep-charcoal)] text-white'
                    }`}
                  >
                    {visibleContent}
                    {isStreaming && (
                      <span className="inline-block w-2 h-4 bg-gray-300 align-baseline animate-pulse ml-1" />
                    )}

                    {shouldShowQuickReplies && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => handleSend(reply)}
                            className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-100"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[var(--deep-charcoal)] flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tell us about your project..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--brushed-gold)] bg-white text-[var(--deep-charcoal)]"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isSending}
                className="px-4"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Powered by KMJK Home Improvement</p>
          </div>
        </>
      )}
    </div>
  )
}
