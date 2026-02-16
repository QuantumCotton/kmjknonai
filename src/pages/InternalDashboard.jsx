import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { LayoutDashboard, ExternalLink, FileText, MapPinned, FileSpreadsheet, Building2, User, FileInput, Calculator, Handshake, Layers } from 'lucide-react'

const epoxyPitchDecks = [
  { label: 'Commercial High-Traffic', file: 'pitch-deck-01-commercial-v3.html' },
  { label: 'Mechanic Shop', file: 'pitch-deck-02-mechanic-v3.html' },
  { label: 'Commercial Kitchen', file: 'pitch-deck-03-kitchen-v3.html' },
  { label: 'Home Garage', file: 'pitch-deck-04-garage-v3.html' },
  { label: 'Industrial Warehouse', file: 'pitch-deck-05-industrial-v3.html' },
  { label: 'Aircraft Hangar', file: 'pitch-deck-06-hangar-v3.html' },
  { label: 'Luxury Showroom', file: 'pitch-deck-07-showroom-v3.html' },
]

const marcusFluxDecks = [
  { label: 'Commercial Flooring', file: 'MARCUS-COMMERCIAL-FLUX-v1.html' },
  { label: 'Mechanic Shop', file: 'MARCUS-MECHANIC-FLUX-v1.html' },
  { label: 'Commercial Kitchen', file: 'MARCUS-KITCHEN-FLUX-v1.html' },
  { label: 'Home Garage', file: 'MARCUS-GARAGE-FLUX-v1.html' },
  { label: 'Industrial Warehouse', file: 'MARCUS-INDUSTRIAL-FLUX-v1.html' },
  { label: 'Aircraft Hangar', file: 'MARCUS-HANGAR-FLUX-v1.html' },
  { label: 'Luxury Showroom', file: 'MARCUS-SHOWROOM-FLUX-v1.html' },
]

const treasureCoastSections = [
  {
    title: 'Treasure Coast Area',
    icon: MapPinned,
    pages: [
      { label: 'Treasure Coast Home Renovation', path: '/treasure-coast-home-renovation' },
      { label: 'Treasure Coast Kitchen Renovation', path: '/treasure-coast-kitchen-renovation' },
      { label: 'Treasure Coast Bathroom Renovation', path: '/treasure-coast-bathroom-renovation' },
    ],
  },
  {
    title: 'Kitchen Renovation',
    icon: MapPinned,
    pages: [
      { label: 'Palm City Kitchen Renovation', path: '/palm-city-kitchen-renovation' },
      { label: 'Sailfish Point Kitchen Renovation', path: '/sailfish-point-kitchen-renovation' },
      { label: "Sewall's Point Kitchen Renovation", path: '/sewalls-point-kitchen-renovation' },
      { label: 'Hutchinson Island Kitchen Renovation', path: '/hutchinson-island-kitchen-renovation' },
    ],
  },
  {
    title: 'Bathroom Renovation',
    icon: MapPinned,
    pages: [
      { label: 'Palm City Bathroom Renovation', path: '/palm-city-bathroom-renovation' },
      { label: 'Sailfish Point Bathroom Renovation', path: '/sailfish-point-bathroom-renovation' },
      { label: "Sewall's Point Bathroom Renovation", path: '/sewalls-point-bathroom-renovation' },
      { label: 'Hutchinson Island Bathroom Renovation', path: '/hutchinson-island-bathroom-renovation' },
    ],
  },
  {
    title: 'Handyman Services',
    icon: MapPinned,
    pages: [
      { label: 'Palm City Handyman Services', path: '/palm-city-handyman-services' },
      { label: 'Sailfish Point Handyman Services', path: '/sailfish-point-handyman-services' },
      { label: "Sewall's Point Handyman Services", path: '/sewalls-point-handyman-services' },
      { label: 'Hutchinson Island Handyman Services', path: '/hutchinson-island-handyman-services' },
    ],
  },
  {
    title: 'TV Mounting',
    icon: MapPinned,
    pages: [
      { label: 'Palm City TV Mounting', path: '/palm-city-tv-mounting' },
      { label: 'Sailfish Point TV Mounting', path: '/sailfish-point-tv-mounting' },
      { label: "Sewall's Point TV Mounting", path: '/sewalls-point-tv-mounting' },
      { label: 'Hutchinson Island TV Mounting', path: '/hutchinson-island-tv-mounting' },
    ],
  },
  {
    title: 'Epoxy Flooring',
    icon: MapPinned,
    pages: [
      { label: 'Palm City Epoxy Flooring', path: '/palm-city-epoxy-flooring' },
      { label: 'Sailfish Point Epoxy Flooring', path: '/sailfish-point-epoxy-flooring' },
      { label: "Sewall's Point Epoxy Flooring", path: '/sewalls-point-epoxy-flooring' },
      { label: 'Hutchinson Island Epoxy Flooring', path: '/hutchinson-island-epoxy-flooring' },
      { label: 'Treasure Coast Epoxy Flooring', path: '/treasure-coast-epoxy-flooring' },
    ],
  },
]

