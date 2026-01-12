import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/shared/Button';

interface BathroomTemplateProps {
  contractorName: string;
  logo?: string;
  phone: string;
  email: string;
  serviceAreas: string[];
  rating: number;
  projectsCompleted: number;
}

export default function BathroomTemplate(props: BathroomTemplateProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '',
    timeline: '',
    budget: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead submitted:', formData);
    alert('Thank you! We will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {props.logo && <img src={props.logo} alt={props.contractorName} className="h-20 w-auto mb-8" />}
              <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">
                Luxury Bathroom Remodeling by {props.contractorName}
              </h1>
              <p className="text-xl text-zinc-400 mb-8">
                Transform your bathroom into a spa-like retreat. Elite craftsmanship in Treasure Coast.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-light text-esh-gold mb-1">{props.projectsCompleted}+</div>
                  <div className="text-sm text-zinc-500">Bathrooms Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-esh-gold mb-1">{props.rating}/5</div>
                  <div className="text-sm text-zinc-500">Client Rating</div>
                </div>
              </div>

              <div className="space-y-3">
                {['Custom Design', 'Licensed & Insured', 'Quality Materials', 'On-Budget Guarantee'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-esh-gold" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Form */}
            <div className="bg-white p-8 text-black">
              <h2 className="text-3xl font-light mb-2 font-serif">Start Your Bathroom Transformation</h2>
              <p className="text-zinc-700 mb-6">Free consultation - No obligation</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none"
                  required
                />
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none"
                  required
                >
                  <option value="">Budget Range</option>
                  <option value="10-20k">$10,000 - $20,000</option>
                  <option value="20-35k">$20,000 - $35,000</option>
                  <option value="35-50k">$35,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
                <Button variant="accent" className="w-full py-4 text-base" type="submit">
                  Get Free Consultation <ArrowRight className="inline ml-2" size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center font-serif">Bathroom Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Full Bathroom Remodel', 'Shower & Tub Replacement', 'Custom Vanities', 'Tile & Flooring', 'Plumbing & Fixtures', 'Accessibility Upgrades'].map((service) => (
              <div key={service} className="p-6 border border-zinc-800 bg-black/40">
                <h3 className="text-xl font-light mb-3 font-serif">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center font-serif">Recent Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <span className="text-zinc-700">Project {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-esh-gold">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 text-black font-serif">Ready for Your Dream Bathroom?</h2>
          <Button variant="primary" className="px-12 py-5">Call {props.phone}</Button>
        </div>
      </section>
    </div>
  );
}
