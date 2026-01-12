import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Garage", path: "/garage" },
    { name: "Kitchen & Living", path: "/interior" },
    { name: "Bathrooms", path: "/bathroom" },
    { name: "Industrial", path: "/industrial" },
    { name: "Countertops", path: "/countertops" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="text-2xl font-display font-bold tracking-tighter uppercase hover:text-primary transition-colors">
            Coatings<span className="text-primary">.Pro</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors",
                  location === item.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            </Link>
          ))}
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none">
            Get Quote
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "block text-lg font-display font-bold uppercase tracking-wider hover:text-primary transition-colors",
                  location === item.path ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            </Link>
          ))}
          <Button className="w-full bg-primary text-primary-foreground font-bold uppercase rounded-none">
            Get Quote
          </Button>
        </div>
      )}
    </nav>
  );
}