const coreTemplatePages = [
  { label: 'Kitchen Remodel (Improved)', path: '/kitchen-remodel' },
  { label: 'Kitchen Remodel (Legacy)', path: '/kitchen-remodel-old' },
  { label: 'Bathroom Remodel (Improved)', path: '/bathroom-remodel' },
  { label: 'Bathroom Remodel Elite', path: '/bathrooms-elite' },
  { label: 'Bathroom Remodel (Legacy)', path: '/bathroom-remodel-old' },
  { label: 'Bathroom Repairs Landing', path: '/bathroom-repairs' },
  { label: 'Handyman Services (Improved)', path: '/handyman-services' },
  { label: 'Handyman Services With Pricing', path: '/handyman-services-pricing' },
  { label: 'Handyman Services (Legacy)', path: '/handyman-services-old' },
  { label: 'TV Mounting Landing', path: '/tv-mounting' },
]

const localBathroomPages = [
  { label: 'Sailfish Point Bathroom Remodel', path: '/sailfish-point-bathroom-remodel' },
  { label: "Sewall's Point Bathroom Remodel", path: '/sewalls-point-bathroom-remodel' },
  { label: 'Palm City Bathroom Remodel', path: '/palm-city-bathroom-remodel' },
  { label: 'Hutchinson Island Bathroom Remodel', path: '/hutchinson-island-bathroom-remodel' },
  { label: 'Stuart Bathroom Remodel', path: '/stuart-bathroom-remodel' },
]

// Work Order Data Structure
const clientWorkOrders = [
  {
    company: 'Nordstrom',
    contacts: [
      {
        name: 'Sally Haddad',
        orders: [
           { label: 'Staircase Painting & Revival (Dec 10)', file: 'nordstrom-painting-sally-staircase.html' },
           { label: 'Nordstrom Template (Staircase Example)', file: 'nordstrom-estimate-template-example.html' },
           { label: 'Painting & Doors Quote (Dec 2)', file: 'nordstrom-painting-sally.html' },
           { label: 'Staircase Project', file: 'nordstrom-stair-sally.html' },
        ]
      },
      {
        name: 'Chase McCullon',
        orders: [
          { label: 'Tile Work (v3)', file: 'nordstrom-tile-chase.html' },
          { label: 'General Estimate (v3)', file: 'kmjk_estimate_chase_mccullon_v3.html' },
          { label: 'Metal Doors (v3)', file: 'kmjk_estimate_chase_metal_doors_v3.html' },
          { label: 'Painting (v3)', file: 'kmjk_estimate_chase_painting_v3.html' },
          { label: 'Stair Rails (v3)', file: 'kmjk_estimate_chase_stair_rails_v3.html' },
          { label: 'Tile (v3)', file: 'kmjk_estimate_chase_tile_v3.html' },
          { label: 'Carpet Additional', file: 'kmjk_estimate_chase_mccullon_carpet_additional.html' },
          { label: 'Estimate (v2)', file: 'kmjk_estimate_chase_mccullon_v2.html' },
          { label: 'Rehab Estimate', file: 'kmjk_estimate_chase_mccullon_rehab.html' },
          { label: 'Chairs Estimate', file: 'kmjk_estimate_chase_mccullon_chairs.html' },
          { label: 'Original Estimate', file: 'kmjk_estimate_chase_mccullon.html' },
        ]
      },
      {
        name: 'General / Unspecified',
        orders: [
            { label: 'Carpet Estimate', file: 'kmjk_estimate_nordstrom_carpet.html' },
            { label: 'Carpet Additional', file: 'kmjk_estimate_nordstrom_carpet_additional.html' },
        ]
      }
    ]
  },
  {
    company: 'Frank Alsayed',
    contacts: [
        {
            name: 'Frank Alsayed',
            orders: [
                { label: 'Paint Estimate', file: 'KMJK ESTIMATE FRANK ALSAYED PAINT.html' }
            ]
        }
    ]
  }
]

