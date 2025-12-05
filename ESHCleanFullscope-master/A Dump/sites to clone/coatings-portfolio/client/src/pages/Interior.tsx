import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Interior() {
  return (
    <Layout>
      <header className="bg-secondary py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-foreground mb-4">
            Interior <span className="text-stroke">Living</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Metallic epoxy systems that create fluid, one-of-a-kind aesthetic masterpieces.
          </p>
        </div>
      </header>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-3xl font-display font-bold uppercase text-primary">Liquid Art</h2>
              <p className="text-muted-foreground leading-relaxed">
                Metallic epoxy flooring is a unique multi-layered system that incorporates metallic additives into clear epoxy coatings. The result is a 3D appearance that can mimic natural stone, melted metal, or deep water.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Perfect for modern living rooms, kitchens, and basements where you want a seamless, high-gloss finish that is easy to clean and impossible to ignore.
              </p>
              
              <div className="grid grid-cols-2 gap-4 py-6">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-bold uppercase text-foreground">Seamless</h4>
                  <p className="text-sm text-muted-foreground">No grout lines to clean</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-bold uppercase text-foreground">Hygienic</h4>
                  <p className="text-sm text-muted-foreground">Resists bacteria & moisture</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-bold uppercase text-foreground">Custom</h4>
                  <p className="text-sm text-muted-foreground">Infinite color combinations</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-bold uppercase text-foreground">Durable</h4>
                  <p className="text-sm text-muted-foreground">Pet & kid friendly</p>
                </div>
              </div>

              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none">
                Design Your Floor <ArrowRight className="ml-2" />
              </Button>
            </div>

            <div className="order-1 lg:order-2 grid gap-4">
              <img 
                src="/images/kitchen_metallic_marble_1.jpg" 
                alt="Metallic Epoxy Kitchen" 
                className="w-full h-[400px] object-cover border border-border"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/living_room_metallic_1.jpg" 
                  alt="Living Room Epoxy" 
                  className="w-full h-[200px] object-cover border border-border"
                />
                <img 
                  src="/images/living_room_metallic_blue.jpg" 
                  alt="Blue Metallic Floor" 
                  className="w-full h-[200px] object-cover border border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <img 
                src="/images/armorpoxy_color_palette.webp" 
                alt="Epoxy Color Palette" 
                className="w-full border border-border"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-2xl font-display font-bold uppercase text-foreground">Unlimited Color Potential</h3>
              <p className="text-muted-foreground">
                From subtle earth tones to vibrant metallic blues and reds. We can match any interior design palette.
                Our pigments are UV stable and can be mixed to create custom effects like marble, granite, or wood grain.
              </p>
              <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background font-bold uppercase rounded-none">
                Download Color Chart
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
