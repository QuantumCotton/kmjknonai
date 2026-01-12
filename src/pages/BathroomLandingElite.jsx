import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Check, Star, Heart, Upload, Loader2, Sparkles, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import CallTeamButtons from '@/components/CallTeamButtons.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { KMJK_CONTACT_NAME, KMJK_PHONE_DISPLAY, KMJK_PHONE_SMS_LINK } from '@/constants/contact.js'
import bathroomLuxury from '../assets/bathroom_luxury.jpg'
import bathroomMarble from '../assets/bathroom_marble.jpg'
import bathroomSpa from '../assets/bathroom_luxury_spa.jpg'

function BathroomLandingElite() {
  const [projectSize, setProjectSize] = useState('full')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [buttonContext, setButtonContext] = useState('')
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
    'refresh': { 
      range: '$12,000 - $20,000', 
      monthly: '≈$500/mo (typical bank payment)', 
      features: [
        'New Tile & Flooring',
        'Modern Vanity & Mirror',
        'Updated Fixtures',
        'Fresh Paint & Lighting',
        'New Hardware'
      ] 
    },
    'full': { 
      range: '$25,000 - $45,000', 
      monthly: '≈$1,050/mo (typical bank payment)', 
      features: [
        'Complete Gut & Rebuild',
        'Custom Vanity & Storage',
        'Luxury Tile & Flooring',
        'Walk-In Shower or Soaking Tub',
        'Premium Fixtures & Lighting',
        'Layout Redesign'
      ] 
    },
    'luxury': { 
      range: '$50,000+', 
      monthly: '≈$2,100/mo (typical bank payment)', 
      features: [
        'Spa-Grade Materials',
        'Custom Walk-In Shower',
        'Freestanding Soaking Tub',
        'Heated Floors',
        'Smart Controls & Steam Shower',
        'Designer Tile & Stone'
      ] 
    }
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
    formDataToSend.append('subject', 'New Bathroom Remodel Request from KMJK Website')
    
    formDataToSend.append('Landing Page', 'Bathroom Renovation')
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

      if (data.success) {
        if (window.gtag) {
          const packageValues = { 'refresh': 16000, 'full': 35000, 'luxury': 65000 }
          const estimatedValue = packageValues[projectSize] || 35000
          window.gtag('event', 'generate_lead', {
            service: 'Bathroom Renovation',
            button_context: buttonContext || 'Not specified',
            project_size: projectSize,
            estimated_budget: estimatedValue,
            value: estimatedValue * 0.15,
            currency: 'USD'
          })
        }
        
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', phone: '', message: '', images: [] })
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitSuccess(false)
        }, 3000)
      } else {
        alert('Error: ' + (data.message || 'Failed to submit form'))
      }
    } catch (_error) {
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
        style={{ backgroundImage: `url(${bathroomLuxury})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 z-1"></div>
        <div className="relative z-2 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="inline mr-1" size={16} />
            Your Daily Retreat Starts Here
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Wake Up to<br />
            Your Dream Bathroom
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Turn your bathroom into a spa-like sanctuary. Fixed pricing. Zero surprises. Ask about typical monthly payments our clients secure through their lenders.
          </p>
          <div className="flex flex-col gap-4 max-w-5xl mx-auto">
            <CallTeamButtons className="mx-auto max-w-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href={KMJK_PHONE_SMS_LINK} className="w-full">
                <Button size="lg" className="text-lg px-6 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white w-full">
                  <MessageSquare className="mr-2" size={24} />
                  Text {KMJK_CONTACT_NAME}
                </Button>
              </a>
              <Link to="/contact" className="w-full">
                <Button size="lg" className="text-lg px-6 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 w-full">
                  <Calendar className="mr-2" size={24} />
                  Request Call Back
                </Button>
              </Link>
              <Button
                onClick={() => openModalWithContext('Hero Section - Get Free Quote')}
                size="lg"
                className="text-lg px-6 py-6 bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white w-full"
              >
                <Upload className="mr-2" size={24} />
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[var(--deep-charcoal)]">Get Your Free Bathroom Quote</DialogTitle>
            <DialogDescription>
              {buttonContext && (
                <div className="mb-2 p-3 bg-[var(--brushed-gold)]/10 rounded-md border border-[var(--brushed-gold)]/30">
                  <span className="font-semibold text-[var(--deep-charcoal)]">Selected: </span>
                  <span className="text-[var(--deep-charcoal)]">{projectSize} remodel</span>
                </div>
              )}
              Tell us about your dream bathroom and upload photos for a fast, accurate quote!
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
                <label htmlFor="message" className="block text-sm font-medium mb-1">Describe Your Dream Bathroom *</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                  placeholder="Tell us about your bathroom vision..."
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
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">250+</div>
              <div className="text-sm">Bathrooms Completed</div>
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
          <h2 className="text-4xl font-bold text-center mb-4">Choose Your Bathroom Journey</h2>
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
                <div className="text-sm text-gray-600 mb-4">{data.monthly} secured via outside lenders (WAC)</div>
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
            <p className="text-sm text-gray-600 mt-3">📸 Upload your bathroom photos for accurate pricing</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Real Stuart & Treasure Coast Bathroom Transformations
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Your neighbors trusted us. Now it's your turn! ❤️
          </p>
          <div className="space-y-12">
            {/* Testimonial 1 */}
            <div className="bg-[var(--warm-off-white)] rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <img src={bathroomMarble} alt="Luxury Marble Bathroom" className="w-full h-full object-cover" />
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">5.0 / 5.0</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Master Bath Spa Transformation</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "We wanted a luxury spa experience at home, and KMJK delivered beyond our expectations. 
                    The walk-in shower with rain head is incredible, and the heated floors are a game-changer 
                    during winter mornings. They stayed on budget and finished ahead of schedule!"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">— Jennifer & Mark R.</span>
                    <span className="text-sm text-gray-500">Stuart, FL</span>
                  </div>
                  <div className="text-[var(--brushed-gold)] font-semibold text-lg">
                    Investment: $38,000 • Completed in 3 weeks
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[var(--warm-off-white)] rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">5.0 / 5.0</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Guest Bath Complete Refresh</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "Our outdated guest bathroom was an embarrassment. KMJK transformed it into a modern, 
                    beautiful space our guests rave about. The new vanity, tile work, and fixtures look 
                    amazing. Great communication throughout the project!"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">— Lisa T.</span>
                    <span className="text-sm text-gray-500">Port St. Lucie, FL</span>
                  </div>
                  <div className="text-[var(--brushed-gold)] font-semibold text-lg">
                    Investment: $16,500 • Completed in 2 weeks
                  </div>
                </div>
                <img src={bathroomSpa} alt="Modern Guest Bathroom" className="w-full h-full object-cover order-1 lg:order-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-[var(--warm-off-white)] to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Stuart Homeowners Choose KMJK</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[var(--brushed-gold)] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Fixed Price Guarantee</h3>
              <p className="text-gray-600">
                Your quote is your final price. No surprise charges, no hidden fees. Ever.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--brushed-gold)] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">2-3 Week Completion</h3>
              <p className="text-gray-600">
                Most bathroom projects completed in 2-3 weeks. We respect your time and schedule.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--brushed-gold)] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">5-Year Warranty</h3>
              <p className="text-gray-600">
                All workmanship backed by our comprehensive 5-year warranty. Sleep easy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[var(--deep-charcoal)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Bathroom?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Get your free quote today. Most quotes delivered within 24 hours!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a href={KMJK_PHONE_SMS_LINK}>
              <Button size="lg" className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
                <MessageSquare className="mr-2" size={24} />
                Text {KMJK_PHONE_DISPLAY}
              </Button>
            </a>
            <Button
              onClick={() => openModalWithContext('Final CTA - Get Free Quote')}
              size="lg"
              className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100"
            >
              <Upload className="mr-2" size={24} />
              Get Free Quote
            </Button>
          </div>
          <CallTeamButtons className="mx-auto max-w-lg" />
          <p className="mt-6 text-sm text-gray-400">
            📍 Proudly serving Stuart, Port St. Lucie, Jensen Beach & the Treasure Coast
          </p>
        </div>
      </section>
    </div>
  )
}

export default BathroomLandingElite
