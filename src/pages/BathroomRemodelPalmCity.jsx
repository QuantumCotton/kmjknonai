import { createTreasureCoastLandingPage } from './TreasureCoast/constants.js'

const BathroomRemodelPalmCity = createTreasureCoastLandingPage({
  componentName: 'BathroomRemodelPalmCity',
  cityName: 'Palm City',
  serviceType: 'Bathroom Renovation',
  metaTitle: 'Palm City, FL Bathroom Renovation | KMJK Home Improvement',
  hero: {
    badge: 'Palm City, FL • Luxury Bathrooms',
    heading: 'Palm City Bathroom Renovations With Resort-Level Calm',
    subheading: 'Embrace spa serenity with KMJK. We handle design, permitting, and installation with concierge-level care for Treasure Coast homeowners.',
    backgroundImage: new URL('../../../pics/bathroom/Spa-Inspired Walk-In Shower Remodel – West Seattle.png', import.meta.url).href,
    backgroundPosition: 'center 40%',
    alt: 'Palm City luxury bathroom with freestanding tub and custom vanity',
    tagline: 'Treasure Coast • Luxury Bathrooms • KMJK',
  },
  statHighlights: [
    { value: '250+', label: 'Luxury Baths Delivered' },
    { value: '24/7', label: 'Project Updates' },
    { value: '21', label: 'Day Average Build' },
    { value: '100%', label: 'Licensed & Insured' },
  ],
  intro: {
    title: 'Bathrooms Crafted for Palm City Living',
    paragraphs: [
      'From steam showers overlooking the St. Lucie River to guest suites tailored for seasonal visitors, KMJK turns Palm City bathrooms into personal sanctuaries. Our planners coordinate every material and trade so you can enjoy the transformation without the oversight stress.',
      'Expect transparent communication, protected job sites, and craftsmanship that stands up to coastal conditions. We deliver magazine-worthy finishes inside tidy, organized project timelines.',
    ],
  },
  sellingPoints: [
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
  ],
  pricingOptions: [
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
  ],
  testimonials: [
    {
      quote: 'KMJK converted our dated Palm City bath into a spa we actually look forward to using every day. Communication was constant, the crew was respectful, and the final product is flawless.',
      author: 'Elaine & Martin D., Palm City',
      detail: 'Full Spa Retreat • $54k • 3 Weeks',
      rating: 5,
    },
  ],
  serviceArea: {
    title: 'Where We Renovate in Palm City',
    description: 'Serving Palm City estates, waterfront residences, and private golf communities with tailored bathroom renovations.',
    items: [
      'Palm City Farms',
      'The Evergreen Club',
      'Harbour Ridge Yacht & Country Club',
      'Copperleaf',
      'Monarch Golf & Country Club',
      'Orchid Bay',
    ],
  },
  caseStudies: [
    {
      title: 'Palm Cove Primary Suite Spa',
      location: 'Palm City, FL',
      description: 'Expanded a builder-grade bathroom into a steam shower retreat with heated floors, backlit mirrors, and custom rift-oak vanity cabinetry.',
      metrics: ['Steam shower with aromatherapy', 'Heated flooring throughout', 'Quartz waterfall vanity'],
      image: new URL('../../../pics/bathroom/Spa-Inspired Walk-In Shower Remodel – West Seattle.png', import.meta.url).href,
      alt: 'Palm City spa bathroom with glass steam shower and heated floors',
    },
  ],
  faqs: [
    {
      question: 'How long does a KMJK bathroom renovation typically take?',
      answer: 'Most Treasure Coast bathroom remodels wrap in 3–4 weeks once materials are on site. Powder rooms and refresh projects can finish in under two weeks.',
    },
    {
      question: 'Do you help with finish selections for the project?',
      answer: 'Yes. Our designer curates tile, plumbing, lighting, and hardware packages so you can sign off on every detail before demo begins.',
    },
    {
      question: 'Can you remodel while we are out of state?',
      answer: 'Absolutely. We coordinate key handoff, provide daily photo updates, and manage inspections so seasonal residents can return to a finished spa retreat.',
    },
  ],
  relatedLinks: [
    { label: 'Palm City Kitchen Renovation', href: '/palm-city-kitchen-renovation' },
    { label: 'Treasure Coast Handyman Concierge', href: '/palm-city-handyman-services' },
    { label: 'Hutchinson Island Epoxy Floors', href: '/hutchinson-island-epoxy-flooring' },
  ],
  finalCta: {
    heading: 'Design your Palm City spa sanctuary with KMJK',
    subheading: 'Schedule a consultation with Chris to review layouts, materials, and project investment options.',
  },
})

export default BathroomRemodelPalmCity
