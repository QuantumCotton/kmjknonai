import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { LayoutDashboard, ExternalLink, FileText, MapPinned, FileSpreadsheet } from 'lucide-react'

const treasureCoastSections = [
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

const staticFileEntries = [
  { label: 'KMJK Contractor Intake Form', file: 'kmjk_contractor_intake_form.html' },
  { label: 'Estimate – Chase McCullon', file: 'kmjk_estimate_chase_mccullon.html' },
  { label: 'Estimate – Chase McCullon (Chairs)', file: 'kmjk_estimate_chase_mccullon_chairs.html' },
  { label: 'Estimate – Chase McCullon Rehab', file: 'kmjk_estimate_chase_mccullon_rehab.html' },
  { label: 'Estimate – Chase McCullon v2', file: 'kmjk_estimate_chase_mccullon_v2.html' },
  { label: 'Estimate – Nordstrom Carpet', file: 'kmjk_estimate_nordstrom_carpet.html' },
  { label: 'Estimate – Nordstrom Carpet (Alt)', file: 'kmjk_estimate_nordstrom_carpet copy.html' },
  { label: 'Estimate Template – Modern Luxe', file: 'kmjk_estimate_template_modern_luxe.html' },
  { label: 'Estimate Template – Signature', file: 'kmjk_estimate_template_signature.html' },
  { label: 'Estimate Template – Signature (Paid)', file: 'kmjk_estimate_template_signature_paid.html' },
  { label: 'Agreement – KMJK', file: 'kmjkagreementesh.html' },
  { label: 'Calculator – Foresh2C', file: 'calculatorforesh2c.html' },
  { label: 'Partnership – NH Kitchen', file: 'nh-kitchen-partnership.html' },
  { label: 'Partnership – Skyline', file: 'skyline-partnership.html' },
  { label: 'Trent Sundrop PDF', file: 'trent sundrop.pdf' },
]

const staticDocuments = staticFileEntries.map(({ label, file }) => ({
  label,
  href: `/${encodeURI(file)}`,
}))

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
        key={item.path || item.href}
        href={item.path || item.href}
        className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white/60 px-4 py-3 hover:border-[var(--brushed-gold)] hover:bg-[var(--brushed-gold)]/10 transition-colors"
        target={item.href ? '_blank' : undefined}
        rel={item.href ? 'noopener noreferrer' : undefined}
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

  return (
    <div className="pt-20 pb-24 bg-[var(--warm-off-white)] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        <header className="bg-white rounded-2xl shadow-xl border border-white/70 p-8 space-y-6">
          <div className="flex items-center gap-3 text-[var(--deep-charcoal)]">
            <LayoutDashboard size={28} className="text-[var(--brushed-gold)]" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">KMJK Internal Dashboard</h1>
              <p className="text-gray-600">Reference hub for Treasure Coast landing pages, core templates, and client documents.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="px-4 py-2 rounded-full bg-[var(--brushed-gold)]/10 text-[var(--deep-charcoal)]">
              {treasureCoastCount} Treasure Coast pages
            </span>
            <span className="px-4 py-2 rounded-full bg-[var(--brushed-gold)]/10 text-[var(--deep-charcoal)]">
              {coreTemplatePages.length} core templates
            </span>
            <span className="px-4 py-2 rounded-full bg-[var(--brushed-gold)]/10 text-[var(--deep-charcoal)]">
              {staticDocuments.length} documents & resources
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

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">Treasure Coast Landing Pages</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {treasureCoastSections.map((section) => (
              <DashboardCard key={section.title} title={section.title} icon={section.icon}>
                <LinkGrid items={section.pages} />
              </DashboardCard>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">Core Service Templates</h2>
          <DashboardCard title="Primary Landing Pages" icon={LayoutDashboard}>
            <LinkGrid items={coreTemplatePages} />
          </DashboardCard>
          <DashboardCard title="Localized Bathroom Pages" icon={MapPinned}>
            <LinkGrid items={localBathroomPages} />
          </DashboardCard>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">Documents & Resources</h2>
          <DashboardCard title="Receipts, Estimates & Forms" icon={FileText}>
            <div className="grid gap-3 sm:grid-cols-2">
              {staticDocuments.map((doc) => (
                <a
                  key={doc.href}
                  href={doc.href}
                  className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white/70 px-4 py-3 hover:border-[var(--brushed-gold)] hover:bg-[var(--brushed-gold)]/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm font-medium text-[var(--deep-charcoal)]">
                    {doc.label}
                  </span>
                  <FileSpreadsheet size={16} className="text-gray-400 group-hover:text-[var(--brushed-gold)]" />
                </a>
              ))}
            </div>
          </DashboardCard>
        </section>
      </div>
    </div>
  )
}
