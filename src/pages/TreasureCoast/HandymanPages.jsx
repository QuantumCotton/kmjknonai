import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'
const palmCityHandymanHero = new URL('../../../pics/hp_07-Bvb1DaNv.jpg', import.meta.url).href
const sailfishPointHandymanHero = new URL('../../../pics/hp_08-CAgYmBlP.jpg', import.meta.url).href
const sewallsPointHandymanHero = new URL('../../../pics/hp_12-DMjuhQl1.jpg', import.meta.url).href
const hutchinsonIslandHandymanHero = new URL('../../../pics/hp_16-C7ix_NF5.jpg', import.meta.url).href

const handymanStats = [
  { value: '1,200+', label: 'Punch Lists Completed' },
  { value: '48 HR', label: 'Average Turnaround' },
  { value: '4.9★', label: 'Homeowner Rating' },
  { value: '100%', label: 'Licensed + Insured' },
]

const handymanSellingPoints = [
  {
    title: 'Concierge Repairs & Upgrades',
    items: [
      'Dedicated handyman team for luxury homes, estates, and condos',
      'From door adjustments and drywall repair to custom trim and built-ins',
      'Trusted vendor network for glass, stone, electrical, and specialty needs',
      'Discreet arrival, shoe covers, and post-service clean-up every visit',
    ],
  },
  {
    title: 'Property Managers & Seasonal Owners Love Us',
    items: [
      'Routine maintenance plans and emergency support within the Treasure Coast',
      'Detailed before/after photo reports and digital punch list tracking',
      'Key lockbox management and coordination with security/HOA staff',
      'Flexible scheduling for rental turnovers and snowbird arrivals',
    ],
  },
]

const handymanPricing = [
  {
    name: 'Half-Day Finish Work',
    range: '$425 Flat',
    features: [
      'Two craftsmen on-site up to 4 hours',
      'Touch-up painting, fixture swaps, minor carpentry',
      'Includes materials pickup and disposal',
      'Ideal for punch lists before guests arrive',
    ],
  },
  {
    name: 'Full-Day Premium Crew',
    range: '$795',
    features: [
      'Dedicated lead carpenter + assistant',
      'Built-ins, trim, drywall, tile repairs, smart device installs',
      'Detailed task summary with photos and recommendations',
      'Priority scheduling for ongoing clients',
    ],
  },
  {
    name: 'Monthly Estate Plan',
    range: '$950/mo',
    features: [
      'Pre-scheduled maintenance visits + on-call support',
      'Filter changes, pressure washing, hardware tuning, caulking',
      'Vendor oversight for specialty trades',
      'Ideal for seasonal or multi-property owners',
    ],
  },
]

const buildHandymanPage = ({ cityName, heroImage, neighborhoods, testimonial }) =>
  createTreasureCoastLandingPage({
    componentName: `HandymanServices${cityName.replace(/\s/g, '')}`,
    metaTitle: `${cityName}, FL Handyman & Home Services | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • Handyman Services`,
      heading: `${cityName}'s Trusted Handyman & Small Projects Team`,
      subheading:
        'From high-end touchups to intricate repairs, KMJK keeps Treasure Coast homes impeccable with reliable, respectful professionals.',
      backgroundImage: heroImage,
      tagline: 'Treasure Coast • Handyman & Maintenance • KMJK',
    },
    statHighlights: handymanStats,
    intro: {
      title: `Reliable Handyman Help in ${cityName}`,
      paragraphs: [
        `KMJK supports ${cityName} homeowners, property managers, and seasonal residents with trustworthy handyman and small-project services. We arrive prepared, protect your home, and leave every space spotless.`,
        'Need a one-time punch list or recurring maintenance plan? Our project coordinators manage scheduling, material procurement, and updates so you don’t have to.',
      ],
    },
    sellingPoints: handymanSellingPoints,
    pricingOptions: handymanPricing,
    testimonials: [testimonial],
    serviceArea: {
      title: `Our ${cityName} Coverage`,
      description: `Serving gated communities, riverfront residences, and luxury condos across ${cityName} and nearby enclaves.`,
      items: neighborhoods,
    },
    finalCta: {
      heading: `Need handyman help in ${cityName}?`,
      subheading: 'Reserve a half-day or full-day visit. We can also build a recurring maintenance plan tailored to your property.',
    },
  })

export const HandymanPalmCity = buildHandymanPage({
  cityName: 'Palm City',
  heroImage: palmCityHandymanHero,
  neighborhoods: [
    'Canoe Creek',
    'Cobblestone Country Club',
    'Four Rivers',
    'Oakbrooke Estates',
    'Lighthouse Point',
    'Palm Cove',
  ],
  testimonial: {
    quote:
      'The KMJK team tackles every repair on our Palm City rental portfolio. Communication is instant and our tenants rave about the professionalism.',
    author: 'Emerald Key Properties, Palm City',
    detail: 'Monthly Estate Plan • Since 2022',
  },
})

export const HandymanSailfishPoint = buildHandymanPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointHandymanHero,
  neighborhoods: [
    'Oceanfront Estates',
    'Harbour Villas',
    'Golf Cottages',
    'Marina Residences',
  ],
  testimonial: {
    quote:
      'Our Sailfish Point residence is kept guest-ready thanks to KMJK. They coordinate with security, respect HOA rules, and every craftsman is top-tier.',
    author: 'The Richardson Family, Sailfish Point',
    detail: 'Full-Day Premium Crew • Ongoing',
  },
})

export const HandymanSewallsPoint = buildHandymanPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointHandymanHero,
  neighborhoods: [
    "South Sewall's Point",
    'High Point',
    'Mandarin Isle',
    'Archipelago',
    'River Crest',
  ],
  testimonial: {
    quote:
      'We trust KMJK with every maintenance need while we’re traveling. Their reports and photos keep us informed and confident our Sewall’s Point home is cared for.',
    author: 'Brian & Angela M., Sewall’s Point',
    detail: 'Monthly Estate Plan • 3 Years',
  },
})

export const HandymanHutchinsonIsland = buildHandymanPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandHandymanHero,
  neighborhoods: [
    'Indian River Plantation',
    'Ocean Village',
    'Harbour Isle',
    'Marriott Ocean Club Villas',
    'Plantation Beach Club',
    'Fairwinds Cove',
  ],
  testimonial: {
    quote:
      'Condo repairs can be tricky but KMJK works around elevator schedules and neighbors with ease. They’re our go-to for turnovers and upgrades.',
    author: 'The Shapiro Family, Hutchinson Island',
    detail: 'Half-Day Finish Work • Quarterly',
  },
})
