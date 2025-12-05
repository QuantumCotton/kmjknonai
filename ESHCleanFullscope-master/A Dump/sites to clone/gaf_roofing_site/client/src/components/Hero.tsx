import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Hero Section
 * Design: Full-width drone shot with dark overlay, left-aligned headline
 * Typography: Bold serif heading with supporting subheading
 * CTA: Gold accent button with arrow icon
 */
export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-start overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/myRMkVSacYD2.jpg')",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-6xl mx-auto px-4 md:px-8 py-20">
        <div className="max-w-2xl">
          <h1 className="text-white mb-6 leading-tight">
            Premium Roofing Built to Last
          </h1>
          <p className="text-xl text-gray-100 mb-8 font-light leading-relaxed">
            GAF Timberline HDZ shingles with LayerLock Technology, infinite wind protection, and expert insurance advocacy. Your roof deserves the best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-premium flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Your Free Inspection
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-3 rounded-sm font-medium border-2 border-white text-white hover:bg-white/10 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
