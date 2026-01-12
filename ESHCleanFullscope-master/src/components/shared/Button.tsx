import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-white text-black hover:bg-zinc-200',
    secondary: 'border border-white text-white hover:bg-white/10',
    accent: 'bg-esh-gold text-black hover:bg-esh-gold-light'
  };
  
  return (
    <button 
      className={`px-8 py-4 transition-all duration-300 text-sm tracking-wider uppercase font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
