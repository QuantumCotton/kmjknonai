import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm uppercase tracking-wide text-zinc-500 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 
          bg-black border border-zinc-800 
          focus:border-white transition-colors 
          outline-none text-white resize-none
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
