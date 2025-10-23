import { TrendingUp, Shield, Target, Clock } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Predictable Growth',
    description: 'End the feast-or-famine cycle. We deliver a consistent pipeline of high-value projects, allowing you to plan your business with confidence.'
  },
  {
    icon: Clock,
    title: 'Reclaim Your Time',
    description: 'Stop chasing leads. We handle all marketing, sales calls, and qualification. You focus exclusively on what you do best: exceptional craftsmanship.'
  },
  {
    icon: Target,
    title: 'Premium Positioning',
    description: 'We build your brand as the elite choice in your market with sophisticated digital marketing and a professional web presence.'
  },
  {
    icon: Shield,
    title: 'Zero Risk Partnership',
    description: 'No upfront fees. No monthly retainers. We invest our capital and only succeed when you do. True performance alignment.'
  }
];

export default function ValueProposition() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase mb-4">
            The ESH Advantage
          </p>
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Why Elite Contractors Choose Us
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative p-8 border border-zinc-800 hover:border-zinc-700 bg-black/40 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-zinc-800 group-hover:border-white transition-colors">
                    <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-light mb-3 tracking-wide">
                      {benefit.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 p-12 border border-zinc-800 bg-zinc-950/50">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-6">The Contractor-as-a-Brand Model</h3>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We don't work with hundreds of average contractors. We select the top 1-5% in a market
              and invest in them as if they were our own business. Your success is our success.
            </p>
            <p className="text-sm text-zinc-500 italic">
              "We are not a lead generation service. We are your dedicated growth partner."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
