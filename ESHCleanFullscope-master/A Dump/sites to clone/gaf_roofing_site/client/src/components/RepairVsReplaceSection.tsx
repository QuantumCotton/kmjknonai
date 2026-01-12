import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

/**
 * Section 4: Repair vs. Replace
 * Design: Full-width with centered content
 * Focus: Honest assessment criteria and decision framework
 * Visual: Comparison table with damage examples
 */
export default function RepairVsReplaceSection() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">
            Section 4
          </span>
          <h2 className="text-foreground mt-2 mb-6">
            Repair or Replace? We'll Be Honest
          </h2>
          <p className="text-lg text-secondary max-w-3xl leading-relaxed mx-auto">
            Not every roof needs replacement. We assess your roof honestly and recommend the solution that makes financial and practical sense for your situation.
          </p>
        </div>

        {/* Decision Framework */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Repair is Right */}
          <div className="bg-white p-8 rounded-sm border-2 border-secondary/20">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-secondary flex-shrink-0" />
              <h3 className="text-2xl font-semibold text-foreground">
                Repair Makes Sense When...
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-secondary font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Localized damage:</strong> A few shingles are missing or damaged, but the rest of the roof is in good condition
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Recent installation:</strong> Your roof is less than 10 years old and damage is isolated
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Insurance covers it:</strong> Your claim will pay for repairs, and you'll save on deductibles
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Budget constraints:</strong> You need an immediate solution and replacement isn't feasible now
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Underlying structure is sound:</strong> No rot, no structural issues, just surface damage
                </span>
              </li>
            </ul>
          </div>

          {/* Replace is Right */}
          <div className="bg-white p-8 rounded-sm border-2 border-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-accent flex-shrink-0" />
              <h3 className="text-2xl font-semibold text-foreground">
                Replace When...
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Age matters:</strong> Your roof is 15+ years old and showing signs of wear across multiple areas
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Widespread damage:</strong> Hail, storm, or wind damage affects 20%+ of the roof surface
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Structural concerns:</strong> Rot, mold, or water damage indicates underlying problems
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Repeated repairs:</strong> You've patched the same areas multiple times—replacement is more cost-effective
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">•</span>
                <span className="text-secondary">
                  <strong>Insurance covers it:</strong> Your claim pays for full replacement, making it the smart financial choice
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Damage Assessment Guide */}
        <div className="bg-white p-8 md:p-12 rounded-sm border border-border mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            Common Damage Scenarios
          </h3>
          <div className="space-y-6">
            {/* Scenario 1 */}
            <div className="pb-6 border-b border-border last:border-b-0">
              <div className="flex items-start gap-4 mb-3">
                <XCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <h4 className="text-lg font-semibold text-foreground">
                  Wind-Lifted Shingles (5-10 shingles)
                </h4>
              </div>
              <p className="text-secondary ml-10 mb-2">
                <strong>Verdict:</strong> Repair
              </p>
              <p className="text-secondary ml-10">
                If wind has lifted only a few shingles and the underlying roof deck is intact, repairs are appropriate. We'll re-nail or replace the affected shingles. Insurance typically covers this under wind damage claims.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="pb-6 border-b border-border last:border-b-0">
              <div className="flex items-start gap-4 mb-3">
                <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <h4 className="text-lg font-semibold text-foreground">
                  Hail Damage (Widespread Bruising)
                </h4>
              </div>
              <p className="text-secondary ml-10 mb-2">
                <strong>Verdict:</strong> Replace
              </p>
              <p className="text-secondary ml-10">
                Hail damage that covers 20%+ of the roof compromises the integrity of shingles across the entire surface. Even if some areas look okay, the cumulative damage shortens roof life. Replacement is the right call. Insurance usually approves full replacement for hail damage.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="pb-6 border-b border-border last:border-b-0">
              <div className="flex items-start gap-4 mb-3">
                <XCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <h4 className="text-lg font-semibold text-foreground">
                  Algae Staining (Discoloration)
                </h4>
              </div>
              <p className="text-secondary ml-10 mb-2">
                <strong>Verdict:</strong> Repair (Cleaning)
              </p>
              <p className="text-secondary ml-10">
                Algae staining is cosmetic and doesn't affect roof performance. Professional cleaning can restore appearance. If your shingles have StainGuard Plus, algae shouldn't be an issue for 25 years anyway.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="pb-6 border-b border-border last:border-b-0">
              <div className="flex items-start gap-4 mb-3">
                <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <h4 className="text-lg font-semibold text-foreground">
                  Water Leaks & Rot (Structural Issues)
                </h4>
              </div>
              <p className="text-secondary ml-10 mb-2">
                <strong>Verdict:</strong> Replace
              </p>
              <p className="text-secondary ml-10">
                If water is leaking into your home or you see rot in the roof deck or framing, the underlying structure is compromised. Patching won't solve the problem. Full replacement with proper ventilation and underlayment is necessary.
              </p>
            </div>

            {/* Scenario 5 */}
            <div>
              <div className="flex items-start gap-4 mb-3">
                <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <h4 className="text-lg font-semibold text-foreground">
                  Roof Age 20+ Years
                </h4>
              </div>
              <p className="text-secondary ml-10 mb-2">
                <strong>Verdict:</strong> Replace
              </p>
              <p className="text-secondary ml-10">
                Most asphalt shingles have a 20-25 year lifespan. If your roof is approaching or past this age, replacement is the prudent choice. You'll avoid emergency repairs and get a modern, efficient roof with better warranties.
              </p>
            </div>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-gradient-to-br from-accent/10 to-muted/10 p-8 md:p-12 rounded-sm border-2 border-accent/20">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Our Commitment to Honesty
          </h3>
          <p className="text-secondary leading-relaxed mb-4">
            We don't push unnecessary replacements. Our reputation is built on honest assessments and recommendations that serve your best interests—not our sales targets. If repair makes sense, we'll say so. If replacement is necessary, we'll explain why and help you understand the long-term value.
          </p>
          <p className="text-secondary leading-relaxed">
            When you choose us, you're choosing a partner who prioritizes your home's integrity and your financial wellbeing. We'll walk you through the decision, answer your questions, and ensure you feel confident in whatever path we recommend.
          </p>
        </div>
      </div>
    </section>
  );
}
