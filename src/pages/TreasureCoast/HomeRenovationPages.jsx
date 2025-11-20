import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'

const treasureCoastHomeHero = new URL(
  '../../../pics/kitchen/hp_16-C7ix_NF5.jpg',
  import.meta.url
).href

const homeRenovationRelatedLinks = [
  { label: 'Treasure Coast Kitchen Renovation', href: '/treasure-coast-kitchen-renovation' },
  { label: 'Treasure Coast Bathroom Renovation', href: '/treasure-coast-bathroom-renovation' },
  { label: 'Treasure Coast Handyman Concierge', href: '/palm-city-handyman-services' },
]

const homeRenovationFaqs = [
  {
    question: 'How long does a complete home renovation take on the Treasure Coast?',
    answer:
      'Full home renovations typically take 8–12 weeks depending on scope. Kitchen and bathroom packages can be completed in 4–6 weeks.',
  },
  {
    question: 'Do you handle permits and HOA approvals for home renovations?',
    answer:
      'Yes. KMJK manages all permits, HOA submissions, and inspections so your renovation stays compliant and on schedule.',
  },
  {
    question: 'Can you renovate while we are out of state?',
    answer:
      'Absolutely. We coordinate key handoff, provide daily photo updates, and manage inspections so seasonal residents can return to a finished home.',
  },
]

const homeRenovationStats = [
  { value: '200+', label: 'Complete Home Renovations' },
  { value: '15+', label: 'Years Designing + Building' },
  { value: '96%', label: 'Client Referral Rate' },
  { value: '0', label: 'Budget Surprises' },
]

const homeRenovationSellingPoints = [
  {
    title: 'Design That Reflects Your Lifestyle',
    items: [
      'Designer mood boards and layout previews tailored to your Treasure Coast home',
      'Kitchen, bathroom, and living space coordination',
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

const homeRenovationPricing = [
  {
    name: 'Resurfacing',
    range: '$3,500',
    monthly: '$150/mo',
    features: [
      'Cabinet refacing with new doors and hardware',
      'Countertop resurfacing or replacement',
      'Shower/tub refinishing',
      'Updated fixtures and lighting',
    ],
  },
  {
    name: 'Kitchen + Bath Package',
    range: '$40k - $80k',
    monthly: '$1,650/mo',
    features: [
      'Complete kitchen renovation with custom cabinetry',
      'Luxury bathroom remodel with spa features',
      'Quartz countertops and designer backsplashes',
      'Updated lighting and plumbing fixtures',
    ],
  },
  {
    name: 'Full Home Renovation',
    range: '$85k - $150k',
    monthly: '$2,850/mo',
    features: [
      'Multiple room renovations with cohesive design',
      'Custom cabinetry and millwork throughout',
      'Flooring, lighting, and fixture updates',
      'Dedicated on-site manager with milestone walkthroughs',
    ],
  },
  {
    name: 'Estate Transformation',
    range: '$175k+',
    monthly: '$4,500/mo',
    features: [
      'Whole-home luxury renovations with premium materials',
      'Custom architectural features and built-ins',
      'Smart home integration and automation',
      'White-glove service and maintenance guide',
    ],
  },
]

const buildHomeRenovationPage = ({
  cityName,
  heroImage,
  heroAlt,
  heroPosition = 'center center',
  neighborhoods,
  testimonial,
  caseStudies,
  heroNote,
}) =>
  createTreasureCoastLandingPage({
    componentName: `HomeRenovation${cityName.replace(/\s/g, '')}`,
    cityName,
    serviceType: 'Home Renovation',
    metaTitle: `${cityName}, FL Home Renovation | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • Complete Home Renovations`,
      heading: `${cityName}'s Luxury Home Renovation Team`,
      subheading:
        'Experience concierge design-build service with curated layout previews, fixed budgets, and craftsman finishes built for Treasure Coast living.',
      backgroundImage: heroImage,
      backgroundPosition: heroPosition,
      alt: heroAlt,
      tagline: 'Treasure Coast • Complete Home Renovations • KMJK',
      note:
        heroNote ||
        'Share Treasure Coast home photos or layout notes with our concierge desk so we can stage marine-grade finishes and coastal-ready logistics.',
    },
    statHighlights: homeRenovationStats,
    intro: {
      title: `Homes Crafted for ${cityName} Families`,
      paragraphs: [
        `From morning coffee rituals to sunset dinner parties, your ${cityName} home deserves purposeful flow, premium materials, and craftsmanship that lasts. KMJK handles every detail—from HOA approvals to appliance delivery—so you can stay focused on life while we transform your space.`,
        'Our in-house designers, cabinetmakers, and field supervisors collaborate under one roof, eliminating finger-pointing and change-order games. Text or email your wish list and current home photos so we can stage samples, confirm logistics, and align pricing before we step on site.',
      ],
    },
    sellingPoints: homeRenovationSellingPoints,
    pricingOptions: homeRenovationPricing,
    testimonials: [testimonial],
    serviceArea: {
      title: `Where We Renovate in ${cityName}`,
      description: `We deliver showpiece renovations for discerning homeowners throughout ${cityName} and the Greater Treasure Coast.`,
      items: neighborhoods,
    },
    finalCta: {
      heading: `Ready to design your ${cityName} home?`,
      subheading: 'Book a complimentary in-home consultation. Share photos and dimensions for tailored pricing and sample prep.',
    },
    caseStudies,
    faqs: homeRenovationFaqs,
    relatedLinks: homeRenovationRelatedLinks,
  })

export const HomeRenovationTreasureCoast = buildHomeRenovationPage({
  cityName: 'Treasure Coast',
  heroImage: treasureCoastHomeHero,
  heroAlt: 'Contemporary Treasure Coast home renovation with modern finishes and coastal design',
  heroPosition: 'center center',
  heroNote:
    'Share Treasure Coast home photos or layout notes with our concierge desk so we can stage marine-grade finishes and coastal-ready logistics.',
  neighborhoods: [
    'Stuart Historic District',
    'Jensen Beach Oceanfront',
    'Palm City Golf Communities',
    'Sewall\'s Point Waterfront',
    'Hutchinson Island Condos',
    'Port St. Lucie Estates',
  ],
  testimonial: {
    quote:
      'KMJK transformed our entire Treasure Coast home with kitchen and bathroom renovations. The team coordinated everything perfectly while we were out of state.',
    author: 'The Martinez Family, Stuart',
    detail: 'Full Home Renovation • $95k • 8 Weeks',
  },
  caseStudies: [
    {
      title: 'Stuart Complete Home Transformation',
      location: 'Stuart, FL',
      description:
        'Renovated entire home with kitchen, bathrooms, and living spaces while maintaining coastal durability and family functionality.',
      metrics: ['Marine-grade finishes', 'Complete home coordination', 'Coastal design elements'],
      image: treasureCoastHomeHero,
      alt: 'Stuart home renovation with kitchen and bathroom updates',
    },
  ],
})
