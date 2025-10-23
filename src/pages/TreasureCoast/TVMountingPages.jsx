import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'
const palmCityTvHero = new URL('../../../pics/hp_09-CrdLi6WD.jpg', import.meta.url).href
const sailfishPointTvHero = new URL('../../../pics/hp_14-DHyl6RsD.jpg', import.meta.url).href
const sewallsPointTvHero = new URL('../../../pics/hp_15-BLRtevCm.jpg', import.meta.url).href
const hutchinsonIslandTvHero = new URL('../../../pics/hp_17-ya0s-vNX.jpg', import.meta.url).href

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
    range: '$395+',
    features: [
      'Premium fixed or tilt mount up to 65"',
      'Cord concealment and outlet repositioning',
      'Soundbar bracket install + device setup',
      'Perfect for guest suites or secondary spaces',
    ],
  },
  {
    name: 'Custom Feature Wall',
    range: '$1,250+',
    features: [
      'Fireplace, stone, or millwork backdrop fabrication',
      'Distributed audio and lighting integration',
      'Frameless mounting with hidden access panels',
      'Ideal for great rooms and media dens',
    ],
  },
  {
    name: 'Outdoor Entertainment Suite',
    range: '$1,850+',
    features: [
      'Weatherproof mounts, enclosures, and cable routing',
      'Landscape audio, Wi-Fi boosters, and lighting scenes',
      'Sea-air resistant hardware for coastal durability',
      'Perfect for lanais, pool decks, and rooftop terraces',
    ],
  },
]

const buildTvPage = ({ cityName, heroImage, neighborhoods, testimonial }) =>
  createTreasureCoastLandingPage({
    componentName: `TvMounting${cityName.replace(/\s/g, '')}`,
    metaTitle: `${cityName}, FL TV Mounting & Media Walls | KMJK Home Improvement`,
    hero: {
      badge: `${cityName}, FL • TV Mounting`,
      heading: `Elevated TV Mounting & Media Walls in ${cityName}`,
      subheading:
        'KMJK engineers flawless AV installs with hidden wiring, designer finishes, and concierge service throughout the Treasure Coast.',
      backgroundImage: heroImage,
      tagline: 'Treasure Coast • TV Mounting • KMJK',
    },
    statHighlights: tvStats,
    intro: {
      title: `Your ${cityName} Media Experience, Perfected`,
      paragraphs: [
        `Whether it’s a bay-view living room or an oceanfront lanai, KMJK delivers perfectly aligned, expertly wired TV installations across ${cityName}. Our team coordinates electrical work, structural blocking, and finish carpentry so everything feels built-in from day one.`,
        'We carefully protect your home, arrive on time, and complete most projects in a single visit. Expect clean lines, concealed cables, and technology that simply works.',
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
      subheading: 'Share your inspiration photos or AV plans and KMJK will craft a media wall that exceeds expectations.',
    },
  })

export const TvMountingPalmCity = buildTvPage({
  cityName: 'Palm City',
  heroImage: palmCityTvHero,
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
})

export const TvMountingSailfishPoint = buildTvPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointTvHero,
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
})

export const TvMountingSewallsPoint = buildTvPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointTvHero,
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
})

export const TvMountingHutchinsonIsland = buildTvPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandTvHero,
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
})
