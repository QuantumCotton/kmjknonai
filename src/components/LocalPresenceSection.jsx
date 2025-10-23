import { Phone, MapPin, Clock } from 'lucide-react'

export function LocalPresenceSection({
  businessName = 'KMJK Home Improvement',
  addressLines = ['Stuart, FL 34994'],
  phone = '650-501-7659',
  hours = ['Mon–Fri: 8am – 6pm', 'Sat: By appointment', 'Sun: Closed'],
  serviceAreas = ['Palm City', 'Sewall’s Point', 'Sailfish Point', 'Hutchinson Island'],
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.2940979754007!2d-80.25275902381229!3d27.197551850869153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88ded61f23995ab9%3A0x36a2f8a7b2d0d0c7!2sStuart%2C%20FL!5e0!3m2!1sen!2sus!4v1730000000000!5m2!1sen!2sus',
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
                  <p className="font-semibold text-[var(--deep-charcoal)]">Direct Line</p>
                  <a href={`tel:${phone}`} className="text-gray-600 hover:text-[var(--deep-charcoal)]">
                    {phone}
                  </a>
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
