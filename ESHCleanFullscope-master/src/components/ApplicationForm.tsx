import { useState, FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { supabase, type ContractorApplication } from '../lib/supabase';

const TRADES = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Full Home Remodeling',
  'Custom Carpentry',
  'Roofing',
  'HVAC',
  'Plumbing',
  'Electrical',
  'Landscaping',
  'Pool Installation',
  'Other'
];

const REVENUE_RANGES = [
  'Under $500K',
  '$500K - $1M',
  '$1M - $2M',
  '$2M - $5M',
  'Over $5M'
];

const REFERRAL_SOURCES = [
  'Google Search',
  'Social Media',
  'Industry Referral',
  'Existing Partner',
  'Trade Publication',
  'Other'
];

export default function ApplicationForm() {
  const [formData, setFormData] = useState<Partial<ContractorApplication>>({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zip_code: '',
    trade_specialty: '',
    years_in_business: 0,
    annual_revenue_range: '',
    team_size: 0,
    licensed: false,
    insured: false,
    website_url: '',
    why_partner: '',
    referral_source: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Save to Supabase
      const { error: submitError } = await supabase
        .from('contractor_applications')
        .insert([formData as ContractorApplication]);

      if (submitError) throw submitError;

      // Send email notification to Chris
      await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'info@kmjk.pro',
          subject: `New Contractor Application: ${formData.company_name}`,
          application: formData
        })
      }).catch(err => console.error('Email notification failed:', err));

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof ContractorApplication, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <section id="application-form" className="py-32 bg-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>
          <h2 className="text-5xl font-light mb-6">Application Received</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-zinc-400 mb-6">
            Thank you for your interest in partnering with Elite Service Hub.
          </p>
          <p className="text-zinc-500 leading-relaxed mb-8">
            Our team will carefully review your application. If your business aligns with our
            partnership criteria, we'll reach out within 3-5 business days to schedule an
            in-depth discovery call.
          </p>
          <div className="p-6 border border-zinc-800 bg-zinc-950/50 text-left">
            <p className="text-sm text-zinc-500 mb-3 uppercase tracking-wide">What Happens Next:</p>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">1.</span>
                <span>Application review by our partnership team</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">2.</span>
                <span>Initial qualification call to discuss your business and our model</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">3.</span>
                <span>Market analysis and partnership proposal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white mt-1">4.</span>
                <span>If approved, onboarding and campaign launch</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="application-form" className="py-32 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase mb-4">
            Step One
          </p>
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Apply for Partnership
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-auto mb-6"></div>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            We're highly selective in our partnerships. Tell us about your business,
            and we'll determine if there's a mutual fit.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 border border-red-900 bg-red-950/20 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Business Information */}
          <div className="border border-zinc-800 p-8 bg-zinc-950/30">
            <h3 className="text-2xl font-light mb-8 tracking-wide">Business Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact_name}
                  onChange={(e) => updateField('contact_name', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => updateField('website_url', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Primary Trade *
                </label>
                <select
                  required
                  value={formData.trade_specialty}
                  onChange={(e) => updateField('trade_specialty', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                >
                  <option value="">Select a trade</option>
                  {TRADES.map(trade => (
                    <option key={trade} value={trade}>{trade}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border border-zinc-800 p-8 bg-zinc-950/30">
            <h3 className="text-2xl font-light mb-8 tracking-wide">Primary Service Area</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                  maxLength={2}
                  placeholder="FL"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.zip_code}
                  onChange={(e) => updateField('zip_code', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                />
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div className="border border-zinc-800 p-8 bg-zinc-950/30">
            <h3 className="text-2xl font-light mb-8 tracking-wide">Business Metrics</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Years in Business *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.years_in_business || ''}
                  onChange={(e) => updateField('years_in_business', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Annual Revenue Range *
                </label>
                <select
                  required
                  value={formData.annual_revenue_range}
                  onChange={(e) => updateField('annual_revenue_range', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                >
                  <option value="">Select range</option>
                  {REVENUE_RANGES.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  Team Size *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.team_size || ''}
                  onChange={(e) => updateField('team_size', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                  placeholder="Total employees/crew"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                  How Did You Hear About Us?
                </label>
                <select
                  value={formData.referral_source}
                  onChange={(e) => updateField('referral_source', e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none"
                >
                  <option value="">Select source</option>
                  {REFERRAL_SOURCES.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.licensed}
                  onChange={(e) => updateField('licensed', e.target.checked)}
                  className="w-5 h-5 bg-black border border-zinc-800 checked:bg-white checked:border-white"
                />
                <span className="text-sm uppercase tracking-wide text-zinc-400 group-hover:text-white transition-colors">
                  Properly Licensed
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.insured}
                  onChange={(e) => updateField('insured', e.target.checked)}
                  className="w-5 h-5 bg-black border border-zinc-800 checked:bg-white checked:border-white"
                />
                <span className="text-sm uppercase tracking-wide text-zinc-400 group-hover:text-white transition-colors">
                  Fully Insured
                </span>
              </label>
            </div>
          </div>

          {/* Partnership Intent */}
          <div className="border border-zinc-800 p-8 bg-zinc-950/30">
            <h3 className="text-2xl font-light mb-8 tracking-wide">Partnership Intent</h3>
            <div>
              <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
                Why do you want to partner with Elite Service Hub? *
              </label>
              <textarea
                required
                rows={6}
                value={formData.why_partner}
                onChange={(e) => updateField('why_partner', e.target.value)}
                className="w-full px-4 py-3 bg-black border border-zinc-800 focus:border-white transition-colors outline-none resize-none"
                placeholder="Tell us about your growth goals, current challenges, and what you're looking for in a marketing partner..."
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-3 px-12 py-4 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all duration-300 text-sm tracking-wider uppercase font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Application
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>

          <p className="text-center text-sm text-zinc-600">
            By submitting this application, you agree to be contacted by Chris Cotton and the Elite Service Hub team
            regarding partnership opportunities. For urgent inquiries, email info@kmjk.pro.
          </p>
        </form>
      </div>
    </section>
  );
}
