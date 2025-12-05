import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Layers, Clock, Shield, Droplets, Hammer } from 'lucide-react'

export default function CoatingsLanding() {
  return (
    <div className="bg-white text-[var(--deep-charcoal)]">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-start overflow-hidden bg-[var(--deep-charcoal)]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('/images/coatings/garage_luxury_car_1.jpg')",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep-charcoal)] via-[var(--deep-charcoal)]/80 to-transparent" />

        <div className="relative z-10 container max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 mb-6 border border-[var(--brushed-gold)] rounded-full backdrop-blur-sm bg-black/20">
              <span className="text-[var(--brushed-gold)] font-semibold tracking-wide uppercase text-sm">
                KMJK Premium Coatings
              </span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Industrial Strength. <br />
              <span className="text-[var(--brushed-gold)]">Residential Beauty.</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 font-light leading-relaxed max-w-2xl">
              Transform your concrete surfaces with high-performance polyaspartic, epoxy, and metallic systems. We exclusively use <strong>Ballistix</strong>, <strong>Bullet Proof</strong>, and <strong>Counter Attack</strong> products for unmatched dexterity, custom color appeal, and extreme durability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-[var(--brushed-gold)] hover:bg-[#a0750a] text-white text-lg px-8 py-6 w-full sm:w-auto rounded-none">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-white px-6 py-3 border-l-4 border-[var(--brushed-gold)] bg-white/5 backdrop-blur-sm">
                 <div className="text-left">
                    <p className="text-xs text-gray-300 uppercase tracking-wider">Direct Line</p>
                    <p className="font-bold text-lg">772-777-0622</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[var(--warm-off-white)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-20">
            <div className="bg-white p-8 shadow-xl border-t-4 border-[var(--brushed-gold)]">
              <Clock className="w-12 h-12 text-[var(--deep-charcoal)] mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">1-Day Installation</h3>
              <p className="text-gray-600">
                Our polyaspartic systems cure in hours, not days. Get your garage back in service in just 24 hours.
              </p>
            </div>
            <div className="bg-white p-8 shadow-xl border-t-4 border-[var(--deep-charcoal)]">
              <Shield className="w-12 h-12 text-[var(--brushed-gold)] mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Extreme Durability</h3>
              <p className="text-gray-600">
                4x stronger than standard epoxy. Resistant to hot tire pickup, chemicals, stains, and UV yellowing.
              </p>
            </div>
            <div className="bg-white p-8 shadow-xl border-t-4 border-[var(--brushed-gold)]">
              <Layers className="w-12 h-12 text-[var(--deep-charcoal)] mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Custom Finishes</h3>
              <p className="text-gray-600">
                From granite-like chip flakes to luxurious metallic marble effects. Hundreds of color combinations available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Garage Systems Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <div>
                  <span className="text-[var(--brushed-gold)] font-bold tracking-widest uppercase text-sm">Garage Systems</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6 text-[var(--deep-charcoal)]">
                    The Ultimate Garage Floor
                  </h2>
               </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Traditional epoxy takes days to cure and can peel under hot tires. Our Polyaspartic Chip System is the gold standard for garage floor coatings. It creates a seamless, non-porous surface that is easy to clean and virtually indestructible.
              </p>

              <ul className="space-y-4">
                {[
                  "UV Stable - Won't yellow in sunlight",
                  "Chemical & Oil Resistant",
                  "Anti-Slip Texture Options",
                  "Lifetime Adhesion Warranty"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-[var(--deep-charcoal)] font-medium">
                    <CheckCircle2 className="w-6 h-6 text-[var(--brushed-gold)] mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/contact">
                <Button className="mt-4 bg-[var(--deep-charcoal)] text-white hover:bg-gray-800 text-lg px-8 py-6 rounded-none">
                   Request Garage Quote
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <img 
                src="/images/coatings/garage_chip_flake_1.jpg" 
                alt="Garage Chip Flake System" 
                className="w-full h-64 object-cover rounded-sm shadow-lg col-span-2"
              />
              <img 
                src="/images/coatings/garage_chip_flake_2.jpg" 
                alt="Garage Floor Detail" 
                className="w-full h-48 object-cover rounded-sm shadow-lg"
              />
              <img 
                src="/images/coatings/garage_chip_flake_application.jpg" 
                alt="Application Process" 
                className="w-full h-48 object-cover rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interior & Metallic Section */}
      <section className="py-20 bg-[var(--deep-charcoal)] text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 relative">
               <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="/images/coatings/living_room_metallic_1.jpg" 
                    alt="Metallic Epoxy Living Room" 
                    className="w-full h-80 object-cover rounded-sm shadow-2xl border-2 border-[var(--brushed-gold)]/20"
                  />
                  <img 
                    src="/images/coatings/kitchen_metallic_marble_1.jpg" 
                    alt="Metallic Epoxy Kitchen" 
                    className="w-full h-80 object-cover rounded-sm shadow-2xl border-2 border-[var(--brushed-gold)]/20 mt-12"
                  />
               </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                  <span className="text-[var(--brushed-gold)] font-bold tracking-widest uppercase text-sm">Interior Elegance</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6">
                    Metallic & Microcement
                  </h2>
               </div>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Turn your floors into a work of art.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Our metallic epoxy systems create a stunning, three-dimensional look with pearlescent pigments that flow like liquid marble. Perfect for showrooms, basements, and modern living spaces where you want to make a statement.
              </p>

              <div className="space-y-6 pt-4">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[var(--brushed-gold)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                       <Droplets className="w-6 h-6 text-[var(--brushed-gold)]" />
                    </div>
                    <div>
                       <h4 className="text-xl font-semibold mb-2">Seamless Beauty</h4>
                       <p className="text-gray-400">No grout lines to clean. A smooth, liquid-glass finish that expands the visual space of any room.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[var(--brushed-gold)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                       <Hammer className="w-6 h-6 text-[var(--brushed-gold)]" />
                    </div>
                    <div>
                       <h4 className="text-xl font-semibold mb-2">Microcement Options</h4>
                       <p className="text-gray-400">For a more subtle, organic concrete look, ask about our microcement overlays for walls and floors.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
       {/* Industrial Section */}
       <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-[var(--deep-charcoal)] font-bold tracking-widest uppercase text-sm border-b-2 border-[var(--brushed-gold)] pb-1">Commercial & Industrial</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-6 mb-6 text-[var(--deep-charcoal)]">
              Built for Heavy Duty
            </h2>
             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From warehouses to commercial kitchens, we provide USDA-approved, slip-resistant, and high-impact flooring solutions that meet strict safety codes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <img 
                src="/images/coatings/industrial_warehouse_striping_1.jpg" 
                alt="Warehouse Striping" 
                className="w-full h-64 object-cover shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img 
                src="/images/coatings/industrial_warehouse_striping_2.jpg" 
                alt="Safety Flooring" 
                className="w-full h-64 object-cover shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img 
                src="/images/coatings/industrial_warehouse_striping_3.jpg" 
                alt="Industrial Coating" 
                className="w-full h-64 object-cover shadow-lg hover:scale-105 transition-transform duration-500"
              />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--deep-charcoal)] text-white text-center border-t border-[var(--brushed-gold)]/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Contact KMJK today for a free consultation. We'll evaluate your concrete, show you samples, and provide a precise quote.
          </p>
          
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm mb-10 inline-block text-left w-full max-w-md mx-auto">
             <p className="text-[var(--brushed-gold)] font-bold uppercase tracking-widest text-sm mb-4 text-center">Contact Our Specialists</p>
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                   <span className="text-lg font-serif">Chris Cotton</span>
                   <span className="text-gray-400">Project Manager</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                   <span className="text-lg font-serif">Josue Lopez</span>
                   <span className="text-gray-400">Lead Installer</span>
                </div>
                <div className="text-center pt-4">
                   <a href="tel:7727770622" className="text-3xl font-bold text-white hover:text-[var(--brushed-gold)] transition-colors">
                      772-777-0622
                   </a>
                </div>
             </div>
          </div>
          
          <div>
             <Link to="/contact">
                <Button className="bg-[var(--brushed-gold)] hover:bg-[#a0750a] text-white text-xl px-12 py-8 rounded-none">
                  Get Your Free Quote
                </Button>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
