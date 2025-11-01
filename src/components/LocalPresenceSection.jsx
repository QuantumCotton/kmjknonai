import { Phone, MapPin, Clock } from 'lucide-react'
import {
  KMJK_PHONE_DISPLAY,
  KMJK_PHONE_CALL_LINK,
  SWAY_PHONE_DISPLAY,
  SWAY_PHONE_CALL_LINK,
  KMJK_CONTACT_NAME,
  SWAY_CONTACT_NAME,
} from '@/constants/contact.js'

export function LocalPresenceSection({
  businessName = 'KMJK Home Improvement',
  addressLines = ['1301 SE Francis Street', 'Jensen Beach, FL 34957'],
  hours = ['Mon-Fri: 8am - 6pm', 'Sat: By appointment', 'Sun: Closed'],
  serviceAreas = ['Palm City', 'Sewall\'s Point', 'Sailfish Point', 'Hutchinson Island'],
  mapEmbedUrl = 'https://www.google.com/maps?q=1301%20SE%20Francis%20Street%2C%20Jensen%20Beach%2C%20FL%2034957&output=embed',
}) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid gap-10 lg:grid-cols-[1.15fr_1fr] items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-[var(--deep-charcoal)]">Local Treasure Coast Presence</h2>
            <p className="text-gray-600">
              {businessName} is a Treasure Coast design-build firm delivering concierge remodeling and AV services for waterfront estates,
              gated clubs, and luxury residences across Martin and St. Lucie County.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[var(--brushed-gold)]" size={22} />
                <div>
                  <p className="font-semibold text-[var(--deep-charcoal)]">Showroom & Mailing</p>
                  <address className="not-italic text-gray-600 leading-relaxed">
                    {addressLines.map((line, index) => (
                      <span key={index} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-[var(--brushed-gold)]" size={22} />
                <div>
                  <p className="font-semibold text-[var(--deep-charcoal)]">Call Concierge</p>
                  <div className="flex flex-col text-gray-600">
                    <a
                      href={KMJK_PHONE_CALL_LINK}
                      className="hover:text-[var(--deep-charcoal)]"
                    >
                      {KMJK_CONTACT_NAME}: {KMJK_PHONE_DISPLAY}
                    </a>
                    <a
                      href={SWAY_PHONE_CALL_LINK}
                      className="hover:text-[var(--deep-charcoal)]"
                    >
                      {SWAY_CONTACT_NAME}: {SWAY_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-[var(--brushed-gold)]" size={22} />
                <div>
                  <p className="font-semibold text-[var(--deep-charcoal)]">Consultation Hours</p>
                  <ul className="text-gray-600 space-y-1">
                    {hours.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[var(--warm-off-white)] rounded-xl p-5 border border-white/70 shadow-sm">
              <p className="font-semibold text-[var(--deep-charcoal)] mb-3">Primary Service Areas</p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {serviceAreas.map((area) => (
                  <li key={area}>• {area}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                We coordinate HOA approvals, condo schedules, and coastal permitting so your project stays on track.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow-xl border border-white/70">
          <iframe
            title={`${businessName} service map`}
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

