const homeRenovationHero = new URL(
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

const homeRenovationStats = [
  { value: '500+', label: 'Treasure Coast Homes' },
  { value: '15+', label: 'Years Designing + Building' },
  { value: '98%', label: 'Client Referral Rate' },
  { value: '0', label: 'Budget Surprises' },
]

const homeRenovationFaqs = [
  {
    question: 'Do you handle both kitchen and bathroom renovations together?',
    answer: 'Yes, many clients choose to renovate multiple spaces at once for better pricing and cohesive design. We can coordinate both projects to minimize disruption.',
  },
  {
    question: 'How far out are you booking renovation projects on the Treasure Coast?',
    answer: 'We typically schedule new projects 6–8 weeks out. Stuart and Palm City clients can often reserve a start date sooner when selections are finalized quickly.',
  },
  {
    question: 'Do you handle HOA approvals and condo logistics for island properties?',
    answer: 'Yes. KMJK manages HOA/ARB submissions, elevator reservations, and impact-rated materials so your remodel stays compliant and on schedule.',
  },
  {
    question: 'Can you coordinate appliances and specialty vendors?',
    answer: 'Absolutely. We source and receive appliances, stone, and millwork, then coordinate deliveries, installation, and warranty documentation.',
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

const combinedTestimonials = [
  {
    quote: 'KMJK transformed both our kitchen and master bathroom. The coordination was seamless and the results exceeded our expectations. Our Stuart home feels brand new.',
    author: 'The Martinez Family, Stuart',
    detail: 'Complete Home Renovation • $185k • 8 Weeks',
    rating: 5,
  },
  {
    quote: 'From our Palm City kitchen remodel to the guest bathroom update, every detail was perfect. The team respected our timeline and budget while delivering luxury finishes.',
    author: 'Jennifer & David R., Palm City',
    detail: 'Kitchen + Bath • $142k • 6 Weeks',
    rating: 5,
  },
]

export default function TreasureCoastHomeRenovation() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${homeRenovationHero})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
            Treasure Coast • Complete Home Renovations • Projects from $40k+
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Treasure Coast Home</h1>
          <p className="text-xl opacity-90 mb-8">
            Complete kitchen and bathroom renovations with concierge design-build service. 
            From Stuart to Hutchinson Island, we deliver luxury living spaces built for coastal life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--brushed-bronze)] transition-colors">
              Schedule Free Consultation
            </button>
            <button className="bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[var(--deep-charcoal)] transition-colors">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {homeRenovationStats.map((stat, index) => (
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
            Complete Home Renovations for Treasure Coast Living
          </h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              From morning coffee rituals to sunset dinner parties, your Treasure Coast home deserves 
              purposeful flow, premium materials, and craftsmanship that lasts. KMJK handles every 
              detail—from HOA approvals to appliance delivery—so you can stay focused on life while we transform your space.
            </p>
            <p>
              Our in-house designers, cabinetmakers, and field supervisors collaborate under one roof, 
              eliminating finger-pointing and change-order games. Whether you're updating a single room 
              or renovating your entire home, we deliver magazine-worthy results with organized, stress-free project management.
            </p>
          </div>
        </div>
      </section>

      {/* Kitchen Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--deep-charcoal)] mb-4">Kitchen Renovations</h2>
            <p className="text-xl text-gray-600">
              Custom kitchens designed for how you cook, entertain, and live
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
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

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center text-[var(--deep-charcoal)] mb-8">Kitchen Investment Options</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {kitchenPricing.map((tier, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-[var(--deep-charcoal)] mb-2">{tier.name}</h4>
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
        </div>
      </section>

      {/* Bathroom Section */}
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--deep-charcoal)] mb-4">Bathroom Renovations</h2>
            <p className="text-xl text-gray-600">
              Spa-like retreats designed for relaxation and coastal living
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
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

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center text-[var(--deep-charcoal)] mb-8">Bathroom Investment Options</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {bathroomPricing.map((tier, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-[var(--deep-charcoal)] mb-2">{tier.name}</h4>
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-12">
            Treasure Coast Homeowners Share Their Experience
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {combinedTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
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
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-8">
            Serving the Entire Treasure Coast
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8">
            Proudly transforming homes throughout Martin and St. Lucie counties
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
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {homeRenovationFaqs.map((faq, index) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Treasure Coast Home?</h2>
          <p className="text-xl opacity-90 mb-8">
            Schedule a complimentary consultation with Chris to review layouts, materials, and project investment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--brushed-bronze)] transition-colors">
              Schedule Free Consultation
            </button>
            <button className="bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[var(--deep-charcoal)] transition-colors">
              Download Project Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
