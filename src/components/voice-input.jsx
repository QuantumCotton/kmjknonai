import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Sparkles, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { processCrewUpdate } from '@/services/zaiService.js'
import { Card } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'

export default function VoiceInput({ onAddNote, jobContext }) {
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiProcessing, setAiProcessing] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const recognitionRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [recordingTime, setRecordingTime] = useState(0)

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript + interimTranscript)
        if (finalTranscript && isRecording) {
          // Stop recording after a pause
          handleStopRecording()
        }
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        setIsRecording(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  // Recording timer
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
      setRecordingTime(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleStartRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Use Web Speech API for transcription
      if (recognitionRef.current) {
        setTranscript('')
        setIsListening(true)
        setIsRecording(true)
        setRecordingTime(0)
        setAiResult(null)
        
        recognitionRef.current.start()
      }
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please allow microphone access and try again.')
    }
  }

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
    setIsListening(false)
  }

  const handleProcessWithAI = async () => {
    if (!transcript.trim()) return

    setAiProcessing(true)
    try {
      console.log('[VoiceInput] Processing with AI...')
      console.log('[VoiceInput] Transcript:', transcript)
      console.log('[VoiceInput] Job context:', jobContext)
      
      const result = await processCrewUpdate(transcript, jobContext)
      console.log('[VoiceInput] AI Result:', result)
      setAiResult(result)
    } catch (error) {
      console.error('[VoiceInput] AI processing error:', error)
      console.error('[VoiceInput] Error message:', error.message)
      alert(`AI processing failed: ${error.message}`)
    } finally {
      setAiProcessing(false)
    }
  }

  const handleApproveNote = () => {
    if (aiResult) {
      const noteText = aiResult.professionalNote || transcript
      onAddNote(noteText, aiResult.suggestedTags || [])
      setAiResult(null)
      setTranscript('')
    }
  }

  const handleCancel = () => {
    setAiResult(null)
    setTranscript('')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="font-semibold flex items-center gap-2">
          <Mic size={18} />
          Voice/Text Crew Update
        </Label>
        {isRecording && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock size={12} />
            {formatTime(recordingTime)}
          </Badge>
        )}
      </div>

      {/* Transcript Display */}
      <Textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Click microphone and speak, or type your update here..."
        rows={4}
        disabled={isRecording || aiProcessing}
      />

      {/* Recording Controls */}
      <div className="flex gap-2">
        {!isRecording ? (
          <Button 
            onClick={handleStartRecording}
            disabled={aiProcessing}
            className="flex-1 bg-red-500 hover:bg-red-600"
            size="lg"
          >
            <Mic size={18} className="mr-2" />
            Start Recording
          </Button>
        ) : (
          <Button 
            onClick={handleStopRecording}
            className="flex-1 bg-gray-700 hover:bg-gray-800"
            size="lg"
          >
            <MicOff size={18} className="mr-2" />
            Stop Recording
          </Button>
        )}

        <Button
          onClick={handleProcessWithAI}
          disabled={!transcript.trim() || isRecording || aiProcessing}
          className="flex-1 bg-[var(--deep-charcoal)] hover:bg-gray-800"
          size="lg"
        >
          {aiProcessing ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Processing...
            </>
          ) : (
            <>
              <Sparkles size={18} className="mr-2 text-[var(--brushed-gold)]" />
              Process with AI
            </>
          )}
        </Button>
      </div>

      {/* AI Results */}
      {aiResult && (
        <>
          <Separator />
          <div className="space-y-3 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-[var(--deep-charcoal)]" />
              <Label className="font-semibold text-[var(--deep-charcoal)]">AI Processing Result</Label>
            </div>

            <div>
              <Label className="text-sm font-medium mb-1 block">Professional Note:</Label>
              <Card className="p-3 bg-white">
                <p className="text-sm leading-relaxed">{aiResult.professionalNote}</p>
              </Card>
            </div>

            {aiResult.suggestedTags && aiResult.suggestedTags.length > 0 && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Suggested Tags:</Label>
                <div className="flex flex-wrap gap-2">
                  {aiResult.suggestedTags.map(tag => (
                    <Badge key={tag} className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {aiResult.keyInfo && aiResult.keyInfo.length > 0 && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Key Information:</Label>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {aiResult.keyInfo.map((info, idx) => (
                    <li key={idx}>{info}</li>
                  ))}
                </ul>
              </div>
            )}

            {aiResult.summary && (
              <div>
                <Label className="text-sm font-medium mb-1 block">Summary:</Label>
                <p className="text-sm text-gray-700">{aiResult.summary}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleApproveNote}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                ✓ Approve & Add Note
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                ✕ Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}
