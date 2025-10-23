import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MarketsPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">Where We Operate</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">Markets We Serve</h1>
          <p className="text-xl text-zinc-400">Elite craftsmanship in select markets</p>
        </div>
      </section>

      {/* Active Market */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 font-serif">Currently Serving</h2>
          </div>

          <div className="max-w-5xl mx-auto border border-esh-gold p-12 bg-gradient-to-br from-esh-gold/10 to-black">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin size={32} className="text-esh-gold" />
                  <h3 className="text-3xl font-light font-serif">Treasure Coast, Florida</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Serving the pristine coastal communities of Florida's Treasure Coast with elite kitchen and bathroom remodeling services.
                </p>
                
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-4">Service Areas:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Stuart', 'Jensen Beach', 'Port St. Lucie', 'Fort Pierce', 'Vero Beach', 'Sebastian'].map((city) => (
                      <div key={city} className="flex items-center gap-2 text-zinc-400">
                        <CheckCircle size={16} className="text-esh-gold" />
                        <span>{city}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-4">Services Offered:</h4>
                  <ul className="space-y-2">
                    {['Kitchen Remodeling', 'Bathroom Remodeling', 'Custom Cabinetry', 'Countertop Installation', 'Tile & Flooring'].map((service) => (
                      <li key={service} className="flex items-center gap-2 text-zinc-400">
                        <CheckCircle size={16} className="text-esh-gold" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="accent" className="px-8 py-4" onClick={() => navigate('/')}>
                  Find a Contractor <ArrowRight className="inline ml-2" size={16} />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="bg-black/60 p-6 border border-zinc-800">
                  <div className="text-4xl font-light text-esh-gold mb-2">$450K</div>
                  <div className="text-zinc-400">Projects Completed</div>
                </div>
                <div className="bg-black/60 p-6 border border-zinc-800">
                  <div className="text-4xl font-light text-esh-gold mb-2">3</div>
                  <div className="text-zinc-400">Active Partners</div>
                </div>
                <div className="bg-black/60 p-6 border border-zinc-800">
                  <div className="text-4xl font-light text-esh-gold mb-2">100%</div>
                  <div className="text-zinc-400">Satisfaction Rate</div>
                </div>
                <div className="bg-black/60 p-6 border border-zinc-800">
                  <div className="text-4xl font-light text-esh-gold mb-2">Q4 2025</div>
                  <div className="text-zinc-400">Market Launch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 font-serif">Future Markets</h2>
            <p className="text-xl text-zinc-400">Strategic expansion as we grow nationwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { market: 'Western North Carolina', cities: 'Asheville, Burnsville, Hendersonville' },
              { market: 'Tampa Bay, FL', cities: 'Tampa, St. Petersburg, Clearwater' },
              { market: 'Naples / Fort Myers, FL', cities: 'Naples, Fort Myers, Cape Coral' },
              { market: 'San Jose, CA', cities: 'San Jose, Cupertino, Saratoga' },
              { market: 'SF Peninsula, CA', cities: 'Palo Alto, Menlo Park, Redwood City' },
              { market: 'Charleston, SC', cities: 'Charleston, Mount Pleasant, Summerville' },
              { market: 'Greenville, SC', cities: 'Greenville, Spartanburg, Greer' },
              { market: 'Des Moines, IA', cities: 'Des Moines, West Des Moines, Ankeny' },
              { market: 'Spokane, WA', cities: 'Spokane, Spokane Valley' },
              { market: 'Boise, ID', cities: 'Boise, Meridian, Nampa' },
            ].map((market) => (
              <div key={market.market} className="p-6 border border-zinc-800 bg-black/40 hover:border-esh-gold transition-colors">
                <h3 className="text-xl font-light mb-2 font-serif">{market.market}</h3>
                <p className="text-sm text-zinc-500 mb-4">{market.cities}</p>
                <div className="inline-block px-3 py-1 bg-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                  As We Expand
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto bg-black border border-zinc-800 p-8">
            <h3 className="text-2xl font-light mb-4 text-center font-serif">Join the Waitlist</h3>
            <p className="text-zinc-400 text-center mb-6">
              Be the first to know when we launch in your market
            </p>
            <form onSubmit={handleWaitlist} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-esh-gold outline-none"
                required
              />
              <Button variant="accent" className="w-full" type="submit">
                {submitted ? 'Added to Waitlist!' : 'Notify Me'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* For Contractors */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 font-serif">Are You a Contractor in a New Market?</h2>
          <p className="text-xl text-zinc-400 mb-8">
            Help us expand! We're looking for elite contractors to partner with as we grow.
          </p>
          <Button variant="primary" className="px-12 py-5" onClick={() => navigate('/apply')}>
            Express Interest
          </Button>
        </div>
      </section>
    </div>
  );
}
