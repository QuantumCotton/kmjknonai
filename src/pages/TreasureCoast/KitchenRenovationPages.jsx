import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'
const palmCityKitchenHero = new URL(
  '../../../pics/kitchen/Contemporary Kitchen Remodel with Modern Finishes – West Seattle.png',
  import.meta.url
).href
const sailfishPointKitchenHero = new URL(
  '../../../pics/kitchen/Contemporary Kitchen Remodel with Modern Finishes – West Seattle.png',
  import.meta.url
).href
const sewallsPointKitchenHero = new URL('../../../pics/kitchen/3K4vyXWior7q-BKCyA90P.jpeg', import.meta.url).href
const hutchinsonIslandKitchenHero = new URL('../../../pics/kitchen/hp_16-C7ix_NF5.jpg', import.meta.url).href

const kitchenRelatedLinks = [
  { label: 'Palm City Bathroom Renovation', href: '/palm-city-bathroom-renovation' },
  { label: 'Treasure Coast Handyman Plans', href: '/palm-city-handyman-services' },
  { label: 'Sailfish Point TV Mounting', href: '/sailfish-point-tv-mounting' },
]

const kitchenFaqs = [
  {
    question: 'How far out are you booking kitchen remodels on the Treasure Coast?',
    answer:
      'We typically schedule new kitchen projects 6–8 weeks out. Palm City and Sailfish Point clients can often reserve a start date sooner when selections are finalized quickly.',
  },
  {
    question: 'Do you handle HOA approvals and condo logistics for island kitchens?',
    answer:
      'Yes. KMJK manages HOA/ARB submissions, elevator reservations, and impact-rated materials so your condo or club remodel stays compliant and on schedule.',
  },
  {
    question: 'Can you coordinate appliances and specialty vendors?',
    answer:
      'Absolutely. We source and receive appliances, stone, and millwork, then coordinate deliveries, installation, and warranty documentation for a seamless handoff.',
  },
]

const kitchenStats = [
  { value: '300+', label: 'Treasure Coast Kitchens' },
  { value: '15+', label: 'Years Designing + Building' },
  { value: '98%', label: 'Client Referral Rate' },
  { value: '0', label: 'Budget Surprises' },
]

