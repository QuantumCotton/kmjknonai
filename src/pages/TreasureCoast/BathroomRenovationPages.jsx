import { createTreasureCoastLandingPage } from './TreasureCoastLandingTemplate.jsx'

const palmCityBathroomHero = new URL('../../../pics/bathroom/Spa-Inspired Walk-In Shower Remodel – West Seattle.png', import.meta.url).href
const sailfishPointBathroomHero = new URL('../../../pics/bathroom/MI5TctlhvPw5-CaDCl6Sx.jpeg', import.meta.url).href
const sewallsPointBathroomHero = new URL('../../../pics/bathroom/bai_11-uXYAcnvq.jpg', import.meta.url).href
const hutchinsonIslandBathroomHero = new URL('../../../pics/bathroom/xiCgKIVMEJzO-ErVzbRzk.jpg', import.meta.url).href

const bathroomRelatedLinks = [
  { label: 'Palm City Kitchen Renovation', href: '/palm-city-kitchen-renovation' },
  { label: 'Treasure Coast Handyman Concierge', href: '/palm-city-handyman-services' },
  { label: 'Hutchinson Island Epoxy Floors', href: '/hutchinson-island-epoxy-flooring' },
]

const bathroomFaqs = [
  {
    question: 'How long does a KMJK bathroom renovation typically take?',
    answer:
      'Most Treasure Coast bathroom remodels wrap in 3–4 weeks once materials are on site. Powder rooms and refresh projects can finish in under two weeks.',
  },
  {
    question: 'Do you help with finish selections for the project?',
    answer:
      'Yes. Our designer curates tile, plumbing, lighting, and hardware packages so you can sign off on every detail before demo begins.',
  },
  {
    question: 'Can you remodel while we are out of state?',
    answer:
      'Absolutely. We coordinate key handoff, provide daily photo updates, and manage inspections so seasonal residents can return to a finished spa retreat.',
  },
]

const bathroomStats = [
  { value: '250+', label: 'Luxury Baths Delivered' },
  { value: '24/7', label: 'Project Updates' },
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
    name: 'Resurfacing',
    range: '$3,500',
    monthly: '$150/mo',
    features: [
      'Vanity refacing with new doors and hardware',
      'Countertop resurfacing or replacement',
      'Shower/tub refinishing',
      'Updated fixtures and lighting',
    ],
  },
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
      'His-and-hers vanities with custom millwork',
      'Steam showers, body sprays, and smart controls',
      'Walk-in closets and dressing areas',
      'Automated lighting, AV, and privacy glass',
    ],
  },
]

const buildBathroomPage = ({
  cityName,
  heroImage,
  heroAlt,
  heroPosition = 'center center',
  neighborhoods,
  testimonial,
  caseStudies,
}) =>
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
      alt: heroAlt,
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
    caseStudies,
    faqs: bathroomFaqs,
    relatedLinks: bathroomRelatedLinks,
  })

const treasureCoastBathroomHero = new URL('../../../pics/bathroom/Spa-Inspired Walk-In Shower Remodel – West Seattle.png', import.meta.url).href

export const BathroomRenovationTreasureCoast = buildBathroomPage({
  cityName: 'Treasure Coast',
  heroImage: treasureCoastBathroomHero,
  heroAlt: 'Treasure Coast luxury bathroom with spa features and coastal design',
  heroPosition: 'center center',
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
      'Our Treasure Coast bathroom renovation exceeded all expectations. KMJK transformed our outdated space into a luxurious spa retreat while keeping everything clean and organized.',
    author: 'Dana & William L., Stuart',
    detail: 'Full Spa Retreat • $45k • 3 Weeks',
  },
  caseStudies: [
    {
      title: 'Jensen Beach Coastal Spa',
      location: 'Jensen Beach, FL',
      description:
        'Created a beach-inspired bathroom with custom tile work, freestanding tub, and walk-in shower perfect for coastal living.',
      metrics: ['Marine-grade finishes', 'Custom tile design', 'Spa-level features'],
      image: treasureCoastBathroomHero,
      alt: 'Jensen Beach bathroom renovation with coastal spa design',
    },
  ],
})

