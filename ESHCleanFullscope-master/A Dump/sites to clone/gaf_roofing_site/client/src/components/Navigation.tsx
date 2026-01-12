import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/**
 * Sticky Navigation Header
 * Design: Dark background with gold accents, sticky on scroll
 * Features: Mobile menu, smooth scroll to sections
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Product", id: "product" },
    { label: "Warranty", id: "warranty" },
    { label: "Insurance", id: "insurance" },
    { label: "Repair vs Replace", id: "repair-replace" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-foreground shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className={`text-xl md:text-2xl font-bold font-serif transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-white"
              }`}
            >
              GAF Timberline
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? "text-gray-200 hover:text-accent"
                    : "text-white hover:text-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="btn-premium text-sm">
              Free Inspection
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-foreground border-t border-white/10 py-4">
            <div className="flex flex-col gap-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-white hover:text-accent transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <button className="btn-premium text-sm w-full text-center">
                Free Inspection
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
