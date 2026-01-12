import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'
const palmCityEpoxyHero = new URL('../../../pics/flakefloor.jpg', import.meta.url).href
const sailfishPointEpoxyHero = new URL('../../../pics/epoxyFTPhospitalfinal.jpg', import.meta.url).href
const sewallsPointEpoxyHero = new URL('../../../pics/shopfloorfinal.jpg', import.meta.url).href
const hutchinsonIslandEpoxyHero = new URL('../../../pics/Rokrez-Satin_7029-copy-scaled.jpeg', import.meta.url).href

const epoxyStats = [
  { value: '500+', label: 'Floors Installed' },
  { value: '25+', label: 'Color & Flake Options' },
  { value: '2-3', label: 'Day Turnaround' },
  { value: '15 Yr', label: 'Warranty Available' },
]

const epoxySellingPoints = [
  {
    title: 'Designer-Grade Epoxy Systems',
    items: [
      'Metallic, quartz, and flake systems tailored to waterfront design palettes',
      'UV-stable topcoats that resist yellowing in Florida sun',
      'Chemical-resistant finishes ideal for garages, hangars, and workshops',
      'Slip-resistant micro media for pool decks and entryways',
    ],
  },
  {
    title: 'Impeccable Prep & Installation',
    items: [
      'Diamond grinding, crack repair, and moisture mitigation as standard',
      'Industrial vacuums and containment keep your property clean',
      'Temperature- and humidity-controlled curing for long-term performance',
      'Licensed, insured, and experienced with HOA & condo protocols',
    ],
  },
]

const epoxyPricing = [
  {
    name: 'Signature Flake System',
    range: '$7.50/sq ft',
    features: [
      'Full broadcast flake with polyaspartic topcoat',
      'Hot tire, chemical, and impact resistant',
      'Perfect for garages, workshops, or utility spaces',
      'Includes lifetime adhesion warranty',
    ],
  },
  {
    name: 'Metallic Luxury Finish',
    range: '$10.50/sq ft',
    features: [
      'Custom metallic blends for showrooms or living areas',
      'Glass-like finish with subtle marbling or bold swirls',
      'Optional matte or gloss topcoat',
      'Popular for lanais, game rooms, and modern interiors',
    ],
  },
  {
    name: 'Quartz Commercial System',
    range: '$12.00/sq ft',
    features: [
      'Safety-grade quartz with non-slip additives',
      'Ideal for pools, locker rooms, commercial kitchens',
      'Meets ADA traction requirements',
      'Multi-layer build for extreme durability',
    ],
  },
]

const buildEpoxyPage = ({ cityName, heroImage, neighborhoods, testimonial, heroNote }) =>
  createTreasureCoastLandingPage({
    componentName: `EpoxyFlooring${cityName.replace(/\s/g, '')}`,
    metaTitle: `${cityName}, FL Epoxy Flooring & Concrete Coatings | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • Epoxy Flooring`,
      heading: `${cityName}'s Premium Epoxy Floor Coatings`,
      subheading:
        'Transform garages, hangars, and outdoor living spaces with commercial-grade epoxy systems built for coastal conditions.',
      backgroundImage: heroImage,
      tagline: 'Treasure Coast • Epoxy Flooring • KMJK',
      note:
        heroNote ||
        'Text slab photos or dimensions so we can stage samples and moisture mitigation gear before your consultation.',
    },
    statHighlights: epoxyStats,
    intro: {
      title: `Epoxy Floors Engineered for ${cityName}`,
      paragraphs: [
        `Salt air, humidity, and daily wear demand top-tier epoxy systems. KMJK delivers designer finishes and industrial durability for ${cityName} garages, patios, hangars, and commercial spaces.`,
        'Our certified installers handle concrete prep, repairs, and coatings in-house. Text us photos ahead of your visit so we can confirm moisture mitigation plans, color blends, and install logistics.',
      ],
    },
    sellingPoints: epoxySellingPoints,
    pricingOptions: epoxyPricing,
    testimonials: [testimonial],
    serviceArea: {
      title: `Where We Coat in ${cityName}`,
      description: `Serving estates, condos, club facilities, and aviation properties in ${cityName} and the Treasure Coast.`,
      items: neighborhoods,
    },
    finalCta: {
      heading: `Schedule your ${cityName} epoxy consultation`,
      subheading:
        'Book a site assessment with KMJK. Share photos and square footage upfront to fast-track samples, schedules, and finish selections.',
    },
  })

