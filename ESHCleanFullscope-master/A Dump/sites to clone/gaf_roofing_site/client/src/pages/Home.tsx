import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import ProductSection from "@/components/ProductSection";
import WarrantySection from "@/components/WarrantySection";
import InsuranceSection from "@/components/InsuranceSection";
import RepairVsReplaceSection from "@/components/RepairVsReplaceSection";
import CTAFooter from "@/components/CTAFooter";

/**
 * Home Page - Long-scrolling 4-part narrative
 * 
 * Design Philosophy: Industrial Minimalism with Trust & Authority
 * - Material authenticity (charcoal, stone, gold accents)
 * - Hierarchical clarity with generous whitespace
 * - Precision typography (serif headings, sans-serif body)
 * - Trustworthiness through restraint
 * 
 * Structure:
 * 1. Hero Section - Drone shot with compelling headline
 * 2. Product Section - GAF Timberline HDZ features
 * 3. Warranty Section - System Plus, Silver Pledge, Golden Pledge
 * 4. Insurance Section - Xactimate, claim maximization
 * 5. Repair vs Replace - Honest assessment criteria
 * 6. CTA Footer - Contact and final conversion
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Section 1: Product */}
      <section id="product">
        <ProductSection />
      </section>

      {/* Section 2: Warranty */}
      <section id="warranty">
        <WarrantySection />
      </section>

      {/* Section 3: Insurance */}
      <section id="insurance">
        <InsuranceSection />
      </section>

      {/* Section 4: Repair vs Replace */}
      <section id="repair-replace">
        <RepairVsReplaceSection />
      </section>

      {/* CTA & Footer */}
      <CTAFooter />
    </div>
  );
}
