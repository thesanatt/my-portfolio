"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function AIChat() {
  const [messages] = useState([
    { role: "user" as const, text: "What kind of projects does Sanat work on?" },
    {
      role: "ai" as const,
      text: "Mostly full-stack tools that solve real problems. A VS Code extension for proving code authorship, an ML engine for predicting AI task costs. He tends to gravitate toward projects where the engineering serves something practical.",
    },
  ]);
  const [input, setInput] = useState("");

  return (
    <Reveal delay={0.08}>
      <div
        className="rounded-[18px] overflow-hidden"
        style={{ background: "#141311", border: "1px solid rgba(228,224,208,0.08)" }}
      >
        <div
          className="px-[22px] py-3.5 flex items-center gap-2.5"
          style={{ borderBottom: "1px solid rgba(228,224,208,0.08)" }}
        >
          <div
            className="w-[7px] h-[7px] rounded-full"
            style={{ background: "#8B7D68", opacity: 0.5 }}
          />
          <span className="font-body text-[12.5px] text-cream-dim font-medium">
            Ask about my work
          </span>
        </div>

        <div className="px-5 py-4 min-h-[140px]">
          {messages.map((m, i) => (
            <div
              key={i}
              className="flex mb-3"
              style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}
            >
              <div
                className="px-[15px] py-2.5 rounded-[13px] text-[13px] leading-[1.65] font-body max-w-[82%]"
                style={{
                  background: m.role === "user" ? "rgba(212,197,169,0.1)" : "#1A1917",
                  color: m.role === "user" ? "#E8E0D0" : "#8A8279",
                  border: "1px solid rgba(228,224,208,0.08)",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div
          className="px-3.5 py-2.5 flex gap-2.5"
          style={{ borderTop: "1px solid rgba(228,224,208,0.08)" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 rounded-[10px] px-[15px] py-2.5 text-[13px] font-body outline-none"
            style={{
              background: "#1A1917",
              border: "1px solid rgba(228,224,208,0.08)",
              color: "#E8E0D0",
            }}
          />
          <button
            className="rounded-[10px] px-[18px] py-2.5 text-sm cursor-pointer"
            style={{
              background: "rgba(212,197,169,0.1)",
              color: "#D4C5A9",
              border: "1px solid rgba(212,197,169,0.15)",
            }}
          >
            {"\u2192"}
          </button>
        </div>
      </div>
    </Reveal>
  );
}
