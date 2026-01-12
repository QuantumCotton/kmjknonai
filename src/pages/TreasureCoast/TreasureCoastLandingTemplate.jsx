import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Calendar, Check, Star, MapPin, Mail, Loader2, Phone, PartyPopper } from 'lucide-react'
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
import {
  KMJK_CONTACT_NAME,
  KMJK_PHONE_DISPLAY,
  KMJK_PHONE_DIGITS,
  KMJK_PHONE_CALL_LINK,
  KMJK_PHONE_SMS_LINK,
  KMJK_EMAIL,
  SWAY_CONTACT_NAME,
  SWAY_PHONE_DISPLAY,
  SWAY_PHONE_CALL_LINK,
} from '@/constants/contact.js'

const DualContactButton = ({ variant = 'dark', className = '' }) => {
  const palettes = {
    dark: {
      container: 'border-white/60 text-white bg-transparent',
      hover: 'hover:bg-white/10',
      separator: 'bg-white/40',
    },
    light: {
      container: 'border-[var(--deep-charcoal)] text-[var(--deep-charcoal)] bg-transparent',
      hover: 'hover:bg-[var(--deep-charcoal)]/10',
      separator: 'bg-[var(--deep-charcoal)]/20',
    },
  }

  const palette = palettes[variant] || palettes.dark

  return (
    <div
      className={`flex overflow-hidden rounded-md border px-0 text-base sm:text-lg ${palette.container} ${className}`}
      role="group"
      aria-label="Call Sway or text Chris"
    >
      <a
        href={SWAY_PHONE_CALL_LINK}
        className={`flex flex-1 items-center justify-center gap-2 px-6 py-4 font-medium transition-colors sm:px-7 sm:py-5 ${palette.hover}`}
      >
        <Phone size={18} />
        <span>Call {SWAY_CONTACT_NAME}</span>
        <span className="sr-only">({SWAY_PHONE_DISPLAY})</span>
      </a>
      <span className={`w-px ${palette.separator}`} aria-hidden="true" />
      <a
        href={KMJK_PHONE_SMS_LINK}
        className={`flex flex-1 items-center justify-center gap-2 px-6 py-4 font-medium transition-colors sm:px-7 sm:py-5 ${palette.hover}`}
      >
        <MessageSquare size={18} />
        <span>Text {KMJK_CONTACT_NAME}</span>
        <span className="sr-only">({KMJK_PHONE_DISPLAY})</span>
      </a>
    </div>
  )
}

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
      _landmarkImage,
    } = config

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [buttonContext, setButtonContext] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [successDetails, setSuccessDetails] = useState({ hasFiles: false, name: '', cityDisplay: '' })
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      timeline: '',
      budget: '',
      projectDetails: '',
      files: [],
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
      setSuccessDetails({ hasFiles: false, name: '', cityDisplay: '' })
      setFormData({
        name: '',
        email: '',
        phone: '',
      address: '',
      timeline: '',
      budget: '',
      projectDetails: '',
      files: [],
    })
    }

    const handleFormChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (event) => {
      const files = Array.from(event.target.files || []).slice(0, 5)
      
      // Validate file sizes (max 10MB per file)
      const maxSize = 10 * 1024 * 1024 // 10MB in bytes
      const validFiles = files.filter(file => {
        if (file.size > maxSize) {
          alert(`File "${file.name}" is too large. Please choose files under 10MB each.`)
          return false
        }
        return true
      })
      
      setFormData((prev) => ({ ...prev, files: validFiles }))
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if (isSubmitting) return

      setIsSubmitting(true)

      try {
        // Check if files are attached
        const hasFiles = formData.files && formData.files.length > 0
        
        // Prepare submission data for Slack
        const slackSubmission = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          timeline: formData.timeline,
          budget: formData.budget,
          projectDetails: formData.projectDetails,
          serviceType: serviceType || 'Treasure Coast Service',
          cityName: cityName || 'Unknown',
          buttonContext: buttonContext || 'Form Submission',
          sourceUrl: window.location.href,
          hasFiles: hasFiles,
          fileNames: hasFiles ? formData.files.map(f => f.name) : [],
          timestamp: new Date().toISOString()
        }

        // Prepare Slack payload (hidden from frontend)
        const slackPayload = {
          text: `🚨 NEW LEAD: ${slackSubmission.serviceType} - ${slackSubmission.cityName}`,
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: `🚨 NEW LEAD ALERT: ${slackSubmission.serviceType}`,
                emoji: true
              }
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `📍 *Location:* ${slackSubmission.cityName} | 🏷️ *Service:* ${slackSubmission.serviceType} | ⏰ ${new Date().toLocaleString()}`
                }
              ]
            },
            {
              type: "divider"
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*👤 CUSTOMER INFORMATION*"
              }
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: "*📛 Name:*\n" + (slackSubmission.name || "Not provided")
                },
                {
                  type: "mrkdwn",
                  text: "*📧 Email:*\n" + (slackSubmission.email || "Not provided")
                },
                {
                  type: "mrkdwn",
                  text: "*📱 Phone:*\n" + (slackSubmission.phone || "Not provided")
                },
                {
                  type: "mrkdwn",
                  text: "*🏠 Address:*\n" + (slackSubmission.address || "Not provided")
                }
              ]
            },
            {
              type: "divider"
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*💰 PROJECT DETAILS*"
              }
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: "*⏳ Timeline:*\n" + (slackSubmission.timeline || "Not specified")
                },
                {
                  type: "mrkdwn",
                  text: "*💵 Budget:*\n" + (slackSubmission.budget || "Not specified")
                }
              ]
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*📝 Project Description:*\n" + (slackSubmission.projectDetails || "No details provided")
              }
            },
            ...(hasFiles ? [{
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*📎 FILES READY FOR UPLOAD:*\n" + 
                      "```" + slackSubmission.fileNames.join(', ') + "```" + 
                      "\n👉 _Customer will upload these to the Slack channel_"
              }
            }] : []),
            {
              type: "divider"
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*🔗 SOURCE & TRACKING*"
              }
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `🌐 <${slackSubmission.sourceUrl}|View Source Page> | 🎯 *Button:* ${slackSubmission.buttonContext}`
                }
              ]
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "📞 Call Customer",
                    emoji: true
                  },
                  url: `tel:${slackSubmission.phone}`
                },
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "📧 Email Customer",
                    emoji: true
                  },
                  url: `mailto:${slackSubmission.email}`
                }
              ]
            }
          ]
        }

        // Send lead info via backend
        const backendUrl = '/api/slack-proxy' // Backend endpoint
        
        if (slackPayload) {
          try {
            // Prepare lead info for Slack
            const leadInfo = {
              name: formData.name,
              email: formData.email,
              serviceType: serviceType || 'Treasure Coast Service',
              cityName: cityName || 'Unknown'
            }

            // Send to backend with images if they exist
            const requestData = {
              messageData: slackPayload,
              customerInfo: leadInfo,
              attachments: hasFiles ? formData.files : []
            }

            await fetch(backendUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData)
            })
          } catch (backendError) {
            console.error('Backend notification failed:', backendError)
            // Continue with form submission even if backend fails
          }
        }

        // Also submit to Web3Forms for email backup (WITHOUT any file references)
        const payload = new FormData()
        payload.append('access_key', '8e63e7e3-ab53-43a9-80c5-ebc113c25912')
        payload.append('name', formData.name)
        payload.append('email', formData.email)
        payload.append('phone', formData.phone)
        payload.append('address', formData.address)
        payload.append('timeline', formData.timeline)
        payload.append('budget', formData.budget)
        
        // Only send project details, NO file information to avoid Web3Forms Pro feature error
        let messageBody = formData.projectDetails || 'No project details provided'

        if (hasFiles && formData.files?.length) {
          const fileNames = formData.files.map((file) => file.name).join(', ')
          messageBody += `\n\n[Customer noted ${formData.files.length === 1 ? '1 file' : `${formData.files.length} files`} attached on site: ${fileNames}]`
        }

        payload.append('message', messageBody)
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

          setSuccessDetails({
            hasFiles,
            name: formData.name,
            cityDisplay: cityName || hero?.badge || 'the Treasure Coast',
          })

          setSubmitSuccess(true)

          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            timeline: '',
            budget: '',
            projectDetails: '',
            files: [],
          })
        } else {
          throw new Error(data.message || 'Failed to submit form')
        }
      } catch (error) {
        console.error('[Treasure Coast Form] submission error:', error)
        
        let errorMessage = 'We could not submit the form right now. Please text us at 772-777-0622 or email info@kmjk.pro.'
        
        if (error.message && error.message.includes('Pro feature')) {
          errorMessage = 'Please submit your contact info here, then share photos via our Slack channel or text us at 772-777-0622.'
        } else if (error.message && error.message.includes('network')) {
          errorMessage = 'Network connection issue. Please check your internet connection and try again, or text us at 772-777-0622.'
        }
        
        alert(errorMessage)
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
        streetAddress: '1301 SE Francis Street',
        addressLocality: 'Jensen Beach',
        addressRegion: 'FL',
        postalCode: '34957',
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
                  className="border-white/60 text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg"
                >
                  <Calendar className="mr-2" size={22} />
                  Schedule Consultation
                </Button>
                <DualContactButton variant="dark" className="w-full sm:w-auto" />
                <a href={`mailto:${KMJK_EMAIL}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/60 text-white hover:bg-white/10 bg-transparent px-8 py-6 text-lg"
                  >
                    <Mail className="mr-2" size={22} />
                    Email {KMJK_EMAIL}
                  </Button>
                </a>
              </div>
              {hero.note && (
                <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
                  {hero.note}
                </p>
              )}
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
          addressLines={["Jensen Beach Operations Hub", '1301 SE Francis Street', 'Jensen Beach, FL 34957']}
          serviceAreas={serviceArea?.items || ['Palm City', "Sewall's Point", 'Sailfish Point', 'Hutchinson Island']}
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
                <DualContactButton variant="dark" className="w-full sm:w-auto" />
                <a href={`mailto:${KMJK_EMAIL}`}>
                  <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 bg-transparent px-8 py-6 text-lg">
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
              <div className="py-8 text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brushed-gold)]/15 text-[var(--brushed-gold)]">
                  <PartyPopper size={36} />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-[var(--deep-charcoal)]">
                    Thank you! Your home is one step closer to holiday-ready comfort.
                  </p>
                  <p className="text-base text-gray-600">
                    We received your details{successDetails.name ? `, ${successDetails.name},` : ''} and will reach out within one business day to plan a cozy seasonal sanctuary in {successDetails.cityDisplay}.
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--brushed-gold)]/30 bg-[var(--warm-ivory)]/40 p-5 text-left space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 text-[var(--brushed-gold)]" />
                    <p className="text-sm text-gray-700">
                      Your consultation request is confirmed. Expect a call or text from Chris soon.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-[var(--brushed-gold)]" />
                    <p className="text-sm text-gray-700">
                      A confirmation email is on its way with next steps and ways to share inspiration.
                    </p>
                  </div>
                  {successDetails.hasFiles ? (
                    <div className="flex items-start gap-3">
                      <MessageSquare className="mt-1 h-5 w-5 text-[var(--brushed-gold)]" />
                      <p className="text-sm text-gray-700">
                        We received your photos—our design team will review them as we plan your holiday-perfect retreat.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <MessageSquare className="mt-1 h-5 w-5 text-[var(--brushed-gold)]" />
                      <p className="text-sm text-gray-700">
                        Have inspiration photos? Reply to the confirmation email or text them to {KMJK_PHONE_DISPLAY} any time.
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Wishing you a warm, memorable holiday season—your spa-worthy sanctuary is on the horizon.</p>
                  <p>
                    Need us sooner? Call or text <a href={KMJK_PHONE_CALL_LINK} className="font-semibold text-[var(--deep-charcoal)] underline">{KMJK_PHONE_DISPLAY}</a> for immediate assistance.
                  </p>
                </div>
                <Button size="lg" className="mx-auto" onClick={closeForm}>
                  Close &amp; explore more
                </Button>
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

                <div>
                  <label className="block text-sm font-medium text-[var(--deep-charcoal)] mb-1">
                    Upload inspiration photos or existing bath images (max 5 files, 10MB each)
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleFileChange}
                    className="w-full cursor-pointer rounded-md border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 transition focus:outline-none focus:ring-2 focus:ring-[var(--brushed-gold)]/60 file:mr-4 file:rounded-md file:border-0 file:bg-[var(--deep-charcoal)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-black"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    📎 Upload photos here - they'll be sent directly to our team via Slack. Your contact info goes to email for quick follow-up!
                  </p>
                </div>

                <DialogFooter className="pt-2">
                  <Button type="button" variant="ghost" onClick={closeForm} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} />
                        Sending…
                      </span>
                    ) : (
                      'Send Project Details'
                    )}
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
