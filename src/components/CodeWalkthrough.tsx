"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const steps = [
  {
    line: "vscode.workspace.onDidChangeTextDocument(event => {",
    note: "Listen for every file edit across all open files in VS Code, filtering out non-file schemes like git and output channels.",
  },
  {
    line: "const timeout = setTimeout(() => { ... }, 5000);",
    note: "Debounce per file. Only snapshot after 5 seconds of inactivity so we capture meaningful edits, not every keystroke.",
  },
  {
    line: "logEntries.push({ timestamp, filename, content });",
    note: "Store the full file snapshot with a timestamp. These build up into a tamper-proof timeline of how the code was actually written.",
  },
  {
    line: "const res = await fetch(`${API}/api/classes/verify/${code}`);",
    note: "Before saving a class code, validate it against the backend. If the class does not exist, the student gets an error immediately.",
  },
  {
    line: "await fetch(`${API}/api/logs/upload`, { method: 'POST', ... })",
    note: "Push all snapshots to Railway with the student email and class code. The professor sees them appear in the dashboard instantly.",
  },
];

export default function CodeWalkthrough() {
  const [step, setStep] = useState(0);

  return (
    <Reveal>
      <div className="rounded-[18px] overflow-hidden" style={{ background: "#1E1D1A" }}>
        <div
          className="px-5 py-3.5 flex items-center gap-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div
              key={c}
              className="w-2.5 h-2.5 rounded-full opacity-80"
              style={{ background: c }}
            />
          ))}
          <span
            className="font-body text-xs ml-2.5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            ScholarTrace — extension.ts
          </span>
        </div>

        <div className="px-4 pt-4 pb-2">
          {steps.map((s, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              className="font-mono text-xs py-[7px] px-3 mb-0.5 rounded-md cursor-pointer transition-all duration-250"
              style={{
                background: step === i ? "rgba(184,168,138,0.08)" : "transparent",
                borderLeft: step === i ? "2px solid rgba(184,168,138,0.5)" : "2px solid transparent",
                color: step === i ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
                lineHeight: 1.6,
              }}
            >
              {s.line}
            </div>
          ))}
        </div>

        <div
          className="px-[22px] py-3.5 font-body text-[13px] leading-[1.65]"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {steps[step].note}
        </div>

        <div className="px-4 pb-3.5 flex gap-[5px]">
          {steps.map((_, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              className="flex-1 h-0.5 rounded-sm cursor-pointer transition-colors duration-300"
              style={{
                background: i <= step ? "rgba(184,168,138,0.4)" : "rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}