export const BathroomRenovationPalmCity = buildBathroomPage({
  cityName: 'Palm City',
  heroImage: palmCityBathroomHero,
  heroAlt: 'Palm City luxury bathroom with freestanding tub and custom vanity',
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
  caseStudies: [
    {
      title: 'Palm Cove Primary Suite Spa',
      location: 'Palm City, FL',
      description:
        'Expanded a builder-grade bathroom into a steam shower retreat with heated floors, backlit mirrors, and custom rift-oak vanity cabinetry.',
      metrics: ['Steam shower with aromatherapy', 'Heated flooring throughout', 'Quartz waterfall vanity'],
      image: palmCityBathroomHero,
      alt: 'Palm City spa bathroom with glass steam shower and heated floors',
    },
  ],
})

export const BathroomRenovationSailfishPoint = buildBathroomPage({
  cityName: 'Sailfish Point',
  heroImage: sailfishPointBathroomHero,
  heroAlt: 'Sailfish Point primary bathroom with marble finishes and coastal sconces',
  heroPosition: 'center 45%',
  neighborhoods: [
    'Oceanfront Estates',
    'Harbour Residences',
    'Golf Villas',
    'Marina Point Condominiums',
  ],
  testimonial: {
    quote:
      'Our primary bath now feels like the spa at the club. KMJK coordinated every trade, complied with the HOA effortlessly, and delivered exactly when promised.',
    author: 'C. & J. P., Sailfish Point',
    detail: 'Elite Primary Suite • $96k • 5 Weeks',
  },
  caseStudies: [
    {
      title: 'Oceanview Primary Spa Suite',
      location: 'Sailfish Point, FL',
      description:
        'Reimagined a dated bath with a freestanding tub framed by picture windows, book-matched marble, and custom linen storage for seasonal guests.',
      metrics: ['HOA approvals handled', 'Book-matched marble slabs', 'Freestanding soaking tub with ocean view'],
      image: sailfishPointBathroomHero,
      alt: 'Luxury Sailfish Point bathroom with freestanding tub overlooking the ocean',
    },
  ],
})

export const BathroomRenovationSewallsPoint = buildBathroomPage({
  cityName: "Sewall's Point",
  heroImage: sewallsPointBathroomHero,
  heroAlt: 'Sewall’s Point bathroom renovation with walk-in shower and natural light',
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
  caseStudies: [
    {
      title: 'Historic Riverfront Bath Renewal',
      location: "Sewall's Point, FL",
      description:
        'Converted a cramped bath into a light-filled suite with curbless shower, integrated bench, and custom inset cabinetry matching the historic home.',
      metrics: ['Curbless marble shower', 'Integrated teak bench', 'Preserved millwork details'],
      image: sewallsPointBathroomHero,
      alt: 'Historic Sewall’s Point bathroom with curbless shower and teak bench',
    },
  ],
})

export const BathroomRenovationHutchinsonIsland = buildBathroomPage({
  cityName: 'Hutchinson Island',
  heroImage: hutchinsonIslandBathroomHero,
  heroAlt: 'Hutchinson Island condo bathroom with coastal tile and glass shower',
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
  caseStudies: [
    {
      title: 'Ocean Village Guest Bath Refresh',
      location: 'Hutchinson Island, FL',
      description:
        'Installed large-format porcelain, quartz vanity tops, and custom niches to create a hotel-worthy guest suite without expanding the footprint.',
      metrics: ['Elevator logistics managed', 'Large-format porcelain tile', 'Custom storage niches'],
      image: hutchinsonIslandBathroomHero,
      alt: 'Hutchinson Island guest bathroom with large-format tile and glass shower',
    },
  ],
})
