import { useState } from 'react'
import { Loader2, Upload, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export default function ContactForm({
  title = "Start Your Project",
  subtitle = "Share your project details and we'll prepare a personalized consultation plan.",
  serviceType = "Home Improvement",
  subject = "New Project Inquiry - KMJK",
  showAddress = true,
  showTimeline = true,
  showBudget = true,
  showFileUpload = true,
  onSubmit,
  buttonContext = "",
  className = ""
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    timeline: '',
    budget: '',
    projectDetails: '',
    files: []
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5)
    setFormData(prev => ({ ...prev, files }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    formDataToSend.append('access_key', '8e63e7e3-ab53-43a9-80c5-ebc113c25912')
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('message', formData.projectDetails)
    
    if (showAddress) {
      formDataToSend.append('address', formData.address)
    }
    if (showTimeline) {
      formDataToSend.append('preferred_start', formData.timeline)
    }
    if (showBudget) {
      formDataToSend.append('budget', formData.budget)
    }
    
    formDataToSend.append('subject', subject)
    formDataToSend.append('Service Type', serviceType)
    formDataToSend.append('Button Clicked', buttonContext || 'Contact Form Submission')
    formDataToSend.append('Source URL', window.location.href)

    formData.files.forEach((file, index) => {
      formDataToSend.append(`attachment_${index}`, file)
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
            service: serviceType,
            button_context: buttonContext || 'Contact Form Submission',
            value: 1
          })
        }

        // Track Meta Pixel Lead event
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Lead', {
            service_type: serviceType,
            button_context: buttonContext || 'Contact Form Submission',
            content_name: title
          })
          
          fbq('track', 'Contact', {
            service_type: serviceType,
            button_context: buttonContext || 'Contact Form Submission',
            content_name: title
          })
        }

        setSubmitSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          timeline: '',
          budget: '',
          projectDetails: '',
          files: []
        })

        if (onSubmit) {
          onSubmit(data)
        }

        setTimeout(() => {
          setSubmitSuccess(false)
        }, 3000)
      } else {
        alert(data.message || 'We could not submit your request. Please try again.')
      }
    } catch {
      alert('Network error. Please try again or email info@kmjk.pro.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="py-10 text-center">
        <div className="text-5xl text-green-600 mb-4">✓</div>
        <p className="text-lg font-semibold text-green-700">Request Received</p>
        <p className="text-gray-600 mt-2">We'll reach out within the hour (M–F) to confirm your consultation.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--deep-charcoal)] mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
            />
          </div>
          {showAddress && (
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">Address/Community</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="e.g., Stuart, Palm City, or your community name"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
              />
            </div>
          )}
        </div>

        {(showTimeline || showBudget) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showTimeline && (
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium mb-1">Desired Timeline</label>
                <input
                  id="timeline"
                  name="timeline"
                  type="text"
                  placeholder="e.g., Next month, Flexible, ASAP"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
                />
              </div>
            )}
            {showBudget && (
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-1">Budget Range</label>
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="e.g., $25k-50k, Under $30k"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
                />
              </div>
            )}
          </div>
        )}

        <div>
          <label htmlFor="projectDetails" className="block text-sm font-medium mb-1">Project Details</label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            rows="4"
            placeholder="Tell us about your project goals, spaces you want to transform, must-have features, design inspiration, etc."
            value={formData.projectDetails}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[var(--brushed-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/40"
          ></textarea>
        </div>

        {showFileUpload && (
          <div>
            <label className="block text-sm font-medium mb-1">Upload Photos or Plans (up to 5)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={handleFileUpload}
              className="w-full rounded-md border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-[var(--deep-charcoal)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-black"
            />
            <p className="mt-2 text-xs text-gray-500">
              We accept photos, inspiration boards, or existing floor plans to prep your consultation.
            </p>
            {formData.files.length > 0 && (
              <p className="mt-2 text-sm text-green-600">
                {formData.files.length} file(s) selected
              </p>
            )}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] hover:bg-[var(--brushed-bronze)]"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              Sending…
            </span>
          ) : (
            'Send Project Details'
          )}
        </Button>
      </form>
    </div>
  )
}
