import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'
const palmCityHandymanHero = new URL(
  '../../../pics/bathroom/Spa-Inspired Walk-In Shower Remodel – West Seattle.png',
  import.meta.url
).href
const sailfishPointHandymanHero = new URL('../../../pics/bathroom/MI5TctlhvPw5-CaDCl6Sx.jpeg', import.meta.url).href
const sewallsPointHandymanHero = new URL('../../../pics/bathroom/bai_11-uXYAcnvq.jpg', import.meta.url).href
const hutchinsonIslandHandymanHero = new URL('../../../pics/bathroom/xiCgKIVMEJzO-ErVzbRzk.jpg', import.meta.url).href

const handymanRelatedLinks = [
  { label: 'Palm City Kitchen Remodels', href: '/palm-city-kitchen-renovation' },
  { label: 'Sailfish Point Bathroom Renovations', href: '/sailfish-point-bathroom-renovation' },
  { label: 'Treasure Coast TV Mounting', href: '/palm-city-tv-mounting' },
]

const handymanFaqs = [
  {
    question: 'How quickly can KMJK schedule a handyman visit?',
    answer:
      'Most Palm City and Stuart clients can reserve a half-day or full-day crew within 3–5 business days. Ongoing estate-plan members get priority same-week scheduling.',
  },
  {
    question: 'Do you supply materials or should we purchase them?',
    answer:
      'We handle material sourcing for most repairs and upgrades. If you have specialty fixtures or hardware picked out, we are happy to install them.',
  },
  {
    question: 'Can you manage repairs while we are out of town?',
    answer:
      'Yes. We coordinate key access, send before/after photo reports, and communicate with property managers or neighbors to keep your home guest-ready.',
  },
]

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
    name: 'Concierge Punch List',
    range: 'Starting at $375',
    features: [
      'Licensed craftsman on-site for our $375 minimum visit',
      'Bundle 3–5 to-do items for the strongest value',
      'Includes materials pickup, setup, and spotless cleanup',
      'Text photos ahead so we stage parts before arrival',
    ],
  },
  {
    name: 'Premium Full-Day Crew',
    range: 'Starting at $795',
    features: [
      'Lead carpenter + assistant handling complex repairs',
      'Custom trim, tile, smart home upgrades, exterior tune-ups',
      'Detailed photo report, recommendations, and concierge follow-up',
      'Priority booking for repeat and seasonal clients',
    ],
  },
  {
    name: 'Estate Maintenance Plan',
    range: '$950/mo',
    features: [
      'Reserved monthly visits plus urgent-call priority',
      'Seasonal maintenance, exterior refreshes, and safety checks',
      'Coordination with security, HOA, and specialty vendors',
      'Ideal for multi-property and seasonal ownership',
    ],
  },
]

const buildHandymanPage = ({
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
    componentName: `HandymanServices${cityName.replace(/\s/g, '')}`,
    metaTitle: `${cityName}, FL Handyman & Home Services | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • Handyman Services`,
      heading: `${cityName}'s Trusted Handyman & Small Projects Team`,
      subheading:
        'From high-end touchups to intricate repairs, KMJK keeps Treasure Coast homes impeccable with reliable, respectful professionals.',
      backgroundImage: heroImage,
      backgroundPosition: heroPosition,
      alt: heroAlt,
      tagline: 'Treasure Coast • Handyman & Maintenance • KMJK',
      note:
        heroNote ||
        'Text us photos of your punch list. $375 minimum visit applies—bundle repairs to maximize value.',
    },
    statHighlights: handymanStats,
    intro: {
      title: `Reliable Handyman Help in ${cityName}`,
      paragraphs: [
        `KMJK supports ${cityName} homeowners, property managers, and seasonal residents with trustworthy handyman and small-project services. We arrive prepared, protect your home, and leave every space spotless.`,
        'Need a one-time punch list or recurring maintenance plan? Text us photos ahead of your visit so we can bundle tasks, stage materials, and honor the $375 minimum with maximum productivity.',
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
      subheading:
        'Site visit minimum is $375. Share photos to bundle services or reserve a full-day crew for deeper projects.',
    },
    caseStudies,
    faqs: handymanFaqs,
    relatedLinks: handymanRelatedLinks,
  })

export const HandymanPalmCity = buildHandymanPage({
  cityName: 'Palm City',
  heroImage: palmCityHandymanHero,
  heroAlt: 'Palm City bathroom renovation with walk-in shower and floating vanity',
  heroPosition: 'center 40%',
  heroNote: 'Text Chris photos of your Palm City punch list. $375 minimum visit—bundle repairs for best value.',
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
  caseStudies: [
    {
      title: 'Palm Cove Guest Suite Punch List',
      location: 'Palm City, FL',
      description:
        'Repaired drywall, tuned doors, replaced hardware, and refreshed caulking ahead of holiday guests in a single half-day visit.',
      metrics: ['Half-day crew', '12-item punch list completed', 'Same-day photo report'],
      image: palmCityHandymanHero,
      alt: 'Palm City handyman completing punch list in guest suite',
    },
  ],
})

export const HandymanSailfishPoint = buildHandymanPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointHandymanHero,
  heroAlt: 'Sailfish Point bathroom featuring marble shower and double vanity',
  heroPosition: 'center 42%',
  heroNote: 'Share Sailfish Point maintenance photos with our concierge desk. $375 minimum visit; premium crews available.',
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
  caseStudies: [
    {
      title: 'Sailfish Point Seasonal Prep',
      location: 'Sailfish Point, FL',
      description:
        'Installed outdoor fans, tuned sliding doors, and upgraded smart thermostats ahead of the owners’ arrival, coordinating elevator and HOA access.',
      metrics: ['Full-day premium crew', 'HOA coordination', 'Smart home upgrades completed'],
      image: sailfishPointHandymanHero,
      alt: 'Handyman adjusting fixtures in Sailfish Point estate',
    },
  ],
})

export const HandymanSewallsPoint = buildHandymanPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointHandymanHero,
  heroAlt: 'Sewall’s Point bathroom with brass fixtures and custom cabinetry',
  heroPosition: 'center 38%',
  heroNote: 'Traveling? Text us photos before you leave. $375 minimum visit keeps your Sewall’s Point home guest-ready.',
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
  caseStudies: [
    {
      title: 'Riverfront Library Built-ins',
      location: "Sewall's Point, FL",
      description:
        'Custom-built shelving, installed accent lighting, and refinished trim to match historic details in a two-day handyman engagement.',
      metrics: ['Custom carpentry', 'Library lighting upgrade', 'Dustless sanding'],
      image: sewallsPointHandymanHero,
      alt: 'Handyman installing custom shelving in Sewall’s Point home',
    },
  ],
})

export const HandymanHutchinsonIsland = buildHandymanPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandHandymanHero,
  heroAlt: 'Hutchinson Island coastal bathroom with glass shower enclosure',
  heroPosition: 'center 48%',
  heroNote: 'Condo turnovers go faster when you text photos first. $375 minimum visit—bundle lanai, bath, and AV touches.',
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
  caseStudies: [
    {
      title: 'Ocean Village Lanai Refresh',
      location: 'Hutchinson Island, FL',
      description:
        'Replaced corroded railings, rescreened the lanai, and pressure washed surfaces in coordination with the condo association.',
      metrics: ['Condo coordination', 'Lanai rescreened same day', 'Corrosion-resistant hardware installed'],
      image: hutchinsonIslandHandymanHero,
      alt: 'Handyman working on Hutchinson Island lanai',
    },
  ],
})