const kitchenSellingPoints = [
  {
    title: 'Design That Reflects Your Lifestyle',
    items: [
      'Designer mood boards and layout previews tailored to your Palm City or island home',
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
    name: 'Resurfacing',
    range: '$3,500',
    monthly: '$150/mo',
    features: [
      'Cabinet refacing with new doors and hardware',
      'Countertop resurfacing or replacement',
      'Updated backsplash tile',
      'Minor fixture updates',
    ],
  },
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

const buildKitchenPage = ({
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
    componentName: `KitchenRenovation${cityName.replace(/\s/g, '')}`,
    cityName,
    serviceType: 'Kitchen Renovation',
    metaTitle: `${cityName}, FL Kitchen Renovation | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • Custom Kitchens`,
      heading: `${cityName}'s Luxury Kitchen Renovation Team`,
      subheading:
        'Experience concierge design-build service with curated layout previews, fixed budgets, and craftsman finishes built for Treasure Coast living.',
      backgroundImage: heroImage,
      backgroundPosition: heroPosition,
      alt: heroAlt,
      tagline: 'Treasure Coast • Custom Kitchens • KMJK',
      note:
        heroNote ||
        'Text Chris kitchen photos or measurements so we can prep cabinetry samples and pricing ranges before your consultation.',
    },
    statHighlights: kitchenStats,
    intro: {
      title: `Kitchens Crafted for ${cityName} Families`,
      paragraphs: [
        `From morning coffee rituals to sunset dinner parties, your ${cityName} kitchen deserves purposeful flow, premium materials, and craftsmanship that lasts. KMJK handles every detail—from HOA approvals to appliance delivery—so you can stay focused on life while we transform your space.`,
        'Our in-house designers, cabinetmakers, and field supervisors collaborate under one roof, eliminating finger-pointing and change-order games. Text or email your wish list and current kitchen photos so we can stage samples, confirm logistics, and align pricing before we step on site.',
      ],
    },
    sellingPoints: kitchenSellingPoints,
    pricingOptions: kitchenPricing,
    testimonials: [testimonial],
    serviceArea: {
      title: `Where We Renovate in ${cityName}`,
      description: `We deliver showpiece kitchens for discerning homeowners throughout ${cityName} and the Greater Treasure Coast.`,
      items: neighborhoods,
    },
    finalCta: {
      heading: `Ready to design your ${cityName} kitchen?`,
      subheading: 'Book a complimentary in-home consultation. Share photos and dimensions for tailored pricing and sample prep.',
    },
    caseStudies,
    faqs: kitchenFaqs,
    relatedLinks: kitchenRelatedLinks,
  })

const treasureCoastKitchenHero = new URL(
  '../../../pics/kitchen/Contemporary Kitchen Remodel with Modern Finishes – West Seattle.png',
  import.meta.url
).href

export const KitchenRenovationTreasureCoast = buildKitchenPage({
  cityName: 'Treasure Coast',
  heroImage: treasureCoastKitchenHero,
  heroAlt: 'Contemporary Treasure Coast kitchen with modern finishes and coastal design',
  heroPosition: 'center center',
  heroNote:
    'Share Treasure Coast kitchen photos or layout notes with our concierge desk so we can stage marine-grade finishes and coastal-ready logistics.',
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
      'KMJK transformed our Stuart kitchen into the perfect space for family gatherings. The team handled everything from design to final installation with incredible attention to detail.',
    author: 'The Martinez Family, Stuart',
    detail: 'Full Custom Kitchen • $85k • 6 Weeks',
  },
  caseStudies: [
    {
      title: 'Jensen Beach Coastal Kitchen',
      location: 'Jensen Beach, FL',
      description:
        'Created a beach-inspired kitchen with custom cabinetry, quartz countertops, and a large island perfect for entertaining while maintaining coastal durability.',
      metrics: ['Marine-grade finishes', 'Custom island seating', 'Coastal lighting design'],
      image: treasureCoastKitchenHero,
      alt: 'Jensen Beach kitchen renovation with coastal design and large island',
    },
  ],
})

export const KitchenRenovationPalmCity = buildKitchenPage({
  cityName: 'Palm City',
  heroImage: palmCityKitchenHero,
  heroAlt: 'Palm City kitchen renovation with quartz waterfall island and custom cabinetry',
  heroPosition: 'center center',
  heroNote:
    'Text Chris your Palm City kitchen photos or measurements so we can queue cabinetry samples and tiered pricing before we arrive.',
  neighborhoods: [
    'Monarch Country Club',
    'Palm Cove Golf & Yacht Club',
    'Harbour Ridge',
    'Copperleaf',
    'Highlands Reserve',
    'Hidden Bay',
  ],
  testimonial: {
    quote:
      'KMJK took our 1990s Palm City kitchen down to the studs and delivered a modern layout that finally fits how we cook and entertain. Every promise was kept and every surface is flawless.',
    author: 'The Ramirez Family, Palm City',
    detail: 'Full Custom Kitchen • $138k • 6 Weeks',
  },
  caseStudies: [
    {
      title: 'Palm Cove Waterfront Chef Kitchen',
      location: 'Palm City, FL',
      description:
        'Removed structural walls to open the river view, added a 14-foot waterfall island, and integrated a hidden walk-in pantry behind custom paneling.',
      metrics: ['6-week completion', 'Marine-grade finishes', 'Integrated lighting + automation'],
      image: palmCityKitchenHero,
      alt: 'Palm Cove waterfront kitchen renovation with large island and pendant lighting',
    },
  ],
})

