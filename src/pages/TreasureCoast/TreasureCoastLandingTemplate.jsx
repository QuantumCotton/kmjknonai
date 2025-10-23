import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageSquare, Calendar, Check, Star, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export function createTreasureCoastLandingPage(config) {
  const TreasureCoastLandingPage = () => {
    const {
      metaTitle,
      hero = {},
      statHighlights = [],
      intro,
      sellingPoints = [],
      pricingOptions = [],
      testimonials = [],
      serviceArea,
      finalCta,
    } = config

    useEffect(() => {
      if (metaTitle) {
        document.title = metaTitle
      }
    }, [metaTitle])

    return (
      <div className="pt-20">
        {hero && (
          <section
            className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
            style={hero.backgroundImage ? { backgroundImage: `url(${hero.backgroundImage})` } : undefined}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6">
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
                <a href="tel:650-501-7659">
                  <Button size="lg" className="bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white px-8 py-6 text-lg">
                    <Phone className="mr-2" size={22} />
                    Call 650-501-7659
                  </Button>
                </a>
                <a href="sms:650-501-7659">
                  <Button size="lg" className="bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 px-8 py-6 text-lg">
                    <MessageSquare className="mr-2" size={22} />
                    Text Photos To Chris
                  </Button>
                </a>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--deep-charcoal)] px-8 py-6 text-lg">
                    <Calendar className="mr-2" size={22} />
                    Schedule Consultation
                  </Button>
                </Link>
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
                <a href="tel:650-501-7659">
                  <Button size="lg" className="bg-white text-[var(--deep-charcoal)] hover:bg-gray-100 px-8 py-6 text-lg">
                    <Phone className="mr-2" size={22} />
                    Call: 650-501-7659
                  </Button>
                </a>
                <a href="sms:650-501-7659">
                  <Button size="lg" className="bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white px-8 py-6 text-lg">
                    <MessageSquare className="mr-2" size={22} />
                    Text For Quick Quote
                  </Button>
                </a>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--deep-charcoal)] px-8 py-6 text-lg">
                    <Calendar className="mr-2" size={22} />
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    )
  }

  TreasureCoastLandingPage.displayName = config.componentName || 'TreasureCoastLandingPage'

  return TreasureCoastLandingPage
}
