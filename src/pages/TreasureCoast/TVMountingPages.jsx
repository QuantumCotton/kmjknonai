import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'
const palmCityTvHero = new URL('../../../pics/tv mounts/tv install stuart.png', import.meta.url).href
const sailfishPointTvHero = new URL('../../../pics/tv mounts/tvmountsewallspoint.png', import.meta.url).href
const sewallsPointTvHero = new URL('../../../pics/tv mounts/tvmountsewallspoint.png', import.meta.url).href
const hutchinsonIslandTvHero = new URL('../../../pics/tv mounts/tvmountisland.png', import.meta.url).href

const tvRelatedLinks = [
  { label: 'Palm City Home Theater Remodels', href: '/palm-city-tv-mounting' },
  { label: 'Sailfish Point Epoxy Garage Floors', href: '/sailfish-point-epoxy-flooring' },
  { label: 'Treasure Coast Handyman Maintenance', href: '/palm-city-handyman-services' },
]

const tvFaqs = [
  {
    question: 'Can KMJK hide all wiring and components during a TV install?',
    answer:
      'Yes. We relocate outlets, run in-wall wiring, and conceal media gear inside cabinets or remote closets so the finished wall remains clean.',
  },
  {
    question: 'Do you handle outdoor and lanai TV mounting?',
    answer:
      'Absolutely. We install weatherproof enclosures, marine-rated mounts, and integrate landscape audio so your lanai or pool deck is entertainment ready.',
  },
  {
    question: 'Can you integrate Control4, Sonos, or other smart systems?',
    answer:
      'Our techs work with Control4, Sonos, Samsung Frame, and other smart platforms to sync audio, lighting, and automation with your new media wall.',
  },
]

const tvStats = [
  { value: '600+', label: 'TV Installs Completed' },
  { value: '24 HR', label: 'Rapid Scheduling' },
  { value: '4.9★', label: 'Client Rating' },
  { value: '100%', label: 'Concealed Wiring' },
]

const tvSellingPoints = [
  {
    title: 'Luxury Entertainment Installations',
    items: [
      'Motorized and articulating mounts for indoor & outdoor applications',
      'Soundbar, surround, and smart-home integration by certified techs',
      'Custom cabinetry, stone, or shiplap backdrops crafted in-house',
      'Concealed wiring, electrical upgrades, and cable management included',
    ],
  },
  {
    title: 'White-Glove Service',
    items: [
      'Protective coverings, ladder pads, and post-install polishing',
      'Coordinated appointments with interior designers or AV consultants',
      'Setup of streaming devices, calibration, and tutorial for your family',
      'Licensed & insured for high-value waterfront and condo properties',
    ],
  },
]

const tvPricing = [
  {
    name: 'Signature Mounting',
    range: 'Starting at $399',
    features: [
      'Premium fixed or tilt mount up to 75"',
      'Cord concealment and outlet repositioning',
      'Soundbar bracket install + device setup',
      'Site visit minimum $375 — bundle AV tasks for best value',
    ],
  },
  {
    name: 'The Clean Look',
    range: 'Starting at $699',
    features: [
      'In-wall wire concealment and power relocation',
      'Custom trim or panel accents for a finished aesthetic',
      'Professional cable management + device calibration',
      'Perfect for main living spaces and owner suites',
    ],
  },
  {
    name: 'Ultimate Entertainment Suite',
    range: 'Starting at $1,299',
    features: [
      'Outdoor or multi-zone installs with marine-grade hardware',
      'Soundbar, surround, and smart automation integration',
      'Custom cabinetry, stone, or shiplap backdrops crafted in-house',
      'Ideal for lanais, club rooms, and theater experiences',
    ],
  },
]

const buildTvPage = ({
  cityName,
  heroImage,
  heroAlt,
  heroPosition = 'center center',
  neighborhoods,
  testimonial,
  caseStudies,
}) =>
  createTreasureCoastLandingPage({
    componentName: `TvMounting${cityName.replace(/\s/g, '')}`,
    cityName,
    serviceType: 'TV Mounting',
    metaTitle: `${cityName}, FL TV Mounting & Media Walls | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • TV Mounting`,
      heading: `Elevated TV Mounting & Media Walls in ${cityName}`,
      subheading:
        'KMJK engineers flawless AV installs with hidden wiring, designer finishes, and concierge service throughout the Treasure Coast.',
      backgroundImage: heroImage,
      alt: heroAlt,
      backgroundPosition: heroPosition,
      tagline: 'Treasure Coast • TV Mounting • KMJK',
    },
    statHighlights: tvStats,
    intro: {
      title: `Your ${cityName} Media Experience, Perfected`,
      paragraphs: [
        `Whether it’s a bay-view living room or an oceanfront lanai, KMJK delivers perfectly aligned, expertly wired TV installations across ${cityName}. Our team coordinates electrical work, structural blocking, and finish carpentry so everything feels built-in from day one.`,
        'Text us photos before your visit so we can stage mounts, outlets, and AV gear in advance. Minimum site investment is $375, with most clients bundling mounting, concealment, and calibration in a single appointment.',
      ],
    },
    sellingPoints: tvSellingPoints,
    pricingOptions: tvPricing,
    testimonials: [testimonial],
    serviceArea: {
      title: `Where We Install in ${cityName}`,
      description: `Serving luxury homes, condos, and private clubs across ${cityName} and the Treasure Coast.`,
      items: neighborhoods,
    },
    finalCta: {
      heading: `Upgrade your ${cityName} viewing experience`,
      subheading: 'Share your inspiration photos or AV plans. $375 site minimum applies—bundle multiple installs for concierge pricing.',
    },
    caseStudies,
    faqs: tvFaqs,
    relatedLinks: tvRelatedLinks,
  })

