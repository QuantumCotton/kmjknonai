import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <div className="mb-8">
          <img 
            src="/images/logos/esh-dark-bg.png" 
            alt="Elite Service Hub" 
            className="h-32 w-auto mx-auto mb-8 opacity-90 hover:opacity-100 transition-opacity object-contain"
          />
          <p className="text-sm tracking-[0.3em] text-zinc-400 uppercase mb-6">
            Exclusive Partnership Opportunity
          </p>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light mb-6 tracking-wide">
            ELITE SERVICE HUB
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wider">
            Performance-Based Marketing for Elite Contractors
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12 space-y-6 text-zinc-400 leading-relaxed">
          <p className="text-lg">
            We partner with the top 1-5% of contractors in select markets, investing our capital
            to fill your schedule with high-value, pre-qualified projects.
          </p>
          <p className="text-base">
            <span className="text-white font-medium">Zero upfront cost.</span>
            {' '}You pay nothing until we deliver a signed contract.
          </p>
        </div>

        <button
          onClick={scrollToForm}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-zinc-200 transition-all duration-300 text-sm tracking-wider uppercase font-medium"
        >
          Apply for Partnership
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="border-l border-zinc-800 pl-6 text-left">
            <div className="text-3xl font-light mb-2">0%</div>
            <div className="text-sm text-zinc-500 uppercase tracking-wide">Upfront Cost</div>
          </div>
          <div className="border-l border-zinc-800 pl-6 text-left">
            <div className="text-3xl font-light mb-2">15%</div>
            <div className="text-sm text-zinc-500 uppercase tracking-wide">Commission Only</div>
          </div>
          <div className="border-l border-zinc-800 pl-6 text-left">
            <div className="text-3xl font-light mb-2">100%</div>
            <div className="text-sm text-zinc-500 uppercase tracking-wide">Exclusive Focus</div>
          </div>
        </div>
      </div>
    </section>
  );
}
