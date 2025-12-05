import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Industrial() {
  return (
    <Layout>
      <header className="bg-secondary py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-foreground mb-4">
            Industrial <span className="text-stroke">Grade</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Heavy-duty protection for warehouses, factories, and commercial spaces.
          </p>
        </div>
      </header>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold uppercase text-primary">Safety & Durability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our industrial coatings are designed to withstand heavy forklift traffic, chemical spills, and extreme abrasion. We offer specialized solutions including safety striping, non-slip textures, and chemical resistant novolac epoxies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card/30 border border-border p-6">
                  <h4 className="font-bold uppercase text-foreground mb-2">Safety Striping</h4>
                  <p className="text-sm text-muted-foreground">OSHA compliant aisle marking and safety zones.</p>
                </div>
                <div className="bg-card/30 border border-border p-6">
                  <h4 className="font-bold uppercase text-foreground mb-2">Non-Slip Texture</h4>
                  <p className="text-sm text-muted-foreground">Aggressive grit additives for wet areas and ramps.</p>
                </div>
                <div className="bg-card/30 border border-border p-6">
                  <h4 className="font-bold uppercase text-foreground mb-2">Chemical Resistance</h4>
                  <p className="text-sm text-muted-foreground">Protection against acids, solvents, and oils.</p>
                </div>
                <div className="bg-card/30 border border-border p-6">
                  <h4 className="font-bold uppercase text-foreground mb-2">ESD Control</h4>
                  <p className="text-sm text-muted-foreground">Electro-static dissipative coatings for electronics.</p>
                </div>
              </div>

              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none">
                Commercial Quote <ArrowRight className="ml-2" />
              </Button>
            </div>

            <div className="grid gap-4">
              <img 
                src="/images/industrial_warehouse_striping_1.jpg" 
                alt="Warehouse Safety Striping" 
                className="w-full h-[300px] object-cover border border-border"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/industrial_warehouse_striping_2.jpg" 
                  alt="Industrial Floor" 
                  className="w-full h-[200px] object-cover border border-border"
                />
                <img 
                  src="/images/texture_nonslip_macro_1.jpg" 
                  alt="Non-Slip Texture Macro" 
                  className="w-full h-[200px] object-cover border border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
