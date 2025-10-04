import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageSquare, Check, Star, Calendar, X, Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import bathroomLuxurySpa from '../assets/bathroom_luxury_spa.jpg'
import bathroomMarble from '../assets/bathroom_marble.jpg'

function BathroomLandingImproved() {
  const [monthlyBudget, setMonthlyBudget] = useState(500)
  const estimatedTotal = monthlyBudget * 24
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
    formDataToSend.append('subject', 'New Bathroom Renovation Request from KMJK Website')
    
    // Hidden tracking fields
    formDataToSend.append('Landing Page', 'Bathroom Renovation')
    formDataToSend.append('Button Clicked', buttonContext || 'Not specified')
    formDataToSend.append('Estimated Budget', `$${estimatedTotal.toLocaleString()} ($${monthlyBudget}/month)`)
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
            service: 'Bathroom Renovation',
            button_context: buttonContext || 'Not specified',
            estimated_budget: estimatedTotal,
            value: estimatedTotal * 0.15, // 15% commission
            currency: 'USD'
          })
          console.log('📊 GA4 Event Sent: generate_lead (Bathroom)')
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
      {/* Hero Section with Background */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bathroomLuxurySpa})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/65 to-black/55 z-1"></div>
        <div className="relative z-2 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ⭐ Stuart & Treasure Coast's Most Trusted Bathroom Experts
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            What If Your Morning Routine<br />
            Felt Like a Spa Retreat?
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Transform your outdated bathroom into a luxurious sanctuary in just 7 days. Zero stress. Zero surprises. 100% guaranteed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <a href="tel:650-501-7659">
              <Button size="lg" className="text-lg px-6 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white w-full">
                <Phone className="mr-2" size={24} />
                Call: 650-501-7659
              </Button>
            </a>
            <a href="sms:650-501-7659">
              <Button size="lg" className="text-lg px-6 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 w-full">
                <MessageSquare className="mr-2" size={24} />
                Text Us Now
              </Button>
            </a>
            <Button onClick={() => openModalWithContext('Hero Section - Get Free Quote')} size="lg" className="text-lg px-6 py-6 bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white w-full">
              <Upload className="mr-2" size={24} />
              Get Free Quote
            </Button>
          </div>
          <p className="mt-6 text-sm">📅 Next Available Start Date: This Week! • ⚡ Same-Day Estimates Available</p>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[var(--deep-charcoal)]">Get Your Free Bathroom Quote</DialogTitle>
            <DialogDescription>
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

      {/* Trust Indicators */}
      <section className="py-8 bg-[var(--deep-charcoal)] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">7-Day</div>
              <div className="text-sm">Completion Promise</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">500+</div>
              <div className="text-sm">Happy Homeowners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">100%</div>
              <div className="text-sm">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Calculator */}
      <section className="py-16 bg-gradient-to-b from-white to-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">See What Your Dream Bathroom Costs</h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Move the slider to see monthly payment options. No credit check required!
          </p>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-4">
                What's your comfortable monthly investment?
              </label>
              <input
                type="range"
                min="200"
                max="1000"
                step="50"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--brushed-gold)]"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$200/mo</span>
                <span>$1,000/mo</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--brushed-gold)] mb-2">
                ${monthlyBudget}/month
              </div>
              <div className="text-gray-600 mb-4">
                Based on 24-month financing • Estimated Project Budget: ${estimatedTotal.toLocaleString()}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Check className="text-green-600" size={20} />
                  <span>Custom Tile & Fixtures</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="text-green-600" size={20} />
                  <span>Modern Vanity & Storage</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="text-green-600" size={20} />
                  <span>Professional Installation</span>
                </div>
              </div>
              <Button onClick={() => openModalWithContext(`Payment Calculator - Monthly Budget $${monthlyBudget}`)} size="lg" className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white">
                Get My Detailed Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After - Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Real Stuart & Treasure Coast Bathroom Transformations
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            See what we've done for your neighbors! All completed in 7 days or less.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[var(--warm-off-white)] rounded-lg overflow-hidden shadow-lg">
              <img src={bathroomMarble} alt="Luxury Bathroom After" className="w-full h-80 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">• Completed in 6 Days</span>
                </div>
                <p className="text-gray-700 italic mb-3">
                  "KMJK turned our cramped, outdated bathroom into a stunning spa-like retreat. Chris and his team were professional, clean, and finished exactly when promised. I actually look forward to my morning routine now!"
                </p>
                <p className="text-sm font-semibold">— Jennifer M., Stuart, FL</p>
              </div>
            </div>
            <div className="bg-[var(--warm-off-white)] rounded-lg overflow-hidden shadow-lg">
              <img src={bathroomLuxurySpa} alt="Modern Bathroom After" className="w-full h-80 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">• Completed in 7 Days</span>
                </div>
                <p className="text-gray-700 italic mb-3">
                  "We were worried about the mess and disruption, but KMJK's team cleaned up every single day and worked around our schedule. The final result is beyond our wildest dreams. Worth every penny!"
                </p>
                <p className="text-sm font-semibold">— Robert & Lisa T., Port St. Lucie, FL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[var(--deep-charcoal)] to-[var(--brushed-bronze)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Love Your Bathroom Again?
          </h2>
          <p className="text-xl mb-8">
            Schedule your free in-home consultation today. Upload photos and get a detailed quote!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
                <Phone className="mr-2" size={24} />
                Call: 650-501-7659
              </Button>
            </a>
            <Button onClick={() => openModalWithContext('Final CTA - Send Photos & Get Quote')} size="lg" className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
              <Upload className="mr-2" size={24} />
              Send Photos & Get Quote
            </Button>
          </div>
          <p className="mt-6 text-sm">
            ✓ Licensed & Insured • ✓ A+ BBB Rating • ✓ 100% Satisfaction Guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

export default BathroomLandingImproved

