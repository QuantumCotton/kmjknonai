import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Phone,
  Mail,
  Home as HomeIcon,
  Briefcase,
  Image,
  Users,
  MessageSquare,
  Calendar,
  UtensilsCrossed,
  Bath,
  Hammer,
  Zap,
  Shield,
  Layers,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'
import {
  KMJK_CONTACT_NAME,
  KMJK_PHONE_DISPLAY,
  KMJK_PHONE_CALL_LINK,
  KMJK_PHONE_SMS_LINK,
  KMJK_EMAIL,
  SWAY_CONTACT_NAME,
  SWAY_PHONE_DISPLAY,
  SWAY_PHONE_CALL_LINK,
} from '@/constants/contact.js'
import CallTeamButtons from '@/components/CallTeamButtons.jsx'
import ContactForm from '@/components/ContactForm.jsx'

// Import images
import kitchenModern from './assets/kitchen_modern.jpg'
import bathroomLuxurySpa from './assets/bathroom_luxury_spa.jpg'
import customEntertainment from './assets/custom_entertainment.jpg'
import kitchenTimberlineChefSuite from './assets/portfolio/kitchen-timberline-chef-suite.jpg'
import kitchenSculptedMarbleGathering from './assets/portfolio/kitchen-sculpted-marble-gathering.jpg'
import bathroomMarbleAndOakSpa from './assets/portfolio/bathroom-marble-and-oak-spa.jpg'

