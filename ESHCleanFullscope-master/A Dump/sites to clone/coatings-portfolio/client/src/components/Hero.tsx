import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden border-b border-border">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/garage_luxury_car_2.jpg" 
          alt="Luxury Garage Floor" 
          className="w-full h-full object-cover opacity-60 grayscale-[30%] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
              Premium Industrial Coatings
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase leading-[0.9] tracking-tighter mb-8 text-foreground">
              Industrial <br />
              <span className="text-stroke">Strength.</span> <br />
              Residential <br />
              <span className="text-primary">Luxury.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed border-l-2 border-primary pl-6">
              Transform your space with 100% solids epoxy, polyaspartic, and microcement systems. 
              Engineered for warehouses, refined for your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/garage">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 text-lg font-bold uppercase tracking-wider">
                  Explore Systems <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/industrial">
                <Button variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none px-8 py-6 text-lg font-bold uppercase tracking-wider">
                  View Specs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 p-8 hidden md:block">
        <div className="text-right">
          <p className="text-xs font-mono text-muted-foreground mb-1">MATERIAL SPEC</p>
          <p className="text-xl font-display font-bold text-foreground">100% SOLIDS</p>
        </div>
      </div>
    </section>
  );
}
