import { ArrowRight } from 'lucide-react';
import Button from '../components/shared/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Diagonal stripe overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 100px,
                rgba(255,255,255,0.03) 100px,
                rgba(255,255,255,0.03) 200px
              )`
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <img 
            src="/images/logos/esh-dark-bg.png" 
            alt="Elite Service Hub" 
            className="h-32 w-auto mx-auto mb-8 opacity-90 hover:opacity-100 transition-opacity"
          />
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 tracking-wide font-serif">
            Build Your Business<br />
            <span className="text-esh-gold">With Elite Marketing</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wider mb-12 max-w-3xl mx-auto">
            We build your website. We generate your leads. You focus on what you do best.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="/become-a-provider/">
              <Button variant="secondary" className="px-12 py-5">
                Join as a Contractor
                <ArrowRight className="inline ml-2" size={20} />
              </Button>
            </a>
            <a href="/how-it-works">
              <Button variant="secondary" className="px-12 py-5">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-zinc-800 pt-12">
            <div>
              <div className="text-4xl font-light text-esh-gold mb-2">Treasure Coast</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Current Market</div>
            </div>
            <div>
              <div className="text-4xl font-light text-esh-gold mb-2">3</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Active Partners</div>
            </div>
            <div>
              <div className="text-4xl font-light text-esh-gold mb-2">$450K</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-light text-esh-gold mb-2">100%</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wide">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-32 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">
              Why Elite Service Hub
            </p>
            <h2 className="text-5xl md:text-6xl font-light mb-6 font-serif">
              We Handle Your Marketing
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-esh-gold to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Professional Websites */}
            <div className="p-8 border border-zinc-800 hover:border-esh-gold bg-black/40 transition-all">
              <h3 className="text-2xl font-light mb-4 tracking-wide font-serif">
                Professional Websites
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                We build beautiful, conversion-optimized websites for your business. 
                Modern design. Mobile-friendly. SEO-ready. No upfront cost.
              </p>
              <ul className="space-y-3 text-zinc-500">
                <li>✓ Custom contractor website</li>
                <li>✓ Portfolio showcase</li>
                <li>✓ Lead capture forms</li>
                <li>✓ Mobile optimized</li>
              </ul>
            </div>

            {/* Lead Generation */}
            <div className="p-8 border border-zinc-800 hover:border-esh-gold bg-black/40 transition-all">
              <h3 className="text-2xl font-light mb-4 tracking-wide font-serif">
                Qualified Leads
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Stop chasing leads. We bring pre-qualified, high-value projects directly to you. 
                Real homeowners ready to start their projects.
              </p>
              <ul className="space-y-3 text-zinc-500">
                <li>✓ Pre-qualified homeowners</li>
                <li>✓ Budget-verified leads</li>
                <li>✓ Local to your service area</li>
                <li>✓ Ready to start projects</li>
              </ul>
            </div>

            {/* Zero Risk Model */}
            <div className="p-8 border border-zinc-800 hover:border-esh-gold bg-black/40 transition-all">
              <h3 className="text-2xl font-light mb-4 tracking-wide font-serif">
                Zero Risk Model
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                No upfront costs. No monthly fees. No subscriptions. 
                You only pay a 15% commission on closed deals. That's it.
              </p>
              <ul className="space-y-3 text-zinc-500">
                <li>✓ $0 to start</li>
                <li>✓ 15% on closed deals only</li>
                <li>✓ Cancel anytime</li>
                <li>✓ Full marketing support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white font-serif">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join 3 elite contractors who trust us to build their websites and generate their leads. 
              Zero risk. Maximum growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/become-a-provider/">
                <Button variant="secondary" className="px-12 py-5">
                  Join Elite Service Hub
                </Button>
              </a>
              <a href="/become-a-provider/">
                <Button variant="secondary" className="px-12 py-5">
                  Schedule a Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
