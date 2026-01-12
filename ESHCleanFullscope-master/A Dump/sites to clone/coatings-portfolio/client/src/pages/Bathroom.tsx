import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Bathroom() {
  return (
    <Layout>
      <header className="bg-secondary py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-foreground mb-4">
            Microcement <span className="text-stroke">Bath</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Seamless, waterproof elegance for walls, floors, and showers.
          </p>
        </div>
      </header>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              <img 
                src="/images/bathroom_microcement_shower_1.jpg" 
                alt="Microcement Shower" 
                className="w-full h-[500px] object-cover border border-border"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/bathroom_microcement_shower_2.jpg" 
                  alt="Seamless Bathroom" 
                  className="w-full h-[250px] object-cover border border-border"
                />
                <img 
                  src="/images/bathroom_microcement_shower_3.jpg" 
                  alt="Modern Bath Design" 
                  className="w-full h-[250px] object-cover border border-border"
                />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold uppercase text-primary">The Topciment Advantage</h2>
              <p className="text-muted-foreground leading-relaxed">
                Microcement is a decorative coating composed of cement, water-based resins, additives and mineral pigments. It is an ideal material for both exterior and interior surfaces, and specifically for bathrooms due to its seamless nature.
              </p>
              
              <div className="bg-card/30 border border-border p-8 space-y-6">
                <h3 className="text-xl font-display font-bold uppercase">Why Microcement?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="text-primary font-bold">01.</span>
                    <div>
                      <h4 className="font-bold text-foreground uppercase">Waterproof</h4>
                      <p className="text-sm text-muted-foreground">Naturally resistant to water and humidity, perfect for showers.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-primary font-bold">02.</span>
                    <div>
                      <h4 className="font-bold text-foreground uppercase">No Grout Lines</h4>
                      <p className="text-sm text-muted-foreground">Eliminates the main cause of mold and dirt accumulation.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-primary font-bold">03.</span>
                    <div>
                      <h4 className="font-bold text-foreground uppercase">Vertical Application</h4>
                      <p className="text-sm text-muted-foreground">Adheres to walls, ceilings, and floors for a continuous look.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-primary font-bold">04.</span>
                    <div>
                      <h4 className="font-bold text-foreground uppercase">Thin Profile</h4>
                      <p className="text-sm text-muted-foreground">Only 2-3mm thick, can be applied over existing tiles.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none">
                Get a Quote <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold uppercase mb-8 text-center">Topciment Colors</h2>
          <div className="relative group">
            <img 
              src="/images/topciment_color_palette.webp" 
              alt="Topciment Color Palette" 
              className="w-full border border-border opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <Button variant="outline" className="bg-background text-foreground border-foreground font-bold uppercase rounded-none">
                View Full Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
