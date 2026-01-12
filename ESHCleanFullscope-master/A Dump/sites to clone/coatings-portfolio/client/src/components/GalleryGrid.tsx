import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const projects = [
  {
    id: 1,
    title: "Luxury Garage",
    category: "Epoxy Flake System",
    image: "/images/garage_luxury_car_1.jpg",
    link: "/garage",
    size: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    id: 2,
    title: "Modern Kitchen",
    category: "Metallic Epoxy",
    image: "/images/kitchen_metallic_marble_1.jpg",
    link: "/interior",
    size: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    id: 3,
    title: "Seamless Bath",
    category: "Microcement",
    image: "/images/bathroom_microcement_shower_1.jpg",
    link: "/bathroom",
    size: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    id: 4,
    title: "Industrial Warehouse",
    category: "Safety Striping",
    image: "/images/industrial_warehouse_striping_1.jpg",
    link: "/industrial",
    size: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    id: 5,
    title: "Granite Resurfacing",
    category: "Countertop Epoxy",
    image: "/images/countertop_epoxy_1.jpg",
    link: "/countertops",
    size: "col-span-1 md:col-span-1 row-span-1"
  }
];

export default function GalleryGrid() {
  return (
    <section className="py-24 bg-secondary border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-primary font-bold tracking-widest uppercase mb-2 text-sm">Selected Works</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground">
              Application <span className="text-stroke">Zones</span>
            </h3>
          </div>
          <Link href="/garage">
            <a className="hidden md:flex items-center text-foreground hover:text-primary font-bold uppercase tracking-wider transition-colors">
              View All Projects <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`relative group overflow-hidden border border-border ${project.size}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={project.link}>
                <a className="block w-full h-full">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <p className="text-primary font-mono text-xs mb-2 uppercase">{project.category}</p>
                    <h4 className="text-2xl font-display font-bold text-white uppercase">{project.title}</h4>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
