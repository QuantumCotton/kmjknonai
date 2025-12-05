import { CheckCircle2 } from "lucide-react";

/**
 * Section 1: The Product (GAF Timberline HDZ)
 * Design: Left text with right image, alternating layout
 * Focus: Technical breakdown of LayerLock, WindProven, StainGuard Plus
 * Visual: Close-up shingle detail image with callout boxes
 */
export default function ProductSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">
            Section 1
          </span>
          <h2 className="text-foreground mt-2 mb-6">
            Why Timberline HDZ Is #1 in North America
          </h2>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed">
            GAF Timberline HDZ shingles combine architectural beauty with unmatched durability. Built with LayerLock Technology, WindProven protection, and StainGuard Plus algae resistance, Timberline HDZ delivers the performance homeowners demand.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Features */}
          <div className="space-y-8">
            {/* Feature 1: LayerLock */}
            <div className="callout-box">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    LayerLock® Technology
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Mechanically fused common bond with the widest nail zone (StrikeZone). Enables 30% faster installation while ensuring superior fastening security and wind resistance.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: WindProven */}
            <div className="callout-box">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    WindProven® Limited Wind Warranty
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Infinite wind speed protection—no upper limit. Tested and proven to withstand extreme weather. Your roof is protected against the most severe storms.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: StainGuard */}
            <div className="callout-box">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    StainGuard Plus™ Algae Protection
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    25-year algae protection using GAF's time-release technology. Maintains the beauty and integrity of your roof against blue-green algae discoloration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <img
              src="/images/hATOYwM8w53g.jpg"
              alt="GAF Timberline HDZ StrikeZone nailing area close-up"
              className="w-full rounded-sm shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-sm shadow-xl max-w-xs">
              <p className="text-sm text-secondary font-medium mb-2">
                StrikeZone Technology
              </p>
              <p className="text-xs text-muted-foreground">
                Widest nail zone in the industry for maximum fastening security and installation efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-20 pt-20 border-t border-border">
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            Technical Specifications
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-sm">
              <p className="text-sm text-accent font-semibold uppercase tracking-wide mb-2">
                Wind Rating
              </p>
              <p className="text-3xl font-bold text-foreground">
                Unlimited
              </p>
              <p className="text-sm text-secondary mt-2">
                Infinite wind speed protection
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-sm">
              <p className="text-sm text-accent font-semibold uppercase tracking-wide mb-2">
                Algae Protection
              </p>
              <p className="text-3xl font-bold text-foreground">
                25 Years
              </p>
              <p className="text-sm text-secondary mt-2">
                StainGuard Plus coverage
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-sm">
              <p className="text-sm text-accent font-semibold uppercase tracking-wide mb-2">
                Installation Speed
              </p>
              <p className="text-3xl font-bold text-foreground">
                30% Faster
              </p>
              <p className="text-sm text-secondary mt-2">
                Thanks to LayerLock Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
