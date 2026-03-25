"use client";

import { useEffect, useState } from "react";

const navLinks = ["Work", "World", "About", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
      <div className="max-w-[1100px] mx-auto px-12 flex justify-between items-center h-[72px]">
        <a
          href="#"
          className="font-display font-semibold text-xl text-cream no-underline"
        >
          Sanat Gupta
        </a>
        <div className="flex gap-8 items-center">
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
      </div>
    </nav>
  );
}
