import { Briefcase, FileText, TrendingUp, Users } from "lucide-react";

/**
 * Section 3: Insurance Advocacy
 * Design: Left image with right text, alternating layout
 * Focus: Xactimate expertise, claim maximization, overhead reduction
 * Visual: Insurance process photo with process steps
 */
export default function InsuranceSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">
            Section 3
          </span>
          <h2 className="text-foreground mt-2 mb-6">
            We Speak Insurance Company Language
          </h2>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed">
            Insurance claims are complex. We handle the paperwork, meet with adjusters, and use industry-standard software to ensure you receive full coverage for all damage—not just the shingles.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <img
              src="/images/sqpDUS9mw8Q4.jpg"
              alt="Roofer discussing insurance paperwork with homeowner"
              className="w-full rounded-sm shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-sm shadow-xl max-w-xs">
              <p className="font-semibold mb-1">Reducing Your Overhead</p>
              <p className="text-sm">
                We handle all insurance coordination, so you focus on what matters—your family and home.
              </p>
            </div>
          </div>

          {/* Right: Process Steps */}
          <div className="space-y-8 pt-8 md:pt-0">
            {/* Step 1: Assessment */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Professional Damage Assessment
                </h3>
                <p className="text-secondary leading-relaxed">
                  We conduct a thorough inspection to identify all damage—wind-lifted shingles, hail hits, gutter damage, AC fins, and more. Nothing gets missed.
                </p>
              </div>
            </div>

            {/* Step 2: Xactimate */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Xactimate Estimation
                </h3>
                <p className="text-secondary leading-relaxed">
                  We use Xactimate—the industry standard used by insurance companies—to generate precise estimates. This is the language adjusters understand.
                </p>
              </div>
            </div>

            {/* Step 3: Adjuster Meeting */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Adjuster Coordination
                </h3>
                <p className="text-secondary leading-relaxed">
                  We meet with the insurance adjuster to walk through findings, answer questions, and ensure all damage is properly documented and approved.
                </p>
              </div>
            </div>

            {/* Step 4: Claim Maximization */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Full Claim Coverage
                </h3>
                <p className="text-secondary leading-relaxed">
                  The result: your insurance covers gutters, AC fins, fascia, and all roofing materials—not just the shingles. Maximum coverage, minimum stress.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-20 pt-20 border-t border-border">
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            What This Means for You
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="bg-gray-50 p-8 rounded-sm">
              <div className="flex items-start gap-4 mb-4">
                <TrendingUp className="w-8 h-8 text-accent flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Higher Claim Payouts
                </h4>
              </div>
              <p className="text-secondary leading-relaxed">
                By identifying and documenting all damage—not just roof damage—your claim reflects the true cost of restoration. Insurance pays more because we prove more.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gray-50 p-8 rounded-sm">
              <div className="flex items-start gap-4 mb-4">
                <Briefcase className="w-8 h-8 text-accent flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Reduced Out-of-Pocket Costs
                </h4>
              </div>
              <p className="text-secondary leading-relaxed">
                With comprehensive coverage, your deductible applies once to the entire claim—not separately to roof, gutters, and AC. Significant savings for you.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gray-50 p-8 rounded-sm">
              <div className="flex items-start gap-4 mb-4">
                <FileText className="w-8 h-8 text-accent flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Zero Paperwork Hassle
                </h4>
              </div>
              <p className="text-secondary leading-relaxed">
                We handle all documentation, estimates, and communication with your insurance company. You don't have to understand Xactimate or negotiate with adjusters.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gray-50 p-8 rounded-sm">
              <div className="flex items-start gap-4 mb-4">
                <Users className="w-8 h-8 text-accent flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Expert Advocacy
                </h4>
              </div>
              <p className="text-secondary leading-relaxed">
                We're on your side. Our expertise ensures insurance companies can't minimize your claim or overlook damage. You get what you deserve.
              </p>
            </div>
          </div>
        </div>

        {/* Xactimate Explainer */}
        <div className="mt-20 bg-gradient-to-br from-accent/5 to-muted/5 p-8 md:p-12 rounded-sm border border-accent/20">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            What Is Xactimate?
          </h3>
          <p className="text-secondary leading-relaxed mb-4">
            Xactimate is the industry-standard property claims estimating software used by nearly every insurance carrier in North America. It provides precise, standardized estimates for restoration work—including roofing, gutters, siding, and more.
          </p>
          <p className="text-secondary leading-relaxed">
            When we generate a Xactimate estimate, we're speaking the insurance company's native language. Adjusters trust these estimates because they're based on industry data, material costs, and labor standards. This gives your claim credibility and increases the likelihood of full approval.
          </p>
        </div>
      </div>
    </section>
  );
}
