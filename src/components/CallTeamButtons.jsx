import { MessageSquare, Phone } from 'lucide-react'
import { CALL_TEAM, KMJK_PHONE_SMS_LINK } from '@/constants/contact.js'

export default function CallTeamButtons({
  className = '',
  showNumbers = true,
  iconSize = 18,
  tone = 'gold',
}) {
  const isTransparent = tone === 'transparent'

  const handleContactClick = (contactType, contactName) => {
    // Track Meta Pixel Contact event
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Contact', {
        contact_type: contactType,
        contact_name: contactName,
        content_name: `${contactType} ${contactName}`
      })
    }
  }

  const baseWrapper = isTransparent
    ? 'flex w-full overflow-hidden rounded-md border border-white/60 bg-transparent text-white backdrop-blur-sm'
    : 'flex w-full overflow-hidden rounded-lg border border-white/10 bg-[var(--deep-charcoal)] text-white shadow-lg'

  const halves = isTransparent
    ? [
        {
          wrapper: 'bg-transparent text-white hover:bg-white/10 transition-colors',
          border: 'border-r border-white/40',
        },
        {
          wrapper: 'bg-transparent text-white hover:bg-white/10 transition-colors',
          border: '',
        },
      ]
    : [
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
      {CALL_TEAM.map(({ name, phoneDisplay, callLink }, idx) => {
        const isFirst = idx === 0
        const href = isFirst ? KMJK_PHONE_SMS_LINK : callLink
        const Icon = isFirst ? MessageSquare : Phone

        return (
          <a
            key={name}
            href={href}
            onClick={() => handleContactClick(isFirst ? 'Text' : 'Call', name)}
            className={`flex flex-1 items-center justify-center gap-2 py-4 px-6 text-sm font-semibold uppercase tracking-wide transition-colors sm:text-base ${halves[idx]?.wrapper || halves[halves.length - 1].wrapper} ${idx === 0 ? halves[idx]?.border : ''}`}
          >
            <Icon size={iconSize} />
            <span>{isFirst ? 'Text' : 'Call'} {name}</span>
            {showNumbers && <span className="opacity-80 whitespace-nowrap">({phoneDisplay})</span>}
          </a>
        )
      })}
    </div>
  )
}
