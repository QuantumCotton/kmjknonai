const kitchenHero = new URL(
  '../../../pics/kitchen/Contemporary Kitchen Remodel with Modern Finishes – West Seattle.png',
  import.meta.url
).href

const treasureCoastNeighborhoods = [
  'Stuart',
  'Palm City', 
  'Jensen Beach',
  'Sewall\'s Point',
  'Hutchinson Island',
  'Sailfish Point',
  'Port St. Lucie',
  'Hobe Sound',
  'Indiantown',
  'Fort Pierce'
]

const kitchenStats = [
  { value: '300+', label: 'Treasure Coast Kitchens' },
  { value: '15+', label: 'Years Designing + Building' },
  { value: '98%', label: 'Client Referral Rate' },
  { value: '0', label: 'Budget Surprises' },
]

const kitchenFaqs = [
  {
    question: 'How far out are you booking kitchen remodels on the Treasure Coast?',
    answer: 'We typically schedule new kitchen projects 6–8 weeks out. Stuart and Palm City clients can often reserve a start date sooner when selections are finalized quickly.',
  },
  {
    question: 'Do you handle HOA approvals and condo logistics for island kitchens?',
    answer: 'Yes. KMJK manages HOA/ARB submissions, elevator reservations, and impact-rated materials so your condo or club remodel stays compliant and on schedule.',
  },
  {
    question: 'Can you coordinate appliances and specialty vendors?',
    answer: 'Absolutely. We source and receive appliances, stone, and millwork, then coordinate deliveries, installation, and warranty documentation for a seamless handoff.',
  },
  {
    question: 'Do you offer design services for kitchen layouts?',
    answer: 'Yes. Our in-house designer creates mood boards, 3D layouts, and material packages tailored to your cooking style and home architecture.',
  },
]

const kitchenSellingPoints = [
  {
    title: 'Design That Reflects Your Lifestyle',
    items: [
      'Designer mood boards and layout previews tailored to your Treasure Coast home',
      'Appliance, cabinet, and surface guidance that fits your cooking style',
      'Dedicated design concierge to coordinate selections and deliveries',
      'Coastal-inspired palettes that stand up to salt air and humidity',
    ],
  },
  {
    title: 'Construction Without the Chaos',
    items: [
      'Fixed schedule with daily progress updates from your project manager',
      'Protective dust walls and floor coverings for spotless living areas',
      'KMJK-employed craftsmen—no revolving door of subcontractors',
      'Licensed, insured, and approved for gated Treasure Coast communities',
    ],
  },
]

const kitchenPricing = [
  {
    name: 'Signature Refresh',
    range: '$25k - $45k',
    monthly: '$975/mo',
    features: [
      'Cabinet refinishing or partial replacement',
      'Quartz countertops & designer backsplash',
      'Updated lighting + plumbing fixtures',
      'Appliance relocation and flooring touch-ups',
    ],
  },
  {
    name: 'Full Custom Remodel',
    range: '$55k - $95k',
    monthly: '$2,275/mo',
    features: [
      'Fully custom cabinetry with soft-close storage features',
      'Waterfall islands, hidden pantries, and beverage stations',
      'Professional-grade appliance integration',
      'Dedicated on-site manager with milestone walkthroughs',
    ],
  },
  {
    name: 'Elite Chef Suite',
    range: '$110k+',
    monthly: '$3,850/mo',
    features: [
      'Exotic stone, metal, or glass cabinetry accents',
      'Indoor-outdoor passthroughs with impact-rated openings',
      'Smart lighting, AV, and automation for entertaining',
      'White-glove clean-up and maintenance guide upon completion',
    ],
  },
]

const kitchenTestimonials = [
  {
    quote: 'KMJK took our 1990s Stuart kitchen down to the studs and delivered a modern layout that finally fits how we cook and entertain. Every promise was kept and every surface is flawless.',
    author: 'The Ramirez Family, Stuart',
    detail: 'Full Custom Kitchen • $138k • 6 Weeks',
    rating: 5,
  },
  {
    quote: 'Our Palm City kitchen renovation exceeded expectations. The team respected our timeline and budget while delivering luxury finishes that make our home feel brand new.',
    author: 'Jennifer & David R., Palm City',
    detail: 'Signature Refresh • $42k • 4 Weeks',
    rating: 5,
  },
  {
    quote: 'Condo logistics, elevator schedules, and parking restrictions were handled flawlessly. KMJK transformed our Hutchinson Island kitchen without disturbing neighbors or the ocean view.',
    author: 'Denise & Robert K., Hutchinson Island',
    detail: 'Full Custom Kitchen • $118k • 5 Weeks',
    rating: 5,
  },
]

