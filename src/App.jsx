import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, Home as HomeIcon, Briefcase, Image, Users, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

// Import images
import kitchenModern from './assets/kitchen_modern.jpg'
import bathroomLuxurySpa from './assets/bathroom_luxury_spa.jpg'
import bathroomMarble from './assets/bathroom_marble.jpg'
import customEntertainment from './assets/custom_entertainment.jpg'

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
            <a href="tel:650-501-7659" className="flex items-center space-x-1 hover:text-[var(--brushed-gold)] transition-colors">
              <Phone size={16} />
              <span>650-501-7659</span>
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
              <a href="tel:650-501-7659" className="flex items-center space-x-2 py-2">
                <Phone size={16} />
                <span>650-501-7659</span>
              </a>
              <a href="mailto:chris@theeliteservicehub.com" className="flex items-center space-x-2 py-2">
                <Mail size={16} />
                <span>chris@theeliteservicehub.com</span>
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
              <a href="tel:650-501-7659" className="flex items-center space-x-2 hover:text-[var(--brushed-gold)] transition-colors">
                <Phone size={16} />
                <span>650-501-7659</span>
              </a>
              <a href="mailto:chris@theeliteservicehub.com" className="flex items-center space-x-2 hover:text-[var(--brushed-gold)] transition-colors">
                <Mail size={16} />
                <span>chris@theeliteservicehub.com</span>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="tel:650-501-7659">
              <Button size="lg" className="bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white">
                <Phone className="mr-2" size={20} />
                Call Us: 650-501-7659
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)] hover:text-white border-2 border-white">
                Schedule Consultation
              </Button>
            </Link>
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
      title: 'Coastal Modern Kitchen - Stuart, FL',
      image: kitchenModern,
      description: 'The client envisioned a bright, coastal-inspired kitchen with modern amenities. We delivered a stunning space featuring custom cabinetry, quartz countertops, and a seamless open-concept design.',
    },
    {
      title: 'Luxury Master Bath - Treasure Coast',
      image: bathroomMarble,
      description: 'Transforming a dated bathroom into a spa-like retreat, we incorporated marble finishes, a freestanding tub, and custom lighting to create an elegant sanctuary.',
    },
    {
      title: 'Custom Built-Ins & Millwork',
      image: customEntertainment,
      description: 'The homeowner wanted functional yet beautiful storage solutions. Our custom millwork seamlessly integrated with the home\'s architecture, adding both value and character.',
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
                      <Button className="bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)]">
                        View Full Gallery
                      </Button>
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
      description: 'From concept to completion, we transform kitchens into functional, beautiful spaces that become the heart of your home. Our comprehensive approach includes design consultation, custom cabinetry, countertop selection, appliance installation, and finishing touches.',
      icon: '🍳',
    },
    {
      title: 'Luxury Bathroom Renovations',
      description: 'Create your personal spa retreat with our luxury bathroom renovation services. We specialize in high-end finishes, custom tile work, modern fixtures, and thoughtful layouts that maximize both style and functionality.',
      icon: '🛁',
    },
    {
      title: 'Custom Cabinetry & Millwork',
      description: 'Our master craftsmen create bespoke cabinetry and millwork that seamlessly integrates with your home\'s architecture. From built-in bookcases to custom closets, we bring your vision to life with precision and artistry.',
      icon: '🪵',
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
              <div key={index} className="bg-[var(--warm-off-white)] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-center gold-accent">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, this would send the form data to a server
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="section-title">Contact Us</h1>
          <p className="text-center text-lg text-gray-600 mb-12">
            Ready to transform your home? Get in touch with us today.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 gold-accent">Get In Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">KMJK Home Improvement</h3>
                  <div className="space-y-2">
                    <a href="tel:650-501-7659" className="flex items-center space-x-2 text-gray-700 hover:text-[var(--brushed-gold)] transition-colors">
                      <Phone size={20} />
                      <span>650-501-7659</span>
                    </a>
                    <a href="mailto:chris@theeliteservicehub.com" className="flex items-center space-x-2 text-gray-700 hover:text-[var(--brushed-gold)] transition-colors">
                      <Mail size={20} />
                      <span>chris@theeliteservicehub.com</span>
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">Service Area</h3>
                  <p className="text-gray-700">
                    Proudly serving Stuart, Florida, and the Treasure Coast.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: By Appointment
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 gold-accent">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full"
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)]">
                  Send Message
                </Button>
              </form>
            </div>
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
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
