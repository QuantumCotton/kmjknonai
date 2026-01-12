export default function ThanksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-xl mx-auto text-center border border-zinc-800 bg-zinc-900/60 rounded-xl p-10">
        <img
          src="/images/logos/esh-dark-bg.png"
          alt="Elite Service Hub"
          className="h-16 w-auto mx-auto mb-4 opacity-90"
        />
        <h1 className="text-3xl md:text-4xl font-light text-white font-serif mb-3">
          Thank you <span className="text-esh-gold">for your submission</span>
        </h1>
        <p className="text-zinc-400 mb-6">
          We've received your information. An Elite Service Hub representative will review and reach out within 1–2 business days.
        </p>
        <a
          href="/"
          className="inline-block px-5 py-3 border border-esh-gold text-black bg-esh-gold font-semibold rounded-md hover:bg-transparent hover:text-esh-gold transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
