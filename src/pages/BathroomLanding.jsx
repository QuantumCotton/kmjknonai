import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, Check, Star, Calendar, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import bathroomLuxurySpa from '../assets/bathroom_luxury_spa.jpg'
import bathroomMarble from '../assets/bathroom_marble.jpg'

function BathroomLanding() {
  const [monthlyBudget, setMonthlyBudget] = useState(500)
  const estimatedTotal = monthlyBudget * 24 // 24-month financing example

  return (
    <div className="pt-20">
      {/* Hero Section - The Visual Instant */}
      <section
        className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bathroomLuxurySpa})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-1"></div>
        <div className="relative z-2 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ⭐ Stuart & Treasure Coast's Most Trusted Bathroom Experts
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            What If Your Morning Routine<br />
            Felt Like a Spa Retreat?
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Transform your outdated bathroom into a luxurious sanctuary in just 7 days. Zero stress. Zero surprises. 100% guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
                <Phone className="mr-2" size={24} />
                Call Now: 650-501-7659
              </Button>
            </a>
            <a href="sms:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
                <MessageSquare className="mr-2" size={24} />
                Text Us - Get Instant Response!
              </Button>
            </a>
          </div>
          <p className="mt-4 text-sm">📅 Next Available Start Date: This Week! • ⚡ Same-Day Estimates Available</p>
        </div>
      </section>

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
            Move the slider to see monthly payment options. No credit check required to see pricing!
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
              <div className="mt-6">
                <a href="tel:650-501-7659">
                  <Button size="lg" className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white">
                    Get My Free Detailed Quote
                  </Button>
                </a>
              </div>
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

      {/* Our 7-Day Promise */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">The KMJK 7-Day Bathroom Promise</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            We know you're worried about the process. Here's how we make it stress-free:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🛁</div>
              <h3 className="text-xl font-semibold mb-2">One Bathroom Always Functional</h3>
              <p className="text-gray-700">
                We coordinate our work so you're never without a working bathroom in your home. Your comfort is our priority.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🧹</div>
              <h3 className="text-xl font-semibold mb-2">Daily Cleanup Guarantee</h3>
              <p className="text-gray-700">
                We clean and protect your home every single day. No dust, no debris left behind when we leave.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-xl font-semibold mb-2">7-Day Completion (Or We Pay You!)</h3>
              <p className="text-gray-700">
                We finish your bathroom in 7 days or less, or we discount your final bill. We're that confident.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-xl font-semibold mb-2">Fixed-Price, No Surprise Charges</h3>
              <p className="text-gray-700">
                Your quote is your final price. No hidden fees, no surprise charges, no "we found this" upcharges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section - Hidden Costs of Waiting */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-red-700">
            The Hidden Cost of Waiting
          </h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            We care too much to let these problems go ignored:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-3">💧</div>
              <h3 className="font-semibold mb-2">Water Damage</h3>
              <p className="text-sm text-gray-600">Old grout and caulking can lead to hidden leaks causing thousands in damage</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🦠</div>
              <h3 className="font-semibold mb-2">Mold & Mildew</h3>
              <p className="text-sm text-gray-600">Poor ventilation and old materials create health hazards for your family</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">📉</div>
              <h3 className="font-semibold mb-2">Home Value Loss</h3>
              <p className="text-sm text-gray-600">An outdated bathroom can reduce your home's value by 5-10%</p>
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
            Schedule your free in-home consultation today. See 3D designs before we start. No obligation, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
                <Phone className="mr-2" size={24} />
                Call: 650-501-7659
              </Button>
            </a>
            <a href="sms:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
                <MessageSquare className="mr-2" size={24} />
                Text for Instant Quote
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--deep-charcoal)]">
                <Calendar className="mr-2" size={24} />
                Schedule Online
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm">
            ✓ Licensed & Insured • ✓ A+ BBB Rating • ✓ 100% Satisfaction Guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

export default BathroomLanding

