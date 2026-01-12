import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Shield, Clock, Zap, Star, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ChristmasLightsLanding() {
  return (
    <div className="bg-white text-[var(--deep-charcoal)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--deep-charcoal)] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
            {/* Using one of the copied images as background */}
          <img
            src="/images/christmas/xMOlBro1eft6.jpg"
            alt="Christmas Lights Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 mb-4 border border-[var(--brushed-gold)] rounded-full">
                <span className="text-[var(--brushed-gold)] font-semibold tracking-wide uppercase text-sm">KMJK Holiday Lighting</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                Stop Untangling. <br/>
                <span className="text-[var(--brushed-gold)]">Start Celebrating.</span>
              </h1>
              <p className="text-xl text-gray-200 font-light">
                Professional Christmas Light Installation with guaranteed installation dates in Stuart, FL & the Treasure Coast.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-[var(--brushed-gold)]" />
                  <span>Speed: Installed in 48 hours (subject to availability)</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-[var(--brushed-gold)]" />
                  <span>Reliability: Guaranteed up by your target date</span>
                </div>
                <div className="flex items-center gap-4">
                  <Shield className="w-6 h-6 text-[var(--brushed-gold)]" />
                  <span>Safety: Fully Insured & Certified</span>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                    <Button className="bg-[var(--brushed-gold)] text-white hover:bg-[#a0750a] text-lg px-8 py-6 w-full sm:w-auto">
                    Get Your Free Quote Now
                    </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[var(--brushed-gold)]">
              <img
                src="/images/christmas/xMOlBro1eft6.jpg"
                alt="Beautifully lit home"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-[var(--warm-off-white)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <img
                src="/images/christmas/6uAyzDryGzpe.jpg"
                alt="Before and after lights"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                The "Up By December 1st" Promise
              </h2>
              <p className="text-lg text-gray-700">
                The holiday season is short. Don't let a late installation steal your joy. We understand that a reliable schedule is as important as a beautiful display.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-[var(--brushed-gold)] pl-6 py-2">
                  <h3 className="text-xl font-semibold mb-2">48-Hour Installation</h3>
                  <p className="text-gray-600">
                    For last-minute bookings, we can often have your display installed within 48 hours of finalizing your design.
                  </p>
                </div>

                <div className="border-l-4 border-[var(--brushed-gold)] pl-6 py-2">
                  <h3 className="text-xl font-semibold mb-2">December 1st Guarantee</h3>
                  <p className="text-gray-600">
                    Book your service before November 1st, and we guarantee your lights will be shining bright by December 1st.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Two Ways to Shine</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the service model that fits your needs and budget.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[var(--deep-charcoal)]">
                  <th className="text-left py-4 px-4 font-serif text-lg">Feature</th>
                  <th className="text-left py-4 px-4 font-serif text-lg text-gray-600">Option A: Labor Only</th>
                  <th className="text-left py-4 px-4 font-serif text-lg text-[var(--brushed-gold)]">Option B: All-Inclusive Leasing</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-semibold">Lights Used</td>
                  <td className="py-4 px-4 text-gray-600">Your existing lights</td>
                  <td className="py-4 px-4 text-gray-800 font-medium">Brand new, commercial-grade LED lights</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-semibold">Service Included</td>
                  <td className="py-4 px-4 text-gray-600">Installation & Removal</td>
                  <td className="py-4 px-4 text-gray-800 font-medium">Design, Install, Maintenance, Removal, Storage</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-semibold">Maintenance</td>
                  <td className="py-4 px-4 text-gray-600">Not Included</td>
                  <td className="py-4 px-4 text-gray-800 font-medium">Free throughout the season</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Commercial Grade Section */}
      <section className="py-20 bg-[var(--warm-off-white)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Commercial Grade vs. Retail Lights
              </h2>
              <p className="text-lg text-gray-700">
                The difference between a dim, fragile display and a brilliant, durable one is more than just brightness. Our commercial-grade LED lights are built to last.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[var(--brushed-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg">Brighter Light Output</strong>
                    <span className="text-gray-600">Commercial LEDs produce 3-5x more light than retail bulbs.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[var(--brushed-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg">Weather Resistant</strong>
                    <span className="text-gray-600">Built to handle rain, wind, and temperature extremes.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/christmas/Bzf38woIANCo.jpg"
                alt="Commercial grade bulb"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

       {/* Safety Section */}
       <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <img
                src="/images/christmas/fBBLA937TnLe.jpg"
                alt="Safety first installation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Zero Risk. Zero Liability.
              </h2>
              <p className="text-lg text-gray-700">
                Climbing ladders and working on roofs is dangerous. When you hire an uninsured contractor, you assume the liability. Our commitment to your peace of mind is absolute.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-[var(--brushed-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg">Fully Insured Climbers</strong>
                    <span className="text-gray-600">Our entire team is fully covered by comprehensive liability and worker's compensation insurance.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-[var(--brushed-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-lg">Damage-Free Installation</strong>
                    <span className="text-gray-600">We use professional, non-invasive clips and fasteners—never nails or staples.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-[var(--deep-charcoal)] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Don't Just Decorate. Create a Memory.
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let us handle the dangerous, time-consuming work so you can focus on what truly matters.
          </p>
          <Link to="/contact">
            <Button className="bg-[var(--brushed-gold)] text-white hover:bg-[#a0750a] text-lg px-10 py-6">
              Check Your Date & Get a Free Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
