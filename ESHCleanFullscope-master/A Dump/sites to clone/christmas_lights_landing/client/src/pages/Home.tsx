import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Clock, Zap } from "lucide-react";
import { useState } from "react";

/**
 * Professional Christmas Light Installation Landing Page
 * Design System: Warm Minimalism with Festive Accents
 * - Color Palette: Warm cream (#FFFBF5), Forest green (#1B4D3E), Warm gold (#D4AF37)
 * - Typography: Playfair Display (headlines), Montserrat (subheadings), Lato (body)
 * - Layout: Asymmetric, alternating image-text sections
 * - Interactions: Smooth animations, gentle hover effects
 */

export default function Home() {
  const [selectedService, setSelectedService] = useState<"labor" | "leasing">(
    "leasing"
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold text-primary">
              Luminous
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#guarantee" className="text-sm font-medium hover:text-primary transition-colors">
              Guarantee
            </a>
            <a href="#safety" className="text-sm font-medium hover:text-primary transition-colors">
              Safety
            </a>
            <Button className="btn-gold">Get Quote</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="space-y-6 fade-in-up">
              <h1 className="text-primary leading-tight">
                Stop Untangling. Start Celebrating.
              </h1>
              <p className="text-xl text-foreground/80 font-light">
                <span className="font-semibold text-primary">
                  Your Lights Up. On Time. Guaranteed.
                </span>
                {" "}Professional Christmas Light Installation with guaranteed installation dates in Stuart, FL & Beaufort, SC.
              </p>

              {/* Value Propositions */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Speed: Installed in 48 hours
                    </p>
                    <p className="text-sm text-foreground/70">
                      From booking to glowing display
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Reliability: Guaranteed up by Dec 1st
                    </p>
                    <p className="text-sm text-foreground/70">
                      Your date is locked in—or installation is free
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Safety: Fully Insured & Certified
                    </p>
                    <p className="text-sm text-foreground/70">
                      Zero liability for your home
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Button className="btn-gold text-lg px-8 py-6">
                  Get Your Free Quote Now
                </Button>
                <Button className="btn-outline-green text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    Fully Insured
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    Commercial Grade
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    Date Guarantee
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden image-overlay shadow-2xl">
              <img
                src="/images/xMOlBro1eft6.jpg"
                alt="Suburban home with warm white Christmas lights at twilight"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Speed Guarantee Section */}
      <section id="guarantee" className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="relative h-96 rounded-2xl overflow-hidden image-overlay shadow-xl order-2 lg:order-1">
              <img
                src="/images/6uAyzDryGzpe.jpg"
                alt="Before and after comparison of dark house vs illuminated house"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6 order-1 lg:order-2 fade-in-up">
              <h2 className="text-primary">
                The "Up By December 1st" Promise
              </h2>
              <p className="text-lg text-foreground/80">
                The holiday season is short. Don't let a late installation steal your joy. We understand that a reliable schedule is as important as a beautiful display. That's why we offer two powerful guarantees:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-accent pl-6 py-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    48-Hour Installation
                  </h3>
                  <p className="text-foreground/80">
                    For last-minute bookings, we can often have your display installed within 48 hours of finalizing your design.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6 py-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    December 1st Guarantee
                  </h3>
                  <p className="text-foreground/80">
                    Book your service before November 1st, and we <strong>guarantee</strong> your lights will be shining bright by December 1st, or your installation is free.
                  </p>
                </div>
              </div>

              <p className="text-sm text-accent font-semibold pt-4">
                Limited Slots Available for December 1st Guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Breakdown Section */}
      <section id="services" className="section-padding bg-secondary">
        <div className="container">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-primary mb-4">
              Two Ways to Shine
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Choose the service model that fits your needs and budget.
            </p>
          </div>

          {/* Service Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="text-left py-4 px-4 font-serif text-lg text-primary">
                    Feature
                  </th>
                  <th className="text-left py-4 px-4 font-serif text-lg text-primary">
                    Option A: Labor Only
                  </th>
                  <th className="text-left py-4 px-4 font-serif text-lg text-primary">
                    Option B: All-Inclusive Leasing
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-background/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-foreground">
                    Lights Used
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    Your existing lights
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    Brand new, commercial-grade LED lights (C9, C7, Minis, etc.)
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-background/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-foreground">
                    Service Included
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    Professional installation, precision placement, and safe removal
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    <strong>Everything:</strong> Custom design, installation, free maintenance/repairs, removal, and off-season storage
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-background/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-foreground">
                    Quality
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    Professional clips and techniques for precise, damage-free display
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    <strong>Premium Experience.</strong> Commercial-grade materials that are brighter, more durable, and custom-fitted
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-background/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-foreground">
                    Best For
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    Homeowners who love their current lights and only need professional labor
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    Homeowners who want a completely hassle-free, luxury experience
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-background/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-foreground">
                    Investment
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    Lower initial cost
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    Higher value, worry-free investment (typical new system value: <strong>$1,500+</strong>)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-background rounded-xl p-8 border-2 border-border hover:border-primary transition-colors">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Labor Only
              </h3>
              <p className="text-foreground/80 mb-6">
                Professional installation for your existing lights
              </p>
              <Button className="btn-outline-green w-full">
                Book Labor Only
              </Button>
            </div>

            <div className="bg-primary rounded-xl p-8 border-2 border-accent hover:shadow-xl transition-all">
              <h3 className="text-2xl font-semibold text-primary-foreground mb-4">
                All-Inclusive Leasing
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Premium experience with everything included
              </p>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full font-semibold">
                Explore All-Inclusive
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Comparison Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 fade-in-up">
              <h2 className="text-primary">
                Commercial Grade vs. Retail Lights
              </h2>
              <p className="text-lg text-foreground/80">
                The difference between a dim, fragile display and a brilliant, durable one is more than just brightness. Our commercial-grade LED lights are built to last, shine brighter, and withstand the elements.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Brighter Light Output
                    </p>
                    <p className="text-sm text-foreground/70">
                      Commercial LEDs produce 3-5x more light than retail bulbs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Longer Lifespan
                    </p>
                    <p className="text-sm text-foreground/70">
                      50,000+ hour lifespan vs. 5,000 hours for retail lights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Weather Resistant
                    </p>
                    <p className="text-sm text-foreground/70">
                      Built to handle rain, wind, and temperature extremes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 rounded-2xl overflow-hidden image-overlay shadow-xl">
              <img
                src="/images/Bzf38woIANCo.jpg"
                alt="Close-up of commercial-grade LED bulb showing quality difference"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Insurance Section */}
      <section id="safety" className="section-padding bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="relative h-96 rounded-2xl overflow-hidden image-overlay shadow-xl order-2 lg:order-1">
              <img
                src="/images/fBBLA937TnLe.jpg"
                alt="Professional technician on ladder using safety clips to attach lights"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6 order-1 lg:order-2 fade-in-up">
              <h2 className="text-primary">
                Zero Risk. Zero Liability.
              </h2>
              <p className="text-lg text-foreground/80">
                Climbing ladders and working on roofs is dangerous. When you hire an uninsured contractor, you assume the liability for any accident on your property. Our commitment to your peace of mind is absolute.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Fully Insured Climbers
                    </p>
                    <p className="text-sm text-foreground/70">
                      Our entire team is fully covered by comprehensive liability and worker's compensation insurance. Your homeowner's policy is never at risk.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Certified Safety
                    </p>
                    <p className="text-sm text-foreground/70">
                      Every technician is trained in ladder safety, roof work, and electrical best practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Damage-Free Installation
                    </p>
                    <p className="text-sm text-foreground/70">
                      We use professional, non-invasive clips and fasteners—never nails, staples, or damaging adhesives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storage & Maintenance Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 fade-in-up">
              <h2 className="text-primary">
                The Ultimate Convenience
              </h2>
              <p className="text-lg text-foreground/80">
                With our All-Inclusive Leasing Package, the holiday season is truly effortless. When the season ends, we don't just take the lights down—we handle the entire off-season process.
              </p>

              <div className="space-y-4">
                <div className="bg-secondary rounded-lg p-6 border-l-4 border-accent">
                  <h3 className="font-semibold text-primary mb-2">
                    Guaranteed Maintenance
                  </h3>
                  <p className="text-foreground/80">
                    If a bulb goes out, call us. We offer a 48-hour repair guarantee to keep your display perfect all season long.
                  </p>
                </div>

                <div className="bg-secondary rounded-lg p-6 border-l-4 border-accent">
                  <h3 className="font-semibold text-primary mb-2">
                    Climate-Controlled Storage
                  </h3>
                  <p className="text-foreground/80">
                    Your custom-fit lights are carefully cataloged, inspected, and stored in our secure, climate-controlled facility. No more tangled bins in your garage or attic.
                  </p>
                </div>
              </div>

              <p className="text-sm text-accent font-semibold pt-4">
                We store it. We maintain it. You enjoy it.
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 rounded-2xl overflow-hidden image-overlay shadow-xl">
              <img
                src="/images/STxDAvgTEPom.jpg"
                alt="Organized storage bins labeled with client names"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section - Experience the Magic */}
      <section className="section-padding bg-gradient-to-b from-secondary to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8 fade-in-up">
            <h2 className="text-primary">
              Don't Just Decorate. Create a Memory.
            </h2>

            <p className="text-lg text-foreground/80 leading-relaxed">
              The holidays are about family, warmth, and magic. Let us handle the dangerous, time-consuming work so you can focus on what truly matters. From the first warm glow of installation to the final, quiet removal, we deliver a premium service that transforms your home and your holiday.
            </p>

            {/* Family Joy Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden image-overlay shadow-2xl my-8">
              <img
                src="/images/S8KWSAfZSjEa.jpg"
                alt="Family standing in driveway looking up at lit house with smiles"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Final CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button className="btn-gold text-lg px-8 py-6">
                Check Your Date & Get a Free Quote
              </Button>
            </div>

            <p className="text-sm text-foreground/70">
              Serving Stuart, FL and Beaufort, SC
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <span className="font-serif text-xl font-bold">Luminous</span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Professional Christmas Light Installation
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">Labor Only</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">All-Inclusive Leasing</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Maintenance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Service Areas</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">Stuart, FL</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Beaufort, SC</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Surrounding Areas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="tel:+1234567890" className="hover:text-accent transition-colors">(123) 456-7890</a></li>
                <li><a href="mailto:info@luminous.com" className="hover:text-accent transition-colors">info@luminous.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
            <p>&copy; 2024 Luminous Christmas Lights. All rights reserved. | Fully Insured | Date Guarantee</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
