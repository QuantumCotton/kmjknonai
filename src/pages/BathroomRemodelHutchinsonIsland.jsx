import { createTreasureCoastLandingPage } from './TreasureCoast/constants.js'

const BathroomRemodelHutchinsonIsland = createTreasureCoastLandingPage({
  componentName: 'BathroomRemodelHutchinsonIsland',
  cityName: 'Hutchinson Island',
  serviceType: 'Bathroom Renovation',
  metaTitle: 'Hutchinson Island, FL Bathroom Renovation | KMJK Home Improvement',
  hero: {
    badge: 'Hutchinson Island, FL • Luxury Bathrooms',
    heading: 'Hutchinson Island Bathroom Renovations With Resort-Level Calm',
    subheading: 'Embrace spa serenity with KMJK. We handle design, permitting, and installation with concierge-level care for Treasure Coast homeowners.',
    backgroundImage: new URL('../../../pics/bathroom/xiCgKIVMEJzO-ErVzbRzk.jpg', import.meta.url).href,
    backgroundPosition: 'center 35%',
    alt: 'Hutchinson Island condo bathroom with coastal tile and glass shower',
    tagline: 'Treasure Coast • Luxury Bathrooms • KMJK',
  },
  statHighlights: [
    { value: '250+', label: 'Luxury Baths Delivered' },
    { value: '24/7', label: 'Project Updates' },
    { value: '21', label: 'Day Average Build' },
    { value: '100%', label: 'Licensed & Insured' },
  ],
  intro: {
    title: 'Bathrooms Crafted for Hutchinson Island Living',
    paragraphs: [
      'From steam showers overlooking the Atlantic to guest suites tailored for seasonal visitors, KMJK turns Hutchinson Island bathrooms into personal sanctuaries. Our planners coordinate every material and trade so you can enjoy the transformation without the oversight stress.',
      'Expect transparent communication, protected job sites, and craftsmanship that stands up to coastal conditions. We deliver magazine-worthy finishes inside tidy, organized project timelines.',
    ],
  },
  sellingPoints: [
    {
      title: 'Spa-Level Design & Finish',
      items: [
        'Floor-to-ceiling tile, steam showers, and soaking tubs matched to your home style',
        'Vanity and lighting plans curated by KMJK\'s in-house designer',
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
  ],
  pricingOptions: [
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
  ],
  testimonials: [
    {
      quote: 'KMJK managed our condo remodel around elevator schedules and HOA rules without issue. The craftsmanship is exquisite and the view is finally complemented by the interior.',
      author: 'Grace & Oliver S., Hutchinson Island',
      detail: 'Signature Refresh • $32k • 2.5 Weeks',
      rating: 5,
    },
  ],
  serviceArea: {
    title: 'Where We Renovate in Hutchinson Island',
    description: 'Serving Hutchinson Island condos, oceanfront residences, and beach communities with tailored bathroom renovations.',
    items: [
      'Indian River Plantation',
      'Plantation Beach Club',
      'Ocean Village',
      'Sandpebble Beach Club',
      'Fairwinds Cove',
      'Harbour Isle East',
    ],
  },
  caseStudies: [
    {
      title: 'Ocean Village Guest Bath Refresh',
      location: 'Hutchinson Island, FL',
      description: 'Installed large-format porcelain, quartz vanity tops, and custom niches to create a hotel-worthy guest suite without expanding the footprint.',
      metrics: ['Elevator logistics managed', 'Large-format porcelain tile', 'Custom storage niches'],
      image: new URL('../../../pics/bathroom/xiCgKIVMEJzO-ErVzbRzk.jpg', import.meta.url).href,
      alt: 'Hutchinson Island guest bathroom with large-format tile and glass shower',
    },
  ],
  faqs: [
    {
      question: 'How long does a KMJK bathroom renovation typically take?',
      answer: 'Most Treasure Coast bathroom remodels wrap in 3–4 weeks once materials are on site. Powder rooms and refresh projects can finish in under two weeks.',
    },
    {
      question: 'Do you help with finish selections for the project?',
      answer: 'Yes. Our designer curates tile, plumbing, lighting, and hardware packages so you can sign off on every detail before demo begins.',
    },
    {
      question: 'Can you remodel while we are out of state?',
      answer: 'Absolutely. We coordinate key handoff, provide daily photo updates, and manage inspections so seasonal residents can return to a finished spa retreat.',
    },
  ],
  relatedLinks: [
    { label: 'Palm City Kitchen Renovation', href: '/palm-city-kitchen-renovation' },
    { label: 'Treasure Coast Handyman Concierge', href: '/palm-city-handyman-services' },
    { label: 'Hutchinson Island Epoxy Floors', href: '/hutchinson-island-epoxy-flooring' },
  ],
  finalCta: {
    heading: 'Design your Hutchinson Island spa sanctuary with KMJK',
    subheading: 'Schedule a consultation with Chris to review layouts, materials, and project investment options.',
  },
})

export default BathroomRemodelHutchinsonIsland
