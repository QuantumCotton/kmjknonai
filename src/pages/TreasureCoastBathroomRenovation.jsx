const bathroomHero = new URL(
  '../../../pics/bathroom/xiCgKIVMEJzO-ErVzbRzk.jpg',
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

const bathroomStats = [
  { value: '250+', label: 'Luxury Baths Delivered' },
  { value: '15+', label: 'Years Designing + Building' },
  { value: '98%', label: 'Client Referral Rate' },
  { value: '21', label: 'Day Average Build' },
]

const bathroomFaqs = [
  {
    question: 'How long does a bathroom renovation take on the Treasure Coast?',
    answer: 'Most Treasure Coast bathroom remodels wrap in 3–4 weeks once materials are on site. Powder rooms and refresh projects can finish in under two weeks.',
  },
  {
    question: 'Do you help with finish selections for bathroom projects?',
    answer: 'Yes. Our designer curates tile, plumbing, lighting, and hardware packages so you can sign off on every detail before demo begins.',
  },
  {
    question: 'Can you remodel while we are out of state?',
    answer: 'Absolutely. We coordinate key handoff, provide daily photo updates, and manage inspections so seasonal residents can return to a finished spa retreat.',
  },
  {
    question: 'Do you handle permits for bathroom renovations?',
    answer: 'Yes, we handle all necessary permits and inspections for plumbing, electrical, and structural changes required for your bathroom renovation.',
  },
]

const bathroomSellingPoints = [
  {
    title: 'Spa-Level Design & Finish',
    items: [
      'Floor-to-ceiling tile, steam showers, and soaking tubs matched to your home style',
      'Vanity and lighting plans curated by KMJK\'s in-house designer',
      'Impact-rated windows, ventilation, and waterproofing engineered for coastal humidity',
      'Fixture packages from Brizo, Kohler, Delta, and more with concierge selection support',
    ],
  },
  {
    title: 'A Clean, Organized Build',
    items: [
      'Personal project manager providing daily updates—even if you are seasonal residents',
      'Dust control, floor coverings, and HEPA filtration keep the rest of your home pristine',
      'Licensed trades for plumbing, electrical, and glass installation',
      'Punch list walkthrough and white-glove turnover to ensure every detail is perfect',
    ],
  },
]

const bathroomPricing = [
  {
    name: 'Signature Refresh',
    range: '$18k - $32k',
    monthly: '$725/mo',
    features: [
      'Tile surround, new vanity + quartz top',
      'Updated plumbing & lighting fixtures',
      'Professional painting & glass upgrades',
      '1-week turnaround with meticulous clean-up',
    ],
  },
  {
    name: 'Full Spa Retreat',
    range: '$38k - $62k',
    monthly: '$1,495/mo',
    features: [
      'Custom tile shower systems with linear drains',
      'Freestanding tubs or built-in bench seating',
      'Heated floors, niches, and luxury hardware',
      'Dedicated project coordinator + designer',
    ],
  },
  {
    name: 'Elite Primary Suite',
    range: '$70k+',
    monthly: '$2,450/mo',
    features: [
      'Layout reconfiguration with structural moves and new plumbing routes',
      'Custom vanities built by KMJK cabinetmakers',
      'Smart lighting, AV integration, and automated shades',
      'Post-project maintenance kit + seasonal check-ins',
    ],
  },
]

const bathroomTestimonials = [
  {
    quote: 'Our Stuart bathroom transformation created the spa retreat we always wanted. The team handled every detail with precision and the results are absolutely stunning.',
    author: 'The Thompson Family, Stuart',
    detail: 'Full Spa Retreat • $48k • 3 Weeks',
    rating: 5,
  },
  {
    quote: 'KMJK managed our Palm City master bath remodel around our schedule perfectly. The craftsmanship is exquisite and the new steam shower is incredible.',
    author: 'Maria & Carlos S., Palm City',
    detail: 'Elite Primary Suite • $85k • 4 Weeks',
    rating: 5,
  },
  {
    quote: 'From our Hutchinson Island condo guest bath to the master suite, every detail was perfect. The coordination with building management was seamless.',
    author: 'Lisa & Michael T., Hutchinson Island',
    detail: 'Multiple Baths • $125k • 5 Weeks',
    rating: 5,
  },
]

const bathroomCaseStudies = [
  {
    title: 'Stuart Master Spa Retreat',
    location: 'Stuart, FL',
    description: 'Created a luxury spa bathroom with steam shower, heated floors, and ocean-inspired tile work that complements the coastal lifestyle.',
    metrics: ['Steam shower system', 'Heated flooring', 'Custom storage solutions'],
    image: bathroomHero,
    alt: 'Stuart luxury bathroom with steam shower and coastal tile',
  },
  {
    title: 'Palm City Guest Suite Refresh',
    location: 'Palm City, FL',
    description: 'Transformed a dated bathroom into a modern guest suite with large-format tile, frameless glass, and custom vanity with quartz countertops.',
    metrics: ['Large-format tile', 'Frameless glass', 'Custom vanity'],
    image: bathroomHero,
    alt: 'Palm City modern guest bathroom with custom vanity',
  },
]

export default function TreasureCoastBathroomRenovation() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bathroomHero})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
            Treasure Coast • Luxury Bathrooms • Projects from $18k+
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Treasure Coast Bathroom</h1>
          <p className="text-xl opacity-90 mb-8">
            Luxury bathroom design and construction with spa-level finishes. 
            From Stuart to Hutchinson Island, we create personal sanctuaries built for coastal living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--brushed-bronze)] transition-colors">
              Schedule Free Bathroom Consultation
            </button>
            <button className="bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[var(--deep-charcoal)] transition-colors">
              View Bathroom Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {bathroomStats.map((stat, index) => (
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
            Bathrooms Crafted for Treasure Coast Living
          </h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              From steam showers overlooking the Atlantic to guest suites tailored for seasonal visitors, 
              KMJK turns Treasure Coast bathrooms into personal sanctuaries. Our planners coordinate every 
              material and trade so you can enjoy the transformation without the oversight stress.
            </p>
            <p>
              Expect transparent communication, protected job sites, and craftsmanship that stands up to 
              coastal conditions. We deliver magazine-worthy finishes inside tidy, organized project timelines 
              that respect your home and schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Selling Points */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {bathroomSellingPoints.map((section, index) => (
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
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-12">Bathroom Investment Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {bathroomPricing.map((tier, index) => (
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
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-12">Featured Treasure Coast Bathrooms</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {bathroomCaseStudies.map((caseStudy, index) => (
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
            {bathroomTestimonials.map((testimonial, index) => (
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
            Proudly transforming bathrooms throughout Martin and St. Lucie counties
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
            {bathroomFaqs.map((faq, index) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Design Your Treasure Coast Bathroom?</h2>
          <p className="text-xl opacity-90 mb-8">
            Schedule a complimentary consultation with Chris to review layouts, materials, and project investment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--brushed-bronze)] transition-colors">
              Schedule Free Bathroom Consultation
            </button>
            <button className="bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[var(--deep-charcoal)] transition-colors">
              Download Bathroom Planning Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
