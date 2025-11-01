import { Phone } from 'lucide-react'
import { CALL_TEAM } from '@/constants/contact.js'

export default function CallTeamButtons({
  className = '',
  showNumbers = true,
  iconSize = 18,
  tone = 'gold',
}) {
  const baseWrapper =
    'flex w-full overflow-hidden rounded-lg border border-white/10 bg-[var(--deep-charcoal)] text-white shadow-lg'

  const halves = [
    {
      wrapper:
        tone === 'gold'
          ? 'bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] hover:bg-[var(--brushed-bronze)]'
          : 'bg-[var(--deep-charcoal)] text-white hover:bg-black',
      border: 'border-r border-white/20',
    },
    {
      wrapper:
        tone === 'gold'
          ? 'bg-[var(--deep-charcoal)] text-white hover:bg-black'
          : 'bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] hover:bg-[var(--brushed-bronze)]',
      border: '',
    },
  ]

  return (
    <div className={`${baseWrapper} ${className}`}>
      {CALL_TEAM.map(({ name, phoneDisplay, callLink }, idx) => (
        <a
          key={name}
          href={callLink}
          className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wide transition-colors sm:text-sm ${halves[idx]?.wrapper || halves[halves.length - 1].wrapper} ${idx === 0 ? halves[idx]?.border : ''}`}
        >
          <Phone size={iconSize} />
          <span>Call {name}</span>
          {showNumbers && <span className="opacity-80 whitespace-nowrap">({phoneDisplay})</span>}
        </a>
      ))}
    </div>
  )
}
