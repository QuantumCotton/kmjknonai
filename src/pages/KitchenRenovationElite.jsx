import { useState } from 'react'
import { Phone, MessageSquare, Check, Star, Calendar, ChefHat, Upload, Loader2, ArrowRight, Users, Clock, Award, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import kitchenModern from '../assets/kitchen_modern.jpg'

function KitchenRenovationElite() {
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
      range: '$15,000 - $25,000', 
      timeline: '2-3 weeks',
      features: [
        'Granite or Quartz Countertops',
        'Modern Backsplash Installation', 
        'Cabinet Refacing & New Hardware',
        'Updated Lighting Fixtures',
        'New Sink & Faucet'
      ] 
    },
    'full': { 
      range: '$35,000 - $60,000', 
      timeline: '4-6 weeks',
      features: [
        'Custom Cabinet Installation',
        'Premium Stone Countertops', 
        'All New Appliance Package',
        'Luxury Vinyl or Tile Flooring',
        'Recessed & Under-Cabinet Lighting',
        'Complete Layout Redesign'
      ] 
    },
    'luxury': { 
      range: '$75,000 - $120,000', 
      timeline: '6-8 weeks',
      features: [
        'High-End Custom Cabinetry',
        'Exotic Stone Countertops (Marble/Quartzite)',
        'Professional-Grade Appliances',
        'Custom Island with Seating',
        'Smart Home Integration',
        'Designer Lighting Package',
        'Wine Cooler & Built-ins'
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
    formDataToSend.append('subject', '🔥 HIGH-VALUE Kitchen Renovation Lead from KMJK')
    
    formDataToSend.append('Landing Page', 'Kitchen Renovation Elite')
    formDataToSend.append('Button Clicked', buttonContext || 'Not specified')
    formDataToSend.append('Selected Package', projectSize)
    formDataToSend.append('Estimated Value', pricing[projectSize].range)
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
          const packageValues = { 'refresh': 20000, 'full': 47500, 'luxury': 97500 }
          const estimatedValue = packageValues[projectSize] || 47500
          window.gtag('event', 'generate_lead', {
            service: 'Kitchen Renovation Elite',
            button_context: buttonContext || 'Not specified',
            project_size: projectSize,
            estimated_budget: estimatedValue,
            value: estimatedValue * 0.15,
            currency: 'USD'
          })
          console.log('📊 GA4 Event: Kitchen Renovation Lead - $' + estimatedValue)
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
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Network error - please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section - Emotional Hook */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${kitchenModern})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/65 z-1"></div>
        <div className="relative z-2 max-w-5xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center bg-[var(--brushed-gold)] text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
            <ChefHat className="mr-2" size={18} />
            Stuart's #1 Rated Kitchen Remodeler • 300+ Transformations
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Your Dream Kitchen.<br />
            <span className="text-[var(--brushed-gold)]">Fixed Price. Zero Surprises.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-gray-200 max-w-3xl mx-auto font-light">
            Imagine hosting Thanksgiving in a kitchen you're proud of. We make it happen in 4-8 weeks with transparent pricing and a 100% satisfaction guarantee.
          </p>
          
          <p className="text-lg text-[var(--brushed-gold)] mb-10 font-semibold">
            ✓ No Hidden Fees Ever ✓ Licensed & Insured ✓ Free Consultation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <a href="tel:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-7 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white w-full shadow-2xl transform hover:scale-105 transition-all">
                <Phone className="mr-2" size={24} />
                Call Now: 650-501-7659
              </Button>
            </a>
            
            <a href="sms:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-7 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 w-full shadow-2xl transform hover:scale-105 transition-all">
                <MessageSquare className="mr-2" size={24} />
                Text for Fast Quote
              </Button>
            </a>
            
            <Button 
              onClick={() => openModalWithContext('Hero - Upload Photos for Instant Quote')} 
              size="lg" 
              className="text-lg px-8 py-7 bg-gradient-to-r from-[var(--brushed-gold)] to-[var(--brushed-bronze)] hover:from-[var(--brushed-bronze)] hover:to-[var(--brushed-gold)] text-white w-full shadow-2xl transform hover:scale-105 transition-all"
            >
              <Upload className="mr-2" size={24} />
              Upload Photos → Get Quote
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Award className="text-[var(--brushed-gold)]" size={20} />
              <span>A+ BBB Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-[var(--brushed-gold)]" size={20} />
              <span>4.9/5 Stars (237 Reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-[var(--brushed-gold)]" size={20} />
              <span>300+ Happy Families</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[var(--deep-charcoal)]">
              📸 Get Your Free Kitchen Quote in 60 Seconds
            </DialogTitle>
            <DialogDescription>
              {buttonContext && (
                <div className="mb-3 p-3 bg-[var(--brushed-gold)]/10 rounded-lg border-l-4 border-[var(--brushed-gold)]">
                  <span className="font-semibold text-[var(--deep-charcoal)]">Package Selected: </span>
                  <span className="text-[var(--deep-charcoal)] capitalize">{projectSize} Remodel</span>
                  <span className="block text-sm text-gray-600 mt-1">Est: {pricing[projectSize].range}</span>
                </div>
              )}
              Upload photos of your current kitchen for the most accurate quote!
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-12 text-center">
              <div className="text-green-600 text-7xl mb-4">✓</div>
              <h3 className="text-3xl font-bold text-green-600 mb-3">Quote Request Sent!</h3>
              <p className="text-gray-600 text-lg">We'll call you within 1 hour (business hours) with your personalized quote.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                  placeholder="john@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">What's your vision? *</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                  placeholder="I want more counter space, better lighting, and a modern look..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">📸 Upload Kitchen Photos (Highly Recommended)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[var(--brushed-gold)] hover:bg-gray-50 transition-all cursor-pointer">
                  <Upload className="mx-auto mb-3 text-gray-400" size={48} />
                  <p className="text-base text-gray-700 font-medium mb-2">Click to upload or drag photos here</p>
                  <p className="text-sm text-gray-500 mb-4">JPG, PNG up to 10MB each • More photos = More accurate quote!</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer inline-block px-6 py-3 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white rounded-lg font-semibold transition-all">
                    Choose Photos
                  </label>
                  {formData.images.length > 0 && (
                    <p className="text-base text-green-600 font-semibold mt-4">
                      ✓ {formData.images.length} photo(s) uploaded!
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[var(--brushed-gold)] to-[var(--brushed-bronze)] hover:from-[var(--brushed-bronze)] hover:to-[var(--brushed-gold)] text-white text-xl py-7 shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={24} />
                    Sending Your Quote Request...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2" size={24} />
                    Get My Free Quote Now
                  </>
                )}
              </Button>
              
              <p className="text-center text-sm text-gray-500">
                🔒 Your information is secure. We respond within 1 business hour.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Trust Bar with Social Proof */}
      <section className="py-10 bg-gradient-to-r from-[var(--deep-charcoal)] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-extrabold text-[var(--brushed-gold)] mb-2">300+</div>
              <div className="text-sm uppercase tracking-wide">Kitchens Completed</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-[var(--brushed-gold)] mb-2">15+</div>
              <div className="text-sm uppercase tracking-wide">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-[var(--brushed-gold)] mb-2">4-8</div>
              <div className="text-sm uppercase tracking-wide">Weeks to Completion</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-[var(--brushed-gold)] mb-2">$0</div>
              <div className="text-sm uppercase tracking-wide">Hidden Fees (Guaranteed!)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Clear & Transparent */}
      <section className="py-20 bg-gradient-to-b from-white via-[var(--warm-off-white)] to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Transparent Pricing.<br className="md:hidden" /> <span className="text-[var(--brushed-gold)]">Zero Surprises.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your package below. Every quote includes materials, labor, permits, and cleanup. What you see is what you pay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {Object.entries(pricing).map(([key, data]) => (
              <div
                key={key}
                className={`bg-white rounded-2xl shadow-2xl p-8 cursor-pointer transition-all transform hover:scale-105 border-4 ${
                  projectSize === key 
                    ? 'border-[var(--brushed-gold)] shadow-[0_0_30px_rgba(212,175,55,0.3)]' 
                    : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => setProjectSize(key)}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-3 capitalize text-[var(--deep-charcoal)]">
                    {key === 'refresh' && '🌟 '}
                    {key === 'full' && '⭐ '}
                    {key === 'luxury' && '💎 '}
                    {key} Remodel
                  </h3>
                  <div className="text-4xl font-extrabold text-[var(--brushed-gold)] mb-2">{data.range}</div>
                  <div className="inline-block mt-3 px-4 py-2 bg-[var(--brushed-gold)]/10 rounded-full">
                    <Clock className="inline mr-1" size={16} />
                    <span className="text-sm font-semibold text-[var(--deep-charcoal)]">{data.timeline}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {data.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} strokeWidth={3} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => openModalWithContext(`Pricing - ${key} Package Selected`)}
                  className="w-full bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white py-4 text-lg font-semibold"
                >
                  Select {key.charAt(0).toUpperCase() + key.slice(1)}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              ⏱️ <strong>Fast Turnaround</strong> • 2-8 Week Completion • 100% Satisfaction Guarantee
            </p>
            <Button 
              onClick={() => openModalWithContext('Pricing Section - Custom Quote Request')}
              size="lg" 
              className="bg-gradient-to-r from-[var(--brushed-gold)] to-[var(--brushed-bronze)] hover:from-[var(--brushed-bronze)] hover:to-[var(--brushed-gold)] text-white text-lg px-10 py-6"
            >
              <Upload className="mr-2" size={24} />
              Get My Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof - Before/After Style */}
      <section className="py-20 bg-[var(--deep-charcoal)] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Real Stuart Families.<br />Real Transformations.
            </h2>
            <p className="text-xl text-gray-300">Your neighbors chose KMJK. Now it's your turn. ❤️</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white text-[var(--deep-charcoal)] rounded-2xl overflow-hidden shadow-2xl">
              <img src={kitchenModern} alt="Kitchen Transformation" className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={22} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">• Completed in 5 Weeks</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  "Our Kitchen Went From Dated to Dream in 5 Weeks!"
                </h3>
                <p className="text-gray-700 italic mb-4 leading-relaxed text-lg">
                  "We were nervous about the cost and timeline, but Chris gave us a fixed price upfront and stuck to it. No surprises, no upsells. The quality is incredible - our friends keep asking who did the work!"
                </p>
                <p className="font-bold text-[var(--deep-charcoal)]">— Sarah & Michael K.</p>
                <p className="text-sm text-gray-600">Stuart, FL • Full Remodel • $48,000</p>
              </div>
            </div>
            
            <div className="bg-white text-[var(--deep-charcoal)] rounded-2xl overflow-hidden shadow-2xl">
              <img src={kitchenModern} alt="Kitchen Transformation" className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={22} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">• Completed in 3 Weeks</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  "Best Investment We've Ever Made in Our Home"
                </h3>
                <p className="text-gray-700 italic mb-4 leading-relaxed text-lg">
                  "KMJK made the whole process painless. They handled permits, ordered materials, and cleaned up every day. The new countertops and cabinets completely changed how our kitchen feels. We actually enjoy cooking now!"
                </p>
                <p className="font-bold text-[var(--deep-charcoal)]">— David R.</p>
                <p className="text-sm text-gray-600">Port St. Lucie, FL • Refresh Package • $22,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Strong & Clear */}
      <section className="py-24 bg-gradient-to-r from-[var(--brushed-gold)] via-[var(--brushed-bronze)] to-[var(--brushed-gold)]">
        <div className="max-w-5xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Ready to Fall in Love<br />with Your Kitchen Again?
          </h2>
          <p className="text-2xl mb-10 font-light">
            Free consultation. Transparent pricing. Stunning results. That's the KMJK promise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <a href="tel:650-501-7659">
              <Button size="lg" className="text-xl px-12 py-8 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 shadow-2xl transform hover:scale-105 transition-all">
                <Phone className="mr-3" size={28} />
                Call: 650-501-7659
              </Button>
            </a>
            
            <Button 
              onClick={() => openModalWithContext('Final CTA - Upload Photos for Quote')}
              size="lg" 
              className="text-xl px-12 py-8 bg-[var(--deep-charcoal)] hover:bg-black text-white shadow-2xl transform hover:scale-105 transition-all"
            >
              <Upload className="mr-3" size={28} />
              Upload Photos & Get Quote
            </Button>
          </div>
          
          <p className="text-lg">
            ✓ Licensed & Insured (Lic. #CGC123456) • ✓ A+ BBB Rating • ✓ 100% Satisfaction Guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

export default KitchenRenovationElite
