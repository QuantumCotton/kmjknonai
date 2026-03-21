import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
// framer-motion available if needed
import {
  Menu,
  X,
  Phone,
  Mail,
  Flame,
  Shield,
  Layers,
  Factory,
  Car,
  ChefHat,
  Plane,
  Sparkles,
  Paintbrush,
  FlaskConical,
  ChevronRight,
  Star,
  Droplets,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'
import {
  KMJK_CONTACT_NAME,
  KMJK_PHONE_DISPLAY,
  KMJK_PHONE_CALL_LINK,
  KMJK_EMAIL,
  SWAY_CONTACT_NAME,
  SWAY_PHONE_DISPLAY,
  SWAY_PHONE_CALL_LINK,
} from '@/constants/contact.js'
import ContactForm from '@/components/ContactForm.jsx'
import InternalDashboard from './pages/InternalDashboard.jsx'
import Dashboard from './pages/Dashboard.jsx'
import History from './pages/History.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import MetaPixelTracker from './components/MetaPixelTracker.jsx'

const IMG = {
  heroGarage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80',
  epoxyFloor1: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
  industrial: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&q=80',
  warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  hangar: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
  showroom: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
  team: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  chemist: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
  metallic: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  commercial: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  garage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
  paint: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80',
  concrete: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
}

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/science', label: 'The Science' },
    { path: '/contact', label: 'Get a Quote' },
  ]
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--gunmetal)]/95 backdrop-blur-md text-white shadow-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] flex items-center justify-center">
              <Layers size={22} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-wide leading-tight">TC ELITE EPOXY</div>
              <div className="text-[10px] tracking-[0.25em] text-[var(--epoxy-cyan)] uppercase">Treasure Coast</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors hover:text-[var(--epoxy-cyan)] ${location.pathname === link.path ? 'text-[var(--epoxy-cyan)]' : 'text-gray-300'}`}>{link.label}</Link>
            ))}
            <a href={KMJK_PHONE_CALL_LINK} className="flex items-center space-x-1.5 bg-[var(--epoxy-blue)] hover:bg-[var(--epoxy-cyan)] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
              <Phone size={14} /><span>{KMJK_PHONE_DISPLAY}</span>
            </a>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`block py-3 text-sm font-medium ${location.pathname === link.path ? 'text-[var(--epoxy-cyan)]' : 'text-gray-300'}`} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
            ))}
            <a href={KMJK_PHONE_CALL_LINK} className="flex items-center justify-center gap-2 bg-[var(--epoxy-blue)] text-white py-3 rounded-lg font-semibold mt-4">
              <Phone size={16} /> Call {KMJK_PHONE_DISPLAY}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-[var(--obsidian)] text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] flex items-center justify-center"><Layers size={22} className="text-white" /></div>
              <div>
                <div className="text-lg font-bold text-white tracking-wide">TC ELITE EPOXY</div>
                <div className="text-[10px] tracking-[0.25em] text-[var(--epoxy-cyan)] uppercase">Treasure Coast</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-md">Florida's premier epoxy and coating specialists. Custom Novolac resins, ceramic microspheres, and polyaspartic topcoats engineered for 500°F heat resistance and 20+ year durability.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              {['Garage Floors', 'Commercial Flooring', 'Kitchen Countertops', 'Industrial Systems', 'Aircraft Hangars', 'Enhanced Paints'].map(s => (
                <li key={s}><Link to="/services" className="hover:text-[var(--epoxy-cyan)] transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href={KMJK_PHONE_CALL_LINK} className="flex items-center gap-2 hover:text-[var(--epoxy-cyan)]"><Phone size={14} /> {KMJK_PHONE_DISPLAY}</a>
              <a href={SWAY_PHONE_CALL_LINK} className="flex items-center gap-2 hover:text-[var(--epoxy-cyan)]"><Phone size={14} /> {SWAY_PHONE_DISPLAY}</a>
              <a href={`mailto:${KMJK_EMAIL}`} className="flex items-center gap-2 hover:text-[var(--epoxy-cyan)]"><Mail size={14} /> {KMJK_EMAIL}</a>
              <p className="text-xs mt-4 text-gray-500">Jensen Beach, FL &bull; Stuart &bull; Palm City<br />Serving the entire Treasure Coast</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Treasure Coast Elite Epoxy. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Ceramic-Infused &bull; Novolac-Reinforced &bull; Polyaspartic-Armored</p>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  const services = [
    { title: 'Garage Floors', icon: Car, desc: 'Showroom-quality polyaspartic systems. 1-day install, lifetime durability.', link: '/services' },
    { title: 'Commercial & Industrial', icon: Factory, desc: 'Chemical-resistant Novolac systems for warehouses, labs, and factories.', link: '/services' },
    { title: 'Kitchen Countertops', icon: ChefHat, desc: '500°F heat-resistant surfaces that compete with granite and quartz.', link: '/services' },
    { title: 'Aircraft Hangars', icon: Plane, desc: 'Skydrol-resistant, fuel-proof flooring for aerospace environments.', link: '/services' },
    { title: 'Showrooms & Retail', icon: Sparkles, desc: 'Metallic epoxy and decorative flake systems that captivate customers.', link: '/services' },
    { title: 'Enhanced Paints', icon: Paintbrush, desc: 'Silane + microsphere infused paints for extreme durability.', link: '/services' },
  ]
  const stats = [
    { value: '500°F', label: 'Heat Resistance' },
    { value: '20+', label: 'Year UV Stability' },
    { value: '6H+', label: 'Pencil Hardness' },
    { value: '4x', label: 'Abrasion Resistance' },
  ]
  const tiers = [
    { name: 'Economy', temp: '140°F', color: 'from-gray-600 to-gray-700', desc: 'Standard Bisphenol A systems for rental properties and basements.', price: '$3-5/sq ft' },
    { name: 'Professional', temp: '180°F', color: 'from-[var(--epoxy-blue)] to-blue-700', desc: 'UV-stabilized with ceramic microspheres. Zero yellowing.', price: '$6-9/sq ft' },
    { name: 'Premium', temp: '500°F', color: 'from-amber-500 to-orange-600', desc: 'Novolac-reinforced, vacuum-degassed. Aerospace-grade chemistry.', price: '$10-18/sq ft' },
  ]
  return (
    <div className="pt-[72px]">
      <section className="relative min-h-[90vh] flex items-center" style={{ backgroundImage: `url(${IMG.heroGarage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <FlaskConical size={14} className="text-[var(--epoxy-cyan)]" />
              <span className="text-xs font-medium text-gray-200 uppercase tracking-wider">Formulation Scientists &bull; Master Installers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              The Treasure Coast's<br /><span className="bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] bg-clip-text text-transparent">Elite Epoxy</span> Specialists
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              We don't just install epoxy. We <strong className="text-white">formulate it</strong>. Novolac resins, ceramic microspheres, polyaspartic armor — engineered for environments where failure is not an option.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact"><Button size="lg" className="bg-[var(--epoxy-blue)] hover:bg-[var(--epoxy-cyan)] text-white px-8 py-6 text-lg font-bold rounded-xl shadow-lg shadow-blue-500/25">Get Free Estimate <ChevronRight size={18} className="ml-1" /></Button></Link>
              <Link to="/science"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"><FlaskConical size={18} className="mr-2" /> See the Science</Button></Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--epoxy-cyan)]">{s.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--gunmetal)] mb-4">Why Competitors Can't Match Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Most contractors buy off-the-shelf kits. We manufacture custom formulations from raw industrial chemicals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FlaskConical, title: 'Custom Formulations', desc: 'We blend Novolac resins with Bisphenol A/F at precise stoichiometric ratios for your specific application.' },
              { icon: Flame, title: '500°F Heat Resistance', desc: 'Standard epoxy fails at 140°F. Our Novolac systems maintain integrity at 500°F — hot pans on the surface.' },
              { icon: Shield, title: '20-Year UV Stability', desc: 'Dual HALS + UVA protection with polyaspartic topcoats. Your floor will never yellow. Period.' },
            ].map((f, i) => (
              <div key={i} className="bg-[var(--ghost-white)] rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] flex items-center justify-center mb-5"><f.icon size={26} className="text-white" /></div>
                <h3 className="text-xl font-bold text-[var(--gunmetal)] mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--gunmetal)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Three Tiers. Every Budget.</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-xl mx-auto">From economy primers to aerospace-grade Novolac systems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <div className="flex items-center gap-1 text-amber-400"><Flame size={16} /><span className="text-sm font-bold">{tier.temp}</span></div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{tier.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-white">{tier.price}</span>
                    <Link to="/contact"><Button size="sm" className="bg-white/10 hover:bg-[var(--epoxy-blue)] text-white text-xs">Get Quote <ChevronRight size={14} /></Button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--gunmetal)] mb-4">What We Coat</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Link key={i} to={s.link} className="group">
                <div className="bg-[var(--ghost-white)] rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-[var(--epoxy-blue)]/20 transition-all h-full hover:-translate-y-1">
                  <s.icon size={40} className="text-[var(--epoxy-blue)] mb-4 group-hover:text-[var(--epoxy-cyan)] transition-colors" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[var(--gunmetal)] mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Ready for a Floor That Outlasts Everything?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Free on-site consultation with our formulation specialists.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"><Button size="lg" className="bg-white text-[var(--epoxy-blue)] hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-xl shadow-lg">Get Your Free Estimate</Button></Link>
            <a href={KMJK_PHONE_CALL_LINK}><Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"><Phone size={18} className="mr-2" /> Call Now</Button></a>
          </div>
        </div>
      </section>
    </div>
  )
}

