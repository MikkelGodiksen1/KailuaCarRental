"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-semibold text-lg tracking-tight">
          Godik<span className="text-violet-400">.ai</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Services
          </a>
          <a href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <a
          href="#contact"
          className="text-sm font-medium px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