export const KitchenRenovationSailfishPoint = buildKitchenPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointKitchenHero,
  heroAlt: 'Contemporary Sailfish Point kitchen with wood beams, modern pendants, and sleek cabinetry',
  heroPosition: 'center 35%',
  heroNote:
    'Share Sailfish Point kitchen photos or layout notes with our concierge desk so we can stage marine-grade finishes and HOA-ready logistics.',
  neighborhoods: [
    'Sailfish Point Oceanfront Residences',
    'Sailfish Point Marina Villas',
    'Sailfish Point Golf Estates',
    'Sailfish Point Club Cottages',
  ],
  testimonial: {
    quote:
      'Salt air and humidity were destroying our old cabinets. KMJK engineered marine-grade finishes that look incredible and perform even better. The coordination with the HOA was seamless.',
    author: 'Anabeth & Colin R., Sailfish Point',
    detail: 'Elite Chef Suite • $212k • 8 Weeks',
  },
  caseStudies: [
    {
      title: 'Oceanfront Entertainer Kitchen',
      location: 'Sailfish Point, FL',
      description:
        'Designed a dual-island layout with marine-rated cabinetry, integrated wine tower, and telescoping doors to the lanai for effortless entertaining.',
      metrics: ['HOA approvals managed', 'Outdoor passthrough station', 'Custom Control4 integration'],
      image: sailfishPointKitchenHero,
      alt: 'Contemporary Sailfish Point kitchen renovation with vaulted ceiling beams and a spacious island',
    },
  ],
})

export const KitchenRenovationSewallsPoint = buildKitchenPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointKitchenHero,
  heroAlt: 'Sewall’s Point kitchen featuring coastal white cabinetry and rattan stools',
  heroPosition: 'center 40%',
  heroNote:
    'Send inspiration photos or existing layout images so we can respect your Sewall’s Point architecture while planning cabinetry and finishes.',
  neighborhoods: [
    "South Sewall's Point",
    'High Point',
    'River Crest',
    "Mandarin Isle",
    "North Sewall's Point",
  ],
  testimonial: {
    quote:
      'Our historic Sewall’s Point home needed a kitchen respectful of its character. KMJK blended inset cabinetry, coastal hues, and modern function beautifully.',
    author: 'Marianne & Victor L., Sewall’s Point',
    detail: 'Signature Refresh • $62k • 4 Weeks',
  },
  caseStudies: [
    {
      title: 'Historic Coastal Refresh',
      location: "Sewall's Point, FL",
      description:
        'Preserved original millwork while upgrading to inset cabinetry, honed quartzite counters, and a concealed coffee pantry.',
      metrics: ['Original wood floors refinished', 'Custom inset cabinetry', 'Discreet appliance garages'],
      image: sewallsPointKitchenHero,
      alt: 'Historic Sewall’s Point kitchen with inset cabinetry and quartzite counters',
    },
  ],
})

export const KitchenRenovationHutchinsonIsland = buildKitchenPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandKitchenHero,
  heroAlt: 'Hutchinson Island condo kitchen with ocean-view breakfast bar',
  heroPosition: 'center 45%',
  heroNote:
    'Upload condo kitchen photos or measurements so we can coordinate elevator timing and salt-air safe finishes for Hutchinson Island installs.',
  neighborhoods: [
    'Ocean Club',
    'Inlet Village',
    'Plantation Beach Club',
    'Sandpebble Oceanside',
    'Marriott Resort Villas',
    'Harbour Isle',
  ],
  testimonial: {
    quote:
      'Condo logistics, elevator schedules, and parking restrictions were handled flawlessly. KMJK transformed our island kitchen without disturbing neighbors or the view.',
    author: 'Denise & Robert K., Hutchinson Island',
    detail: 'Full Custom Kitchen • $118k • 5 Weeks',
  },
  caseStudies: [
    {
      title: 'Ocean Village Penthouse Kitchen',
      location: 'Hutchinson Island, FL',
      description:
        'Optimized condo layout with mirrored pantry wall, backlit glass shelving, and a bi-fold window bar to capture the Atlantic breeze.',
      metrics: ['Condo elevator coordination', 'Backlit glass shelving', 'Quartzite bar with seating for six'],
      image: hutchinsonIslandKitchenHero,
      alt: 'Hutchinson Island penthouse kitchen with ocean-facing bar seating',
    },
  ],
})
