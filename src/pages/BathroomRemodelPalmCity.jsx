import { useEffect } from 'react'
import { MessageSquare, Check } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import bathroomSpa from '../assets/bathroom_luxury_spa.jpg'
import { KMJK_CONTACT_NAME, KMJK_PHONE_DISPLAY, KMJK_PHONE_SMS_LINK } from '@/constants/contact.js'

export default function BathroomRemodelPalmCity(){
  useEffect(() => {
    document.title = 'Bathroom Remodel in Palm City, FL | KMJK Home Improvement'
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How long does a bathroom remodel take?', acceptedAnswer: { '@type': 'Answer', text: 'Typical projects take 7–21 days depending on scope.' } },
        { '@type': 'Question', name: 'Do you offer design help?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We include design consultation and material guidance.' } },
        { '@type': 'Question', name: 'Are you licensed and insured?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, fully licensed and insured in Florida.' } }
      ]
    }
    const s = document.createElement('script'); s.type='application/ld+json'; s.textContent = JSON.stringify(faq); document.head.appendChild(s)
    return () => { document.head.removeChild(s) }
  }, [])

  return (
    <div className="pt-20">
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bathroomSpa})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-3">Bathroom Remodel in Palm City, FL</h1>
          <p className="text-lg opacity-90">Luxury finishes. Reliable timelines. A seamless experience from design to install.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <a href={KMJK_PHONE_SMS_LINK}>
              <Button size="lg" className="bg-[var(--brushed-gold)] text-white">
                <MessageSquare className="mr-2" size={18} />
                Text {KMJK_CONTACT_NAME} ({KMJK_PHONE_DISPLAY})
              </Button>
            </a>
            <a href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-[var(--deep-charcoal)]">Free Consultation</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why KMJK</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><Check className="text-[var(--brushed-gold)] mr-2"/>Licensed and insured</li>
              <li className="flex items-start"><Check className="text-[var(--brushed-gold)] mr-2"/>Dedicated project manager</li>
              <li className="flex items-start"><Check className="text-[var(--brushed-gold)] mr-2"/>Premium tile, fixtures, and cabinetry</li>
              <li className="flex items-start"><Check className="text-[var(--brushed-gold)] mr-2"/>Clear timelines and daily cleanup</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Typical Investment</h2>
            <div className="rounded-lg border p-4">
              <p className="mb-2"><strong>Refresh Retreat:</strong> $35k – $55k</p>
              <p className="mb-2"><strong>Full Custom Remodel:</strong> $65k – $105k</p>
              <p className="mb-2"><strong>Luxury Spa Suite:</strong> $135k+</p>
              <p className="text-sm text-gray-600">Financing available; ask during consultation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--deep-charcoal)]">Palm City Homeowners Trust KMJK</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-3 text-[var(--brushed-gold)] text-xl">★★★★★</div>
            <p className="text-gray-700 italic mb-4">
              "KMJK turned our master bath into a true retreat. The custom cabinetry and steam shower were exact to the design Chris showed us, and the crew kept everything immaculate. Worth every penny."
            </p>
            <div className="text-sm text-gray-600 font-semibold">— Olivia & Brent M., Palm City</div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Palm City, FL Service Area</h2>
          <p className="text-gray-700">Proudly serving Palm City, FL and the Treasure Coast.</p>
        </div>
      </section>
    </div>
  )
}
