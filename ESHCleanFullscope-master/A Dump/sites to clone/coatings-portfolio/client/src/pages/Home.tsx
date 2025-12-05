import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import GalleryGrid from "@/components/GalleryGrid";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <FeatureSection />
      <GalleryGrid />
      
      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase mb-8 tracking-tighter">
            Ready to Upgrade?
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-medium opacity-90">
            Get industrial strength durability for your residential project today.
          </p>
          <Link href="/garage">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 border-2 border-transparent hover:border-foreground px-10 py-8 text-xl font-bold uppercase tracking-widest rounded-none">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
