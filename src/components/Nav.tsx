"use client";

import { useEffect, useState } from "react";

const navLinks = ["Work", "World", "About", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl border-b border-border"
          : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(12,11,10,0.88)" : "transparent",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex justify-between items-center h-[64px] md:h-[72px]">
        <a
          href="#"
          className="font-display font-semibold text-lg md:text-xl text-cream no-underline"
        >
          Sanat Gupta
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-cream-muted no-underline text-sm font-body hover:text-cream transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="text-accent no-underline text-sm font-body font-medium px-5 py-2 rounded-lg border border-accent/20 hover:border-accent/40 transition-all"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2"
          style={{
            background: "rgba(12,11,10,0.95)",
            backdropFilter: "blur(24px)",
          }}
        >
          {navLinks.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-cream-soft no-underline text-base font-body hover:text-cream transition-colors"
              style={{ borderBottom: "1px solid rgba(228,224,208,0.06)" }}
            >
              {label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            onClick={() => setMenuOpen(false)}
            className="block py-3 text-accent no-underline text-base font-body font-medium"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
