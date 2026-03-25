"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const steps = [
  {
    line: "const trace = new ScholarTrace()",
    note: "Initialize the engine that quietly tracks every keystroke in VS Code",
  },
  {
    line: "trace.startSession({ userId, projectId })",
    note: "Begin a session linked to the student and their assignment",
  },
  {
    line: "trace.onEdit((delta) => log(delta))",
    note: "Each edit is timestamped and hashed, building a tamper-proof timeline",
  },
  {
    line: "await trace.push({ commit: sha256(delta) })",
    note: "Push the proof to the backend. A professor can now verify authorship.",
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
            ScholarTrace
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
