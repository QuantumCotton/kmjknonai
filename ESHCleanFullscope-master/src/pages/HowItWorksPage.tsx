import { ChevronDown, CheckCircle, Clock, Shield, Star, Users, Home, Briefcase } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/shared/Button';
import { useNavigate } from 'react-router-dom';

export default function HowItWorksPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const navigate = useNavigate();

  const homeownerSteps = [
    {
      icon: Home,
      title: 'Tell Us About Your Project',
      description: 'Complete our quick form or chat with Atlas, our AI assistant. Share your vision, timeline, and budget.',
      details: ['5-minute questionnaire', 'Upload inspiration photos', 'Specify must-haves']
    },
    {
      icon: Star,
      title: 'Get Matched with Elite Contractor',
      description: 'We pair you with a vetted contractor from the top 1-5% in your area.',
      details: ['Pre-screened & licensed', 'Proven track record', 'Personality matched']
    },
    {
      icon: Users,
      title: 'Schedule Free Consultation',
      description: 'Meet your contractor and get a transparent quote.',
      details: ['In-home or virtual', 'Detailed scope', 'No obligation']
    },
    {
      icon: Shield,
      title: 'Experience Excellence',
      description: 'Your project begins with clear timelines and quality assurance.',
      details: ['Project manager', 'Real-time updates', 'Quality checks']
    },
    {
      icon: CheckCircle,
      title: 'Enjoy Your Transformation',
      description: 'Love your new space with our satisfaction guarantee.',
      details: ['Lifetime warranty', 'Post-project support', 'Referral rewards']
    }
  ];

  const contractorSteps = [
    {
      icon: Briefcase,
      title: 'Apply to Join',
      description: 'Submit your application showcasing your expertise and portfolio.',
      details: ['15-minute application', 'Portfolio submission', 'License verification']
    },
    {
      icon: Shield,
      title: 'Rigorous Vetting',
      description: 'We review your work, check references, and verify credentials.',
      details: ['Background check', '5+ references', 'Portfolio review']
    },
    {
      icon: Star,
      title: 'We Build Your Brand',
      description: 'ESH creates a custom marketing site and lead generation campaigns.',
      details: ['Custom landing page', 'Professional photos', 'Google Ads', 'SEO']
    },
    {
      icon: Users,
      title: 'Receive Pre-Qualified Leads',
      description: 'Get high-value leads delivered directly to you.',
      details: ['A/B/C tier scoring', 'Instant notifications', 'Pre-qualified budgets']
    },
    {
      icon: Clock,
      title: 'Close Jobs, Pay Commission',
      description: 'Focus on delivering work. Pay only 15% on closed deals.',
      details: ['$0 upfront costs', '15% commission', '85% stays with you']
    }
  ];

  const faqs = [
    {
      question: 'How much does it cost for homeowners?',
      answer: 'Absolutely free! Homeowners pay nothing. Our contractors pay us a commission on completed projects.'
    },
    {
      question: 'What if I\'m not satisfied with my contractor?',
      answer: 'We\'ll match you with another elite contractor at no additional cost within the first consultation.'
    },
    {
      question: 'How long does matching take?',
      answer: 'Typically 24-48 hours. For urgent projects, we can often match you same-day.'
    },
    {
      question: 'What makes a contractor "elite"?',
      answer: 'Top 1-5% based on: licensing, 5+ years experience, portfolio quality, 95%+ satisfaction, and financial stability.'
    },
    {
      question: 'Do you work in my area?',
      answer: 'Currently serving Treasure Coast, FL with expansion plans. Check our Markets page or join the waitlist.'
    },
    {
      question: 'How does the 15% commission work?',
      answer: 'Pay 15% only on completed, paid projects. No monthly fees, no setup costs, no hidden charges.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">The ESH Experience</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">How Elite Service Hub Works</h1>
          <p className="text-xl text-zinc-400 mb-12">Seamless process for homeowners and contractors</p>
        </div>
      </section>

      {/* Homeowners */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 font-serif">For Homeowners</h2>
            <p className="text-xl text-zinc-400">5 simple steps to your perfect remodel</p>
          </div>

          <div className="space-y-12">
            {homeownerSteps.map((step, index) => (
              <div key={index} className="flex gap-8 items-start border-l-2 border-esh-gold pl-8 py-4">
                <div className="bg-esh-gold p-4 rounded-lg flex-shrink-0">
                  <step.icon size={32} className="text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl font-light text-zinc-800">0{index + 1}</span>
                    <h3 className="text-2xl font-light font-serif">{step.title}</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-500">
                        <CheckCircle size={16} className="text-esh-gold mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button variant="accent" className="px-12 py-5" onClick={() => navigate('/')}>Start Your Project</Button>
          </div>
        </div>
      </section>

      {/* Contractors */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 font-serif">For Contractors</h2>
            <p className="text-xl text-zinc-400">Your path to predictable leads</p>
          </div>

          <div className="space-y-12">
            {contractorSteps.map((step, index) => (
              <div key={index} className="flex gap-8 items-start border-l-2 border-white pl-8 py-4">
                <div className="bg-white p-4 rounded-lg flex-shrink-0">
                  <step.icon size={32} className="text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl font-light text-zinc-800">0{index + 1}</span>
                    <h3 className="text-2xl font-light font-serif">{step.title}</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-500">
                        <CheckCircle size={16} className="text-white mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button variant="primary" className="px-12 py-5" onClick={() => navigate('/become-a-provider/')}>Apply as Partner</Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-light mb-12 text-center font-serif">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-zinc-800 bg-black/40">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-zinc-900/50"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <ChevronDown size={20} className={`transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-zinc-400">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-esh-gold">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 text-black font-serif">Ready to Experience the Difference?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="px-12 py-5" onClick={() => navigate('/')}>Find a Contractor</Button>
            <Button variant="secondary" className="px-12 py-5 border-black text-black" onClick={() => navigate('/become-a-provider/')}>Become a Partner</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
