import { Target, Heart, Handshake, Lightbulb, Shield } from 'lucide-react';
import Button from '../components/shared/Button';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We partner only with the top 1-5% of contractors who demonstrate exceptional craftsmanship and service.'
    },
    {
      icon: Heart,
      title: 'Transparency',
      description: 'No hidden fees, no surprises. Our performance-based model aligns everyone\'s interests.'
    },
    {
      icon: Handshake,
      title: 'Partnership',
      description: 'We succeed only when our contractors and homeowners succeed. True win-win-win.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Leveraging technology to create a better matching and marketing platform.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Doing the right thing, even when no one is watching. Building trust through action.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">About Elite Service Hub</h1>
          <p className="text-xl text-zinc-400">Redefining home improvement through strategic partnerships</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 font-serif">Our Story</h2>
          
          <div className="space-y-8 text-lg text-zinc-400 leading-relaxed">
            <div>
              <h3 className="text-2xl text-white mb-4 font-light font-serif">The Problem</h3>
              <p>
                Homeowners struggle to find trustworthy contractors. They waste hours researching, calling, and meeting with multiple contractors, many of whom are unqualified or overpriced. Meanwhile, elite contractors waste thousands on marketing that brings low-quality leads.
              </p>
            </div>

            <div>
              <h3 className="text-2xl text-white mb-4 font-light font-serif">The Insight</h3>
              <p>
                Both sides want the same thing: quality matches. Homeowners want vetted, exceptional contractors. Elite contractors want pre-qualified, ready-to-buy homeowners. The problem isn't supply or demand—it's the matching process.
              </p>
            </div>

            <div>
              <h3 className="text-2xl text-white mb-4 font-light font-serif">The Solution</h3>
              <p>
                Elite Service Hub rigorously vets contractors, builds their brand through custom marketing sites, and delivers pre-qualified leads. We charge zero upfront fees and take only 15% commission on completed projects. If a lead doesn't close, contractors pay nothing.
              </p>
            </div>

            <div>
              <h3 className="text-2xl text-white mb-4 font-light font-serif">The Vision</h3>
              <p>
                We're building a nationwide network of elite contractors, creating the go-to platform for high-end home remodeling. Every homeowner deserves access to exceptional craftsmanship, and every elite contractor deserves a predictable pipeline of quality projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-t border-zinc-900 bg-esh-gold">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 text-black font-serif">Our Mission</h2>
          <p className="text-2xl font-light text-black/80 leading-relaxed">
            To connect homeowners with elite contractors through a transparent, performance-based platform that creates exceptional experiences for everyone involved.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 font-serif">Our Values</h2>
            <p className="text-xl text-zinc-400">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-8 border border-zinc-800 bg-black/40 hover:border-esh-gold transition-colors">
                <value.icon size={40} className="text-esh-gold mb-4" />
                <h3 className="text-2xl font-light mb-4 font-serif">{value.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 font-serif">Leadership</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="p-8 border border-zinc-800 bg-black/60">
              <div className="mb-6">
                <h3 className="text-3xl font-light mb-2 font-serif">Chris Cotton</h3>
                <p className="text-esh-gold uppercase tracking-wider text-sm">Founder & CEO</p>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Chris founded Elite Service Hub after witnessing firsthand the broken contractor-homeowner matching process. With a background in marketing and a passion for quality craftsmanship, he built ESH to solve the problem for both sides.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                "We're not just a lead generation service. We're true partners in our contractors' success, and advocates for homeowners who deserve better. That's what drives me every day."
              </p>
              <div className="mt-6">
                <a href="mailto:Chris@TheEliteServiceHub.com" className="text-esh-gold hover:underline">
                  Chris@TheEliteServiceHub.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 font-serif">Join Us on This Journey</h2>
          <p className="text-xl text-zinc-400 mb-8">
            Whether you're a homeowner planning a remodel or a contractor looking to grow your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" className="px-12 py-5" onClick={() => navigate('/')}>
              Find a Contractor
            </Button>
            <Button variant="primary" className="px-12 py-5" onClick={() => navigate('/apply')}>
              Become a Partner
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
