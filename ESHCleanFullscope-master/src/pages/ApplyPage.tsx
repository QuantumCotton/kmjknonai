import { useEffect } from 'react';

export default function ApplyPage() {
  useEffect(() => {
    window.location.href = '/contractor-application-form.html';
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-zinc-400">
      Redirecting to application...
    </div>
  );
}
