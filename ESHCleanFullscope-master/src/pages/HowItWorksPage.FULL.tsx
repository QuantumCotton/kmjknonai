import { ChevronDown, CheckCircle, Clock, Shield, Star, Users, Home, Briefcase } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/shared/Button';

export default function HowItWorksPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const homeownerSteps = [
    {
      icon: Home,
      title: 'Tell Us About Your Project',
      description: 'Complete our quick form or chat with Atlas, our AI assistant. Share your vision, timeline, and budget.',
      details: ['5-minute questionnaire', 'Upload inspiration photos', 'Specify must-haves and nice-to-haves']
    },
    {
      icon: Star,
      title: 'Get Matched with Elite Contractor',
      description: 'We pair you with a vetted contractor from the top 1-5% in your area who specializes in your project type.',
      details: ['Pre-screened for licensing & insurance', 'Proven track record', 'Personality match guaranteed']
    },
    {
      icon: Users,
      title: 'Schedule Free Consultation',
      description: 'Meet your contractor, discuss your project in detail, and get a transparent quote.',
      details: ['In-home or virtual meeting', 'Detailed scope of work', 'No-obligation proposal']
    },
    {
      icon: Shield,
      title: 'Experience Excellence',
      description: 'Your project begins with clear timelines, open communication, and ESH quality assurance.',
      details: ['Dedicated project manager', 'Real-time updates', 'Quality checkpoints']
    },
    {
      icon: CheckCircle,
      title: 'Enjoy Your Transformation',
      description: 'Love your new space with our satisfaction guarantee and ongoing support.',
      details: ['Lifetime craftsmanship warranty', 'Post-project support', 'Referral rewards program']
    }
  ];

  const contractorSteps = [
    {
      icon: Briefcase,
      title: 'Apply to Join',
      description: 'Submit your application showcasing your expertise, portfolio, and business credentials.',
      details: ['15-minute application', 'Portfolio submission', 'License & insurance verification']
    },
    {
      icon: Shield,
      title: 'Rigorous Vetting Process',
      description: 'We review your work, check references, verify credentials, and assess cultural fit.',
      details: ['Background check', '5+ client references', 'Portfolio review', 'Interview with ESH team']
    },
    {
      icon: Star,
      title: 'We Build Your Brand',
      description: 'ESH creates a custom marketing site, professional photography, and lead generation campaigns.',
      details: ['Custom landing page (e.g., kmjk.pro)', 'Before/after photography', 'Google Ads campaigns', 'SEO optimization']
    },
    {
      icon: Users,
      title: 'Receive Pre-Qualified Leads',
      description: 'Get high-value, ready-to-buy leads delivered directly to you. No more chasing cold prospects.',
      details: ['A/B/C tier lead scoring', 'Instant notifications', 'Pre-qualified budgets & timelines']
    },
    {
      icon: Clock,
      title: 'Close Jobs, Pay Commission',
      description: 'Focus on what you do best: delivering exceptional work. Pay only 15% on closed deals.',
      details: ['$0 upfront marketing costs', '15% commission on completed projects', '85% revenue stays with you', 'No hidden fees']
    }
  ];

  const faqs = [
    {
      question: 'How much does it cost for homeowners?',
      answer: 'Absolutely free! Homeowners pay nothing to use Elite Service Hub. Our contractors pay us a commission on completed projects, so we only succeed when you\'re happy with your results.'
    },
    {
      question: 'What if I\'m not satisfied with my contractor match?',
      answer: 'We stand behind our vetting process. If you\'re not satisfied within the first consultation, we\'ll match you with another elite contractor at no additional cost.'
    },
    {
      question: 'How long does the matching process take?',
      answer: 'Typically 24-48 hours. For urgent projects, we can often match you same-day. You\'ll receive contractor profiles to review and schedule consultations at your convenience.'
    },
    {
      question: 'What makes a contractor "elite"?',
      answer: 'Our contractors are in the top 1-5% based on: licensed & insured status, 5+ years of experience, portfolio quality, client satisfaction rates above 95%, financial stability, and cultural fit with our values.'
    },
    {
      question: 'Do you work in my area?',
      answer: 'We currently serve the Treasure Coast in Florida with plans to expand to additional markets soon. Enter your ZIP code on our Markets page to see if we\'re in your area or join the waitlist.'
    },
    {
      question: 'How does the 15% commission work for contractors?',
      answer: 'You pay 15% only on completed, paid projects. If a lead doesn\'t close, you pay nothing. There are no monthly fees, no setup costs, and no hidden charges. We succeed only when you succeed.'
    },
    {
      question: 'What kind of leads do contractors receive?',
      answer: 'We score leads A/B/C based on budget, timeline, and qualification level. A-tier leads are high-budget, short-timeline, ready-to-buy homeowners. You receive full lead details upfront so you can prioritize your time.'
    },
    {
      question: 'Can I cancel my contractor partnership anytime?',
      answer: 'Yes. While we hope for long-term partnerships, there\'s no contract lock-in. Give us 30 days\' notice, and we\'ll pause lead delivery. You keep all existing clients and pay commission only on projects already in progress.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.03) 100px, rgba(255,255,255,0.03) 200px)`
        }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">The ESH Experience</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">How Elite Service Hub Works</h1>
          <p className="text-xl text-zinc-400 mb-12">
            A seamless, transparent process for both homeowners and contractors
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-esh-gold to-transparent mx-auto"></div>
        </div>
      </section>

      {/* For Homeowners Process */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-serif">For Homeowners</h2>
            <p className="text-xl text-zinc-400">Your journey to the perfect remodel in 5 simple steps</p>
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
                  <p className="text-zinc-400 mb-4 text-lg">{step.description}</p>
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
            <Button variant="accent" className="px-12 py-5">Start Your Project</Button>
          </div>
        </div>
      </section>

      {/* For Contractors Process */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-serif">For Contractors</h2>
            <p className="text-xl text-zinc-400">Your path to predictable, high-value leads</p>
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
                  <p className="text-zinc-400 mb-4 text-lg">{step.description}</p>
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
            <Button variant="primary" className="px-12 py-5">Apply as a Partner</Button>
          </div>
        </div>
      </section>

      {/* The ESH Difference */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 font-serif">The ESH Difference</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              We're not a marketplace or a lead generation service. We're a true partnership platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-zinc-800 bg-black/40">
              <h3 className="text-xl font-light mb-4 font-serif">Traditional Lead Gen</h3>
              <ul className="space-y-3 text-zinc-500">
                <li>❌ Pay per lead regardless of quality</li>
                <li>❌ Compete with 5-10 other contractors</li>
                <li>❌ No vetting of homeowners</li>
                <li>❌ DIY your own marketing</li>
                <li>❌ Low close rates (10-20%)</li>
              </ul>
            </div>

            <div className="p-8 border border-esh-gold bg-esh-gold/10">
              <h3 className="text-xl font-light mb-4 font-serif text-esh-gold">Elite Service Hub</h3>
              <ul className="space-y-3 text-zinc-300">
                <li>✓ Pay only on closed deals (15%)</li>
                <li>✓ Exclusive matches (no competition)</li>
                <li>✓ Pre-qualified homeowners</li>
                <li>✓ We build your brand</li>
                <li>✓ High close rates (50-70%)</li>
              </ul>
            </div>

            <div className="p-8 border border-zinc-800 bg-black/40">
              <h3 className="text-xl font-light mb-4 font-serif">DIY Marketing</h3>
              <ul className="space-y-3 text-zinc-500">
                <li>❌ $2,000-5,000/month ad spend</li>
                <li>❌ Manage campaigns yourself</li>
                <li>❌ Inconsistent lead flow</li>
                <li>❌ No quality guarantee</li>
                <li>❌ Time-consuming</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 font-serif">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-zinc-800 bg-black/40 overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform flex-shrink-0 ml-4 ${openFAQ === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-esh-gold">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-black font-serif">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-black/80 mb-8">
            Join thousands of satisfied homeowners and elite contractors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="px-12 py-5">Find a Contractor</Button>
            <Button variant="secondary" className="px-12 py-5 border-black text-black hover:bg-black/10">
              Become a Partner
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
