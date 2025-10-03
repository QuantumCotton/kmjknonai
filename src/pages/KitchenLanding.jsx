import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, Check, Star, Calendar, MessageSquare, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import kitchenModern from '../assets/kitchen_modern.jpg'

function KitchenLanding() {
  const [projectSize, setProjectSize] = useState('full')
  
  const pricing = {
    'refresh': { range: '$15,000 - $25,000', monthly: '$625/mo', features: ['New Countertops & Backsplash', 'Cabinet Refacing', 'New Fixtures & Hardware', 'Updated Lighting'] },
    'full': { range: '$35,000 - $60,000', monthly: '$1,458/mo', features: ['Complete Custom Cabinets', 'Premium Countertops', 'New Appliances', 'Flooring & Lighting', 'Layout Redesign'] },
    'luxury': { range: '$75,000+', monthly: '$3,125/mo', features: ['High-End Custom Cabinets', 'Luxury Stone Countertops', 'Professional Appliances', 'Custom Island Design', 'Smart Home Integration'] }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${kitchenModern})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/45 z-1"></div>
        <div className="relative z-2 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Heart className="inline mr-1" size={16} />
            Where Stuart Families Gather & Memories Are Made
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Imagine Hosting Thanksgiving<br />
            In Your Dream Kitchen
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Transform your kitchen into the heart of your home. See your space in 3D before we start. Fixed pricing. Zero surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:650-501-7659">
              <Button size="lg" className="text-lg px-8 py-6 bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
                <Phone className="mr-2" size={24} />
                Call Now: 650-501-7659
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
                <MessageSquare className="mr-2" size={24} />
                See Your Kitchen in 3D!
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm">🏆 2024 Best Kitchen Remodeler - Treasure Coast • ⭐ 4.9/5 Stars (237 Reviews)</p>
        </div>
      </section>

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
            <a href="tel:650-501-7659">
              <Button size="lg" className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] text-white">
                Get My Free Detailed Quote & 3D Design
              </Button>
            </a>
            <p className="text-sm text-gray-600 mt-3">📸 Upload your kitchen photos via text: 650-501-7659</p>
          </div>
        </div>
      </section>

      {/* Social Proof - Real Transformations */}
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
                    "Chris and the KMJK team listened to everything we wanted - more counter space, better flow, and a place where our kids could do homework while we cooked. They nailed it! The 3D design they showed us was EXACTLY what we got. No surprises on cost, no stress, just beautiful results. We've hosted three dinner parties already!"
                  </p>
                  <p className="font-semibold">— Michael & Sarah K., Stuart, FL</p>
                  <p className="text-sm text-gray-600">Full Kitchen Remodel • $42,000 • 4 Weeks</p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--warm-off-white)] rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={20} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">• Completed in 2 Weeks</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[var(--deep-charcoal)]">
                    "Best Investment We've Made in Our Home!"
                  </h3>
                  <p className="text-gray-700 italic mb-4 text-lg">
                    "We were nervous about the cost, but KMJK helped us stay on budget with smart choices. The new countertops and cabinet refacing made our 1990s kitchen look like something from a magazine. Our home value increased by $30k according to our realtor. Worth every penny!"
                  </p>
                  <p className="font-semibold">— Patricia L., Port St. Lucie, FL</p>
                  <p className="text-sm text-gray-600">Kitchen Refresh • $18,500 • 2 Weeks</p>
                </div>
                <img src={kitchenModern} alt="Kitchen Refresh" className="w-full h-full object-cover order-1 lg:order-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why KMJK Section */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Why Families Choose KMJK</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            We're not just building kitchens. We're creating the heart of your home! 💛
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="text-xl font-semibold mb-3">See It Before We Build It</h3>
              <p className="text-gray-700">
                We create detailed 3D renderings of your new kitchen so you can see exactly what you're getting. No guesswork!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Fixed Pricing Promise</h3>
              <p className="text-gray-700">
                Your quote is your final price. We include everything - no surprise "oh we found this" charges later.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-3">You Can Still Cook!</h3>
              <p className="text-gray-700">
                We set up a temporary kitchen setup so you're not eating takeout for weeks. Your family routine continues.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Daily Progress Updates</h3>
              <p className="text-gray-700">
                Get text or email updates with photos every day. You'll always know exactly what's happening.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Local & Family-Owned</h3>
              <p className="text-gray-700">
                We live here, work here, and care about our reputation. Your satisfaction is our future business!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">On-Time Guarantee</h3>
              <p className="text-gray-700">
                We give you a completion date and stick to it. If we're late, we discount your final bill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonial Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Meet Chris - Your Kitchen Renovation Partner</h2>
          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <p className="text-xl text-gray-600">Personal Message from Chris</p>
              <p className="text-sm text-gray-500">(Video testimonial placeholder)</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 italic">
            "Hi, I'm Chris, and I've been transforming kitchens in the Treasure Coast for over 15 years. I'm not just a contractor - I'm a homeowner too, and I treat every kitchen like it's my own. Let's create something beautiful together!"
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[var(--deep-charcoal)] to-[var(--brushed-bronze)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Start Your Kitchen Adventure!
          </h2>
          <p className="text-xl mb-8">
            Get your free in-home consultation and see your new kitchen in 3D. No pressure, just possibilities!
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
                Text for Quick Quote
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
            ✓ Licensed & Insured • ✓ A+ BBB Rating • ✓ Financing Available • ✓ 100% Satisfaction Guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

export default KitchenLanding

