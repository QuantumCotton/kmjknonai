import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 
          bg-black border border-zinc-800 
          focus:border-white transition-colors 
          outline-none text-white
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