export const EpoxyPalmCity = buildEpoxyPage({
  cityName: 'Palm City',
  heroImage: palmCityEpoxyHero,
  heroNote: 'Text garage dimensions or slab photos to Chris so we can dial in Palm City color blends before arriving.',
  neighborhoods: [
    'Palm City Farms',
    'Monarch Country Club',
    'Palm Cove',
    'Harbour Ridge',
    'Copperleaf',
    'Highlands Reserve',
  ],
  testimonial: {
    quote:
      'KMJK turned our garage into a showcase. The flake floor is flawless and the crew delivered in just two days without disturbing our schedule.',
    author: 'Kevin & Jody S., Palm City',
    detail: 'Signature Flake System • 640 sq ft',
  },
})

export const EpoxySailfishPoint = buildEpoxyPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointEpoxyHero,
  heroNote: 'Share clubroom or hangar photos. We’ll stage metallic samples and marine-grade topcoats for Sailfish Point walkthroughs.',
  neighborhoods: [
    'Sailfish Point Oceanfront Residences',
    'Marina Point',
    'Harbour Homes',
    'Club Villas',
  ],
  testimonial: {
    quote:
      'The metallic epoxy in our club room looks incredible. KMJK coordinated with security, kept everything spotless, and finished ahead of schedule.',
    author: 'Sailfish Point HOA',
    detail: 'Metallic Luxury Finish • 1,200 sq ft',
  },
})

export const EpoxySewallsPoint = buildEpoxyPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointEpoxyHero,
  heroNote: 'Send breezeway and garage videos so we can plan quartz blends and humidity controls for Sewall’s Point installs.',
  neighborhoods: [
    "South Sewall's Point",
    'High Point',
    'Mandarin Isle',
    'Archipelago',
    'River Crest',
  ],
  testimonial: {
    quote:
      'The KMJK crew transformed our breezeway and lower-level garage with quartz epoxy. It feels like a resort entry now.',
    author: 'Diane & Marcus W., Sewall’s Point',
    detail: 'Quartz Commercial System • 900 sq ft',
  },
})

export const EpoxyHutchinsonIsland = buildEpoxyPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandEpoxyHero,
  heroNote: 'Upload lanai and fish-cleaning station photos. We prep slip-resistant, salt-air safe coatings ahead of Hutchinson Island visits.',
  neighborhoods: [
    'Ocean Village',
    'Harbour Isle',
    'Plantation Beach Club',
    'Sandpebble Oceanside',
    'Indian River Plantation',
  ],
  testimonial: {
    quote:
      'Our lanai, garage, and fish-cleaning station all received KMJK epoxy. The finish is gorgeous and incredibly easy to clean.',
    author: 'The Sorrento Family, Hutchinson Island',
    detail: 'Signature Flake System • 1,050 sq ft',
  },
})

export const EpoxyTreasureCoast = buildEpoxyPage({
  cityName: 'Treasure Coast',
  heroImage: palmCityEpoxyHero,
  heroNote: 'Text photos and dimensions from any Treasure Coast location. We stage samples and moisture mitigation plans for garages, hangars, and outdoor spaces across the region.',
  neighborhoods: [
    'Stuart',
    'Jensen Beach',
    'Palm City',
    'Port St. Lucie',
    'Hutchinson Island',
    "Sewall's Point",
    'Sailfish Point',
    'Fort Pierce',
    'Vero Beach',
    'Hobe Sound',
  ],
  testimonial: {
    quote:
      'KMJK coated our garage and hangar across two Treasure Coast properties. Consistent quality, fair pricing, and they understand coastal conditions.',
    author: 'Mark & Lisa D., Treasure Coast',
    detail: 'Signature Flake System • 1,800 sq ft',
  },
})
