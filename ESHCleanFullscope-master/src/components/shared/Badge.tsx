import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'gold';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-zinc-800 text-zinc-300',
    success: 'bg-green-900 text-green-300',
    warning: 'bg-yellow-900 text-yellow-300',
    danger: 'bg-red-900 text-red-300',
    gold: 'bg-esh-gold-dark text-black',
  };

  return (
    <span 
      className={`
        inline-block px-3 py-1 
        text-xs uppercase tracking-wider font-medium 
        rounded-sm
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
