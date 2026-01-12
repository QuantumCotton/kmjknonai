import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Countertops() {
  return (
    <Layout>
      <header className="bg-secondary py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-foreground mb-4">
            Epoxy <span className="text-stroke">Resurfacing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Transform outdated laminate into high-end faux granite or marble.
          </p>
        </div>
      </header>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-3xl font-display font-bold uppercase text-primary">Heat Resistant & Food Safe</h2>
              <p className="text-muted-foreground leading-relaxed">
                Don't replace your countertops—resurface them. Our epoxy countertop systems are heat resistant up to 500°F, scratch resistant, and completely food safe once cured. We can replicate the look of exotic stone for a fraction of the cost.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-bold uppercase text-foreground">Cost Savings</span>
                  <span className="text-primary font-mono">Save up to 70% vs Granite</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-bold uppercase text-foreground">Installation Time</span>
                  <span className="text-primary font-mono">2-3 Days</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-bold uppercase text-foreground">Durability</span>
                  <span className="text-primary font-mono">High Impact Resistance</span>
                </div>
              </div>

              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none">
                Get a Quote <ArrowRight className="ml-2" />
              </Button>
            </div>

            <div className="order-1 lg:order-2 grid gap-4">
              <img 
                src="/images/countertop_epoxy_1.jpg" 
                alt="Epoxy Countertop" 
                className="w-full h-[400px] object-cover border border-border"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/countertop_epoxy_closeup.jpg" 
                  alt="Countertop Texture" 
                  className="w-full h-[200px] object-cover border border-border"
                />
                <img 
                  src="/images/countertop_marble_edge.jpg" 
                  alt="Marble Edge Detail" 
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
