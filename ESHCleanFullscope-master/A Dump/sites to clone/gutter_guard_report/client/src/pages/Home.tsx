import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

/**
 * Premium Comparison Design System
 * Navy (#0f172a) + Gold (#d4af37) + White
 * Cormorant Garamond (serif) for headlines, Poppins (sans-serif) for body
 * Asymmetric layouts, generous whitespace, premium details
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">GG</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">
              Gutter Guard Report
            </h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#problem" className="text-foreground hover:text-accent transition-colors">
              The Problem
            </a>
            <a href="#science" className="text-foreground hover:text-accent transition-colors">
              The Science
            </a>
            <a href="#comparison" className="text-foreground hover:text-accent transition-colors">
              Comparison
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image */}
          <div className="h-96 lg:h-screen relative">
            <img
              src="/images/hero-problem.jpg"
              alt="Clogged gutter causing water damage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          </div>

          {/* Right: Content */}
          <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
            <div className="max-w-md">
              <div className="inline-block mb-6 px-4 py-2 bg-accent/10 border border-accent rounded-full">
                <span className="text-accent font-semibold text-sm">Consumer Report</span>
              </div>
              <h2 className="text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                The Ultimate Gutter Guard Comparison
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Discover why stainless steel micro-mesh is the gold standard for home protection. We've analyzed every major gutter guard technology to separate fact from marketing hype.
              </p>
              <div className="flex gap-4">
                <a
                  href="#comparison"
                  className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  See Comparison
                </a>
                <a
                  href="#science"
                  className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent/5 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              The Problem: Why Gutter Protection is Non-Negotiable
            </h2>
            <div className="accent-line mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A home's gutter system is its first line of defense against water damage. When functioning correctly, gutters channel thousands of gallons of rainwater away from the roof, siding, and foundation. However, when gutters become clogged with leaves, pine needles, and shingle grit, this essential system fails catastrophically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="premium-card p-8">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Foundation Damage
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Overflowing water pools at the base of the home, saturating the soil. This leads to hydrostatic pressure against the foundation, causing cracks, basement leaks, and costly structural damage.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="premium-card p-8">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Fascia & Soffit Rot
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Water backing up in the gutter trough seeps into wooden fascia boards and soffits, leading to wood rot, mold growth, and a compromised roof structure.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="premium-card p-8">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Pest Infestation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Stagnant water and damp debris create an ideal breeding ground for mosquitoes and a nesting environment for rodents and insects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Science Section */}
      <section id="science" className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                The Science: Hydro-Lock Technology
              </h2>
              <div className="accent-line mb-8 w-20"></div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The most effective gutter guards utilize a principle known as <span className="font-semibold text-foreground">hydro-lock technology</span> (or surface tension) to manage water flow while rejecting debris. This technology is most prominently featured in premium micro-mesh systems.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Water Adhesion</h4>
                    <p className="text-muted-foreground">
                      The fine, surgical-grade stainless steel mesh is designed to allow water to cling to its surface and flow directly through the microscopic openings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Debris Rejection</h4>
                    <p className="text-muted-foreground">
                      The mesh openings are so small—typically 50 microns—that they block even fine particles like shingle grit and pine needles.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Natural Clearing</h4>
                    <p className="text-muted-foreground">
                      Debris dries quickly and is lifted away by wind or slides off due to the guard's pitch, keeping the channel clear.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="h-96 lg:h-full min-h-96 rounded-lg overflow-hidden">
              <img
                src="/images/tech-micromesh.jpg"
                alt="Stainless steel micro-mesh close-up"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Myth Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
            The Maintenance Myth
          </h2>
          <div className="accent-line mb-8"></div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Many gutter guard manufacturers advertise their products as <span className="font-semibold text-foreground">"maintenance free."</span> This claim is misleading. The truth is that no outdoor product exposed to the elements is truly maintenance-free.
          </p>
          <div className="bg-accent/5 border-l-4 border-accent p-8 rounded-r-lg">
            <p className="text-lg text-foreground font-semibold mb-3">
              Premium Micro-Mesh systems are "Low Maintenance," not "Maintenance Free."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              While they eliminate the dangerous and frequent chore of scooping out clogged gutters, they may still require occasional, light maintenance. Over time, organic material like pollen, dust, and tree sap can form a thin film on the mesh surface. A simple, light brushing from the ground with an extension pole once or twice a year is typically all that is needed to restore peak performance.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4 text-center">
            The Verdict: Why Stainless Steel Micro-Mesh Wins
          </h2>
          <div className="flex justify-center mb-12">
            <div className="w-20 h-1 bg-accent"></div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-foreground text-white">
                    <th className="px-6 py-4 text-left font-serif font-bold">Guard Type</th>
                    <th className="px-6 py-4 text-left font-serif font-bold">Debris Blocking</th>
                    <th className="px-6 py-4 text-left font-serif font-bold">Flow Rate</th>
                    <th className="px-6 py-4 text-left font-serif font-bold">Durability</th>
                    <th className="px-6 py-4 text-left font-serif font-bold">Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Micro-Mesh Row */}
                  <tr className="border-b border-border hover:bg-accent/5 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        Stainless Steel Micro-Mesh
                        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                          WINNER
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-foreground font-semibold">Excellent</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Blocks all debris, including shingle grit</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-foreground font-semibold">Excellent</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Maintains full flow in heavy rain</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-foreground font-semibold">Excellent</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Stainless steel resists UV & corrosion</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-accent">
                      40+ Years / Lifetime
                    </td>
                  </tr>

                  {/* Reverse Curve Row */}
                  <tr className="border-b border-border hover:bg-red-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      Reverse Curve / Helmet
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <span className="text-foreground font-semibold">Good</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Can clog with shingle grit</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <span className="text-foreground font-semibold">Fair</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Reduced in heavy rain</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <span className="text-foreground font-semibold">Good</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Visible from ground</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-yellow-700">
                      10-20 Years
                    </td>
                  </tr>

                  {/* Foam/Brush Row */}
                  <tr className="hover:bg-red-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      Foam / Brush
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-foreground font-semibold">Poor</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Traps debris inside</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-foreground font-semibold">Poor</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Quickly reduces flow</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-foreground font-semibold">Poor</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Degrades in UV light</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-red-700">
                      2-5 Years
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="mb-12">
            <img
              src="/images/comparison-visual.jpg"
              alt="Side-by-side comparison of gutter guard types"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="h-96 lg:h-full min-h-96 rounded-lg overflow-hidden order-2 lg:order-1">
              <img
                src="/images/installation-professional.jpg"
                alt="Professional installation of micro-mesh guard"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Professional Installation Matters
              </h2>
              <div className="accent-line mb-8 w-20"></div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The low-profile design of premium micro-mesh systems ensures they remain virtually invisible from the ground. Professional installation slides the guard under the shingle lip, maintaining the aesthetic integrity of your home while providing maximum protection.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground">Low-profile design blends seamlessly with your roof</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground">Installed under shingle lip for maximum durability</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground">Professional installation ensures proper fit and performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Test Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Performance Proven: The Flow Test
              </h2>
              <div className="accent-line mb-8 w-20"></div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In rigorous flow tests, stainless steel micro-mesh systems demonstrate 100% water flow even during heavy downpours, while debris remains on the surface. This is the hydro-lock principle in action—water flows freely while leaves, twigs, and other debris are naturally rejected.
              </p>
              <div className="bg-white rounded-lg p-8 border-l-4 border-accent">
                <p className="text-2xl font-serif font-bold text-foreground mb-2">
                  100% Flow Rate
                </p>
                <p className="text-muted-foreground">
                  Even during intense rainfall, premium micro-mesh guards maintain full water flow while blocking 100% of debris.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="h-96 lg:h-full min-h-96 rounded-lg overflow-hidden">
              <img
                src="/images/flow-test-demo.jpg"
                alt="Water flow test demonstration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Alternatives Fail Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4 text-center">
            Why Alternatives Fall Short
          </h2>
          <div className="flex justify-center mb-12">
            <div className="w-20 h-1 bg-accent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reverse Curve Problems */}
            <div className="premium-card p-8 border-2 border-yellow-200">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                The Reverse Curve Trap
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These systems rely entirely on surface tension. While they look solid, they create a hidden, dry cavity underneath. This dark, sheltered space is notorious for becoming a haven for pests.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-semibold">Bees and wasps nest inside</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-semibold">Creates secondary blockage</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-semibold">Impossible to clear without professional removal</span>
                </li>
              </ul>
            </div>

            {/* Plastic Problems */}
            <div className="premium-card p-8 border-2 border-red-200">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                The Plastic Problem
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While some micro-mesh systems use plastic or vinyl frames, these are a false economy. In regions with intense sun exposure, the plastic will inevitably degrade.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-semibold">UV rays cause brittleness and cracking</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-semibold">Material warps and lifts away from gutter</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-semibold">Creates gaps allowing debris to enter</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-accent/10 border-2 border-accent rounded-lg p-8">
            <p className="text-lg text-foreground font-semibold mb-3">
              ✓ Stainless Steel Micro-Mesh: The Only Proven Solution
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Stainless steel micro-mesh, mounted on an aluminum frame, is the only material proven to withstand extreme weather and UV exposure for decades. It resists corrosion, maintains structural integrity, and delivers consistent performance year after year.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Protect Your Home?
          </h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Premium stainless steel micro-mesh gutter guards are the only choice for homeowners who demand the best protection and longevity.
          </p>
          <button className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors text-lg">
            Get a Free Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif font-bold text-foreground mb-4">About</h4>
              <p className="text-sm text-muted-foreground">
                Consumer Reports style analysis of gutter guard technologies.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-foreground mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#science" className="text-muted-foreground hover:text-accent transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#comparison" className="text-muted-foreground hover:text-accent transition-colors">
                    Comparison
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 Gutter Guard Report. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
