import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Building2, 
  Wrench, 
  TreePine, 
  ClipboardCheck, 
  RefreshCw, 
  Phone, 
  Mail, 
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import {
  KMJK_PHONE_DISPLAY,
  KMJK_PHONE_CALL_LINK,
  KMJK_EMAIL,
  KMJK_COMPANY_NAME,
  KMJK_TAGLINE,
} from '@/constants/contact.js'
import ContactForm from '@/components/ContactForm.jsx'

const services = [
  {
    icon: Building2,
    title: 'Property Management',
    description: 'Full-service facilities management with dedicated labor pools, vendor coordination, and 24/7 emergency response.',
    features: ['Dedicated on-site teams', 'Vendor management', '24/7 emergency response', 'Budget planning']
  },
  {
    icon: Wrench,
    title: 'Facilities Maintenance',
    description: 'Preventive maintenance programs, HVAC, plumbing, electrical, and comprehensive building systems care.',
    features: ['Preventive maintenance', 'HVAC & mechanical', 'Plumbing & electrical', 'Building systems']
  },
  {
    icon: RefreshCw,
    title: 'Unit Turnovers',
    description: 'Fast, thorough make-ready services to minimize vacancy time and maximize rental income.',
    features: ['Quick turnaround', 'Deep cleaning', 'Paint & repairs', 'Inspection ready']
  },
  {
    icon: TreePine,
    title: 'Landscaping & Grounds',
    description: 'Professional groundskeeping, irrigation management, and curb appeal maintenance.',
    features: ['Lawn maintenance', 'Irrigation systems', 'Tree & shrub care', 'Seasonal color']
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance & Inspections',
    description: 'Code compliance audits, safety inspections, and permit coordination for peace of mind.',
    features: ['Code compliance', 'Safety audits', 'Permit coordination', 'Documentation']
  },
  {
    icon: Wrench,
    title: 'Renovations & Upgrades',
    description: 'Capital improvements, unit renovations, and property upgrades that increase value.',
    features: ['Kitchen & bath', 'Flooring', 'Common areas', 'ADA compliance']
  },
]

const stats = [
  { value: '500+', label: 'Units Managed' },
  { value: '24/7', label: 'Emergency Response' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Client Retention' },
]

const propertyTypes = [
  'Condominiums',
  'Apartment Complexes',
  'Townhome Communities',
  'Single-Family Rentals',
  'Multi-Family Properties',
  'HOA Communities',
  'Vacation Rentals',
  'Commercial Buildings',
]

const serviceAreas = [
  'Coral Springs',
  'Delray Beach', 
  'Lake Worth',
  'Boca Raton',
  'Stuart',
  'Palm City',
  'Jensen Beach',
  'Port St. Lucie',
]

export default function PropertyManagementLanding() {
  useEffect(() => {
    document.title = 'Property Management Services | KMJK Group | South Florida'
    
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'KMJK Group',
      description: 'Professional property management for condominiums, apartments, townhomes, and rental properties across South Florida.',
      telephone: '772-777-0622',
      email: 'info@kmjk.pro',
      areaServed: serviceAreas,
      serviceType: ['Property Management', 'Facilities Maintenance', 'Renovations', 'Landscaping'],
    }
    
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-[var(--ocean-slate)] to-[#0f2744]">
        <div className="absolute inset-0 bg-[url('/images/property-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center text-white">
          <div className="inline-block px-4 py-2 bg-[var(--sunset-gold)]/20 rounded-full text-[var(--sunset-gold)] text-sm font-medium mb-6">
            South Florida Property Services
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {KMJK_COMPANY_NAME}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
            {KMJK_TAGLINE}
          </p>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-10">
            Comprehensive property management, facilities maintenance, and renovation services 
            for condominiums, apartments, townhomes, rental properties, and HOAs across South Florida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={KMJK_PHONE_CALL_LINK}>
              <Button size="lg" className="bg-[var(--sunset-gold)] text-[var(--ocean-slate)] hover:bg-[var(--sunset-bronze)] px-8 py-6 text-lg">
                <Phone className="mr-2" size={20} />
                Call {KMJK_PHONE_DISPLAY}
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Request Proposal
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[var(--ocean-slate)] py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-[var(--sunset-gold)]">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[var(--coastal-white)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--ocean-slate)] mb-4">
              Comprehensive Property Services
            </h2>
            <p className="text-lg text-[var(--palm-silver)] max-w-2xl mx-auto">
              From day-to-day maintenance to major renovations, we handle every aspect of property care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--ocean-slate)]/10 flex items-center justify-center mb-6">
                  <service.icon className="text-[var(--ocean-slate)]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[var(--ocean-slate)] mb-3">{service.title}</h3>
                <p className="text-[var(--palm-silver)] mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="text-[var(--deep-teal)] mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--ocean-slate)] mb-6">
                Why Property Owners Choose KMJK Group
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--sunset-gold)]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-[var(--sunset-gold)]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--ocean-slate)] mb-1">24/7 Emergency Response</h3>
                    <p className="text-[var(--palm-silver)]">Round-the-clock availability for urgent maintenance and emergencies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--sunset-gold)]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="text-[var(--sunset-gold)]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--ocean-slate)] mb-1">Dedicated Teams</h3>
                    <p className="text-[var(--palm-silver)]">Consistent crews who know your property inside and out.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--sunset-gold)]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="text-[var(--sunset-gold)]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--ocean-slate)] mb-1">Licensed & Insured</h3>
                    <p className="text-[var(--palm-silver)]">Full coverage and compliance for your peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--coastal-white)] rounded-2xl p-8 shadow-xl">
              <ContactForm 
                title="Request a Property Assessment"
                subtitle="Tell us about your property and we'll prepare a customized service proposal."
                serviceType="Property Management"
                subject="Property Management Inquiry - KMJK Group"
                showBudget={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-[var(--coastal-white)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--ocean-slate)] mb-4">Properties We Serve</h2>
          <p className="text-[var(--palm-silver)] mb-8">From single units to large communities, we manage it all.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {propertyTypes.map((type) => (
              <span 
                key={type} 
                className="px-5 py-3 bg-white rounded-xl text-[var(--ocean-slate)] text-sm font-medium shadow-sm border border-gray-100"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-[var(--ocean-slate)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Serving South Florida</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {serviceAreas.map((area) => (
              <span 
                key={area} 
                className="px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="text-white/60 mt-6 text-sm">
            And surrounding communities throughout Palm Beach, Martin, and St. Lucie Counties
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--coastal-white)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ocean-slate)] mb-6">
            Ready to Elevate Your Property?
          </h2>
          <p className="text-lg text-[var(--palm-silver)] mb-10">
            Let's discuss how KMJK Group can streamline your property operations, 
            reduce costs, and enhance your investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={KMJK_PHONE_CALL_LINK}>
              <Button size="lg" className="bg-[var(--ocean-slate)] hover:bg-[var(--ocean-slate)]/90 px-8 py-6 text-lg">
                <Phone className="mr-2" size={20} />
                Call {KMJK_PHONE_DISPLAY}
              </Button>
            </a>
            <a href={`mailto:${KMJK_EMAIL}`}>
              <Button size="lg" variant="outline" className="border-[var(--ocean-slate)] text-[var(--ocean-slate)] hover:bg-[var(--ocean-slate)]/5 px-8 py-6 text-lg">
                <Mail className="mr-2" size={20} />
                {KMJK_EMAIL}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
