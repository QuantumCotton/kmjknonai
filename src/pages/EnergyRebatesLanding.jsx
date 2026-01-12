import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  ChevronRight, 
  DollarSign, 
  Home, 
  Lightbulb, 
  Zap, 
  Leaf, 
  Sun, 
  CheckCircle2,
  FileText
} from 'lucide-react'

export default function EnergyRebatesLanding() {
  return (
    <div className="bg-white text-[var(--deep-charcoal)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--deep-charcoal)] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/images/energy/florida-concept-savings.jpg"
            alt="Energy Savings Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[var(--deep-charcoal)]/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 mb-6 border border-[var(--brushed-gold)] rounded-full backdrop-blur-sm bg-black/20">
              <span className="text-[var(--brushed-gold)] font-semibold tracking-wide uppercase text-sm">
                KMJK Energy Solutions
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
              Pay for Your Home Upgrades with <br/>
              <span className="text-[var(--brushed-gold)]">Government Incentives</span>
            </h1>
            <p className="text-xl text-gray-200 font-light mb-8 leading-relaxed">
              Federal, state, and utility incentives can cover 30-50% of your energy efficiency upgrades. Invest in a more comfortable, resilient, and affordable future with KMJK.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-[var(--brushed-gold)] hover:bg-[#a0750a] text-white text-lg px-8 py-6 w-full sm:w-auto">
                  Get Your Free Energy Audit
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">The Simple 3-Step Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting these upgrades and claiming your incentives is straightforward with KMJK.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[var(--warm-off-white)] p-8 rounded-lg shadow-lg border-t-4 border-[var(--deep-charcoal)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--deep-charcoal)] text-white flex items-center justify-center font-bold text-xl">1</div>
                <h3 className="text-2xl font-serif font-bold">Audit</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                It starts with a professional Home Energy Audit to identify where your home is losing the most energy. This provides a roadmap for the most impactful, cost-saving upgrades.
              </p>
              <div className="flex items-center text-[var(--deep-charcoal)] font-semibold">
                <Lightbulb className="w-5 h-5 mr-2 text-[var(--brushed-gold)]" />
                Free assessments available
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[var(--warm-off-white)] p-8 rounded-lg shadow-lg border-t-4 border-[var(--brushed-gold)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--brushed-gold)] text-white flex items-center justify-center font-bold text-xl">2</div>
                <h3 className="text-2xl font-serif font-bold">Install</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Hire KMJK to install upgrades like high-SEER HVAC, impact windows, or insulation. We ensure all products meet the specific efficiency requirements for incentives.
              </p>
              <div className="flex items-center text-[var(--deep-charcoal)] font-semibold">
                <Home className="w-5 h-5 mr-2 text-[var(--brushed-gold)]" />
                Expert Installation
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[var(--warm-off-white)] p-8 rounded-lg shadow-lg border-t-4 border-[var(--deep-charcoal)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--deep-charcoal)] text-white flex items-center justify-center font-bold text-xl">3</div>
                <h3 className="text-2xl font-serif font-bold">Claim</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                After installation, claim your savings. This could be an instant rebate, a grant, or a tax credit when you file your annual taxes. We help provide the documentation you need.
              </p>
              <div className="flex items-center text-[var(--deep-charcoal)] font-semibold">
                <DollarSign className="w-5 h-5 mr-2 text-[var(--brushed-gold)]" />
                Multiple rebate options
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incentives Breakdown */}
      <section className="py-20 bg-[var(--warm-off-white)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Understanding the Incentives</h2>
            <p className="text-lg text-gray-600">We help you navigate the complex world of rebates and tax credits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[var(--brushed-gold)]">
              <h3 className="text-2xl font-serif font-bold mb-4 text-[var(--deep-charcoal)]">Rebate (Cash Now)</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A direct reduction in the purchase price or a check mailed to you after the purchase. These are typically offered by utility companies like FPL and Duke Energy.
              </p>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="font-semibold text-[var(--deep-charcoal)]">Example:</p>
                <p className="text-gray-600">Duke Energy offers up to $1,000 for HVAC replacement</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[var(--deep-charcoal)]">
              <h3 className="text-2xl font-serif font-bold mb-4 text-[var(--deep-charcoal)]">Tax Credit (Lower Taxes Later)</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A dollar-for-dollar reduction of your federal income tax liability. You claim this when you file your taxes using IRS Form 5695.
              </p>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="font-semibold text-[var(--deep-charcoal)]">Example:</p>
                <p className="text-gray-600">Federal 25C credit: 30% of cost, up to $3,200/year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">Key Upgrades & Incentives</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            Popular upgrades for Florida homes and the financial benefits available.
          </p>

          <div className="overflow-x-auto bg-white rounded-lg shadow-xl border border-gray-200">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[var(--deep-charcoal)] text-white">
                  <th className="px-6 py-4 text-left font-serif text-lg">Upgrade</th>
                  <th className="px-6 py-4 text-left font-serif text-lg">Federal Credit (25C)</th>
                  <th className="px-6 py-4 text-left font-serif text-lg">Florida Specifics</th>
                  <th className="px-6 py-4 text-left font-serif text-lg">Utility Rebates</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-[var(--deep-charcoal)]">High-SEER HVAC</td>
                  <td className="px-6 py-4 text-gray-700">30% of cost, up to <strong>$2,000</strong></td>
                  <td className="px-6 py-4 text-gray-700">N/A</td>
                  <td className="px-6 py-4 text-gray-700">Up to <strong>$1,000</strong> (FPL/Duke)</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition bg-[var(--warm-off-white)]">
                  <td className="px-6 py-4 font-semibold text-[var(--deep-charcoal)]">Insulation & Air Sealing</td>
                  <td className="px-6 py-4 text-gray-700">30% of cost, up to <strong>$1,200</strong>/yr</td>
                  <td className="px-6 py-4 text-gray-700">N/A</td>
                  <td className="px-6 py-4 text-gray-700">Up to <strong>$1,420</strong> combined</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-[var(--deep-charcoal)]">Impact Windows</td>
                  <td className="px-6 py-4 text-gray-700">30% of cost, up to <strong>$600</strong></td>
                  <td className="px-6 py-4 text-gray-700"><strong>My Safe Florida Home</strong> grant up to <strong>$10,000</strong></td>
                  <td className="px-6 py-4 text-gray-700">Up to <strong>$800</strong> (Duke)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition bg-[var(--warm-off-white)]">
                  <td className="px-6 py-4 font-semibold text-[var(--deep-charcoal)]">Solar Panels</td>
                  <td className="px-6 py-4 text-gray-700"><strong>30%</strong> of total cost</td>
                  <td className="px-6 py-4 text-gray-700">Sales tax + property tax exemptions</td>
                  <td className="px-6 py-4 text-gray-700">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Impact Windows Section */}
      <section className="py-20 bg-[var(--warm-off-white)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/images/energy/florida-window-comparison.jpg" 
                alt="Energy Efficient Windows" 
                className="rounded-lg shadow-2xl border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-[var(--brushed-gold)] p-6 rounded-lg shadow-xl hidden md:block">
                <p className="text-white font-bold text-xl">Dual Benefit</p>
                <p className="text-white/90">Storm Protection + Energy Savings</p>
              </div>
            </div>
            
            <div className="space-y-6">
               <div>
                  <span className="text-[var(--brushed-gold)] font-bold tracking-widest uppercase text-sm">Storm Protection</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">
                    Impact Windows & Doors
                  </h2>
               </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Energy-efficient impact windows provide dual benefits: they reduce your energy bills by up to 30% while protecting your home from hurricanes and storms.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border-l-4 border-[var(--deep-charcoal)]">
                  <p className="font-semibold text-[var(--deep-charcoal)]">Federal Tax Credit</p>
                  <p className="text-gray-600">30% of cost, up to $600 per window</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-[var(--brushed-gold)]">
                  <p className="font-semibold text-[var(--deep-charcoal)]">My Safe Florida Home</p>
                  <p className="text-gray-600">Up to $10,000 grant for hurricane-hardening</p>
                </div>
              </div>

              <Link to="/contact">
                <Button className="mt-4 bg-[var(--brushed-gold)] hover:bg-[#a0750a] w-fit text-lg px-6 py-3 text-white">
                  Contact KMJK
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Visual */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
           <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">Real World Savings Example</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div className="p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow">
               <div className="text-5xl font-bold text-[var(--brushed-gold)] mb-4">71%</div>
               <h3 className="text-xl font-semibold mb-2">Cost Reduction</h3>
               <p className="text-gray-600">Possible reduction in initial investment over 5 years</p>
             </div>
             <div className="p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow bg-[var(--deep-charcoal)] text-white">
               <div className="text-5xl font-bold text-[var(--brushed-gold)] mb-4">$7,100</div>
               <h3 className="text-xl font-semibold mb-2">Total Value</h3>
               <p className="text-gray-300">Combined federal credits, rebates, and energy savings on a typical HVAC upgrade</p>
             </div>
             <div className="p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow">
               <div className="text-5xl font-bold text-[var(--brushed-gold)] mb-4">5 Years</div>
               <h3 className="text-xl font-semibold mb-2">Payback Period</h3>
               <p className="text-gray-600">Time until the system pays for itself in savings</p>
             </div>
           </div>
        </div>
      </section>

       {/* IRS Form Info */}
       <section className="py-20 bg-[var(--warm-off-white)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/3">
                <img 
                  src="/images/energy/florida-irs-form-5695.jpg" 
                  alt="IRS Form 5695" 
                  className="rounded-lg shadow-lg w-full"
                />
             </div>
             <div className="md:w-2/3">
                <h2 className="text-3xl font-serif font-bold mb-6">Claiming Your Federal Tax Credit</h2>
                <p className="text-lg text-gray-700 mb-6">
                  To claim your federal tax credit, you'll need to file <span className="font-semibold">IRS Form 5695 (Residential Energy Credits)</span> with your annual tax return.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                   <h4 className="font-bold mb-3">We Help You Prepare:</h4>
                   <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[var(--brushed-gold)] w-5 h-5"/>
                        <span>Detailed itemized invoices</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[var(--brushed-gold)] w-5 h-5"/>
                        <span>Manufacturer certification statements</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[var(--brushed-gold)] w-5 h-5"/>
                        <span>Proof of installation date</span>
                      </li>
                   </ul>
                </div>
                <p className="text-sm text-gray-500 italic">
                  *Tax credits available through Dec 31, 2032. Always consult a tax professional.
                </p>
             </div>
          </div>
        </div>
       </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--deep-charcoal)] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Start Saving Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a free energy audit with KMJK and discover how much you can save.
          </p>
          <Link to="/contact">
            <Button className="bg-[var(--brushed-gold)] hover:bg-[#a0750a] text-white text-lg px-10 py-6">
              Schedule Your Audit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
