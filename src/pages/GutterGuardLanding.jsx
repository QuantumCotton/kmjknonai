import React from 'react'
import { CheckCircle2, XCircle, AlertCircle, Shield, Droplets } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function GutterGuardLanding() {
  return (
    <div className="min-h-screen bg-white text-[var(--deep-charcoal)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--deep-charcoal)] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="h-96 lg:h-screen relative">
            <img
              src="/images/gutter/hero-problem.jpg" // Needs to be verified if this image exists, I copied it
              alt="Clogged gutter causing water damage"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep-charcoal)]/80 to-transparent"></div>
          </div>

          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="max-w-md">
              <div className="inline-block mb-6 px-4 py-2 bg-[var(--brushed-gold)]/20 border border-[var(--brushed-gold)] rounded-full">
                <span className="text-[var(--brushed-gold)] font-semibold text-sm">KMJK Gutter Protection Analysis</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                The Ultimate Gutter Guard Comparison
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Discover why stainless steel micro-mesh is the gold standard for home protection. We've analyzed every major gutter guard technology to separate fact from marketing hype.
              </p>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="bg-[var(--brushed-gold)] text-white hover:bg-[#a0750a] text-lg px-8 py-6">
                    Get a Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              The Problem: Why Gutter Protection is Non-Negotiable
            </h2>
            <div className="h-1 w-20 bg-[var(--brushed-gold)] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              A home's gutter system is its first line of defense against water damage. When gutters become clogged with leaves, pine needles, and shingle grit, this essential system fails catastrophically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[var(--warm-off-white)] rounded-lg shadow-md">
              <AlertCircle className="w-12 h-12 text-[var(--brushed-gold)] mb-6" />
              <h3 className="text-xl font-serif font-bold mb-4">Foundation Damage</h3>
              <p className="text-gray-600">
                Overflowing water pools at the base of the home, saturating the soil and causing hydrostatic pressure against the foundation.
              </p>
            </div>

            <div className="p-8 bg-[var(--warm-off-white)] rounded-lg shadow-md">
              <AlertCircle className="w-12 h-12 text-[var(--brushed-gold)] mb-6" />
              <h3 className="text-xl font-serif font-bold mb-4">Fascia & Soffit Rot</h3>
              <p className="text-gray-600">
                Water backing up in the gutter trough seeps into wooden fascia boards and soffits, leading to wood rot and mold growth.
              </p>
            </div>

            <div className="p-8 bg-[var(--warm-off-white)] rounded-lg shadow-md">
              <AlertCircle className="w-12 h-12 text-[var(--brushed-gold)] mb-6" />
              <h3 className="text-xl font-serif font-bold mb-4">Pest Infestation</h3>
              <p className="text-gray-600">
                Stagnant water and damp debris create an ideal breeding ground for mosquitoes and a nesting environment for rodents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Science Section */}
      <section className="py-20 bg-[var(--warm-off-white)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                The Science: Hydro-Lock Technology
              </h2>
              <div className="h-1 w-20 bg-[var(--brushed-gold)] mb-8"></div>
              <p className="text-lg text-gray-600 mb-6">
                The most effective gutter guards utilize a principle known as <span className="font-bold text-[var(--deep-charcoal)]">hydro-lock technology</span> (or surface tension) to manage water flow while rejecting debris.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--brushed-gold)] text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Water Adhesion</h4>
                    <p className="text-gray-600">Fine, surgical-grade stainless steel mesh allows water to cling to its surface and flow through microscopic openings.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--brushed-gold)] text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Debris Rejection</h4>
                    <p className="text-gray-600">Mesh openings are typically 50 microns, blocking even fine particles like shingle grit and pine needles.</p>
                  </div>
                </div>
              </div>
            </div>
            
             <div className="h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
               {/* Use one of the available images, flow-test-demo is good here */}
              <img
                src="/images/gutter/flow-test-demo.jpg"
                alt="Water flow test"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
            The Verdict: Why Stainless Steel Micro-Mesh Wins
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[var(--deep-charcoal)] text-white">
                  <th className="px-6 py-4 text-left font-serif">Guard Type</th>
                  <th className="px-6 py-4 text-left font-serif">Debris Blocking</th>
                  <th className="px-6 py-4 text-left font-serif">Flow Rate</th>
                  <th className="px-6 py-4 text-left font-serif">Durability</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-[var(--brushed-gold)]/10">
                  <td className="px-6 py-4 font-semibold">
                    Stainless Steel Micro-Mesh
                    <span className="ml-2 inline-block px-2 py-0.5 bg-[var(--brushed-gold)] text-white text-xs rounded-full">WINNER</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-green-700 font-semibold"><CheckCircle2 size={18}/> Excellent</div>
                    <p className="text-xs text-gray-500">Blocks everything</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-green-700 font-semibold"><CheckCircle2 size={18}/> Excellent</div>
                    <p className="text-xs text-gray-500">Full flow in heavy rain</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-green-700 font-semibold"><CheckCircle2 size={18}/> Excellent</div>
                    <p className="text-xs text-gray-500">Resists UV & corrosion</p>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-semibold">Reverse Curve / Helmet</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-yellow-600 font-semibold"><AlertCircle size={18}/> Good</div>
                    <p className="text-xs text-gray-500">Clogs with shingle grit</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-yellow-600 font-semibold"><AlertCircle size={18}/> Fair</div>
                    <p className="text-xs text-gray-500">Reduced in heavy rain</p>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-yellow-600 font-semibold"><AlertCircle size={18}/> Good</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">Foam / Brush</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-red-600 font-semibold"><XCircle size={18}/> Poor</div>
                    <p className="text-xs text-gray-500">Traps debris inside</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-red-600 font-semibold"><XCircle size={18}/> Poor</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-red-600 font-semibold"><XCircle size={18}/> Poor</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
           <div className="mt-12">
            <img
              src="/images/gutter/comparison-visual.jpg"
              alt="Comparison Visual"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--deep-charcoal)] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Protect Your Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Premium stainless steel micro-mesh gutter guards are the only choice for homeowners who demand the best protection and longevity.
          </p>
          <Link to="/contact">
            <Button className="bg-[var(--brushed-gold)] text-white hover:bg-[#a0750a] text-lg px-10 py-6">
              Get a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
