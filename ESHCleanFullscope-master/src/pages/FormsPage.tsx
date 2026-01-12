import { ArrowUpRight, Download, FileText } from 'lucide-react';

const forms = [
  {
    title: 'Service Partner Application',
    description:
      'Apply to become the exclusive Elite Service Hub partner in your market. Covers remodelers, cleaning services, pressure washers, auto detailers, mobile mechanics, and other elite service pros.',
    href: '/contractor-application-form.html',
    category: 'Partner Onboarding',
    cta: 'Apply Now',
  },
  {
    title: 'Brand Assets & Media Intake',
    description:
      'Collect logos, media, testimonials, and messaging pillars so our creative team can keep every website, ad, and deck on-brand.',
    href: '/forms/brand-assets-intake.html',
    category: 'Marketing Foundations',
    cta: 'Open Intake',
  },
  {
    title: 'Growth & Financing Canvas',
    description:
      'Map revenue targets, capital strategy, hiring roadmap, and service expansion plans for the next 12–36 months.',
    href: '/forms/growth-and-financing-canvas.html',
    category: 'Strategic Planning',
    cta: 'Open Canvas',
  },
  {
    title: 'Digital Launch Checklist',
    description:
      'Step-by-step QA to launch landing pages, chatbots, ads, and payment workflows with zero gaps.',
    href: '/forms/digital-launch-checklist.html',
    category: 'Go-Live Playbook',
    cta: 'Open Checklist',
  },
  {
    title: 'Neighborhood & Keyword Mapping',
    description:
      'Document priority neighborhoods, search intent, referral partners, and seasonal triggers to localize campaigns.',
    href: '/forms/neighborhood-and-keyword-mapping.html',
    category: 'Market Intelligence',
    cta: 'Open Worksheet',
  },
];

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-zinc-800 bg-black/40 uppercase tracking-[0.3em] text-xs text-zinc-400">
            <FileText size={16} className="text-esh-gold" />
            Forms Library
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">
            Tools for Elite Service Partners
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
            Access intake packets, launch checklists, and market planning worksheets. Each resource follows the Elite Service Hub aesthetic and supports contractors, cleaning crews, detailers, and mobile service operators alike.
          </p>
        </div>
      </section>

      {/* Forms Grid */}
      <section className="py-24 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {forms.map((form) => (
              <article
                key={form.title}
                className="relative border border-zinc-800 bg-black/40 hover:border-esh-gold transition-all duration-300 p-8 flex flex-col"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4">
                  {form.category}
                </span>
                <h2 className="text-2xl font-light font-serif mb-4 text-white">
                  {form.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed flex-1">{form.description}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={form.href}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-esh-gold text-esh-gold uppercase tracking-[0.2em] text-xs hover:bg-esh-gold hover:text-black transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={16} />
                    {form.cta}
                  </a>
                  <a
                    href={form.href}
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Preview <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
