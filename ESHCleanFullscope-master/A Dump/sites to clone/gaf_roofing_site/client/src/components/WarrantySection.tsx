import { Award, Shield, Zap } from "lucide-react";

/**
 * Section 2: The Warranty
 * Design: Alternating right text with left image
 * Focus: Warranty comparison and Golden Pledge benefits
 * Visual: Warranty badge graphic with comparison table
 */
export default function WarrantySection() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">
            Section 2
          </span>
          <h2 className="text-foreground mt-2 mb-6">
            Warranty Protection That Matters
          </h2>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed">
            GAF offers multiple warranty tiers to fit your needs. From standard coverage to comprehensive protection, understand the difference and choose the peace of mind you deserve.
          </p>
        </div>

        {/* Warranty Comparison */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Left: Image */}
          <div className="relative order-2 md:order-1">
            <img
              src="/images/eDOhLWCevScQ.png"
              alt="GAF Golden Pledge Warranty Badge"
              className="w-full max-w-sm mx-auto"
            />
          </div>

          {/* Right: Warranty Tiers */}
          <div className="order-1 md:order-2 space-y-6">
            {/* System Plus */}
            <div className="bg-white p-6 rounded-sm border-l-4 border-secondary">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <h3 className="text-xl font-semibold text-foreground">
                  System Plus Warranty
                </h3>
              </div>
              <p className="text-secondary text-sm mb-3">
                Standard coverage with material and workmanship protection.
              </p>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Lifetime material warranty
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  10-year workmanship coverage
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Wind warranty included
                </li>
              </ul>
            </div>

            {/* Silver Pledge */}
            <div className="bg-white p-6 rounded-sm border-l-4 border-muted">
              <div className="flex items-start gap-3 mb-3">
                <Award className="w-6 h-6 text-muted flex-shrink-0 mt-1" />
                <h3 className="text-xl font-semibold text-foreground">
                  Silver Pledge Warranty
                </h3>
              </div>
              <p className="text-secondary text-sm mb-3">
                Enhanced protection with extended workmanship coverage.
              </p>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full" />
                  Lifetime material warranty
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full" />
                  20-year workmanship coverage
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full" />
                  Enhanced wind protection
                </li>
              </ul>
            </div>

            {/* Golden Pledge */}
            <div className="bg-gradient-to-br from-accent/10 to-muted/10 p-6 rounded-sm border-l-4 border-accent ring-1 ring-accent/20">
              <div className="flex items-start gap-3 mb-3">
                <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <h3 className="text-xl font-semibold text-foreground">
                  Golden Pledge® Warranty
                </h3>
              </div>
              <p className="text-secondary text-sm mb-3 font-medium">
                Our most comprehensive coverage—the gold standard in roofing protection.
              </p>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Lifetime material warranty
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  25-year workmanship coverage
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Infinite wind protection
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Transferable to next owner
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Golden Pledge */}
        <div className="bg-white p-8 md:p-12 rounded-sm border-2 border-accent/20">
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Why We Recommend Golden Pledge
          </h3>
          <p className="text-secondary leading-relaxed mb-6">
            The Golden Pledge Warranty represents our commitment to your investment. It covers not just the shingles, but also the installation—ensuring that every aspect of your roof is protected. With 25 years of workmanship coverage, transferable ownership benefits, and infinite wind protection, Golden Pledge gives you complete peace of mind.
          </p>
          <p className="text-secondary leading-relaxed">
            When combined with GAF Timberline HDZ's LayerLock Technology and WindProven protection, the Golden Pledge Warranty creates an unbeatable roofing system that will protect your home for decades.
          </p>
        </div>
      </div>
    </section>
  );
}