export const TvMountingPalmCity = buildTvPage({
  cityName: 'Palm City',
  heroImage: palmCityTvHero,
  heroAlt: 'Palm City living room feature wall with KMJK TV mounting and custom millwork',
  heroPosition: 'center 38%',
  neighborhoods: [
    'Palm City Farms',
    'Carmel',
    'Monarch Country Club',
    'Palm Cove Yacht & Golf Club',
    'Harbour Ridge',
  ],
  testimonial: {
    quote:
      'Our living room feature wall looks like a designer magazine spread. KMJK handled electrical, shiplap, and AV programming in one visit.',
    author: 'Kelsey & Matt F., Palm City',
    detail: 'Custom Feature Wall • $2,450 • 2 Days',
  },
  caseStudies: [
    {
      title: 'Palm City Club Room Upgrade',
      location: 'Palm City, FL',
      description:
        'Installed a recessed 85" display with hidden rack storage, Atmos sound calibration, and custom shiplap to match the home’s coastal palette.',
      metrics: ['85" recessed display', 'Hidden rack + ventilation', 'Atmos calibration completed'],
      image: palmCityTvHero,
      alt: 'Palm City recessed TV installation with shiplap wall',
    },
  ],
})

export const TvMountingSailfishPoint = buildTvPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointTvHero,
  heroAlt: 'Sailfish Point media wall with motorized mount and custom paneling',
  heroPosition: 'center 40%',
  neighborhoods: [
    'Oceanfront Estates',
    'Marina Residences',
    'Golf Villas',
    'Harbour Homes',
  ],
  testimonial: {
    quote:
      'KMJK integrated our Control4 system and outdoor TVs flawlessly. Their team navigated all HOA requirements without us lifting a finger.',
    author: 'The Lopez Family, Sailfish Point',
    detail: 'Outdoor Entertainment Suite • $6,800 • 3 Days',
  },
  caseStudies: [
    {
      title: 'Sailfish Point Dual-Zone Media Suite',
      location: 'Sailfish Point, FL',
      description:
        'Motorized mount with swivel for ocean or fireplace viewing, hidden Control4 rack, and custom acoustic paneling to elevate the club room.',
      metrics: ['Motorized swivel mount', 'Control4 integration', 'Acoustic panel feature wall'],
      image: sailfishPointTvHero,
      alt: 'Luxury Sailfish Point TV mounting with acoustic panels',
    },
  ],
})

export const TvMountingSewallsPoint = buildTvPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointTvHero,
  heroAlt: 'Sewall’s Point art-inspired media wall with concealed wiring',
  heroPosition: 'center 45%',
  neighborhoods: [
    'Mandarin Isle',
    'High Point',
    "North Sewall's Point",
    'Bayview Terraces',
    'River Crest',
  ],
  testimonial: {
    quote:
      'We needed a discreet installation for our art collection. KMJK concealed every wire and mounted the TV perfectly flush to the wall.',
    author: 'The Whitman Residence, Sewall’s Point',
    detail: 'Signature Mounting • $825 • 1 Day',
  },
  caseStudies: [
    {
      title: 'Gallery Wall Hidden Display',
      location: "Sewall's Point, FL",
      description:
        'Recessed a Frame TV within custom molding, rerouted power through attic space, and installed art lighting for a cohesive gallery experience.',
      metrics: ['Frame TV recess', 'Attic wire routing', 'Custom molding + art lighting'],
      image: sewallsPointTvHero,
      alt: 'Flush-mounted TV within gallery wall in Sewall’s Point',
    },
  ],
})

export const TvMountingHutchinsonIsland = buildTvPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandTvHero,
  heroAlt: 'Hutchinson Island outdoor TV mounting with weatherproof enclosure',
  heroPosition: 'center 35%',
  neighborhoods: [
    'Ocean Village',
    'Inlet Village',
    'Sandpebble Oceanside',
    'Harbour Isle',
    'Plantation Beach Club',
  ],
  testimonial: {
    quote:
      'Our lanai TVs survive salt spray and storms thanks to KMJK’s weatherproof enclosures. They even synchronized the landscape audio.',
    author: 'Nate & Farah Q., Hutchinson Island',
    detail: 'Outdoor Entertainment Suite • $4,200 • 2 Days',
  },
  caseStudies: [
    {
      title: 'Lanai Entertainment Upgrade',
      location: 'Hutchinson Island, FL',
      description:
        'Installed a 75" outdoor display with heater-rated enclosure, recessed soundbar, and landscape audio tied into existing pool deck controls.',
      metrics: ['Weatherproof enclosure', 'Landscape audio integration', 'Pool deck control sync'],
      image: hutchinsonIslandTvHero,
      alt: 'Outdoor TV enclosure on Hutchinson Island lanai',
    },
  ],
})
