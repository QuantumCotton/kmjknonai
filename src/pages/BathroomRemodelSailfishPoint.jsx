import { useEffect } from 'react'
import { Calendar, Upload, Check } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import CallTeamButtons from '@/components/CallTeamButtons.jsx'
import bathroomSpa from '../assets/bathroom_luxury_spa.jpg'
import { KMJK_PHONE_CALL_LINK } from '@/constants/contact.js'

export default function BathroomRemodelSailfishPoint(){
  useEffect(() => {
    document.title = 'Bathroom Remodel in Sailfish Point, FL | KMJK Home Improvement'
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
          <div className="inline-block bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
            Sailfish Point Signature Service • Projects from $85k+
          </div>
          <h1 className="text-4xl font-bold mb-3">Bathroom Remodel in Sailfish Point, FL</h1>
          <p className="text-lg opacity-90">Luxury finishes. Reliable timelines. A seamless experience from design to install.</p>
          <div className="mt-6 flex flex-col gap-3">
            <CallTeamButtons className="sm:justify-center" iconSize={20} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/contact">
                <Button size="lg" className="w-full bg-white text-[var(--deep-charcoal)] hover:bg-gray-100">
                  <Calendar className="mr-2" size={20} />
                  Schedule Private Design Call
                </Button>
              </a>
              <Button
                onClick={() => window.location.href = KMJK_PHONE_CALL_LINK}
                size="lg"
                className="w-full bg-[var(--deep-charcoal)] text-white hover:bg-[var(--brushed-gold)]"
              >
                <Upload className="mr-2" size={20} />
                Upload Estate Photos
              </Button>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80">
            Share inspiration shots or punch lists when you text us for Sailfish Point scheduling priority.
          </p>
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
              <p className="mb-2"><strong>Signature Suites:</strong> $85k - $130k</p>
              <p className="mb-2"><strong>Ocean Club Retreat:</strong> $145k - $195k</p>
              <p className="mb-2"><strong>Estate Spa Experience:</strong> $225k+</p>
              <p className="text-sm text-gray-600">Includes concierge design, HOA coordination, and white-glove protection for existing finishes.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--deep-charcoal)]">Sailfish Point Families Share Their Experience</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-3 text-[var(--brushed-gold)] text-xl">*****</div>
            <p className="text-gray-700 italic mb-4">
              "Our Sailfish Point cabana bath had to wow guests and survive salt air. KMJK coordinated with security, protected every floor, and delivered a steam shower that feels like the club spa."
            </p>
            <div className="text-sm text-gray-600 font-semibold">- Dana & William L., Sailfish Point</div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Sailfish Point, FL Service Area</h2>
          <p className="text-gray-700">Proudly serving Sailfish Point, FL and the Treasure Coast.</p>
        </div>
      </section>
    </div>
  )
}
