export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-white font-semibold text-sm">
          Godik<span className="text-violet-400">.ai</span>
        </span>
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Godik.ai — We build websites and automations
        </p>
        <div className="flex items-center gap-6">
          <a href="#services" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            Services
          </a>
          <a href="#about" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            About
          </a>
          <a href="#contact" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
