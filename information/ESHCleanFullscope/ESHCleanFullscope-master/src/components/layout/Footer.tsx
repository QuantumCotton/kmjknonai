import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Markets We Serve', href: '/markets' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
    ],
    contractors: [
      { name: 'Become a Partner', href: '/apply' },
      { name: 'Forms Library', href: '/forms' },
      { name: 'Partner Portal', href: '/contractor/login' },
      { name: 'Resources', href: '/blog' },
      { name: 'Success Stories', href: '#success-stories' },
      { name: 'FAQ', href: '/how-it-works' },
    ],
    homeowners: [
      { name: 'Find a Contractor', href: '#find-contractor' },
      { name: 'Kitchen Remodeling', href: '#kitchen' },
      { name: 'Bathroom Remodeling', href: '#bathroom' },
      { name: 'Request Consultation', href: '#consultation' },
      { name: 'Portfolio', href: '#portfolio' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img 
                src="/images/logos/esh-dark-bg.png" 
                alt="Elite Service Hub" 
                className="h-20 w-auto mb-6"
              />
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Performance-Based Marketing for Elite Contractors & Service Pros. Zero upfront cost, 15% commission only.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-zinc-600 hover:text-esh-gold transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-zinc-500 hover:text-esh-gold transition-colors text-sm">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-zinc-500 hover:text-esh-gold transition-colors text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* For Contractors Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              For Contractors
            </h3>
            <ul className="space-y-3">
              {footerLinks.contractors.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-zinc-500 hover:text-esh-gold transition-colors text-sm">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-zinc-500 hover:text-esh-gold transition-colors text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* For Homeowners Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              For Homeowners
            </h3>
            <ul className="space-y-3">
              {footerLinks.homeowners.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-zinc-500 hover:text-esh-gold transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-zinc-500 text-sm">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:Chris@TheEliteServiceHub.com" className="hover:text-esh-gold transition-colors">
                  Chris@TheEliteServiceHub.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-500 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Treasure Coast, Florida</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-sm">
              © {currentYear} Elite Service Hub. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-zinc-600 hover:text-esh-gold transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