const templatesAndForms = [
    { label: 'Contractor Intake Form', file: 'kmjk_contractor_intake_form.html' },
    { label: 'New Modern Work Order Template', file: 'kmjk-modern-work-order.html' },
    { label: 'Modern Luxe Template', file: 'kmjk_estimate_template_modern_luxe.html' },
    { label: 'Signature Template', file: 'kmjk_estimate_template_signature.html' },
    { label: 'Signature Template (Paid)', file: 'kmjk_estimate_template_signature_paid.html' },
    { label: 'Agreement', file: 'kmjkagreementesh.html' },
    { label: 'Cash App Template', file: 'KMJK CASHAPPTEMPLATE.html' },
]

const calculators = [
    { label: 'Foresh2C Calculator', file: 'calculatorforesh2c.html' },
    { label: 'Stretch Ceiling Calculator', file: 'stretch-ceiling-calculator.html' },
]

const partnerships = [
    { label: 'NH Kitchen Partnership', file: 'nh-kitchen-partnership.html' },
    { label: 'Skyline Partnership', file: 'skyline-partnership.html' },
]

const maintenanceProposals = [
    { label: 'Owner Proposal One-Page', file: '01_Owner_Proposal_OnePage.html' },
    { label: 'Add-On Menu Pricing', file: '02_AddOn_Menu_Pricing.html' },
    { label: 'Josue Internal Pitch Sheet', file: '03_Josue_Internal_PitchSheet.html' },
    { label: 'Contract Architect Persona', file: '04_Contract_Architect_Persona.html' },
    { label: 'Agreement Requirements', file: '05_Agreement_Requirements.html' },
    { label: 'Master Service Agreement (MSA)', file: '06_Master_Service_Agreement.html' },
]

const DashboardCard = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-white/60 overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 bg-[var(--deep-charcoal)]/90 text-white">
      {Icon && <Icon size={20} className="text-[var(--brushed-gold)]" />}
      <h3 className="text-lg font-semibold tracking-wide uppercase">{title}</h3>
    </div>
    <div className="px-6 py-5 space-y-4">{children}</div>
  </div>
)

const LinkGrid = ({ items }) => (
  <div className="grid gap-3 sm:grid-cols-2">
    {items.map((item) => (
      <a
        key={item.path || item.file}
        href={item.path || `/${encodeURI(item.file)}`}
        className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white/60 px-4 py-3 hover:border-[var(--brushed-gold)] hover:bg-[var(--brushed-gold)]/10 transition-colors"
        target={item.path ? undefined : '_blank'}
        rel={item.path ? undefined : 'noopener noreferrer'}
      >
        <span className="text-sm font-medium text-[var(--deep-charcoal)] group-hover:text-[var(--deep-charcoal)]">
          {item.label}
        </span>
        <ExternalLink size={16} className="text-gray-400 group-hover:text-[var(--brushed-gold)]" />
      </a>
    ))}
  </div>
)