// Import landing pages
import BathroomLanding from './pages/BathroomLanding.jsx'
import BathroomLandingImproved from './pages/BathroomLandingImproved.jsx'
import BathroomLandingElite from './pages/BathroomLandingElite.jsx'
import BathroomRepairsLanding from './pages/BathroomRepairsLanding.jsx'
import KitchenLanding from './pages/KitchenLanding.jsx'
import KitchenLandingImproved from './pages/KitchenLandingImproved.jsx'
import HandymanLanding from './pages/HandymanLanding.jsx'
import HandymanLandingWithPricing from './pages/HandymanLandingWithPricing.jsx'
import HandymanLandingImproved from './pages/HandymanLandingImproved.jsx'
import TVMountingLanding from './pages/TVMountingLanding.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import BathroomRemodelSailfishPoint from './pages/BathroomRemodelSailfishPoint.jsx'
import BathroomRemodelSewallsPoint from './pages/BathroomRemodelSewallsPoint.jsx'
import BathroomRemodelPalmCity from './pages/BathroomRemodelPalmCity.jsx'
import BathroomRemodelHutchinsonIsland from './pages/BathroomRemodelHutchinsonIsland.jsx'
import BathroomRemodelStuart from './pages/BathroomRemodelStuart.jsx'
import InternalDashboard from './pages/InternalDashboard.jsx'
import Dashboard from './pages/Dashboard.jsx'
import History from './pages/History.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import MetaPixelTracker from './components/MetaPixelTracker.jsx'
import {
  KitchenRenovationPalmCity,
  KitchenRenovationSailfishPoint,
  KitchenRenovationSewallsPoint,
  KitchenRenovationHutchinsonIsland,
  KitchenRenovationTreasureCoast,
} from './pages/TreasureCoast/KitchenRenovationPages.jsx'
import {
  HomeRenovationTreasureCoast,
} from './pages/TreasureCoast/HomeRenovationPages.jsx'
import TreasureCoastKitchenRenovation from './pages/TreasureCoastKitchenRenovationClean.jsx'
import TreasureCoastBathroomRenovation from './pages/TreasureCoastBathroomRenovationClean.jsx'
import ChristmasLightsLanding from './pages/ChristmasLightsLanding.jsx'
import GutterGuardLanding from './pages/GutterGuardLanding.jsx'
import RoofingLanding from './pages/RoofingLanding.jsx'
import CoatingsLanding from './pages/CoatingsLanding.jsx'
import EnergyRebatesLanding from './pages/EnergyRebatesLanding.jsx'
import {
  BathroomRenovationPalmCity,
  BathroomRenovationSailfishPoint,
  BathroomRenovationSewallsPoint,
  BathroomRenovationHutchinsonIsland,
  BathroomRenovationTreasureCoast,
} from './pages/TreasureCoast/BathroomRenovationPages.jsx'
import {
  HandymanPalmCity,
  HandymanSailfishPoint,
  HandymanSewallsPoint,
  HandymanHutchinsonIsland,
} from './pages/TreasureCoast/HandymanPages.jsx'
import {
  TvMountingPalmCity,
  TvMountingSailfishPoint,
  TvMountingSewallsPoint,
  TvMountingHutchinsonIsland,
} from './pages/TreasureCoast/TVMountingPages.jsx'
import {
  EpoxyPalmCity,
  EpoxySailfishPoint,
  EpoxySewallsPoint,
  EpoxyHutchinsonIsland,
} from './pages/TreasureCoast/EpoxyFlooringPages.jsx'

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/portfolio', label: 'Portfolio', icon: Image },
    { path: '/services', label: 'Services', icon: Briefcase },
    { path: '/process', label: 'Our Process', icon: Briefcase },
    { path: '/about', label: 'About Us', icon: Users },
    { path: '/contact', label: 'Contact', icon: MessageSquare },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--deep-charcoal)] text-[var(--warm-off-white)] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-wider">
              KMJK
              <div className="h-0.5 bg-[var(--brushed-gold)] mt-1"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-[var(--brushed-gold)] transition-colors ${
                  location.pathname === link.path ? 'text-[var(--brushed-gold)]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm">
            <a
              href={KMJK_PHONE_CALL_LINK}
              className="flex items-center space-x-1 hover:text-[var(--brushed-gold)] transition-colors"
            >
              <Phone size={16} />
              <span>Call {KMJK_PHONE_DISPLAY}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 hover:text-[var(--brushed-gold)] transition-colors ${
                  location.pathname === link.path ? 'text-[var(--brushed-gold)]' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-600">
              <a href={KMJK_PHONE_CALL_LINK} className="flex items-center space-x-2 py-2">
                <Phone size={16} />
                <span>Call {KMJK_PHONE_DISPLAY}</span>
              </a>
              <a href={`mailto:${KMJK_EMAIL}`} className="flex items-center space-x-2 py-2">
                <Mail size={16} />
                <span>{KMJK_EMAIL}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-[var(--deep-charcoal)] text-[var(--warm-off-white)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              KMJK
              <div className="h-0.5 bg-[var(--brushed-gold)] w-16 mt-1"></div>
            </h3>
            <p className="text-sm text-gray-300">
              Exceptional Craftsmanship.<br />
              A Seamless Experience.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm">
              <a
                href={KMJK_PHONE_CALL_LINK}
                className="flex items-center space-x-2 hover:text-[var(--brushed-gold)] transition-colors"
              >
                <Phone size={16} />
                <span>Call {KMJK_CONTACT_NAME}</span>
              </a>
              <a
                href={`mailto:${KMJK_EMAIL}`}
                className="flex items-center space-x-2 hover:text-[var(--brushed-gold)] transition-colors"
              >
                <Mail size={16} />
                <span>{KMJK_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="font-semibold mb-4">Service Area</h4>
            <p className="text-sm text-gray-300">
              Proudly serving Stuart, Florida,<br />
              and the Treasure Coast.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} KMJK Home Improvement. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${kitchenModern})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content max-w-4xl px-4">
          <div className="logo-text">KMJK</div>
          <div className="logo-underline"></div>
          <h1 className="tagline">Exceptional Craftsmanship. A Seamless Experience.</h1>
          <div className="flex flex-col gap-4 justify-center mt-8">
            <CallTeamButtons className="sm:justify-center max-w-xl" tone="transparent" iconSize={20} showNumbers={false} />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 px-8 py-6 text-lg border border-white/60"
                >
                  <Calendar className="mr-2" size={20} />
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            KMJK Home Improvement is dedicated to transforming homes through meticulous craftsmanship and an unwavering commitment to client satisfaction. We believe a renovation should be an exciting journey, not a stressful ordeal.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-[var(--warm-off-white)]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: 'Kitchens', image: kitchenModern, description: 'Transform your kitchen into a culinary masterpiece' },
              { title: 'Bathrooms', image: bathroomLuxurySpa, description: 'Create your personal spa retreat' },
              { title: 'Custom Projects', image: customEntertainment, description: 'Bring your unique vision to life' },
            ].map((service, index) => (
              <Link key={index} to="/portfolio">
                <div className="service-card bg-white rounded-lg overflow-hidden shadow-lg">
                  <img src={service.image} alt={service.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 gold-accent">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function PortfolioPage() {
  const projects = [
    {
      title: 'Timberline Chef Suite Kitchen',
      image: kitchenTimberlineChefSuite,
      description: 'Dual islands, pro-grade appliances, and warm brass accents create a hardworking family kitchen framed by scenic backyard views.',
    },
    {
      title: 'Sculpted Marble Gathering Kitchen',
      image: kitchenSculptedMarbleGathering,
      description:
        'High-performance Ballistix epoxy pours mimic marble across the waterfall island and backsplashes, and we completed the coordinating bathroom below—including the shower—for the same client.',
    },
    {
      title: 'Marble & Oak Spa Bathroom',
      image: bathroomMarbleAndOakSpa,
      description: 'Elegant marble surfaces paired with warm oak accents create a sophisticated spa-like retreat with timeless appeal.',
    },
    {
      title: 'Commercial & Garage Coatings',
      image: '/images/coatings/garage_luxury_car_1.jpg',
      description: 'Industrial-strength polyaspartic coatings delivering showroom-quality finishes for garages, warehouses, and commercial spaces.',
      link: '/coatings'
    },
    {
      title: 'Architectural Holiday Lighting',
      image: '/images/christmas/xMOlBro1eft6.jpg',
      description: 'Professional, custom-designed holiday lighting installations that transform homes into festive masterpieces with safety and precision.',
      link: '/christmas-lights'
    },
    {
      title: 'Advanced Roofing Systems',
      image: '/images/roofing/myRMkVSacYD2.jpg',
      description: 'GAF Timberline HDZ roofing installations featuring LayerLock technology for infinite wind speed protection and superior durability.',
      link: '/roofing'
    },
    {
      title: 'Energy Efficiency Upgrades',
      image: '/images/energy/florida-concept-savings.jpg',
      description: 'Comprehensive home energy audits and upgrades funded by government incentives. Save up to 50% on HVAC, windows, and insulation costs.',
      link: '/energy-rebates'
    },
  ]

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-title">Our Portfolio</h1>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our curated showcase of exceptional projects. Each renovation tells a story of collaboration, craftsmanship, and transformation.
          </p>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <div key={index} className="bg-[var(--warm-off-white)] rounded-lg overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <img src={project.image} alt={project.title} className="portfolio-image w-full h-full object-cover" />
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-4 gold-accent">{project.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">{project.description}</p>
                    <div className="mt-6">
                      <Link to={project.link || '/gallery'}>
                        <Button className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)]">
                          {project.link ? 'View Service Details' : 'View Full Gallery'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ServicesPage() {
  const services = [
    {
      title: 'Full Kitchen Remodels',
      description:
        'From concept to completion, we transform kitchens into functional, beautiful spaces that become the heart of your home. Our comprehensive approach includes design consultation, custom cabinetry, countertop selection, appliance installation, and finishing touches.',
      icon: UtensilsCrossed,
    },
    {
      title: 'Luxury Bathroom Renovations',
      description:
        'Create your personal spa retreat with our luxury bathroom renovation services. We specialize in high-end finishes, custom tile work, modern fixtures, and thoughtful layouts that maximize both style and functionality.',
      icon: Bath,
    },
    {
      title: 'Custom Cabinetry & Millwork',
      description:
        "Our master craftsmen create bespoke cabinetry and millwork that seamlessly integrates with your home's architecture. From built-in bookcases to custom closets, we bring your vision to life with precision and artistry.",
      icon: Hammer,
      link: '/portfolio'
    },
    {
      title: 'Christmas Light Installation',
      description: 'Professional, all-inclusive holiday lighting services. We handle everything from design and installation to maintenance, removal, and climate-controlled storage. Enjoy a spectacular display without the hassle or risk.',
      icon: Zap,
      link: '/christmas-lights'
    },
    {
      title: 'Gutter Guard Protection',
      description: 'Protect your home from water damage with premium stainless steel micro-mesh gutter guards. Our hydro-lock technology ensures 100% water flow while blocking leaves, pine needles, and pests.',
      icon: Shield,
      link: '/gutter-guards'
    },
    {
      title: 'Premium Roofing',
      description: 'GAF Timberline HDZ roofing systems with LayerLock technology and infinite wind speed protection. We provide expert installation, comprehensive warranties, and insurance claim advocacy.',
      icon: HomeIcon,
      link: '/roofing'
    },
    {
      title: 'Garage & Floor Coatings',
      description: 'Industrial-strength polyaspartic and epoxy coatings for garages, patios, and interiors. 1-day installation, extreme durability, and stunning custom finishes including metallic marble.',
      icon: Layers,
      link: '/coatings'
    },
    {
      title: 'Energy Rebates & Incentives',
      description: 'Maximize your savings with government incentives. We help you access federal tax credits, state grants, and utility rebates for energy-efficient upgrades like HVAC, windows, and insulation.',
      icon: Lightbulb,
      link: '/energy-rebates'
    },
  ]

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-title">Our Services</h1>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            We offer comprehensive home improvement services tailored to your unique needs and vision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} to={service.link || '/contact'} className="block h-full">
                <div className="bg-[var(--warm-off-white)] p-8 rounded-lg shadow-lg hover:shadow-xl transition-all h-full hover:-translate-y-1 cursor-pointer">
                  <div className="mb-4 text-center">
                    <service.icon className="mx-auto text-[var(--brushed-gold)]" size={56} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-center gold-accent">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/portfolio">
              <Button size="lg" className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)]">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProcessPage() {
  const steps = [
    {
      number: '01',
      title: 'Consultation & Design',
      description: 'We begin by understanding your vision, needs, and budget through an in-depth consultation and collaborative design process.',
      icon: '💡',
    },
    {
      number: '02',
      title: 'Meticulous Planning',
      description: 'Every detail is carefully planned, from materials selection to project timeline, ensuring a smooth and predictable renovation experience.',
      icon: '📋',
    },
    {
      number: '03',
      title: 'Professional Execution',
      description: 'Our skilled craftsmen bring the design to life with precision and care, maintaining open communication throughout the build.',
      icon: '🔨',
    },
    {
      number: '04',
      title: 'The Final Walkthrough',
      description: 'We conduct a comprehensive walkthrough to ensure every element meets our exacting standards and exceeds your expectations.',
      icon: '✓',
    },
  ]

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-title">Our Process</h1>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            A proven, organized system that transforms your renovation from concept to reality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="process-step bg-[var(--warm-off-white)] rounded-lg">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="text-5xl font-bold gold-accent mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)]">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="section-title">About KMJK Home Improvement</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src={kitchenModern} alt="KMJK Team" className="rounded-lg shadow-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-6 gold-accent">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded on the principles of exceptional craftsmanship and unwavering integrity, KMJK Home Improvement has become a trusted name in the Treasure Coast community. Our journey began with a simple belief: that every homeowner deserves a renovation experience that is both exciting and stress-free.
                </p>
                <p>
                  We are a team of dedicated professionals who take pride in our meticulous attention to detail and commitment to client satisfaction. From the initial consultation to the final walkthrough, we treat every project as if it were our own home.
                </p>
                <p>
                  Our deep roots in Stuart, Florida, and the surrounding Treasure Coast area have allowed us to build lasting relationships with our clients and the community. We believe in giving back and supporting local businesses, ensuring that every project contributes to the vitality of our region.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-[var(--warm-off-white)] p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-center">Our Commitment</h3>
            <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
              At KMJK, we don't just build beautiful spaces—we build trust. Our commitment to quality, transparency, and exceptional service has earned us the loyalty of countless satisfied clients who continue to recommend us to their friends and family.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-[var(--warm-off-white)]">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="section-title mb-8">Contact Us</h1>
          <div className="bg-white shadow-xl rounded-xl p-8">
            <ContactForm 
              title="Start Your Home Improvement Project"
              subtitle="Tell us about your project goals and we'll prepare a personalized consultation plan."
              serviceType="General Inquiry"
              subject="New Website Inquiry"
              buttonContext="Contact Page Form"
              onSubmit={() => {
                // Additional handling if needed
              }}
            />
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
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* New Service Landing Pages */}
          <Route path="/christmas-lights" element={<ChristmasLightsLanding />} />
          <Route path="/gutter-guards" element={<GutterGuardLanding />} />
          <Route path="/roofing" element={<RoofingLanding />} />
          <Route path="/coatings" element={<CoatingsLanding />} />
          <Route path="/energy-rebates" element={<EnergyRebatesLanding />} />
          {/* Landing Pages - Improved Versions with Popup Forms */}
          <Route path="/bathroom-remodel" element={<BathroomLandingImproved />} />
          <Route path="/bathrooms-elite" element={<BathroomLandingElite />} />
          <Route path="/bathroom-repairs" element={<BathroomRepairsLanding />} />
          <Route path="/kitchen-remodel" element={<KitchenLandingImproved />} />
          <Route path="/handyman-services" element={<HandymanLandingImproved />} />
          <Route path="/tv-mounting" element={<TVMountingLanding />} />
          {/* Old Versions for Reference */}
          <Route path="/bathroom-remodel-old" element={<BathroomLanding />} />
          <Route path="/kitchen-remodel-old" element={<KitchenLanding />} />
          <Route path="/handyman-services-old" element={<HandymanLanding />} />
          <Route path="/handyman-services-pricing" element={<HandymanLandingWithPricing />} />
          {/* Local Landing Pages */}
          <Route path="/sailfish-point-bathroom-remodel" element={<BathroomRemodelSailfishPoint />} />
          <Route path="/sewalls-point-bathroom-remodel" element={<BathroomRemodelSewallsPoint />} />
          <Route path="/palm-city-bathroom-remodel" element={<BathroomRemodelPalmCity />} />
          <Route path="/hutchinson-island-bathroom-remodel" element={<BathroomRemodelHutchinsonIsland />} />
          <Route path="/stuart-bathroom-remodel" element={<BathroomRemodelStuart />} />
          {/* Internal Tools */}
          <Route path="/internal-dashboard" element={<InternalDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          {/* Treasure Coast - Kitchen Renovations */}
          <Route path="/palm-city-kitchen-renovation" element={<KitchenRenovationPalmCity />} />
          <Route path="/sailfish-point-kitchen-renovation" element={<KitchenRenovationSailfishPoint />} />
          <Route path="/sewalls-point-kitchen-renovation" element={<KitchenRenovationSewallsPoint />} />
          <Route path="/hutchinson-island-kitchen-renovation" element={<KitchenRenovationHutchinsonIsland />} />
          {/* Treasure Coast - Complete Home Renovations */}
          <Route path="/treasure-coast-home-renovation" element={<HomeRenovationTreasureCoast />} />
          <Route path="/treasure-coast-kitchen-renovation" element={<KitchenRenovationTreasureCoast />} />
          <Route path="/treasure-coast-bathroom-renovation" element={<BathroomRenovationTreasureCoast />} />
          {/* Treasure Coast - Bathroom Renovations */}
          <Route path="/palm-city-bathroom-renovation" element={<BathroomRenovationPalmCity />} />
          <Route path="/sailfish-point-bathroom-renovation" element={<BathroomRenovationSailfishPoint />} />
          <Route path="/sewalls-point-bathroom-renovation" element={<BathroomRenovationSewallsPoint />} />
          <Route path="/hutchinson-island-bathroom-renovation" element={<BathroomRenovationHutchinsonIsland />} />
          {/* Treasure Coast - Handyman Services */}
          <Route path="/palm-city-handyman-services" element={<HandymanPalmCity />} />
          <Route path="/sailfish-point-handyman-services" element={<HandymanSailfishPoint />} />
          <Route path="/sewalls-point-handyman-services" element={<HandymanSewallsPoint />} />
          <Route path="/hutchinson-island-handyman-services" element={<HandymanHutchinsonIsland />} />
          {/* Treasure Coast - TV Mounting */}
          <Route path="/palm-city-tv-mounting" element={<TvMountingPalmCity />} />
          <Route path="/sailfish-point-tv-mounting" element={<TvMountingSailfishPoint />} />
          <Route path="/sewalls-point-tv-mounting" element={<TvMountingSewallsPoint />} />
          <Route path="/hutchinson-island-tv-mounting" element={<TvMountingHutchinsonIsland />} />
          {/* Treasure Coast - Epoxy Flooring */}
          <Route path="/palm-city-epoxy-flooring" element={<EpoxyPalmCity />} />
          <Route path="/sailfish-point-epoxy-flooring" element={<EpoxySailfishPoint />} />
          <Route path="/sewalls-point-epoxy-flooring" element={<EpoxySewallsPoint />} />
          <Route path="/hutchinson-island-epoxy-flooring" element={<EpoxyHutchinsonIsland />} />
        </Routes>
        <Footer />
      </div>
    </Router>
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

function StickyCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-gray-200 shadow-lg md:hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-3 gap-2 text-sm">
        <a
          href={KMJK_PHONE_CALL_LINK}
          className="text-center py-2 rounded-md bg-[var(--brushed-gold)] text-white font-semibold uppercase tracking-wide"
          aria-label={`Call ${KMJK_CONTACT_NAME}`}
        >
          Call {KMJK_CONTACT_NAME}
        </a>
        <a
          href={SWAY_PHONE_CALL_LINK}
          className="text-center py-2 rounded-md bg-[var(--deep-charcoal)] text-white font-semibold uppercase tracking-wide"
          aria-label={`Call ${SWAY_CONTACT_NAME}`}
        >
          Call {SWAY_CONTACT_NAME}
        </a>
        <a
          href="/contact"
          className="text-center py-2 rounded-md bg-white border text-[var(--deep-charcoal)] font-semibold uppercase tracking-wide"
          aria-label="Get a Quote"
        >
          Quote
        </a>
      </div>
    </div>
  )
}
