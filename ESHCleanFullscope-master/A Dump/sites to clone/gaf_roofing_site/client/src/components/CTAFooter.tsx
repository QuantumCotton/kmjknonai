import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

/**
 * CTA Footer Section
 * Design: Dark background with white text, centered layout
 * Focus: Contact information and final call-to-action
 */
export default function CTAFooter() {
  return (
    <>
      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-foreground text-white">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Ready to Protect Your Home?
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
              Get a free inspection and learn how GAF Timberline HDZ can protect your investment for decades to come.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-sm font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors duration-200 shadow-lg">
              Schedule Free Inspection
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-sm font-semibold hover:bg-white/10 transition-colors duration-200">
              Get a Quote
            </button>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 pt-16 border-t border-white/20">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4 text-accent" />
              <p className="text-sm text-gray-300 mb-2">Call Us</p>
              <p className="text-xl font-semibold">(555) 123-4567</p>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4 text-accent" />
              <p className="text-sm text-gray-300 mb-2">Email</p>
              <p className="text-xl font-semibold">info@gafroofing.com</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-accent" />
              <p className="text-sm text-gray-300 mb-2">Service Area</p>
              <p className="text-xl font-semibold">Serving Your Region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 text-gray-400 py-8 border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">GAF Timberline</h3>
              <p className="text-sm leading-relaxed">
                Premium residential roofing solutions with LayerLock Technology and expert insurance advocacy.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Timberline HDZ</a></li>
                <li><a href="#" className="hover:text-white transition">LayerLock Technology</a></li>
                <li><a href="#" className="hover:text-white transition">WindProven Warranty</a></li>
                <li><a href="#" className="hover:text-white transition">StainGuard Plus</a></li>
              </ul>
            </div>

            {/* Warranty */}
            <div>
              <h4 className="text-white font-semibold mb-4">Warranty</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">System Plus</a></li>
                <li><a href="#" className="hover:text-white transition">Silver Pledge</a></li>
                <li><a href="#" className="hover:text-white transition">Golden Pledge</a></li>
                <li><a href="#" className="hover:text-white transition">Warranty Details</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center text-sm">
            <p>
              &copy; 2024 GAF Timberline Roofing. All rights reserved. GAF, Timberline, LayerLock, WindProven, and StainGuard are trademarks of Standard Industries.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
