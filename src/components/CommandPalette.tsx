"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface PaletteItem {
  id: string;
  label: string;
  category: string;
  keywords: string[];
  action: () => void;
  detail?: string;
}

function getItems(close: () => void): PaletteItem[] {
  const go = (hash: string) => () => {
    close();
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return [
    // Sections
    { id: "nav-work", label: "Selected Work", category: "Sections", keywords: ["projects", "work", "portfolio", "built"], action: go("#work"), detail: "View my projects" },
    { id: "nav-world", label: "Places & Stories", category: "Sections", keywords: ["travel", "world", "map", "cities", "stories", "places"], action: go("#world"), detail: "Interactive travel map" },
    { id: "nav-about", label: "About Me", category: "Sections", keywords: ["about", "bio", "background", "who"], action: go("#about"), detail: "Background and tech stack" },
    { id: "nav-contact", label: "Contact", category: "Sections", keywords: ["contact", "email", "reach", "hire", "connect"], action: go("#contact"), detail: "Get in touch" },

    // Projects
    { id: "proj-scholar", label: "ScholarTrace", category: "Projects", keywords: ["scholar", "trace", "vscode", "extension", "academic", "integrity", "authorship", "code history", "logging"], action: go("#work"), detail: "VS Code extension for proving code authorship" },
    { id: "proj-ai-cost", label: "AI Task Cost Prediction", category: "Projects", keywords: ["ai", "cost", "prediction", "ml", "optimization", "machine learning", "infrastructure"], action: go("#work"), detail: "ML engine for predicting AI task costs" },

    // Tech
    { id: "tech-react", label: "React / Next.js", category: "Tech Stack", keywords: ["react", "next", "nextjs", "frontend", "javascript", "typescript", "jsx"], action: go("#about"), detail: "Primary frontend framework" },
    { id: "tech-python", label: "Python / PyTorch", category: "Tech Stack", keywords: ["python", "pytorch", "tensorflow", "ml", "machine learning", "ai", "data"], action: go("#about"), detail: "ML and backend scripting" },
    { id: "tech-node", label: "Node.js / Express", category: "Tech Stack", keywords: ["node", "express", "backend", "server", "api", "rest"], action: go("#about"), detail: "Backend development" },
    { id: "tech-db", label: "PostgreSQL / Prisma", category: "Tech Stack", keywords: ["postgres", "postgresql", "prisma", "database", "db", "sql", "orm"], action: go("#about"), detail: "Database and ORM" },
    { id: "tech-infra", label: "Vercel / Docker / Git", category: "Tech Stack", keywords: ["vercel", "docker", "git", "deploy", "deployment", "infrastructure", "devops", "ci"], action: go("#about"), detail: "Infrastructure and deployment" },

    // Links
    { id: "link-github", label: "GitHub", category: "Links", keywords: ["github", "code", "repo", "source", "repositories"], action: () => { close(); window.open("https://github.com/thesanatt", "_blank"); }, detail: "github.com/thesanatt" },
    { id: "link-resume", label: "Resume", category: "Links", keywords: ["resume", "cv", "pdf", "download", "experience"], action: () => { close(); window.open("/resume.pdf", "_blank"); }, detail: "Download PDF" },
    { id: "link-email", label: "Email", category: "Links", keywords: ["email", "mail", "contact", "reach"], action: () => { close(); window.location.href = "mailto:sanatt@umich.edu"; }, detail: "sanatt@umich.edu" },
    { id: "link-linkedin", label: "LinkedIn", category: "Links", keywords: ["linkedin", "professional", "network"], action: () => { close(); window.open("https://linkedin.com", "_blank"); }, detail: "Connect on LinkedIn" },
  ];
}

function fuzzyMatch(query: string, item: PaletteItem): number {
  const q = query.toLowerCase();
  const label = item.label.toLowerCase();
  const detail = (item.detail || "").toLowerCase();

  if (label === q) return 100;
  if (label.startsWith(q)) return 90;
  if (label.includes(q)) return 80;
  if (detail.includes(q)) return 60;

  for (const kw of item.keywords) {
    if (kw.startsWith(q)) return 70;
    if (kw.includes(q)) return 50;
  }

  // Check if query words match any keywords
  const words = q.split(/\s+/);
  let matchCount = 0;
  for (const word of words) {
    if (word.length < 2) continue;
    if (label.includes(word) || detail.includes(word) || item.keywords.some(kw => kw.includes(word))) {
      matchCount++;
    }
  }
  if (matchCount > 0) return 30 + matchCount * 10;

  return 0;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIdx(0);
  }, []);

  const items = getItems(close);

  const filtered = query.trim().length === 0
    ? items
    : items
        .map(item => ({ item, score: fuzzyMatch(query, item) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);

  // Group by category
  const grouped: Record<string, PaletteItem[]> = {};
  for (const item of filtered) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  const flatFiltered = filtered;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
        if (!open) {
          setQuery("");
          setSelectedIdx(0);
        }
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatFiltered[selectedIdx]) {
      flatFiltered[selectedIdx].action();
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105"
        style={{
          background: "#141311",
          border: "1px solid rgba(228,224,208,0.1)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8279" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="font-body text-xs text-cream-muted">Search</span>
        <kbd className="font-body text-[10px] text-cream-dim px-1.5 py-0.5 rounded"
          style={{ background: "rgba(228,224,208,0.06)", border: "1px solid rgba(228,224,208,0.08)" }}>
          {"\u2318K"}
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        className="w-full max-w-[520px] rounded-2xl overflow-hidden"
        style={{
          background: "#141311",
          border: "1px solid rgba(228,224,208,0.1)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(228,224,208,0.06)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5C5650" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyNav}
            placeholder="Search projects, tech, links..."
            className="flex-1 bg-transparent outline-none font-body text-[15px] text-cream placeholder:text-cream-dim"
          />
          <kbd
            onClick={close}
            className="font-body text-[11px] text-cream-dim px-2 py-1 rounded cursor-pointer hover:opacity-70"
            style={{ background: "rgba(228,224,208,0.06)", border: "1px solid rgba(228,224,208,0.08)" }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto py-2">
          {flatFiltered.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="font-body text-sm text-cream-dim">No results found</p>
            </div>
          ) : (
            Object.entries(grouped).map(([category, categoryItems]) => (
              <div key={category}>
                <p className="px-5 pt-3 pb-1.5 font-body text-[11px] text-cream-dim font-medium tracking-[1.5px] uppercase">
                  {category}
                </p>
                {categoryItems.map((item) => {
                  const globalIdx = flatFiltered.indexOf(item);
                  const isSelected = globalIdx === selectedIdx;
                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIdx(globalIdx)}
                      className="flex items-center justify-between px-5 py-2.5 cursor-pointer transition-colors duration-150"
                      style={{
                        background: isSelected ? "rgba(228,224,208,0.05)" : "transparent",
                      }}
                    >
                      <div>
                        <span className="font-body text-sm text-cream">{item.label}</span>
                        {item.detail && (
                          <span className="font-body text-xs text-cream-dim ml-3">{item.detail}</span>
                        )}
                      </div>
                      {isSelected && (
                        <span className="font-body text-[11px] text-cream-dim">{"\u21B5"}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 flex gap-4"
          style={{ borderTop: "1px solid rgba(228,224,208,0.06)" }}>
          <span className="font-body text-[11px] text-cream-dim flex items-center gap-1.5">
            <kbd className="px-1 py-0.5 rounded text-[10px]"
              style={{ background: "rgba(228,224,208,0.06)", border: "1px solid rgba(228,224,208,0.08)" }}>
              {"\u2191\u2193"}
            </kbd>
            navigate
          </span>
          <span className="font-body text-[11px] text-cream-dim flex items-center gap-1.5">
            <kbd className="px-1 py-0.5 rounded text-[10px]"
              style={{ background: "rgba(228,224,208,0.06)", border: "1px solid rgba(228,224,208,0.08)" }}>
              {"\u21B5"}
            </kbd>
            select
          </span>
          <span className="font-body text-[11px] text-cream-dim flex items-center gap-1.5">
            <kbd className="px-1 py-0.5 rounded text-[10px]"
              style={{ background: "rgba(228,224,208,0.06)", border: "1px solid rgba(228,224,208,0.08)" }}>
              esc
            </kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
