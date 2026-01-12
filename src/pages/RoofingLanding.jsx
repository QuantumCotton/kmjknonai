import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Award, Shield, Zap, Briefcase, FileText, TrendingUp, Users, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

export default function RoofingLanding() {
  return (
    <div className="bg-white text-[var(--deep-charcoal)]">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-start overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/roofing/myRMkVSacYD2.jpg')",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep-charcoal)]/90 via-[var(--deep-charcoal)]/60 to-transparent" />
        </div>

        <div className="relative z-10 container max-w-6xl mx-auto px-4 md:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1 mb-6 border border-white/30 rounded-full backdrop-blur-sm bg-black/20">
              <span className="text-[var(--brushed-gold)] font-semibold tracking-wide uppercase text-sm">KMJK Roofing Services</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Premium Roofing Built to Last
            </h1>
            <p className="text-xl text-gray-100 mb-8 font-light leading-relaxed">
              GAF Timberline HDZ shingles with LayerLock Technology, infinite wind protection, and expert insurance advocacy. Your roof deserves the best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-[var(--brushed-gold)] hover:bg-[#a0750a] text-white text-lg px-8 py-6 w-full sm:w-auto">
                  Get Your Free Inspection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-16 md:mb-24">
            <span className="text-[var(--brushed-gold)] font-semibold uppercase tracking-widest text-sm">
              Section 1
            </span>
            <h2 className="text-4xl font-serif font-bold mt-2 mb-6">
              Why Timberline HDZ Is #1 in North America
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              GAF Timberline HDZ shingles combine architectural beauty with unmatched durability. Built with LayerLock Technology, WindProven protection, and StainGuard Plus algae resistance, Timberline HDZ delivers the performance homeowners demand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--brushed-gold)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">LayerLock® Technology</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Mechanically fused common bond with the widest nail zone (StrikeZone). Enables 30% faster installation while ensuring superior fastening security and wind resistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--brushed-gold)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">WindProven® Limited Wind Warranty</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Infinite wind speed protection—no upper limit. Tested and proven to withstand extreme weather. Your roof is protected against the most severe storms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--brushed-gold)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">StainGuard Plus™ Algae Protection</h3>
                  <p className="text-gray-600 leading-relaxed">
                    25-year algae protection using GAF's time-release technology. Maintains the beauty and integrity of your roof against blue-green algae discoloration.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/roofing/hATOYwM8w53g.jpg"
                alt="GAF Timberline HDZ StrikeZone nailing area close-up"
                className="w-full rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-20 md:py-32 bg-[var(--warm-off-white)]">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-16 md:mb-24">
            <span className="text-[var(--brushed-gold)] font-semibold uppercase tracking-widest text-sm">
              Section 2
            </span>
            <h2 className="text-4xl font-serif font-bold mt-2 mb-6">
              Warranty Protection That Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              GAF offers multiple warranty tiers to fit your needs. From standard coverage to comprehensive protection, understand the difference and choose the peace of mind you deserve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
            <div className="relative order-2 md:order-1">
              <img
                src="/images/roofing/eDOhLWCevScQ.png"
                alt="GAF Golden Pledge Warranty Badge"
                className="w-full max-w-sm mx-auto"
              />
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <div className="bg-white p-6 rounded-sm border-l-4 border-gray-300">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold">System Plus Warranty</h3>
                </div>
                <p className="text-gray-500 text-sm mb-3">Standard coverage with material and workmanship protection.</p>
              </div>

              <div className="bg-white p-6 rounded-sm border-l-4 border-[var(--brushed-gold)] shadow-lg transform scale-105">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="w-6 h-6 text-[var(--brushed-gold)] flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold">Golden Pledge® Warranty</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3 font-medium">
                  Our most comprehensive coverage—the gold standard in roofing protection.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--brushed-gold)] rounded-full" /> Lifetime material warranty</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--brushed-gold)] rounded-full" /> 25-year workmanship coverage</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--brushed-gold)] rounded-full" /> Infinite wind protection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-16 md:mb-24">
            <span className="text-[var(--brushed-gold)] font-semibold uppercase tracking-widest text-sm">
              Section 3
            </span>
            <h2 className="text-4xl font-serif font-bold mt-2 mb-6">
              We Speak Insurance Company Language
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Insurance claims are complex. We handle the paperwork, meet with adjusters, and use industry-standard software to ensure you receive full coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative">
              <img
                src="/images/roofing/sqpDUS9mw8Q4.jpg"
                alt="Roofer discussing insurance"
                className="w-full rounded-sm shadow-lg"
              />
            </div>

            <div className="space-y-8 pt-8 md:pt-0">
              {[
                { title: "Professional Damage Assessment", desc: "We conduct a thorough inspection to identify all damage—wind-lifted shingles, hail hits, gutter damage, AC fins, and more." },
                { title: "Xactimate Estimation", desc: "We use Xactimate—the industry standard used by insurance companies—to generate precise estimates." },
                { title: "Adjuster Coordination", desc: "We meet with the insurance adjuster to walk through findings and ensure all damage is documented." },
                { title: "Full Claim Coverage", desc: "The result: your insurance covers gutters, AC fins, fascia, and all roofing materials—not just the shingles." }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[var(--brushed-gold)] text-white font-bold">{i + 1}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Repair vs Replace Section */}
      <section className="py-20 md:py-32 bg-[var(--warm-off-white)]">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
           <div className="mb-16 md:mb-24 text-center">
            <span className="text-[var(--brushed-gold)] font-semibold uppercase tracking-widest text-sm">
              Section 4
            </span>
            <h2 className="text-4xl font-serif font-bold mt-2 mb-6">
              Repair or Replace? We'll Be Honest
            </h2>
             <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Not every roof needs replacement. We assess your roof honestly and recommend the solution that makes financial and practical sense.
            </p>
          </div>
          
           <div className="grid md:grid-cols-2 gap-8 mb-16">
             <div className="bg-white p-8 rounded-sm border-l-4 border-green-500 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-semibold">Repair Makes Sense When...</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li>• Localized damage</li>
                  <li>• Recent installation (&lt;10 years)</li>
                  <li>• Underlying structure is sound</li>
                </ul>
             </div>
             
              <div className="bg-white p-8 rounded-sm border-l-4 border-red-500 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-semibold">Replace When...</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li>• Roof is 15+ years old</li>
                  <li>• Widespread damage (20%+)</li>
                  <li>• Structural concerns (rot/mold)</li>
                </ul>
             </div>
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
            Schedule your free inspection today and let our experts assess your roofing needs.
          </p>
          <Link to="/contact">
            <Button className="bg-[var(--brushed-gold)] hover:bg-[#a0750a] text-white text-lg px-10 py-6">
              Get Your Free Inspection
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
