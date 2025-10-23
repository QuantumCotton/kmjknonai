import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'
const palmCityKitchenHero = new URL(
  '../../../pics/kitchen/Contemporary Kitchen Remodel with Modern Finishes – West Seattle.png',
  import.meta.url
).href
const sailfishPointKitchenHero = new URL('../../../pics/kitchen/JRLyuKDlSF7l-CDMJYmNl.jpg', import.meta.url).href
const sewallsPointKitchenHero = new URL('../../../pics/kitchen/3K4vyXWior7q-BKCyA90P.jpeg', import.meta.url).href
const hutchinsonIslandKitchenHero = new URL('../../../pics/kitchen/hp_17-ya0s-vNX.jpg', import.meta.url).href

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
      '3D kitchen renderings tailored to your Palm City or island home',
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

const buildKitchenPage = ({ cityName, heroImage, heroPosition = 'center center', neighborhoods, testimonial }) =>
  createTreasureCoastLandingPage({
    componentName: `KitchenRenovation${cityName.replace(/\s/g, '')}`,
    cityName,
    serviceType: 'Kitchen Renovation',
    metaTitle: `${cityName}, FL Kitchen Renovation | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • Custom Kitchens`,
      heading: `${cityName}'s Luxury Kitchen Renovation Team`,
      subheading:
        'Experience concierge design-build service with detailed 3D previews, fixed budgets, and craftsman finishes built for Treasure Coast living.',
      backgroundImage: heroImage,
      backgroundPosition: heroPosition,
      tagline: 'Treasure Coast • Custom Kitchens • KMJK',
    },
    statHighlights: kitchenStats,
    intro: {
      title: `Kitchens Crafted for ${cityName} Families`,
      paragraphs: [
        `From morning coffee rituals to sunset dinner parties, your ${cityName} kitchen deserves purposeful flow, premium materials, and craftsmanship that lasts. KMJK handles every detail—from HOA approvals to appliance delivery—so you can stay focused on life while we transform your space.`,
        'Our in-house designers, cabinetmakers, and field supervisors collaborate under one roof, eliminating finger-pointing and change-order games. You receive clear pricing, dependable timelines, and a renovation experience centered on communication and respect for your home.',
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
      subheading: 'Book a complimentary in-home consultation or 3D design session with Chris and the KMJK team.',
    },
  })

export const KitchenRenovationPalmCity = buildKitchenPage({
  cityName: 'Palm City',
  heroImage: palmCityKitchenHero,
  heroPosition: 'center center',
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
})

export const KitchenRenovationSailfishPoint = buildKitchenPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointKitchenHero,
  heroPosition: 'center 35%',
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
})

export const KitchenRenovationSewallsPoint = buildKitchenPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointKitchenHero,
  heroPosition: 'center 40%',
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
})

export const KitchenRenovationHutchinsonIsland = buildKitchenPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandKitchenHero,
  heroPosition: 'center 45%',
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
})
