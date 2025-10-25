import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Calendar, Check, Star, MapPin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { LocalPresenceSection } from '@/components/LocalPresenceSection.jsx'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.jsx'
import { KMJK_CONTACT_NAME, KMJK_PHONE_DISPLAY, KMJK_PHONE_DIGITS, KMJK_PHONE_SMS_LINK, KMJK_EMAIL } from '@/constants/contact.js'

export function createTreasureCoastLandingPage(config) {
  const TreasureCoastLandingPage = () => {
    const {
      metaTitle,
      cityName,
      serviceType,
      hero = {},
      statHighlights = [],
      intro,
      sellingPoints = [],
      pricingOptions = [],
      testimonials = [],
      serviceArea,
      finalCta,
      caseStudies = [],
      faqs = [],
      relatedLinks = [],
      landmarkImage,
    } = config

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [buttonContext, setButtonContext] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      timeline: '',
      budget: '',
      projectDetails: '',
    })

    useEffect(() => {
      if (metaTitle) {
        document.title = metaTitle
      }
    }, [metaTitle])

    const openForm = (context) => {
      setButtonContext(context)
      setIsFormOpen(true)
    }

    const closeForm = () => {
      setIsFormOpen(false)
      setButtonContext('')
      setSubmitSuccess(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        timeline: '',
        budget: '',
        projectDetails: '',
      })
    }

    const handleFormChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if (isSubmitting) return

      setIsSubmitting(true)

      try {
        const payload = new FormData()
        payload.append('access_key', '8e63e7e3-ab53-43a9-80c5-ebc113c25912')
        payload.append('name', formData.name)
        payload.append('email', formData.email)
        payload.append('phone', formData.phone)
        payload.append('address', formData.address)
        payload.append('timeline', formData.timeline)
        payload.append('budget', formData.budget)
        payload.append('message', formData.projectDetails)
        payload.append('service_type', serviceType || 'Treasure Coast Service')
        payload.append('city', cityName || hero?.badge || '')
        payload.append('button_context', buttonContext || 'Treasure Coast Landing')
        payload.append('source_url', window.location.href)

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: payload,
        })

        const data = await response.json()

        if (data.success) {
          if (window.gtag) {
            window.gtag('event', 'generate_lead', {
              service: serviceType || 'Treasure Coast Service',
              button_context: buttonContext || 'Treasure Coast Landing',
              city: cityName,
            })
          }

          setSubmitSuccess(true)
          setTimeout(() => {
            closeForm()
          }, 2500)
        } else {
          throw new Error(data.message || 'Failed to submit form')
        }
      } catch (error) {
        console.error('[Treasure Coast Form] submission error:', error)
        alert(`We could not submit the form right now. Please text us at ${KMJK_PHONE_DISPLAY} or email ${KMJK_EMAIL}.`)
      } finally {
        setIsSubmitting(false)
      }
    }

    const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'KMJK Home Improvement',
      image: hero.backgroundImage,
      url: pageUrl,
      telephone: KMJK_PHONE_DIGITS,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '43 SW Osceola St',
        addressLocality: 'Stuart',
        addressRegion: 'FL',
        postalCode: '34994',
        addressCountry: 'US',
      },
      areaServed: serviceArea?.items,
      servesCuisine: undefined,
      serviceType,
      makesOffer: pricingOptions?.map((option) => ({
        '@type': 'Offer',
        name: option.name,
        price: option.range,
      })),
    }

    if (!structuredData.areaServed) {
      delete structuredData.areaServed
    }

    if (!structuredData.makesOffer?.length) {
      delete structuredData.makesOffer
    }

    const faqSchema = faqs.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${cityName || 'Treasure Coast'} ${serviceType || 'Home Improvement'}`,
      areaServed: serviceArea?.items,
      provider: {
        '@type': 'LocalBusiness',
        name: 'KMJK Home Improvement',
        telephone: KMJK_PHONE_DIGITS,
      },
      hasOfferCatalog: pricingOptions?.length
        ? {
            '@type': 'OfferCatalog',
            name: `${serviceType || 'Service'} Packages`,
            itemListElement: pricingOptions.map((option) => ({
              '@type': 'Offer',
              name: option.name,
              price: option.range,
              description: option.features?.join(', '),
            })),
          }
        : undefined,
    }

    if (!serviceSchema.areaServed) {
      delete serviceSchema.areaServed
    }

    return (
      <div className="pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              [structuredData, faqSchema, serviceSchema].filter(Boolean)
            ),
          }}
        />
        {hero && (
          <section
            className="relative min-h-[80vh] flex items-center justify-center bg-cover"
            style={
              hero.backgroundImage
                ? {
                    backgroundImage: `url(${hero.backgroundImage})`,
                    backgroundPosition: hero.backgroundPosition || 'center',
                    backgroundSize: hero.backgroundSize || 'cover',
                    backgroundRepeat: 'no-repeat',
                  }
                : undefined
            }
          >
            <div className="absolute inset-0 bg-black/55"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6">
              {hero.alt && <span className="sr-only">{hero.alt}</span>}
              {hero.badge && (
                <div className="inline-block bg-[var(--brushed-gold)] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  {hero.badge}
                </div>
              )}
              {hero.heading && (
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {hero.heading}
                </h1>
              )}
              {hero.subheading && (
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                  {hero.subheading}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => openForm('Hero - Schedule Consultation')}
                  className="bg-white/90 text-[var(--deep-charcoal)] hover:bg-white px-8 py-6 text-lg border border-white/60"
                >
                  <Calendar className="mr-2" size={22} />
                  Schedule Consultation
                </Button>
                <a href={KMJK_PHONE_SMS_LINK}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/60 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  >
                    <MessageSquare className="mr-2" size={22} />
                    Text {KMJK_CONTACT_NAME} ({KMJK_PHONE_DISPLAY})
                  </Button>
                </a>
                <a href={`mailto:${KMJK_EMAIL}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/60 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  >
                    <Mail className="mr-2" size={22} />
                    Email {KMJK_EMAIL}
                  </Button>
                </a>
              </div>
              {hero.tagline && (
                <p className="text-sm uppercase tracking-[0.3em] text-gray-300 mt-6">
                  {hero.tagline}
                </p>
              )}
            </div>
          </section>
        )}

        {statHighlights.length > 0 && (
          <section className="py-8 bg-[var(--deep-charcoal)] text-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {statHighlights.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-3xl font-bold text-[var(--brushed-gold)]">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wide text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {intro && (
          <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
              {intro.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--deep-charcoal)]">
                  {intro.title}
                </h2>
              )}
              {intro.paragraphs && intro.paragraphs.length > 0 && (
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  {intro.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {sellingPoints.length > 0 && (
          <section className="py-16 bg-[var(--warm-off-white)]">
            <div className="max-w-6xl mx-auto px-4 grid gap-12 md:grid-cols-2">
              {sellingPoints.map((group, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                  {group.title && (
                    <h3 className="text-2xl font-semibold text-[var(--deep-charcoal)]">
                      {group.title}
                    </h3>
                  )}
                  {group.items && group.items.length > 0 && (
                    <ul className="space-y-3 text-gray-700">
                      {group.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <Check className="text-[var(--brushed-gold)] mt-1" size={18} />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {pricingOptions.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)] mb-4">
                Investment Options
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Every project includes design, project management, and white-glove installation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingOptions.map((option, index) => (
                  <div key={index} className="bg-[var(--warm-off-white)] rounded-2xl p-8 shadow-xl border border-white/60">
                    <h3 className="text-2xl font-semibold mb-2">{option.name}</h3>
                    {option.range && (
                      <div className="text-3xl font-bold text-[var(--brushed-gold)] mb-2">{option.range}</div>
                    )}
                    {option.monthly && (
                      <div className="text-sm text-gray-600 mb-4">or {option.monthly} with financing</div>
                    )}
                    {option.features && option.features.length > 0 && (
                      <ul className="space-y-2 text-sm text-gray-700">
                        {option.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="text-green-600 mt-0.5" size={16} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {testimonials.length > 0 && (
          <section className="py-16 bg-[var(--warm-off-white)]">
            <div className="max-w-6xl mx-auto px-4 space-y-12">
              <h2 className="text-3xl font-bold text-center text-[var(--deep-charcoal)]">What Treasure Coast Clients Say</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
                    <div className="flex items-center gap-2">
                      {[...Array(testimonial.rating || 5)].map((_, starIndex) => (
                        <Star key={starIndex} className="fill-[var(--brushed-gold)] text-[var(--brushed-gold)]" size={18} />
                      ))}
                    </div>
                    <p className="text-lg text-gray-700 italic leading-relaxed">“{testimonial.quote}”</p>
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold text-[var(--deep-charcoal)]">{testimonial.author}</span>
                      {testimonial.detail && <span> • {testimonial.detail}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudies.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 space-y-10">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-[var(--deep-charcoal)]">Recent {cityName || 'Treasure Coast'} Projects</h2>
                <p className="text-gray-600">
                  A snapshot of KMJK craftsmanship across waterfront estates, golf communities, and island residences.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                {caseStudies.map((study, index) => (
                  <article key={index} className="bg-[var(--warm-off-white)] rounded-2xl overflow-hidden shadow-lg border border-white/70">
                    {study.image && (
                      <img
                        src={study.image}
                        alt={study.alt || study.title}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="p-6 space-y-3 text-left">
                      <h3 className="text-2xl font-semibold text-[var(--deep-charcoal)]">{study.title}</h3>
                      {study.location && (
                        <p className="text-sm uppercase tracking-wide text-[var(--brushed-gold)]">{study.location}</p>
                      )}
                      {study.description && <p className="text-gray-600 leading-relaxed">{study.description}</p>}
                      {study.metrics && (
                        <ul className="text-sm text-gray-500 space-y-1">
                          {study.metrics.map((metric, metricIndex) => (
                            <li key={metricIndex}>• {metric}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {serviceArea && (
          <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4">
              <div className="bg-[var(--warm-off-white)] rounded-2xl p-8 shadow-xl space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[var(--brushed-gold)]" size={28} />
                  <div className="space-y-2">
                    {serviceArea.title && (
                      <h3 className="text-2xl font-semibold text-[var(--deep-charcoal)]">{serviceArea.title}</h3>
                    )}
                    {serviceArea.description && (
                      <p className="text-gray-700 leading-relaxed">{serviceArea.description}</p>
                    )}
                    {serviceArea.items && serviceArea.items.length > 0 && (
                      <ul className="grid gap-2 md:grid-cols-2 text-sm text-gray-600">
                        {serviceArea.items.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="text-[var(--brushed-gold)]" size={16} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <LocalPresenceSection
          businessName="KMJK Home Improvement"
          addressLines={["Stuart Design Studio", '43 SW Osceola St', 'Stuart, FL 34994']}
          serviceAreas={serviceArea?.items || ['Palm City', 'Sewall’s Point', 'Sailfish Point', 'Hutchinson Island']}
        />

        {faqs.length > 0 && (
          <section className="py-16 bg-[var(--warm-off-white)]">
            <div className="max-w-5xl mx-auto px-4 space-y-6">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-[var(--deep-charcoal)]">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                  Answers to the most common {serviceType?.toLowerCase() || 'project'} questions from Treasure Coast homeowners.
                </p>
              </div>
              <Accordion type="single" collapsible className="bg-white rounded-2xl shadow-lg border border-white/70">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`faq-${index}`} key={index}>
                    <AccordionTrigger className="px-6 text-[var(--deep-charcoal)] text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {relatedLinks.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4 space-y-4 text-center">
              <h2 className="text-2xl font-semibold text-[var(--deep-charcoal)]">Explore More KMJK Services</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="border border-gray-200 hover:border-[var(--brushed-gold)] hover:bg-[var(--brushed-gold)]/10 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {finalCta && (
          <section className="py-20 bg-gradient-to-r from-[var(--deep-charcoal)] to-[var(--brushed-bronze)] text-white text-center">
            <div className="max-w-4xl mx-auto px-4 space-y-6">
              {finalCta.heading && (
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">{finalCta.heading}</h2>
              )}
              {finalCta.subheading && (
                <p className="text-lg md:text-xl text-gray-200">{finalCta.subheading}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 px-8 py-6 text-lg"
                  onClick={() => openForm('Footer - Book Consultation')}
                >
                  <Calendar className="mr-2" size={22} />
                  Book Consultation
                </Button>
                <a href={KMJK_PHONE_SMS_LINK}>
                  <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 px-8 py-6 text-lg">
                    <MessageSquare className="mr-2" size={22} />
                    Text {KMJK_PHONE_DISPLAY}
                  </Button>
                </a>
                <a href={`mailto:${KMJK_EMAIL}`}>
                  <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 px-8 py-6 text-lg">
                    <Mail className="mr-2" size={22} />
                    Email {KMJK_EMAIL}
                  </Button>
                </a>
              </div>
            </div>
          </section>
        )}

        <Dialog
          open={isFormOpen}
          onOpenChange={(open) => {
            if (!open) {
              closeForm()
            } else {
              setIsFormOpen(true)
            }
          }}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[var(--deep-charcoal)]">
                Start Your {cityName ? `${cityName} ` : ''}{serviceType || 'Project'}
              </DialogTitle>
              <DialogDescription>
                Share a few details and we’ll reach out within one business day.
              </DialogDescription>
            </DialogHeader>

            {submitSuccess ? (
              <div className="py-10 text-center space-y-3">
                <div className="text-5xl">✅</div>
                <p className="text-xl font-semibold text-[var(--deep-charcoal)]">We received your request!</p>
                <p className="text-gray-600">
                  Chris and the KMJK team will follow up shortly to schedule your consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--deep-charcoal)] mb-1">
                      Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) => handleFormChange('name', event.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--deep-charcoal)] mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) => handleFormChange('email', event.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--deep-charcoal)] mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(event) => handleFormChange('phone', event.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--deep-charcoal)] mb-1">
                      Address / Community
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(event) => handleFormChange('address', event.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]"
                      placeholder="Neighborhood, condo, or HOA"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--deep-charcoal)] mb-1">Desired Timeline</label>
                    <input
                      type="text"
                      value={formData.timeline}
                      onChange={(event) => handleFormChange('timeline', event.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]"
                      placeholder="e.g., ASAP, 3 months, this summer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--deep-charcoal)] mb-1">Budget Range</label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(event) => handleFormChange('budget', event.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]"
                      placeholder="e.g., $50k - $70k"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--deep-charcoal)] mb-1">
                    Tell us about your project
                  </label>
                  <textarea
                    rows={4}
                    value={formData.projectDetails}
                    onChange={(event) => handleFormChange('projectDetails', event.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]"
                    placeholder="Share inspiration, must-haves, or challenges we should know."
                  />
                </div>

                <DialogFooter className="pt-2">
                  <Button type="button" variant="ghost" onClick={closeForm} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Project Details'}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  TreasureCoastLandingPage.displayName = config.componentName || 'TreasureCoastLandingPage'

  return TreasureCoastLandingPage
}
