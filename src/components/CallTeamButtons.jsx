import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { CALL_TEAM } from '@/constants/contact.js'

export default function CallTeamButtons({
  className = '',
  buttonClassName = '',
  size = 'lg',
  showNumbers = true,
  iconSize = 20,
  primaryClassName,
  secondaryClassName,
}) {
  const themes = [
    primaryClassName || 'bg-[var(--brushed-gold)] hover:bg-[var(--brushed-bronze)] text-white',
    secondaryClassName || 'bg-[var(--deep-charcoal)] hover:bg-black text-white border border-white/10',
  ]

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {CALL_TEAM.map(({ name, phoneDisplay, callLink }, idx) => (
        <a key={name} href={callLink} className="flex-1">
          <Button
            size={size}
            className={`w-full flex items-center justify-center gap-2 ${themes[idx] || themes[themes.length - 1]} ${buttonClassName}`}
          >
            <Phone size={iconSize} />
            <span className="font-semibold uppercase tracking-wide text-sm md:text-base">Call {name}</span>
            {showNumbers && (
              <span className="text-xs md:text-sm opacity-90 whitespace-nowrap">({phoneDisplay})</span>
            )}
          </Button>
        </a>
      ))}
    </div>
  )
}
