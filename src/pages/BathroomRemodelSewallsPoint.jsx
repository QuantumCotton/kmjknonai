import { createTreasureCoastLandingPage } from './TreasureCoast/constants.js'

const BathroomRemodelSewallsPoint = createTreasureCoastLandingPage({
  componentName: 'BathroomRemodelSewallsPoint',
  cityName: "Sewall's Point",
  serviceType: 'Bathroom Renovation',
  metaTitle: "Sewall's Point, FL Bathroom Renovation | KMJK Home Improvement",
  hero: {
    badge: "Sewall's Point, FL • Luxury Bathrooms",
    heading: "Sewall's Point Bathroom Renovations With Resort-Level Calm",
    subheading: 'Embrace spa serenity with KMJK. We handle design, permitting, and installation with concierge-level care for Treasure Coast homeowners.',
    backgroundImage: new URL('../../../pics/bathroom/bai_11-uXYAcnvq.jpg', import.meta.url).href,
    backgroundPosition: 'center 38%',
    alt: "Sewall's Point bathroom renovation with walk-in shower and natural light",
    tagline: 'Treasure Coast • Luxury Bathrooms • KMJK',
  },
  statHighlights: [
    { value: '250+', label: 'Luxury Baths Delivered' },
    { value: '24/7', label: 'Project Updates' },
    { value: '21', label: 'Day Average Build' },
    { value: '100%', label: 'Licensed & Insured' },
  ],
  intro: {
    title: "Bathrooms Crafted for Sewall's Point Living",
    paragraphs: [
      "From steam showers overlooking the St. Lucie River to guest suites tailored for seasonal visitors, KMJK turns Sewall's Point bathrooms into personal sanctuaries. Our planners coordinate every material and trade so you can enjoy the transformation without the oversight stress.",
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
      quote: 'We trusted KMJK with our Sewall\'s Point remodel while we were up north. The project app and daily photo updates made it stress-free. We came back to a completely transformed space.',
      author: 'Thomas & Linda H., Sewall\'s Point',
      detail: 'Full Spa Retreat • $58k • 3.5 Weeks',
      rating: 5,
    },
  ],
  serviceArea: {
    title: `Where We Renovate in Sewall's Point`,
    description: `Serving Sewall's Point estates, waterfront residences, and historic properties with tailored bathroom renovations.`,
    items: [
      "South Sewall's Point",
      'High Point',
      'Mandarin Isle',
      'Archipelago',
      'River Crest',
    ],
  },
  caseStudies: [
    {
      title: 'Historic Riverfront Bath Renewal',
      location: "Sewall's Point, FL",
      description: 'Converted a cramped bath into a light-filled suite with curbless shower, integrated bench, and custom inset cabinetry matching the historic home.',
      metrics: ['Curbless marble shower', 'Integrated teak bench', 'Preserved millwork details'],
      image: new URL('../../../pics/bathroom/bai_11-uXYAcnvq.jpg', import.meta.url).href,
      alt: "Historic Sewall's Point bathroom with curbless shower and teak bench",
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
    heading: `Design your Sewall's Point spa sanctuary with KMJK`,
    subheading: 'Schedule a consultation with Chris to review layouts, materials, and project investment options.',
  },
})

export default BathroomRemodelSewallsPoint
