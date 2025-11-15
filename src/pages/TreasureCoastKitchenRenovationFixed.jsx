import { useEffect, useState } from 'react'
import { Calendar, Upload, Check, MessageSquare, Phone, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import kitchenHero from '../assets/kitchen_modern.jpg'
import {
  KMJK_CONTACT_NAME,
  KMJK_PHONE_DISPLAY,
  KMJK_PHONE_SMS_LINK,
  SWAY_CONTACT_NAME,
  SWAY_PHONE_DISPLAY,
  SWAY_PHONE_CALL_LINK,
} from '@/constants/contact.js'

export default function TreasureCoastKitchenRenovationFixed(){
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [buttonContext, setButtonContext] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    timeline: '',
    images: [],
  })

  useEffect(() => {
    document.title = 'Kitchen Renovation in Treasure Coast, FL | KMJK Home Improvement'
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How long does a kitchen renovation take?', acceptedAnswer: { '@type': 'Answer', text: 'Typical projects take 4–8 weeks depending on scope.' } },
        { '@type': 'Question', name: 'Do you offer design help?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We include design consultation and material guidance.' } },
        { '@type': 'Question', name: 'Are you licensed and insured?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, fully licensed and insured in Florida.' } }
      ]
    }
    const s = document.createElement('script'); s.type='application/ld+json'; s.textContent = JSON.stringify(faq); document.head.appendChild(s)
    return () => { document.head.removeChild(s) }
  }, [])

  const openModalWithContext = (context) => {
    setButtonContext(context)
    setIsModalOpen(true)
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5)
    setFormData((prev) => ({ ...prev, images: files }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    formDataToSend.append('access_key', '8e63e7e3-ab53-43a9-80c5-ebc113c25912')
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('message', formData.message)
    formDataToSend.append('preferred_start', formData.timeline)
    formDataToSend.append('subject', 'Treasure Coast Kitchen Consultation Request')
    formDataToSend.append('Landing Page', 'Treasure Coast Kitchen Renovation')
    formDataToSend.append('Button Clicked', buttonContext || 'Schedule Private Design Call')
    formDataToSend.append('Source URL', window.location.href)

    formData.images.forEach((image, index) => {
      formDataToSend.append(`attachment_${index}`, image)
    })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (data.success) {
        if (window.gtag) {
          window.gtag('event', 'generate_lead', {
            service: 'Kitchen Renovation',
            market: 'Treasure Coast',
            button_context: buttonContext || 'Schedule Private Design Call',
          })
        }

        setSubmitSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          timeline: '',
          images: [],
        })
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitSuccess(false)
        }, 2500)
      } else {
        alert(data.message || 'We could not submit your request. Please try again.')
      }
    } catch {
      alert('Network error. Please try again or email info@kmjk.pro.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${kitchenHero})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
            Treasure Coast Signature Service • Projects from $25k+
          </div>
          <h1 className="text-4xl font-bold mb-3">Kitchen Renovation in Treasure Coast, FL</h1>
          <p className="text-lg opacity-90">Luxury finishes. Reliable timelines. A seamless experience from design to install.</p>
          <div className="mt-6 flex flex-col gap-4">
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-white/30 shadow-lg">
              <div className="flex">
                <a
                  href={SWAY_PHONE_CALL_LINK}
                  className="flex flex-1 items-center justify-center gap-2 bg-[var(--brushed-gold)] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--deep-charcoal)] transition-colors hover:bg-[var(--brushed-bronze)]"
                >
                  <Phone size={18} />
                  Call {SWAY_CONTACT_NAME}
                  <span className="hidden sm:inline-block opacity-80">({SWAY_PHONE_DISPLAY})</span>
                </a>
                <a
                  href={KMJK_PHONE_SMS_LINK}
                  className="flex flex-1 items-center justify-center gap-2 bg-[var(--deep-charcoal)] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
                >
                  <MessageSquare size={18} />
                  Text {KMJK_CONTACT_NAME}
                  <span className="hidden sm:inline-block opacity-80">({KMJK_PHONE_DISPLAY})</span>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                onClick={() => openModalWithContext('Schedule Private Design Call')}
                size="lg"
                className="w-full bg-white text-[var(--deep-charcoal)] hover:bg-gray-100"
              >
                <Calendar className="mr-2" size={20} />
                Schedule Private Design Call
              </Button>
              <Button
                onClick={() => openModalWithContext('Upload Estate Photos')}
                size="lg"
                className="w-full bg-[var(--deep-charcoal)] text-white hover:bg-[var(--brushed-gold)]"
              >
                <Upload className="mr-2" size={20} />
                Upload Estate Photos
              </Button>
              <a href="/contact">
                <Button size="lg" className="w-full bg-white/10 text-white hover:bg-white hover:text-[var(--deep-charcoal)]">
                  Request Full Consultation
                </Button>
              </a>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80">
            Share inspiration shots or punch lists when you text us for Treasure Coast scheduling priority.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why KMJK</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><Check className="text-[var(--brushed-gold)] mr-2"/>Licensed and insured</li>
              <li className="flex items-start"><Check className="text-[var(--brushed-gold)] mr-2"/>Dedicated project manager</li>
              <li className="flex items-start"><Check className="text-[var(--brushed-gold)] mr-2"/>Premium cabinetry and countertops</li>
              <li className="flex items-start"><Check className="text-[var(--brushed-gold)] mr-2"/>Clear timelines and daily cleanup</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Typical Investment</h2>
            <div className="rounded-lg border p-4">
              <p className="mb-2"><strong>Signature Refresh:</strong> $25k - $45k</p>
              <p className="mb-2"><strong>Full Custom Remodel:</strong> $55k - $95k</p>
              <p className="mb-2"><strong>Elite Chef Suite:</strong> $110k+</p>
              <p className="text-sm text-gray-600">Includes design consultation, appliance coordination, and white-glove installation.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--deep-charcoal)]">Treasure Coast Families Share Their Experience</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-3 text-[var(--brushed-gold)] text-xl">*****</div>
            <p className="text-gray-700 italic mb-4">
              "KMJK transformed our Stuart kitchen into the culinary space we always dreamed of. The team coordinated every detail from design to final installation, making the entire process seamless."
            </p>
            <div className="text-sm text-gray-600 font-semibold">- The Martinez Family, Stuart</div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Treasure Coast, FL Service Area</h2>
          <p className="text-gray-700">Proudly serving Stuart, Palm City, Jensen Beach, and the entire Treasure Coast.</p>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[var(--deep-charcoal)]">Reserve Your Private Design Call</DialogTitle>
            <DialogDescription>
              Upload inspiration photos or existing kitchen snapshots so our design team can prepare tailored concepts.
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-10 text-center">
              <div className="text-5xl text-green-600 mb-4">✓</div>
              <p className="text-lg font-semibold text-green-700">Request Received</p>
              <p className="text-gray-600 mt-2">We'll reach out within the hour (M–F) to confirm your consultation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
                  />
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium mb-1">Ideal Start Window</label>
                  <input
                    id="timeline"
                    type="text"
                    placeholder="e.g., Sept 2024 or Flexible"
                    value={formData.timeline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Project Goals</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell us about the kitchen spaces you'd like to transform, must-have features, design inspiration, etc."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Upload Photos or Plans (up to 5)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full rounded-md border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-[var(--deep-charcoal)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-black"
                />
                <p className="mt-2 text-xs text-gray-500">
                  We accept photos, inspiration boards, or existing floor plans to prep your consultation.
                </p>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] hover:bg-[var(--brushed-bronze)]">
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Sending…
                  </span>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
