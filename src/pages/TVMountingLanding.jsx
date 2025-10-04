import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageSquare, Check, Star, Shield, MapPin, Award, Sparkles, Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import customEntertainment from '../assets/custom_entertainment.jpg'

function TVMountingLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    images: []
  })

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
    formDataToSend.append('subject', 'New TV Mounting Request from KMJK Website')
    
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
      {/* Hero Section - Above the Fold */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${customEntertainment})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/70 z-1"></div>
        <div className="relative z-2 max-w-5xl mx-auto px-4 text-center text-white py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Flawless TV Mounting<br />
            in Daly City & the Peninsula
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-200 max-w-3xl mx-auto">
            From Messy Wires to a Clean, Cinematic Look.<br />
            <span className="text-[var(--brushed-gold)] font-semibold">Guaranteed.</span>
          </p>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg" 
            className="text-xl px-12 py-8 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white mb-6 shadow-2xl"
          >
            Get My Free Quote Now
          </Button>
          
          <p className="text-sm flex items-center justify-center gap-2">
            <Shield className="inline" size={18} />
            Licensed, Insured & 5-Star Rated
          </p>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[var(--deep-charcoal)]">Ready for a Flawless TV Setup?</DialogTitle>
            <DialogDescription>
              Tell us about your project and we'll respond within the hour!
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-8 text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Request Sent!</h3>
              <p className="text-gray-600">We'll get back to you within the hour.</p>
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
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Briefly Describe Your Project *</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brushed-gold)] focus:border-transparent"
                  placeholder="e.g., 65&quot; TV, drywall, need wire concealment"
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
                  'Get My Free Quote!'
                )}
              </Button>
              
              <p className="text-sm text-center text-gray-600">
                We'll respond within the hour. Your information is 100% private.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Trust/Proof Bar */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Star className="text-[var(--brushed-gold)] mb-2" size={32} fill="currentColor" />
              <div className="font-semibold text-[var(--deep-charcoal)]">5-Star Google Reviews</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="text-[var(--brushed-gold)] mb-2" size={32} />
              <div className="font-semibold text-[var(--deep-charcoal)]">Locally Owned & Operated</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="text-[var(--brushed-gold)] mb-2" size={32} />
              <div className="font-semibold text-[var(--deep-charcoal)]">Satisfaction Guaranteed</div>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-[var(--brushed-gold)] mb-2" size={32} />
              <div className="font-semibold text-[var(--deep-charcoal)]">Servicing the Entire Bay Area</div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Selection - The Core Conversion Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[var(--warm-off-white)]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--deep-charcoal)]">
            Choose Your Perfect Setup
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            From basic mounting to cinema-quality installations, we have the perfect solution for your home.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1: Pro Mount */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200 hover:border-[var(--brushed-gold)] transition-all">
              <h3 className="text-2xl font-bold mb-4 text-[var(--deep-charcoal)]">Pro Mount</h3>
              <div className="text-4xl font-bold text-[var(--brushed-gold)] mb-6">Starting at $199</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>For TVs up to 75"</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Securely Mounted to Any Surface (Drywall, Brick, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Devices Connected & Tested</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Cables Neatly Dressed</span>
                </li>
              </ul>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white"
              >
                Get Quote
              </Button>
            </div>

            {/* Package 2: The Clean Look - MOST POPULAR */}
            <div className="bg-white rounded-lg shadow-2xl p-8 border-4 border-[var(--brushed-gold)] hover:scale-105 transition-all relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--brushed-gold)] text-white px-6 py-2 rounded-full font-bold text-sm">
                <Sparkles className="inline mr-1" size={16} />
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--deep-charcoal)] mt-2">The Clean Look</h3>
              <div className="text-4xl font-bold text-[var(--brushed-gold)] mb-6">Starting at $399</div>
              <div className="text-sm text-gray-600 mb-4 font-semibold">Everything in Pro Mount PLUS:</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="font-semibold">In-Wall Wire Concealment (No Wires Visible!)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="font-semibold">Power Outlet Relocation if Needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Professional Cable Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Perfect for Modern Living Rooms</span>
                </li>
              </ul>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white text-lg py-6"
              >
                Get Quote (Recommended)
              </Button>
            </div>

            {/* Package 3: Ultimate Experience */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200 hover:border-[var(--brushed-gold)] transition-all">
              <h3 className="text-2xl font-bold mb-4 text-[var(--deep-charcoal)]">The Ultimate Experience</h3>
              <div className="text-4xl font-bold text-[var(--brushed-gold)] mb-6">Starting at $699</div>
              <div className="text-sm text-gray-600 mb-4 font-semibold">Everything in The Clean Look PLUS:</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="font-semibold">Soundbar Mounting & Integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="font-semibold">Floating Shelf Installation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Smart Home Device Integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Complete Theater Setup</span>
                </li>
              </ul>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white"
              >
                Get Quote
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              💡 <span className="font-semibold">Not sure which package?</span> Get a free quote and we'll recommend the best option for your space!
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section - Local Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--deep-charcoal)]">
            See Our Work in Your Neighbors' Homes
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Real installations from real customers in Daly City & the Peninsula
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Clean Wire Concealment - Pacifica", desc: "75\" Frame TV with completely hidden wires" },
              { title: "Soundbar & TV Setup - Daly City", desc: "85\" TV with integrated soundbar mounting" },
              { title: "Floating Shelf Installation - San Mateo", desc: "Modern entertainment center with hidden cables" },
              { title: "Brick Wall Mount - South San Francisco", desc: "65\" TV securely mounted on brick fireplace" },
              { title: "Corner TV Mount - Burlingame", desc: "Swivel mount with wire concealment" },
              { title: "Complete Theater - Millbrae", desc: "TV, soundbar, and smart home integration" }
            ].map((item, idx) => (
              <div key={idx} className="bg-[var(--warm-off-white)] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div 
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${customEntertainment})` }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[var(--deep-charcoal)]">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-[var(--brushed-gold)]" size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--deep-charcoal)] to-[var(--brushed-bronze)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for a Flawless TV Setup?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your free quote now and experience the difference of professional TV mounting with complete wire concealment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="tel:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
                <Phone className="mr-2" size={24} />
                Call: 650-501-7659
              </Button>
            </a>
            <Button 
              onClick={() => setIsModalOpen(true)}
              size="lg" 
              className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white"
            >
              <Upload className="mr-2" size={24} />
              Get Free Quote Online
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-sm">
            <div className="flex flex-col items-center">
              <Check className="mb-2" size={24} />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex flex-col items-center">
              <Check className="mb-2" size={24} />
              <span>A+ BBB Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <Check className="mb-2" size={24} />
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TVMountingLanding

