import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Check, Star, Calendar, Heart, Upload, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import kitchenModern from '../assets/kitchen_modern.jpg'
import { KMJK_CONTACT_NAME, KMJK_PHONE_DISPLAY, KMJK_PHONE_CALL_LINK, KMJK_EMAIL } from '@/constants/contact.js'

function KitchenLandingImproved() {
  const [projectSize, setProjectSize] = useState('full')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [buttonContext, setButtonContext] = useState('') // Track which button was clicked
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    images: []
  })

  const openModalWithContext = (context) => {
    setButtonContext(context)
    setIsModalOpen(true)
  }
  
  const pricing = {
    'refresh': { range: '$15,000 - $25,000', monthly: '$625/mo', features: ['New Countertops & Backsplash', 'Cabinet Refacing', 'New Fixtures & Hardware', 'Updated Lighting'] },
    'full': { range: '$35,000 - $60,000', monthly: '$1,458/mo', features: ['Complete Custom Cabinets', 'Premium Countertops', 'New Appliances', 'Flooring & Lighting', 'Layout Redesign'] },
    'luxury': { range: '$75,000+', monthly: '$3,125/mo', features: ['High-End Custom Cabinets', 'Luxury Stone Countertops', 'Professional Appliances', 'Custom Island Design', 'Smart Home Integration'] }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({ ...prev, images: files }))
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
    formDataToSend.append('subject', 'New Kitchen Remodel Request from KMJK Website')
    
    // Hidden fields that you'll see in the email but customer doesn't see
    formDataToSend.append('Landing Page', 'Kitchen Renovation')
    formDataToSend.append('Button Clicked', buttonContext || 'Not specified')
    formDataToSend.append('Selected Package', projectSize)
    formDataToSend.append('Source URL', window.location.href)
    
    formData.images.forEach((image, index) => {
      formDataToSend.append(`attachment_${index}`, image)
    })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()
      console.log('Web3Forms Response:', data)

      if (data.success) {
        console.log('✅ Form submitted successfully!')
        
        // 🔥 TRACK LEAD IN GOOGLE ANALYTICS
        if (window.gtag) {
          const packageValues = { 'refresh': 20000, 'full': 47500, 'luxury': 87500 }
          const estimatedValue = packageValues[projectSize] || 47500
          window.gtag('event', 'generate_lead', {
            service: 'Kitchen Renovation',
            button_context: buttonContext || 'Not specified',
            project_size: projectSize,
            estimated_budget: estimatedValue,
            value: estimatedValue * 0.15, // 15% commission
            currency: 'USD'
          })
          console.log('📊 GA4 Event Sent: generate_lead (Kitchen)')
        }
        
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', phone: '', message: '', images: [] })
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitSuccess(false)
        }, 3000)
      } else {
        console.error('❌ Web3Forms error:', data.message)
        alert('Error: ' + (data.message || 'Failed to submit form'))
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Network error - please check your connection')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${kitchenModern})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 z-1"></div>
        <div className="relative z-2 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Heart className="inline mr-1" size={16} />
            Where Stuart Families Gather & Memories Are Made
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Imagine Hosting Thanksgiving<br />
            In Your Dream Kitchen
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Transform your kitchen into the heart of your home. We specialize in <strong>Ballistix</strong>, <strong>Bullet Proof</strong>, and <strong>Counter Attack</strong> coatings for custom, durable surfaces. Fixed pricing. Zero surprises.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <a href={KMJK_PHONE_CALL_LINK}>
              <Button size="lg" className="text-lg px-6 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white w-full">
                <MessageSquare className="mr-2" size={24} />
                Call {KMJK_CONTACT_NAME}
              </Button>
            </a>
            <Button onClick={() => openModalWithContext('Hero Section - Start Consultation')} size="lg" className="text-lg px-6 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 w-full">
              <Calendar className="mr-2" size={24} />
              Plan Your Consultation
            </Button>
            <Button onClick={() => openModalWithContext('Hero Section - Send Photos for Quote')} size="lg" className="text-lg px-6 py-6 bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white w-full">
              <Upload className="mr-2" size={24} />
              Get Free Quote
            </Button>
          </div>
          <p className="mt-6 text-sm">🏆 2024 Best Kitchen Remodeler - Treasure Coast • ⭐ 4.9/5 Stars (237 Reviews)</p>
          <p className="mt-2 text-sm text-gray-200">
            Prefer email? Reach {KMJK_CONTACT_NAME} at <a className="underline" href={`mailto:${KMJK_EMAIL}`}>{KMJK_EMAIL}</a>
          </p>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[var(--deep-charcoal)]">Get Your Free Kitchen Quote</DialogTitle>
            <DialogDescription>
              {buttonContext && (
                <div className="mb-2 p-3 bg-[var(--brushed-gold)]/10 rounded-md border border-[var(--brushed-gold)]/30">
                  <span className="font-semibold text-[var(--deep-charcoal)]">Selected: </span>
                  <span className="text-[var(--deep-charcoal)]">{projectSize} remodel</span>
                </div>
              )}
              Tell us about your dream kitchen and upload photos for a fast, accurate quote!
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-8 text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Request Sent!</h3>
              <p className="text-gray-600">We'll get back to you within 1 hour during business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                    placeholder="john@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Describe Your Dream Kitchen *</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                  placeholder="Tell us about your kitchen vision..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Photos (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[var(--brushed-gold)] transition-colors">
                  <Upload className="mx-auto mb-2 text-gray-400" size={40} />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mb-3">PNG, JPG up to 10MB each</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium">
                    Choose Files
                  </label>
                  {formData.images.length > 0 && (
                    <p className="text-sm text-green-600 mt-3">
                      ✓ {formData.images.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white text-lg py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  'Get My Free Quote'
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Trust Bar */}
      <section className="py-8 bg-[var(--deep-charcoal)] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">300+</div>
              <div className="text-sm">Kitchens Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">98%</div>
              <div className="text-sm">Referral Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">$0</div>
              <div className="text-sm">Hidden Fees (Ever!)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 bg-gradient-to-b from-white to-[var(--warm-off-white)]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Choose Your Kitchen Journey</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Transparent pricing. No games. Select your project type below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(pricing).map(([key, data]) => (
              <div
                key={key}
                className={`bg-white rounded-lg shadow-xl p-6 cursor-pointer transition-all border-4 ${
                  projectSize === key ? 'border-[var(--brushed-gold)] scale-105' : 'border-transparent'
                }`}
                onClick={() => setProjectSize(key)}
              >
                <h3 className="text-2xl font-bold mb-2 capitalize">{key} Remodel</h3>
                <div className="text-3xl font-bold text-[var(--brushed-gold)] mb-2">{data.range}</div>
                <div className="text-sm text-gray-600 mb-4">or {data.monthly} with financing</div>
                <ul className="space-y-2 mb-6">
                  {data.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => openModalWithContext('Pricing Calculator - Get Detailed Quote')} size="lg" className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white">
              Get My Free Detailed Quote
            </Button>
            <p className="text-sm text-gray-600 mt-3">📸 Upload your kitchen photos via text: {KMJK_PHONE_DISPLAY}</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Real Stuart & Treasure Coast Kitchen Transformations
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Your neighbors trusted us. Now it's your turn! ❤️
          </p>
          <div className="space-y-12">
            <div className="bg-[var(--warm-off-white)] rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <img src={kitchenModern} alt="Modern Kitchen Transformation" className="w-full h-full object-cover" />
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">• Completed in 4 Weeks</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[var(--deep-charcoal)]">
                    "We Finally Have the Kitchen We've Dreamed About!"
                  </h3>
                  <p className="text-gray-700 italic mb-4 text-lg">
                    "Chris and the KMJK team listened to everything we wanted - more counter space, better flow, and a place where our kids could do homework while we cooked. They nailed it! No surprises on cost, no stress, just beautiful results. We've hosted three dinner parties already!"
                  </p>
                  <p className="font-semibold">— Michael & Sarah K., Stuart, FL</p>
                  <p className="text-sm text-gray-600">Complete Custom Kitchen Renovation • $140,000 • 4 Weeks</p>
                  <p className="text-xs text-gray-500 mt-1">(Full Kitchen Remodels start at $35,000)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[var(--deep-charcoal)] to-[var(--brushed-bronze)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Start Your Kitchen Adventure!
          </h2>
          <p className="text-xl mb-8">
            Get your free in-home consultation and detailed quote. No pressure, just possibilities!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={KMJK_PHONE_CALL_LINK}>
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
                <MessageSquare className="mr-2" size={24} />
                Call {KMJK_PHONE_DISPLAY} for Quick Quote
              </Button>
            </a>
            <Button onClick={() => openModalWithContext('Final CTA - Send Photos & Get Quote')} size="lg" className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
              <Upload className="mr-2" size={24} />
              Send Photos & Get Quote
            </Button>
          </div>
          <p className="mt-6 text-sm">
            ✓ Licensed & Insured • ✓ A+ BBB Rating • ✓ Financing Available • ✓ 100% Satisfaction Guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

export default KitchenLandingImproved

