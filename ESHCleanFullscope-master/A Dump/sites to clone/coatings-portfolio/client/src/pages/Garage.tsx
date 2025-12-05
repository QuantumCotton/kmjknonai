import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export default function Garage() {
  return (
    <Layout>
      {/* Header */}
      <header className="bg-secondary py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-foreground mb-4">
                Garage <span className="text-stroke">Systems</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                High-performance chip and flake systems engineered for extreme durability.
              </p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-primary font-bold text-lg">1-DAY INSTALLATION</p>
              <p className="text-muted-foreground font-mono">AVAILABLE</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <img 
                src="/images/garage_chip_flake_1.jpg" 
                alt="Garage Chip Flake System" 
                className="w-full h-[400px] object-cover border border-border grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/garage_chip_flake_2.jpg" 
                  alt="Garage Floor Detail" 
                  className="w-full h-[250px] object-cover border border-border grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
                <img 
                  src="/images/garage_chip_flake_application.jpg" 
                  alt="Application Process" 
                  className="w-full h-[250px] object-cover border border-border grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Technical Specs */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold uppercase mb-6 text-primary">Why Polyaspartic?</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Traditional epoxy takes days to cure. Our Polyaspartic system allows for a complete garage transformation in just one day. It is UV stable (won't yellow), 4x stronger than epoxy, and flexible enough to bridge small concrete cracks.
                </p>
                <ul className="space-y-4">
                  {[
                    "1-Day Return to Service",
                    "UV Stable - No Yellowing",
                    "Chemical & Stain Resistant",
                    "Hot Tire Pickup Resistant"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-foreground font-medium">
                      <span className="bg-primary/20 p-1 mr-3 rounded-full text-primary"><Check size={16} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-border p-8 bg-card/30">
                <h3 className="text-xl font-display font-bold uppercase mb-6 border-b border-border pb-4">Technical Data</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                  <div>
                    <p className="text-muted-foreground font-mono text-xs uppercase">Thickness</p>
                    <p className="text-foreground font-bold">15-20 Mils</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-mono text-xs uppercase">Cure Time</p>
                    <p className="text-foreground font-bold">24 Hours</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-mono text-xs uppercase">Adhesion</p>
                    <p className="text-foreground font-bold">&gt;400 PSI (Concrete Failure)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-mono text-xs uppercase">VOC Content</p>
                    <p className="text-foreground font-bold">Zero / Low VOC</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none py-6">
                Request Quote <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Preview */}
      <section className="py-16 bg-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold uppercase mb-8 text-center">Popular Flake Blends</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder for flake colors - using CSS gradients to simulate */}
            <div className="aspect-square bg-gradient-to-br from-gray-800 via-gray-500 to-white border border-border relative group">
              <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/50 px-2 py-1 text-white">DOMINO</span>
            </div>
            <div className="aspect-square bg-gradient-to-br from-blue-900 via-gray-400 to-white border border-border relative group">
              <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/50 px-2 py-1 text-white">NIGHTFALL</span>
            </div>
            <div className="aspect-square bg-gradient-to-br from-yellow-700 via-orange-300 to-white border border-border relative group">
              <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/50 px-2 py-1 text-white">DESERT</span>
            </div>
            <div className="aspect-square bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 border border-border relative group">
              <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/50 px-2 py-1 text-white">GRAVEL</span>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">Hundreds of custom blends available upon request.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
