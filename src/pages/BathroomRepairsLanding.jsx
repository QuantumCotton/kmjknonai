import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageSquare, Check, Star, Shield, Droplets, Wrench, Sparkles, Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import CallTeamButtons from '@/components/CallTeamButtons.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { KMJK_CONTACT_NAME, KMJK_PHONE_DISPLAY, KMJK_PHONE_SMS_LINK } from '@/constants/contact.js'
import bathroomLuxury from '../assets/bathroom_luxury_spa.jpg'

function BathroomRepairsLanding() {
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

  const services = [
    { title: 'Shower & Tub Re-Caulking', price: '$375 minimum visit', turnaround: 'Same Day', icon: Droplets },
    { title: 'Faucet Repair/Replacement', price: '$375 minimum visit', turnaround: 'Same Day', icon: Wrench },
    { title: 'Toilet Repair/Replace', price: '$375 minimum visit', turnaround: 'Same Day', icon: Wrench },
    { title: 'Tile Patching & Grout Repair', price: '$375+ (per area)', turnaround: '1-2 Days', icon: Shield },
    { title: 'Vanity Replacement', price: '$550-950', turnaround: '1 Day', icon: Sparkles },
    { title: 'Grab Bar Installation (ADA)', price: '$375 minimum visit', turnaround: 'Same Day', icon: Shield },
  ]

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
    formDataToSend.append('subject', 'New Bathroom Repair Request from KMJK Website')
    
    // Hidden tracking fields
    formDataToSend.append('Landing Page', 'Bathroom Repairs')
    formDataToSend.append('Button Clicked', buttonContext || 'Not specified')
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
          window.gtag('event', 'generate_lead', {
            service: 'Bathroom Repairs',
            button_context: buttonContext || 'Not specified',
            value: 300 * 0.15, // Average repair value * 15% commission
            currency: 'USD'
          })
          console.log('📊 GA4 Event Sent: generate_lead (Bathroom Repairs)')
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
        style={{ backgroundImage: `url(${bathroomLuxury})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60 z-1"></div>
        <div className="relative z-2 max-w-6xl mx-auto px-4 py-16 text-white">
          <div className="text-center mb-8">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md animate-pulse">
              🚨 Same Day Emergency Service Available!
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Expert Bathroom Repairs<br />
              Done Right. Done Fast.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              From leaky faucets to full vanity replacement. Licensed pros who specialize in bathroom work! $375 minimum visit—bundle fixtures to save.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link to="/contact" className="block">
              <div className="bg-white text-[var(--deep-charcoal)] p-6 rounded-lg text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <Phone className="mx-auto mb-3" size={40} />
                <div className="text-2xl font-bold mb-2">Schedule Repair Call</div>
                <div className="text-sm mt-2">Guaranteed same-day response</div>
              </div>
            </Link>
            <div className="bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] p-6 rounded-lg text-center shadow-lg">
              <MessageSquare className="mx-auto mb-3" size={40} />
              <div className="text-2xl font-bold mb-2 uppercase tracking-wide">Need Help Now?</div>
              <div className="text-3xl font-extrabold">{KMJK_PHONE_DISPLAY}</div>
              <p className="text-sm opacity-90">Tap to text photos or call either project lead instantly.</p>
              <CallTeamButtons className="mt-4 mx-auto max-w-sm" />
              <a
                href={KMJK_PHONE_SMS_LINK}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--deep-charcoal)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                <MessageSquare size={16} />
                Prefer to text? Tap here
              </a>
            </div>
            <button onClick={() => openModalWithContext('Hero Section - Get Quote')} className="block w-full">
              <div className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white p-6 rounded-lg text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105 h-full">
                <Upload className="mx-auto mb-3" size={40} />
                <div className="text-2xl font-bold mb-2">Upload Photos</div>
                <div className="text-lg font-bold">Get Fast Estimate</div>
                <div className="text-sm mt-2">We respond within 1 hour</div>
              </div>
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-gray-200">
            Emergency dispatch available after-hours for an additional surcharge. Bundle multiple bathroom punch-list items in one $375 visit to maximize savings.
          </p>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[var(--deep-charcoal)]">Get Your Free Bathroom Repair Quote</DialogTitle>
            <DialogDescription>
              {buttonContext && (
                <div className="mb-2 p-3 bg-[var(--brushed-gold)]/10 rounded-md border border-[var(--brushed-gold)]/30">
                  <span className="font-semibold text-[var(--deep-charcoal)]">From: </span>
                  <span className="text-[var(--deep-charcoal)]">{buttonContext}</span>
                </div>
              )}
              Upload photos of the issue and we'll respond within the hour!
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
                <label htmlFor="message" className="block text-sm font-medium mb-1">What needs repair? *</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                  placeholder="e.g., Leaky shower faucet, re-caulk around tub, cracked tile..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Photos (Helps us quote faster!)</label>
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
      <section className="py-8 bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">Same Day</div>
              <div className="text-sm text-gray-600">Most Repairs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">Licensed</div>
              <div className="text-sm text-gray-600">Plumbing & Electric</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">Flat-Rate</div>
              <div className="text-sm text-gray-600">Upfront Pricing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Common Bathroom Repairs & Pricing</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Transparent pricing. No surprises. Most repairs done same-day!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-[var(--brushed-gold)]">
                  <Icon className="mb-4 text-[var(--brushed-gold)]" size={40} />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <div className="text-2xl font-bold text-[var(--brushed-gold)] mb-2">{service.price}</div>
                  <p className="text-sm text-gray-600">⏱️ Turnaround: <span className="font-semibold">{service.turnaround}</span></p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Button 
              onClick={() => openModalWithContext('Services Section - Get Custom Quote')}
              size="lg" 
              className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white"
            >
              Get Quote for Your Repair
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Homeowners Choose KMJK for Bathroom Repairs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--warm-off-white)] p-6 rounded-lg shadow-md">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Re-caulked my shower for $220. Took 90 minutes. Other companies wanted $500+ or wouldn't even call me back. KMJK was professional and fair!"
              </p>
              <p className="font-semibold text-sm">— Linda P., Stuart</p>
            </div>
            <div className="bg-[var(--warm-off-white)] p-6 rounded-lg shadow-md">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Replaced my leaky faucet same day I called. $185. Didn't try to upsell me on stuff I didn't need. Just honest, good work."
              </p>
              <p className="font-semibold text-sm">— Mark D., Port St. Lucie</p>
            </div>
            <div className="bg-[var(--warm-off-white)] p-6 rounded-lg shadow-md">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Installed grab bars for my elderly mom. ADA compliant, properly anchored. $190. They know what they're doing. Peace of mind!"
              </p>
              <p className="font-semibold text-sm">— Rachel T., Jensen Beach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Thinking Bigger Section */}
      <section className="py-12 bg-gradient-to-r from-[var(--brushed-gold)] to-[var(--brushed-bronze)] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">💭 Thinking Bigger Than Repairs?</h2>
          <p className="text-xl mb-6">
            If you're considering a full bathroom remodel, we do those too! Check out our luxury bathroom renovation gallery.
          </p>
          <Link to="/bathroom-remodel">
            <Button size="lg" className="bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
              View Full Bathroom Remodels
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[var(--deep-charcoal)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Ignoring That Bathroom Issue!
          </h2>
          <p className="text-xl mb-8">
            Small repairs now prevent expensive problems later. Let's get it fixed TODAY!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a href={KMJK_PHONE_SMS_LINK}>
              <Button size="lg" className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
                <MessageSquare className="mr-2" size={24} />
                Text {KMJK_PHONE_DISPLAY}
              </Button>
            </a>
            <Button 
              onClick={() => openModalWithContext('Final CTA - Send Photos & Get Quote')}
              size="lg" 
              className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100"
            >
              <Upload className="mr-2" size={24} />
              Send Photos & Get Quote
            </Button>
          </div>
          <CallTeamButtons className="mx-auto mb-2 max-w-lg" />
          <p className="text-sm">
            ✓ Same-Day Service • ✓ Licensed & Insured • ✓ Flat-Rate Pricing • ✓ 15+ Years Experience
          </p>
        </div>
      </section>
    </div>
  )
}

export default BathroomRepairsLanding
