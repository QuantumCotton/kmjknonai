import { Shield, Clock, Droplets, Layers } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Solids Epoxy",
    description: "Unlike water-based epoxies that shrink and peel, our 100% solids formula provides a thicker, more durable bond that lasts decades.",
    stat: "5x Thicker"
  },
  {
    icon: Clock,
    title: "1-Day Installation",
    description: "Our Polyaspartic systems cure rapidly, allowing you to return your garage to service in just 24 hours without sacrificing durability.",
    stat: "24h Cure"
  },
  {
    icon: Droplets,
    title: "Seamless Waterproofing",
    description: "Topciment microcement creates a continuous, grout-free surface ideal for bathrooms and showers, eliminating mold risks.",
    stat: "0 Grout Lines"
  },
  {
    icon: Layers,
    title: "Industrial Grade",
    description: "We use the same high-performance materials trusted in warehouses and hangars, bringing commercial durability to your home.",
    stat: "Heavy Duty"
  }
];

export default function FeatureSection() {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative p-8 border border-border hover:border-primary transition-colors duration-300 bg-card/50">
              <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-mono font-bold">
                {feature.stat}
              </div>
              <feature.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-display font-bold uppercase mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