export default function InternalDashboard() {
  useEffect(() => {
    document.title = 'KMJK Internal Dashboard'
  }, [])

  const treasureCoastCount = useMemo(
    () => treasureCoastSections.reduce((total, section) => total + section.pages.length, 0),
    []
  )

  const workOrderCount = useMemo(() => {
    return clientWorkOrders.reduce((total, company) => {
        return total + company.contacts.reduce((cTotal, contact) => cTotal + contact.orders.length, 0)
    }, 0)
  }, [])

  return (
    <div className="pt-20 pb-24 bg-[var(--warm-off-white)] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        <header className="bg-white rounded-2xl shadow-xl border border-white/70 p-8 space-y-6">
          <div className="flex items-center gap-3 text-[var(--deep-charcoal)]">
            <LayoutDashboard size={28} className="text-[var(--brushed-gold)]" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">KMJK Internal Dashboard</h1>
              <p className="text-gray-600">Reference hub for work orders, landing pages, and resources.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="px-4 py-2 rounded-full bg-[var(--brushed-gold)]/10 text-[var(--deep-charcoal)]">
              {workOrderCount} Active Work Orders
            </span>
            <span className="px-4 py-2 rounded-full bg-[var(--brushed-gold)]/10 text-[var(--deep-charcoal)]">
              {treasureCoastCount} Treasure Coast pages
            </span>
            <span className="px-4 py-2 rounded-full bg-[var(--brushed-gold)]/10 text-[var(--deep-charcoal)]">
              {templatesAndForms.length} Templates & Forms
            </span>
          </div>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline" className="bg-white text-[var(--deep-charcoal)]">
                Back to Site Home
              </Button>
            </Link>
            <a href="https://kmjk.pro" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[var(--deep-charcoal)] text-white hover:bg-[var(--brushed-gold)]">
                View Live Site
              </Button>
            </a>
          </div>
        </header>

        {/* PSR Homes Maintenance Section */}
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <FileInput className="text-[var(--deep-charcoal)]" size={24} />
                <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">PSR Homes Maintenance</h2>
            </div>
            <DashboardCard title="Maintenance Proposals" icon={FileText}>
                <LinkGrid items={maintenanceProposals} />
            </DashboardCard>
        </section>

        {/* Client Work Orders Section */}
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <Building2 className="text-[var(--deep-charcoal)]" size={24} />
                <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">Client Work Orders</h2>
            </div>
            
            <div className="grid gap-6">
                {clientWorkOrders.map((company) => (
                    <div key={company.company} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-[var(--brushed-gold)] mb-6 flex items-center gap-2">
                            <Building2 size={20} />
                            {company.company}
                        </h3>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {company.contacts.map((contact) => (
                                <div key={contact.name} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-4 text-[var(--deep-charcoal)] font-semibold border-b border-gray-200 pb-2">
                                        <User size={16} className="text-gray-400" />
                                        {contact.name}
                                    </div>
                                    <div className="space-y-2">
                                        {contact.orders.map((order) => (
                                            <a
                                                key={order.file}
                                                href={`/${encodeURI(order.file)}`}
                                                className="block text-sm p-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[var(--brushed-gold)] flex justify-between items-center group"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="truncate pr-2">{order.label}</span>
                                                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Epoxy Pitch Decks Section */}
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <Layers className="text-[var(--deep-charcoal)]" size={24} />
                <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">Epoxy Flooring Pitch Decks</h2>
            </div>
            <DashboardCard title="Professional Pitch Decks (Print-Ready)" icon={Layers}>
                <div className="space-y-3">
                    <p className="text-sm text-gray-600">7 professional pitch decks for different epoxy applications. Each opens in a new tab - print or save as PDF.</p>
                    <LinkGrid items={epoxyPitchDecks} />
                </div>
            </DashboardCard>
        </section>

        {/* MARCUS FLUX CHEN DECKS SECTION */}
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <Layers className="text-[var(--brushed-gold)]" size={24} />
                <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">Marcus "Flux" Chen Decks</h2>
            </div>
            <DashboardCard title="Flux Protocol - Diagnostic Approach" icon={Layers}>
                <div className="space-y-3">
                    <p className="text-sm text-gray-600">7 advanced pitch decks by Marcus "Flux" Chen. Diagnostic-first approach with technical specification tables and detailed sales guides.</p>
                    <LinkGrid items={marcusFluxDecks} />
                </div>
            </DashboardCard>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)] flex items-center gap-2">
                    <FileInput size={24} />
                    Templates & Resources
                </h2>
                
                <DashboardCard title="Templates & Forms" icon={FileText}>
                    <LinkGrid items={templatesAndForms} />
                </DashboardCard>
                
                <DashboardCard title="Calculators" icon={Calculator}>
                    <LinkGrid items={calculators} />
                </DashboardCard>

                <DashboardCard title="Partnerships" icon={Handshake}>
                    <LinkGrid items={partnerships} />
                </DashboardCard>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)] flex items-center gap-2">
                    <MapPinned size={24} />
                    Landing Pages
                </h2>
                
                <DashboardCard title="Primary Landing Pages" icon={LayoutDashboard}>
                    <LinkGrid items={coreTemplatePages} />
                </DashboardCard>
                
                <DashboardCard title="Localized Bathroom Pages" icon={MapPinned}>
                    <LinkGrid items={localBathroomPages} />
                </DashboardCard>
            </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">Treasure Coast Directory</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {treasureCoastSections.map((section) => (
              <DashboardCard key={section.title} title={section.title} icon={section.icon}>
                <LinkGrid items={section.pages} />
              </DashboardCard>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
