interface StatProps {
  value: string | number;
  label: string;
  border?: boolean;
  className?: string;
}

export default function Stat({ value, label, border = true, className = '' }: StatProps) {
  return (
    <div className={`${border ? 'border-l border-zinc-800 pl-6' : ''} text-left ${className}`}>
      <div className="text-3xl font-light mb-2">{value}</div>
      <div className="text-sm text-zinc-500 uppercase tracking-wide">{label}</div>
    </div>
  );
}