const kitchenCaseStudies = [
  {
    title: 'Stuart Waterfront Chef Kitchen',
    location: 'Stuart, FL',
    description: 'Removed structural walls to open the river view, added a 14-foot waterfall island, and integrated a hidden walk-in pantry behind custom paneling.',
    metrics: ['6-week completion', 'Marine-grade finishes', 'Integrated lighting + automation'],
    image: kitchenHero,
    alt: 'Stuart waterfront kitchen renovation with large island and pendant lighting',
  },
  {
    title: 'Palm City Entertainer Kitchen',
    location: 'Palm City, FL',
    description: 'Designed a dual-island layout with custom cabinetry, integrated wine tower, and professional-grade appliances for serious home cooks.',
    metrics: ['Dual island design', 'Custom cabinetry', 'Professional appliances'],
    image: kitchenHero,
    alt: 'Palm City luxury kitchen with dual islands and high-end appliances',
  },
]

export default function TreasureCoastKitchenRenovation() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${kitchenHero})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
            Treasure Coast • Custom Kitchens • Projects from $25k+
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Treasure Coast Kitchen</h1>
          <p className="text-xl opacity-90 mb-8">
            Custom kitchen design and construction with concierge service. 
            From Stuart to Hutchinson Island, we deliver culinary spaces built for coastal living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--brushed-bronze)] transition-colors">
              Schedule Free Kitchen Consultation
            </button>
            <button className="bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[var(--deep-charcoal)] transition-colors">
              View Kitchen Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {kitchenStats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-[var(--deep-charcoal)] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[var(--deep-charcoal)] mb-6">
            Kitchens Crafted for Treasure Coast Living
          </h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              From morning coffee rituals to sunset dinner parties, your Treasure Coast kitchen deserves 
              purposeful flow, premium materials, and craftsmanship that lasts. KMJK handles every 
              detail—from HOA approvals to appliance delivery—so you can stay focused on life while we transform your space.
            </p>
            <p>
              Our in-house designers, cabinetmakers, and field supervisors collaborate under one roof, 
              eliminating finger-pointing and change-order games. Text or email your wish list and current kitchen photos 
              so we can stage samples, confirm logistics, and align pricing before we step on site.
            </p>
          </div>
        </div>
      </section>

      {/* Selling Points */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {kitchenSellingPoints.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-[var(--deep-charcoal)] mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-[var(--brushed-gold)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-12">Kitchen Investment Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {kitchenPricing.map((tier, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-[var(--deep-charcoal)] mb-2">{tier.name}</h3>
                <div className="text-2xl font-bold text-[var(--brushed-gold)] mb-2">{tier.range}</div>
                <div className="text-sm text-gray-600 mb-4">or {tier.monthly}</div>
                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 bg-[var(--brushed-gold)] rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-12">Featured Treasure Coast Kitchens</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {kitchenCaseStudies.map((caseStudy, index) => (
              <div key={index} className="space-y-4">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--deep-charcoal)] mb-2">{caseStudy.title}</h3>
                  <p className="text-gray-600 mb-3">{caseStudy.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.metrics.map((metric, metricIndex) => (
                      <span key={metricIndex} className="bg-[var(--warm-off-white)] px-3 py-1 rounded-full text-sm text-gray-700">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-12">
            Treasure Coast Homeowners Share Their Experience
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kitchenTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex mb-3 text-[var(--brushed-gold)] text-xl">{'★'.repeat(testimonial.rating)}</div>
                <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600">{testimonial.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-8">
            Serving the Entire Treasure Coast
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8">
            Proudly transforming kitchens throughout Martin and St. Lucie counties
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {treasureCoastNeighborhoods.map((area, index) => (
              <div key={index} className="text-center text-gray-700 font-medium">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {kitchenFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-[var(--deep-charcoal)] mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[var(--deep-charcoal)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Design Your Treasure Coast Kitchen?</h2>
          <p className="text-xl opacity-90 mb-8">
            Schedule a complimentary consultation with Chris to review layouts, materials, and project investment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--brushed-bronze)] transition-colors">
              Schedule Free Kitchen Consultation
            </button>
            <button className="bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[var(--deep-charcoal)] transition-colors">
              Download Kitchen Planning Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
