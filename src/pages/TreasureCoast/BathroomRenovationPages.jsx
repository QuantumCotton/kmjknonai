import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'
const palmCityBathroomHero = new URL('../../../pics/bathroom/Spa-Inspired Walk-In Shower Remodel – West Seattle.png', import.meta.url).href
const sailfishPointBathroomHero = new URL('../../../pics/bathroom/MI5TctlhvPw5-CaDCl6Sx.jpeg', import.meta.url).href
const sewallsPointBathroomHero = new URL('../../../pics/bathroom/bai_11-uXYAcnvq.jpg', import.meta.url).href
const hutchinsonIslandBathroomHero = new URL('../../../pics/bathroom/xiCgKIVMEJzO-ErVzbRzk.jpg', import.meta.url).href

const bathroomStats = [
  { value: '250+', label: 'Luxury Baths Delivered' },
  { value: '3D', label: 'Design Renderings' },
  { value: '21', label: 'Day Average Build' },
  { value: '100%', label: 'Licensed & Insured' },
]

const bathroomSellingPoints = [
  {
    title: 'Spa-Level Design & Finish',
    items: [
      'Floor-to-ceiling tile, steam showers, and soaking tubs matched to your home style',
      'Vanity and lighting plans curated by KMJK’s in-house designer',
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

const buildBathroomPage = ({ cityName, heroImage, heroPosition = 'center center', neighborhoods, testimonial }) =>
  createTreasureCoastLandingPage({
    componentName: `BathroomRenovation${cityName.replace(/\s/g, '')}`,
    cityName,
    serviceType: 'Bathroom Renovation',
    metaTitle: `${cityName}, FL Bathroom Renovation | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • Luxury Bathrooms`,
      heading: `${cityName} Bathroom Renovations With Resort-Level Calm`,
      subheading:
        'Embrace spa serenity with KMJK. We handle design, permitting, and installation with concierge-level care for Treasure Coast homeowners.',
      backgroundImage: heroImage,
      backgroundPosition: heroPosition,
      tagline: 'Treasure Coast • Luxury Bathrooms • KMJK',
    },
    statHighlights: bathroomStats,
    intro: {
      title: `Bathrooms Crafted for ${cityName} Living`,
      paragraphs: [
        `From steam showers overlooking the St. Lucie River to guest suites tailored for seasonal visitors, KMJK turns ${cityName} bathrooms into personal sanctuaries. Our planners coordinate every material and trade so you can enjoy the transformation without the oversight stress.`,
        'Expect transparent communication, protected job sites, and craftsmanship that stands up to coastal conditions. We deliver magazine-worthy finishes inside tidy, organized project timelines.',
      ],
    },
    sellingPoints: bathroomSellingPoints,
    pricingOptions: bathroomPricing,
    testimonials: [testimonial],
    serviceArea: {
      title: `Where We Renovate in ${cityName}`,
      description: `Serving ${cityName} estates, waterfront residences, and private golf communities with tailored bathroom renovations.`,
      items: neighborhoods,
    },
    finalCta: {
      heading: `Design your ${cityName} spa sanctuary with KMJK`,
      subheading: 'Schedule a consultation with Chris to review layouts, materials, and project investment options.',
    },
  })

export const BathroomRenovationPalmCity = buildBathroomPage({
  cityName: 'Palm City',
  heroImage: palmCityBathroomHero,
  heroPosition: 'center 40%',
  neighborhoods: [
    'Palm City Farms',
    'The Evergreen Club',
    'Harbour Ridge Yacht & Country Club',
    'Copperleaf',
    'Monarch Golf & Country Club',
    'Orchid Bay',
  ],
  testimonial: {
    quote:
      'KMJK converted our dated Palm City bath into a spa we actually look forward to using every day. Communication was constant, the crew was respectful, and the final product is flawless.',
    author: 'Elaine & Martin D., Palm City',
    detail: 'Full Spa Retreat • $54k • 3 Weeks',
  },
})

export const BathroomRenovationSailfishPoint = buildBathroomPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointBathroomHero,
  heroPosition: 'center 45%',
  neighborhoods: [
    'Oceanfront Estates',
    'Harbour Residences',
    'Golf Villas',
    'Marina Point Condominiums',
  ],
  testimonial: {
    quote:
      'Our primary bath now feels like the spa at the club. KMJK coordinated every trade, handled the HOA paperwork, and delivered exactly when promised.',
    author: 'Carina & James P., Sailfish Point',
    detail: 'Elite Primary Suite • $96k • 5 Weeks',
  },
})

export const BathroomRenovationSewallsPoint = buildBathroomPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointBathroomHero,
  heroPosition: 'center 38%',
  neighborhoods: [
    "South Sewall's Point",
    'High Point',
    'Mandarin Isle',
    "Archipelago",
    "River Crest",
  ],
  testimonial: {
    quote:
      'We trusted KMJK with our Sewall’s Point remodel while we were up north. The project app and daily photo updates made it stress-free. We came back to a completely transformed space.',
    author: 'Thomas & Linda H., Sewall’s Point',
    detail: 'Full Spa Retreat • $58k • 3.5 Weeks',
  },
})

export const BathroomRenovationHutchinsonIsland = buildBathroomPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandBathroomHero,
  heroPosition: 'center 35%',
  neighborhoods: [
    'Indian River Plantation',
    'Plantation Beach Club',
    'Ocean Village',
    'Sandpebble Beach Club',
    'Fairwinds Cove',
    'Harbour Isle East',
  ],
  testimonial: {
    quote:
      'KMJK managed our condo remodel around elevator schedules and HOA rules without issue. The craftsmanship is exquisite and the view is finally complemented by the interior.',
    author: 'Grace & Oliver S., Hutchinson Island',
    detail: 'Signature Refresh • $32k • 2.5 Weeks',
  },
})
