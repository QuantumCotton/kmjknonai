import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter">
              Coatings<span className="text-primary">.Pro</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Industrial strength protection for residential spaces. 
              Premium epoxy, polyaspartic, and microcement solutions.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-display font-bold uppercase tracking-wider text-primary">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/garage"><a className="text-muted-foreground hover:text-primary transition-colors">Garage Systems</a></Link></li>
              <li><Link href="/interior"><a className="text-muted-foreground hover:text-primary transition-colors">Interior Floors</a></Link></li>
              <li><Link href="/bathroom"><a className="text-muted-foreground hover:text-primary transition-colors">Microcement Bathrooms</a></Link></li>
              <li><Link href="/countertops"><a className="text-muted-foreground hover:text-primary transition-colors">Countertop Resurfacing</a></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-display font-bold uppercase tracking-wider text-primary">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>1-800-COAT-PRO</li>
              <li>hello@coatings.pro</li>
              <li>123 Industrial Ave, Design District</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-display font-bold uppercase tracking-wider text-primary">Stay Updated</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="ENTER EMAIL" 
                className="bg-background border border-border px-4 py-2 w-full focus:outline-none focus:border-primary text-sm"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 font-bold uppercase hover:bg-primary/90 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
          <p>&copy; 2025 Coatings.Pro. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
