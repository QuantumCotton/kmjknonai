import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div 
      className={`
        p-8 
        border border-zinc-800 
        ${hover ? 'hover:border-zinc-700' : ''} 
        bg-black/40 
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
