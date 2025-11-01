import { Link } from 'react-router-dom'
import { MessageSquare, Check, Star, Shield, Wrench, Zap, Droplet, Hammer, Lightbulb, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { KMJK_CONTACT_NAME, KMJK_PHONE_DISPLAY, KMJK_PHONE_CALL_LINK, KMJK_EMAIL } from '@/constants/contact.js'

const bathroomHero = new URL('../../pics/bathroom/Phoenixbathroomafter.png', import.meta.url).href

function HandymanLandingWithPricing() {
  const services = [
    { icon: Wrench, title: 'General Repairs', description: 'Doors, locks, drywall, trim' },
    { icon: Zap, title: 'Electrical', description: 'Outlets, switches, fixtures, fans' },
    { icon: Droplet, title: 'Plumbing', description: 'Faucets, toilets, drains, leaks' },
    { icon: Hammer, title: 'Carpentry', description: 'Shelving, cabinets, assembly' },
    { icon: Lightbulb, title: 'Lighting', description: 'Install, repair, upgrades' },
    { icon: Shield, title: 'Home Safety', description: 'Grab bars, smoke detectors' },
  ]

  const pricingServices = [
    {
      category: '🔧 Assembly & Installation',
      items: [
        { name: 'TV Mounting (up to 75")', price: 'Starting at $399' },
        { name: 'Furniture Assembly', price: 'Starting at $225' },
        { name: 'Ceiling Fan Installation', price: 'Starting at $375' },
        { name: 'Garbage Disposal Replacement', price: 'Starting at $200' },
      ]
    },
    {
      category: '🔨 Repairs & Maintenance',
      items: [
        { name: 'Drywall Patching (small holes)', price: 'Starting at $375 minimum visit' },
        { name: 'Leaky Faucet Repair', price: 'Starting at $375 minimum visit' },
        { name: 'Re-caulking Tub/Shower', price: 'Starting at $375 minimum visit' },
        { name: 'Gutter Cleaning', price: 'Starting at $425' },
      ]
    },
    {
      category: '🪚 Carpentry & Finishing',
      items: [
        { name: 'Baseboard/Trim Installation', price: 'Starting at $450/room' },
        { name: 'Door Hardware Replacement', price: 'Starting at $200' },
        { name: 'Picture & Mirror Hanging', price: 'Starting at $225' },
      ]
    },
    {
      category: '🎨 Painting & Outdoor',
      items: [
        { name: 'Interior Room Painting', price: 'Starting at $675' },
        { name: 'Pressure Washing', price: 'Starting at $350' },
        { name: 'Deck Staining', price: 'Starting at $275 per 100 sq ft' },
      ]
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section - Urgent & Action-Oriented */}
      <section
        className="relative min-h-[70vh] flex items-center text-white py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${bathroomHero})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-block bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md animate-pulse">
              ⚡ AVAILABLE TODAY • Same-Day Service!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Need It Fixed?<br />
              We're On It Today!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Licensed, insured, background-checked handymen ready to tackle your to-do list. $375 minimum visit—bundle punch-list items to maximize value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a href={KMJK_PHONE_CALL_LINK} className="block">
              <div className="bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white p-6 rounded-lg text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <MessageSquare className="mx-auto mb-3" size={40} />
                <div className="text-2xl font-bold mb-2">Call {KMJK_CONTACT_NAME}</div>
                <div className="text-3xl font-bold">{KMJK_PHONE_DISPLAY}</div>
                <div className="text-sm mt-2">Share photos for fastest quote</div>
              </div>
            </a>
            <Link to="/contact" className="block">
              <div className="bg-white text-[var(--deep-charcoal)] p-6 rounded-lg text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <DollarSign className="mx-auto mb-3" size={40} />
                <div className="text-2xl font-bold mb-2">Request Pricing Call</div>
                <div className="text-lg font-semibold text-[var(--brushed-gold)]">We respond within 1 hour</div>
                <div className="text-sm mt-2">Perfect for bundled services</div>
              </div>
            </Link>
          </div>
          <p className="text-center mt-6 text-sm text-gray-200">Prefer email? Reach {KMJK_CONTACT_NAME} at <a className="underline" href={`mailto:${KMJK_EMAIL}`}>{KMJK_EMAIL}</a></p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">Same Day</div>
              <div className="text-sm text-gray-600">Service Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">Licensed</div>
              <div className="text-sm text-gray-600">& Fully Insured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">Background</div>
              <div className="text-sm text-gray-600">Checked Pros</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">Upfront</div>
              <div className="text-sm text-gray-600">Flat-Rate Pricing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brushed-gold)]">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Can We Fix - Visual Grid */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">What Can We Fix Today?</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            If it's on your to-do list, we can handle it! (And yes, we actually show up on time!)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
                  <Icon className="mx-auto mb-4 text-[var(--brushed-gold)]" size={48} />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transparent Pricing Section - NEW! */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <DollarSign className="mx-auto mb-4 text-[var(--brushed-gold)]" size={48} />
            <h2 className="text-4xl font-bold mb-4">Popular Services & Transparent Pricing</h2>
            <p className="text-lg text-gray-600">
              No games. No hidden fees. Here's what our most requested services start at:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingServices.map((category, idx) => (
              <div key={idx} className="bg-[var(--warm-off-white)] rounded-lg p-6 shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-[var(--deep-charcoal)]">{category.category}</h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-start border-b border-gray-200 pb-2">
                      <span className="text-gray-700 font-medium flex-1">{item.name}</span>
                      <span className="text-[var(--brushed-gold)] font-bold ml-4 whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-[var(--warm-off-white)] p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Don't See Your Project?</h3>
            <div className="text-lg text-gray-700 mb-6">
              We handle 50+ home services! Minimum visit is $375—text photos and we’ll bundle tasks for the best value.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={KMJK_PHONE_CALL_LINK}>
                <Button size="lg" className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white">
                  <MessageSquare className="mr-2" size={20} />
                  Call {KMJK_CONTACT_NAME} for Custom Quote
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" className="bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
                  Schedule Call-Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Available Time Slots - Creates Urgency */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Book Today's Available Slots!</h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Real-time availability for Stuart & Treasure Coast area:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-6 rounded-lg text-center opacity-50">
              <div className="text-2xl font-bold text-gray-400 mb-2">10:00 AM</div>
              <div className="text-sm text-gray-500">BOOKED</div>
            </div>
            <div className="bg-green-100 border-4 border-green-500 p-6 rounded-lg text-center animate-pulse">
              <div className="text-2xl font-bold text-green-700 mb-2">2:00 PM</div>
              <div className="text-sm text-green-600 font-semibold">AVAILABLE NOW!</div>
              <a href={KMJK_PHONE_CALL_LINK}>
                <Button className="mt-3 bg-green-600 hover:bg-green-700 text-white">
                  Text to Book
                </Button>
              </a>
            </div>
            <div className="bg-yellow-100 border-2 border-yellow-500 p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-700 mb-2">5:00 PM</div>
              <div className="text-sm text-yellow-600">1 Spot Left</div>
              <a href={KMJK_PHONE_CALL_LINK}>
                <Button className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white">
                  Text to Reserve
                </Button>
              </a>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            ⏰ Slots fill up fast! Text us now to secure your time.
          </p>
        </div>
      </section>

      {/* Social Proof - Quick Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Why People Love Our Service</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Real reviews from your Stuart & Treasure Coast neighbors!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--warm-off-white)] p-6 rounded-lg shadow-md">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Called at 9am with a leaky faucet, and they were here by 2pm! Fixed it in 20 minutes. Professional, friendly, and priced exactly what they quoted. Will use again!"
              </p>
              <p className="font-semibold text-sm">— Karen B., Stuart</p>
            </div>
            <div className="bg-[var(--warm-off-white)] p-6 rounded-lg shadow-md">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "I had a long list of small repairs I'd been putting off. KMJK knocked them all out in one visit. Fair pricing, no upselling, just good honest work."
              </p>
              <p className="font-semibold text-sm">— Tom R., Port St. Lucie</p>
            </div>
            <div className="bg-[var(--warm-off-white)] p-6 rounded-lg shadow-md">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Love that I can just text them! Sent photos of my broken cabinet, got a quote in 10 minutes, and they fixed it the next day. So easy!"
              </p>
              <p className="font-semibold text-sm">— Jessica M., Jensen Beach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Thinking Bigger Section */}
      <section className="py-12 bg-gradient-to-r from-[var(--brushed-gold)] to-[var(--brushed-bronze)] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">💭 Thinking Bigger Than Repairs?</h2>
          <p className="text-xl mb-6">
            We also do full kitchen & bathroom remodels! Many of our handyman customers become renovation clients.
          </p>
          <Link to="/services">
            <Button size="lg" className="bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
              Explore Our Full Remodeling Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[var(--deep-charcoal)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop Procrastinating. Let's Fix It Today!
          </h2>
          <p className="text-xl mb-8">
            Licensed, insured, and ready to tackle your to-do list. Call or text for same-day service!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a href={KMJK_PHONE_CALL_LINK}>
              <Button size="lg" className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
                <MessageSquare className="mr-2" size={24} />
                Call {KMJK_CONTACT_NAME} Now
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
                Schedule a Call-Back
              </Button>
            </Link>
          </div>
          <p className="text-sm">
            ✓ Same-Day Service Available • ✓ Licensed & Insured • ✓ Background Checked • ✓ No Job Too Small
          </p>
          <p className="text-sm mt-2 text-gray-300">
            📸 Text photos to {KMJK_PHONE_DISPLAY} for priority quoting.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HandymanLandingWithPricing

