"use client";

import { useState } from "react";
import Reveal from "./Reveal";

interface ProjectProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  index: number;
  featured?: boolean;
}

function ProjectCard({ title, subtitle, description, tags, index, featured }: ProjectProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 0.08}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`rounded-[18px] transition-all duration-400 cursor-pointer ${
          featured ? "col-span-2" : ""
        }`}
        style={{
          background: hovered ? "#1A1917" : "#141311",
          border: `1px solid ${hovered ? "rgba(228,224,208,0.18)" : "rgba(228,224,208,0.08)"}`,
          padding: featured ? "36px 32px" : "28px 26px",
          transform: hovered ? "translateY(-2px)" : "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="font-body text-xs text-cream-dim tracking-wide">
            {subtitle}
          </span>
          <span
            className="text-base transition-colors duration-300"
            style={{ color: hovered ? "#D4C5A9" : "#5C5650" }}
          >
            {"\u2197"}
          </span>
        </div>

        <h3
          className="font-display font-medium text-cream mb-2.5 leading-[1.2]"
          style={{ fontSize: featured ? 27 : 22 }}
        >
          {title}
        </h3>

        <p
          className="font-body text-sm text-cream-muted leading-[1.7] mb-5"
          style={{ maxWidth: featured ? 560 : "none" }}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="font-body text-cream-soft text-[11.5px] font-medium px-3 py-1 rounded-md"
              style={{
                background: "rgba(212,197,169,0.06)",
                border: "1px solid rgba(212,197,169,0.08)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-[100px] px-12 max-w-[1100px] mx-auto">
      <Reveal>
        <p className="font-body text-xs text-cream-dim mb-3.5 font-medium tracking-[2px] uppercase">
          Selected Work
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-[38px] font-medium text-cream leading-[1.15] mb-11">
          {"A few things I\u2019ve built."}
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 gap-4">
        <ProjectCard
          index={0}
          featured
          title="ScholarTrace"
          subtitle="Developer Tools · Academic Integrity"
          description="A VS Code extension and web platform that logs code history so students can prove authorship. I designed the extension-to-backend pipeline and built the professor-facing dashboard."
          tags={["React", "TypeScript", "Express", "MongoDB"]}
        />
        <ProjectCard
          index={1}
          title="AI Task Cost Prediction"
          subtitle="Machine Learning · Optimization"
          description="An ML engine that predicts the cost of running AI tasks across different models and configurations."
          tags={["Python", "PyTorch", "FastAPI"]}
        />
        <ProjectCard
          index={2}
          title="More Coming Soon"
          subtitle="In Progress"
          description="Always building. Check back or ask the AI assistant about what I'm working on next."
          tags={["Stay Tuned"]}
        />
      </div>
    </section>
  );
}