function ServicesPage() {
  const cats = [
    { title: 'Residential Garage Floors', icon: Car, image: IMG.garage, desc: 'Transform your garage into a showroom with polyaspartic coating systems. Same-day return to service, hot-tire resistant, metallic and flake finishes.', features: ['1-day installation', 'Hot-tire pickup resistant', 'Decorative flake & metallic options', 'Lifetime residential warranty'], tier: 'Professional' },
    { title: 'Commercial & Industrial Flooring', icon: Factory, image: IMG.industrial, desc: 'Chemical-resistant Novolac systems for manufacturing, warehouses, and commercial facilities. Forklift traffic, chemical spills, heavy machinery.', features: ['Chemical resistance (acids, solvents, fuels)', 'Novolac resin for 500°F heat', 'Anti-slip quartz broadcast', 'Minimal downtime'], tier: 'Premium' },
    { title: 'Kitchen & Countertop Epoxy', icon: ChefHat, image: IMG.kitchen, desc: 'Chef-grade surfaces competing with granite and quartz. Novolac-ceramic formulation handles 500°F hot pans directly on the surface.', features: ['500°F heat resistance', '10-15% ceramic microsphere infusion', 'Vacuum degassed for clarity', 'Food-safe when cured'], tier: 'Premium' },
    { title: 'Aircraft Hangar Systems', icon: Plane, image: IMG.hangar, desc: 'Three-layer Skydrol-resistant flooring: phenalkamine barrier, Novolac body coat, polyaspartic UV armor.', features: ['Skydrol & jet fuel resistant', 'Phenalkamine moisture barrier', 'Broadcast quartz reinforcement', '20-year UV-stable topcoat'], tier: 'Premium' },
    { title: 'Showroom & Retail Floors', icon: Sparkles, image: IMG.showroom, desc: 'High-gloss metallic epoxy and decorative quartz systems. UV-stable polyaspartic topcoat ensures no yellowing.', features: ['Metallic marble & solid colors', 'Mirror-like gloss finish', 'UV-stable for storefronts', 'Scratch and scuff resistant'], tier: 'Professional' },
    { title: 'Enhanced Paint Systems', icon: Paintbrush, image: IMG.paint, desc: '3M ceramic microspheres and silane coupling agents turn ordinary paint into extraordinary protection.', features: ['3M microsphere hardness', 'Silane molecular bonding', 'HALS + UVA dual UV protection', 'Works with any paint system'], tier: 'Custom' },
  ]
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-[var(--gunmetal)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Our Coating Systems</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Every system is custom-formulated for your specific environment.</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          {cats.map((svc, i) => (
            <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:[direction:rtl] lg:*:[direction:ltr]' : ''}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={svc.image} alt={svc.title} className="w-full h-80 object-cover" />
                <div className="absolute top-4 right-4 bg-[var(--gunmetal)]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{svc.tier} Tier</div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] flex items-center justify-center"><svc.icon size={24} className="text-white" /></div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--gunmetal)]">{svc.title}</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{svc.desc}</p>
                <ul className="space-y-2 mb-6">
                  {svc.features.map((f, j) => (<li key={j} className="flex items-center gap-2 text-gray-700"><CheckCircle2 size={16} className="text-[var(--epoxy-blue)] shrink-0" />{f}</li>))}
                </ul>
                <Link to="/contact"><Button className="bg-[var(--epoxy-blue)] hover:bg-[var(--epoxy-cyan)] text-white rounded-xl font-semibold">Request a Quote <ChevronRight size={16} className="ml-1" /></Button></Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function GalleryPage() {
  const gallery = [
    { src: IMG.garage, title: 'Metallic Marble Garage', category: 'Garage' },
    { src: IMG.industrial, title: 'Industrial Warehouse System', category: 'Commercial' },
    { src: IMG.kitchen, title: 'Novolac Countertop Pour', category: 'Kitchen' },
    { src: IMG.hangar, title: 'Aircraft Hangar 3-Layer', category: 'Hangar' },
    { src: IMG.showroom, title: 'Showroom Metallic Finish', category: 'Showroom' },
    { src: IMG.commercial, title: 'Commercial Office Coating', category: 'Commercial' },
    { src: IMG.metallic, title: 'Residential Metallic Floor', category: 'Residential' },
    { src: IMG.concrete, title: 'Polyaspartic Clear Coat', category: 'Garage' },
    { src: IMG.lab, title: 'Laboratory Chemical Floor', category: 'Industrial' },
  ]
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Garage', 'Commercial', 'Kitchen', 'Hangar', 'Showroom', 'Residential', 'Industrial']
  const filtered = filter === 'All' ? gallery : gallery.filter(g => g.category === filter)
  return (
    <div className="pt-[72px]">
      <section className="py-16 bg-[var(--gunmetal)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Our Work</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto">Real projects. Real chemistry. Replace these with your own photos.</p>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-[var(--epoxy-blue)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <img src={item.src} alt={item.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-6">
                    <span className="text-xs text-[var(--epoxy-cyan)] uppercase tracking-wider font-bold">{item.category}</span>
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center"><p className="text-gray-500 italic">Placeholder images — tell us where to add your real project photos!</p></div>
        </div>
      </section>
    </div>
  )
}

function ProcessPage() {
  const steps = [
    { num: '01', title: 'Site Assessment', desc: 'We inspect your substrate, measure moisture vapor transmission, test pH, and document every condition.', icon: '�' },
    { num: '02', title: 'Formulation Design', desc: 'Based on traffic, chemicals, UV, heat — we specify the exact resin, hardener, and additive package.', icon: '🧪' },
    { num: '03', title: 'Surface Preparation', desc: 'Diamond grinding to CSP-3 profile minimum. Contaminants removed, mechanical bond created.', icon: '�' },
    { num: '04', title: 'Application', desc: 'Bucket brigade protocol. Each batch mixed to exact stoichiometry. Primer, body, broadcast, topcoat.', icon: '🎯' },
    { num: '05', title: 'Quality Verification', desc: 'DFT testing, adhesion pull tests, visual inspection. We verify against published specifications.', icon: '✓' },
  ]
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-[var(--gunmetal)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Our Process</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">From substrate analysis to final topcoat — every step is engineered and verified.</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">{step.icon}</div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-extrabold text-[var(--epoxy-blue)]">{step.num}</span>
                  <h3 className="text-xl font-bold text-[var(--gunmetal)]">{step.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-4 mt-16 text-center">
          <Link to="/contact"><Button size="lg" className="bg-[var(--epoxy-blue)] hover:bg-[var(--epoxy-cyan)] text-white px-8 py-6 text-lg font-bold rounded-xl">Start Your Project <ChevronRight size={18} className="ml-1" /></Button></Link>
        </div>
      </section>
    </div>
  )
}

function SciencePage() {
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-[var(--gunmetal)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
            <FlaskConical size={14} className="text-[var(--epoxy-cyan)]" />
            <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">Formulation Science</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">The Science Behind Elite Coatings</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">We don't sell mystery buckets. We engineer thermoset polymer networks from documented chemistries.</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-16">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--gunmetal)] mb-6">Resin Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Bisphenol A (DGEBA)', heat: '140°F', desc: 'The industry workhorse. Excellent adhesion. Economy tier.' },
                { name: 'Bisphenol A/F Blend', heat: '180°F', desc: 'Lower viscosity for bubble-free pours. UV package compatible.' },
                { name: 'Novolac EPN', heat: '500°F', desc: 'Functionality 2.5-3.6. Dense cross-linking. Aerospace grade.' },
              ].map((r, i) => (
                <div key={i} className="bg-[var(--ghost-white)] rounded-xl p-6 border border-gray-100">
                  <h3 className="font-bold text-[var(--gunmetal)] text-lg mb-2">{r.name}</h3>
                  <div className="flex items-center gap-2 mb-3"><Flame size={14} className="text-amber-500" /><span className="text-sm font-semibold text-amber-600">{r.heat}</span></div>
                  <p className="text-gray-600 text-sm">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--gunmetal)] mb-6">Our Additive Arsenal</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-[var(--gunmetal)] text-white"><th className="px-4 py-3 text-left rounded-tl-lg">Problem</th><th className="px-4 py-3 text-left">Solution</th><th className="px-4 py-3 text-left">Product</th><th className="px-4 py-3 text-left rounded-tr-lg">Loading</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Yellowing', 'UV Package', 'Tinuvin 292 (HALS) + 1130 (UVA)', '2-3%'],
                    ['Bubbles', 'Defoamer', 'BYK-A 530', '0.3-0.5%'],
                    ['Scratches', 'Hardness', '3M Microspheres W-610', '10-15%'],
                    ['Too Thick', 'Diluent', 'C12-C14 Glycidyl Ether', '5-15%'],
                    ['Wall Sag', 'Thixotrope', 'Fumed Silica (Cab-O-Sil)', '1-3%'],
                    ['Hot Pan Damage', 'Resin Upgrade', 'Novolac EPN', '60% blend'],
                  ].map((row, i) => (
                    <tr key={i} className="bg-white hover:bg-blue-50/50">
                      {row.map((cell, j) => (<td key={j} className={`px-4 py-3 ${j === 0 ? 'font-semibold text-[var(--gunmetal)]' : 'text-gray-600'}`}>{cell}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[var(--epoxy-blue)]/10 to-[var(--epoxy-cyan)]/10 rounded-2xl p-8 border border-[var(--epoxy-blue)]/20">
            <h3 className="text-2xl font-extrabold text-[var(--gunmetal)] mb-4">Why We Use BOTH UV Protectors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div><h4 className="font-bold text-[var(--epoxy-blue)] mb-2">HALS Alone</h4><p className="text-gray-600">Scavenges free radicals but UV still penetrates. Degradation slowed, not stopped.</p></div>
              <div><h4 className="font-bold text-[var(--epoxy-blue)] mb-2">UVA Alone</h4><p className="text-gray-600">Blocks UV photons like sunscreen, but depletes over time. Finite protection.</p></div>
              <div><h4 className="font-bold text-[var(--epoxy-cyan)] mb-2">HALS + UVA Combined</h4><p className="text-gray-600"><strong>Synergistic.</strong> UVA blocks photons while HALS repairs damage. Years of clarity.</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-[var(--gunmetal)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">About Us</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Formulation scientists and master installers — not hardware store kit applicators.</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-6 text-gray-700 leading-relaxed text-[17px]">
              <p><strong className="text-[var(--gunmetal)]">Treasure Coast Elite Epoxy</strong> was born from a fundamental frustration with the coatings industry: contractors buying mystery buckets from big-box stores, slapping them on concrete, and calling it a day. The results? Yellowed floors within months. Peeling under hot tires. Countertops that soften with a warm coffee mug.</p>
              <p>We decided to go upstream. Way upstream. Past the distributors, past the brand owners, all the way to the raw chemistry. We studied the molecular architecture of thermoset polymers — Epoxide Equivalent Weights, Amine Hydrogen ratios, cross-link density, and the precise stoichiometry that separates a coating that lasts 2 years from one that lasts 20.</p>
              <p>Our team holds deep expertise in resinous coating formulation. We understand why Novolac resins with a functionality of 3.6 create denser cross-linked networks than standard Bisphenol A. We know that 3M ceramic microspheres (W-610 grade) raise pencil hardness from 2H to 6H+ while actually <em>reducing</em> viscosity — because spheres act like ball bearings in fluid dynamics.</p>
              <p>We don't just know that HALS stabilizers prevent yellowing — we understand the free radical scavenging mechanism of Tinuvin 292 and why it must be paired with a UVA absorber like Tinuvin 1130 for synergistic protection. One blocks the UV photons; the other repairs the damage that gets through. Together, they provide years of crystal-clear stability.</p>
              <p>When a client asks about heat resistance, we don't guess. We explain that standard Bisphenol A softens at 140°F because its bifunctional architecture creates a loose network. Our Premium tier uses 60% Epoxy Phenol Novolac with IPDA-based cycloaliphatic amine hardeners, achieving 350-500°F heat deflection temperatures. A hot skillet directly on the surface. No damage.</p>
              <p>Our polyaspartic topcoats aren't just "clear coats" — they're aliphatic polyurea systems that provide 4x the abrasion resistance of epoxy, 100% UV stability for 20+ years, and return-to-service times measured in hours, not days. We use them on every garage floor and hangar we touch.</p>
              <p>We've extended this formulation expertise beyond epoxy. Using silane coupling agents and 3M microspheres, we enhance conventional paint systems — turning ordinary latex wall paint into a scratch-resistant, UV-armored coating. The same additive science that protects an aircraft hangar can protect your exterior walls.</p>
              <p>Based in Jensen Beach, Florida, we serve the entire Treasure Coast — Stuart, Palm City, Sailfish Point, Sewall's Point, Hutchinson Island, and beyond. Every project gets a custom formulation consultation. We analyze your environment, traffic patterns, chemical exposure risks, and UV conditions to specify the exact resin system, hardener chemistry, and additive package.</p>
              <p>We manufacture our own ceramic-reinforced, aerospace-grade resins. When competitors buy pre-mixed kits at $150/gallon, we formulate from raw chemicals at $45/gallon — passing the savings through in quality, not corner-cutting. More UV stabilizer. More ceramic. Better hardener.</p>
              <p>This is what separates an Elite installer from everyone else: <strong className="text-[var(--gunmetal)]">we control the chemistry</strong>. From the drum of Novolac resin to the final polyaspartic roller pass, every variable is specified, measured, and verified. That's not a slogan — it's our manufacturing protocol.</p>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <img src={IMG.chemist} alt="Formulation lab" className="rounded-2xl shadow-xl" />
              <img src={IMG.team} alt="Installation team" className="rounded-2xl shadow-xl" />
              <div className="bg-[var(--gunmetal)] text-white rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-[var(--epoxy-cyan)]">Our Formulation Stack</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><Droplets size={14} className="text-[var(--epoxy-cyan)]" /> Bisphenol A/F & Novolac Resins</li>
                  <li className="flex items-center gap-2"><FlaskConical size={14} className="text-[var(--epoxy-cyan)]" /> Cycloaliphatic & IPDA Hardeners</li>
                  <li className="flex items-center gap-2"><Shield size={14} className="text-[var(--epoxy-cyan)]" /> 3M Ceramic Microspheres (W-610)</li>
                  <li className="flex items-center gap-2"><Star size={14} className="text-[var(--epoxy-cyan)]" /> Tinuvin 292 HALS + 1130 UVA</li>
                  <li className="flex items-center gap-2"><Layers size={14} className="text-[var(--epoxy-cyan)]" /> Polyaspartic Topcoat Systems</li>
                  <li className="flex items-center gap-2"><Paintbrush size={14} className="text-[var(--epoxy-cyan)]" /> Silane Coupling Agents</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="pt-[72px]">
      <section className="py-16 bg-[var(--gunmetal)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Get Your Free Estimate</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--epoxy-blue)] to-[var(--epoxy-cyan)] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto">Tell us about your project and our formulation specialists will design the perfect coating system.</p>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[var(--ghost-white)] shadow-xl rounded-2xl p-8 border border-gray-100">
            <ContactForm
              title="Request a Coating Consultation"
              subtitle="Describe your space, environment, and goals."
              serviceType="Epoxy Coating Inquiry"
              subject="New Coating Estimate Request"
              buttonContext="Contact Page Form"
              onSubmit={() => {}}
            />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <a href={KMJK_PHONE_CALL_LINK} className="bg-[var(--ghost-white)] rounded-xl p-6 border border-gray-100 hover:border-[var(--epoxy-blue)] transition-all">
              <Phone size={24} className="mx-auto text-[var(--epoxy-blue)] mb-2" />
              <div className="font-bold text-[var(--gunmetal)]">Call {KMJK_CONTACT_NAME}</div>
              <div className="text-sm text-gray-500">{KMJK_PHONE_DISPLAY}</div>
            </a>
            <a href={SWAY_PHONE_CALL_LINK} className="bg-[var(--ghost-white)] rounded-xl p-6 border border-gray-100 hover:border-[var(--epoxy-blue)] transition-all">
              <Phone size={24} className="mx-auto text-[var(--epoxy-blue)] mb-2" />
              <div className="font-bold text-[var(--gunmetal)]">Call {SWAY_CONTACT_NAME}</div>
              <div className="text-sm text-gray-500">{SWAY_PHONE_DISPLAY}</div>
            </a>
            <a href={`mailto:${KMJK_EMAIL}`} className="bg-[var(--ghost-white)] rounded-xl p-6 border border-gray-100 hover:border-[var(--epoxy-blue)] transition-all">
              <Mail size={24} className="mx-auto text-[var(--epoxy-blue)] mb-2" />
              <div className="font-bold text-[var(--gunmetal)]">Email Us</div>
              <div className="text-sm text-gray-500">{KMJK_EMAIL}</div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <MetaPixelTracker />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Internal Tools */}
          <Route path="/internal-dashboard" element={<InternalDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

function StickyCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--gunmetal)]/95 backdrop-blur-md border-t border-white/10 shadow-lg md:hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-3 gap-2 text-sm">
        <a href={KMJK_PHONE_CALL_LINK} className="text-center py-2.5 rounded-lg bg-[var(--epoxy-blue)] text-white font-semibold">Call {KMJK_CONTACT_NAME}</a>
        <a href={SWAY_PHONE_CALL_LINK} className="text-center py-2.5 rounded-lg bg-[var(--steel-gray)] text-white font-semibold">Call {SWAY_CONTACT_NAME}</a>
        <Link to="/contact" className="text-center py-2.5 rounded-lg bg-[var(--epoxy-cyan)] text-white font-semibold">Quote</Link>
      </div>
    </div>
  )
}

function AppWrapper() {
  return (
    <>
      <App />
      <StickyCtaBar />
      <ChatWidget />
    </>
  )
}

export default AppWrapper
