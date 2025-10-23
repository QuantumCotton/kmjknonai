import { useState } from 'react';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import Button from '../components/shared/Button';

interface KitchenTemplateProps {
  contractorName: string;
  logo?: string;
  phone: string;
  email: string;
  serviceAreas: string[];
  rating: number;
  projectsCompleted: number;
  yearsExperience: number;
}

export default function KitchenTemplate({
  contractorName,
  logo,
  phone,
  email,
  serviceAreas,
  rating,
  projectsCompleted,
  yearsExperience
}: KitchenTemplateProps) {
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
      {/* Hero with Lead Form */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              {logo && <img src={logo} alt={contractorName} className="h-20 w-auto mb-8" />}
              <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">
                Transform Your Kitchen with {contractorName}
              </h1>
              <p className="text-xl text-zinc-400 mb-8">
                Elite kitchen remodeling in Treasure Coast, Florida. Zero upfront cost with ESH partnership.
              </p>
              
              <div className="flex items-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < rating ? 'text-esh-gold fill-esh-gold' : 'text-zinc-700'} />
                  ))}
                  <span className="text-zinc-400 ml-2">{rating}/5</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-light text-esh-gold mb-1">{projectsCompleted}+</div>
                  <div className="text-sm text-zinc-500">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-esh-gold mb-1">{yearsExperience}</div>
                  <div className="text-sm text-zinc-500">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-esh-gold mb-1">98%</div>
                  <div className="text-sm text-zinc-500">Satisfaction</div>
                </div>
              </div>

              <div className="space-y-3">
                {['Licensed & Insured', 'Lifetime Warranty', 'Free Consultation', 'Transparent Pricing'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-esh-gold" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Lead Form */}
            <div className="bg-white p-8 text-black">
              <h2 className="text-3xl font-light mb-2 font-serif">Get Your Free Consultation</h2>
              <p className="text-zinc-700 mb-6">Fill out the form and we'll contact you within 24 hours</p>
              
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
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
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
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none"
                  required
                >
                  <option value="">Project Timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-3mo">1-3 Months</option>
                  <option value="3-6mo">3-6 Months</option>
                  <option value="6mo+">6+ Months</option>
                </select>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none"
                  required
                >
                  <option value="">Budget Range</option>
                  <option value="15-25k">$15,000 - $25,000</option>
                  <option value="25-50k">$25,000 - $50,000</option>
                  <option value="50-75k">$50,000 - $75,000</option>
                  <option value="75k+">$75,000+</option>
                </select>
                <textarea
                  placeholder="Tell us about your project (optional)"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-zinc-300 focus:border-esh-gold outline-none resize-none"
                  rows={4}
                />
                <Button variant="accent" className="w-full py-4 text-base" type="submit">
                  Get Free Consultation <ArrowRight className="inline ml-2" size={18} />
                </Button>
              </form>
              <p className="text-xs text-zinc-600 mt-4 text-center">
                By submitting, you agree to be contacted by {contractorName}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center font-serif">Why Choose {contractorName}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Elite Craftsmanship', desc: 'Top 1% of contractors vetted by Elite Service Hub' },
              { title: 'Transparent Pricing', desc: 'No hidden fees. Clear quotes before we start.' },
              { title: 'On-Time Delivery', desc: 'We respect your time and stick to deadlines.' },
              { title: 'Licensed & Insured', desc: 'Fully licensed, insured, and bonded.' },
              { title: 'Project Manager', desc: 'Dedicated point of contact throughout.' },
              { title: 'Lifetime Warranty', desc: 'We stand behind our craftsmanship.' }
            ].map((item) => (
              <div key={item.title} className="p-6 border border-zinc-800 bg-black/40">
                <h3 className="text-xl font-light mb-3 font-serif">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Placeholder */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center font-serif">Our Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <span className="text-zinc-700">Before/After {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-8 font-serif">We Serve</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {serviceAreas.map((area) => (
              <div key={area} className="px-6 py-3 border border-zinc-800 text-zinc-300">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-esh-gold">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 text-black font-serif">Ready to Transform Your Kitchen?</h2>
          <p className="text-xl text-black/80 mb-8">Schedule your free consultation today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${phone}`} className="px-12 py-4 bg-black text-white hover:bg-zinc-900 transition-colors text-center">
              Call {phone}
            </a>
            <a href={`mailto:${email}`} className="px-12 py-4 border-2 border-black text-black hover:bg-black/10 transition-colors text-center">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
