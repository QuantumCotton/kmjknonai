import { useEffect } from 'react'
import { Check, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import CallTeamButtons from '@/components/CallTeamButtons.jsx'
import bathroomSpa from '../assets/bathroom_luxury_spa.jpg'
import { KMJK_PHONE_CALL_LINK } from '@/constants/contact.js'

export default function BathroomRemodelSewallsPoint(){
  useEffect(() => {
    document.title = 'Bathroom Remodel in Sewalls Point, FL | KMJK Home Improvement'
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
          <h1 className="text-4xl font-bold mb-3">Bathroom Remodel in Sewall's Point, FL</h1>
          <p className="text-lg opacity-90">Luxury finishes. Reliable timelines. A seamless experience from design to install.</p>
          <div className="mt-6 flex flex-col gap-3">
            <CallTeamButtons className="sm:justify-center" iconSize={18} />
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/contact">
                <Button size="lg" variant="outline" className="bg-white text-[var(--deep-charcoal)]">
                  Free Consultation
                </Button>
              </a>
              <Button
                type="button"
                onClick={() => (window.location.href = KMJK_PHONE_CALL_LINK)}
                size="lg"
                className="bg-[var(--deep-charcoal)] text-white"
              >
                <Upload className="mr-2" size={18} />
                Share Project Photos
              </Button>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80">
            Text us inspiration photos or your punch list so we can prioritize Sewall's Point scheduling and finishes.
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
              <p className="mb-2"><strong>Riverside Refresh:</strong> $48k - $72k</p>
              <p className="mb-2"><strong>Intracoastal Retreat:</strong> $85k - $125k</p>
              <p className="mb-2"><strong>Estate Spa Experience:</strong> $155k+</p>
              <p className="text-sm text-gray-600">Includes concierge design, permitting, and daily communication from start to finish.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--warm-off-white)]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--deep-charcoal)]">Sewall's Point Homeowners Trust KMJK</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-3 text-[var(--brushed-gold)] text-xl">★★★★★</div>
            <p className="text-gray-700 italic mb-4">
              "While we were traveling, KMJK transformed our owners' suite. They coordinated with our designer, wrapped every surface for protection, and the steam shower they built is flawless. We came home to a spotless, magazine-worthy bath."
            </p>
            <div className="text-sm text-gray-600 font-semibold">— Brian & Angela M., Sewall's Point</div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Sewalls Point, FL Service Area</h2>
          <p className="text-gray-700">Proudly serving Sewalls Point, FL and the Treasure Coast.</p>
        </div>
      </section>
    </div>
  )
}
