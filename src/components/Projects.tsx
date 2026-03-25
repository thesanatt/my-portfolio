"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import Reveal from "./Reveal";

function ProjectCard({
  slug,
  title,
  subtitle,
  description,
  tags,
  index,
}: {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 0.08}>
      <a
        href={`/projects/${slug}`}
        className="block no-underline"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="rounded-[18px] transition-all duration-400 cursor-pointer h-full"
          style={{
            background: hovered ? "#1A1917" : "#141311",
            border: `1px solid ${hovered ? "rgba(228,224,208,0.18)" : "rgba(228,224,208,0.08)"}`,
            padding: "28px 26px",
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

          <h3 className="font-display font-medium text-cream mb-2.5 leading-[1.2] text-[20px] md:text-[22px]">
            {title}
          </h3>

          <p className="font-body text-sm text-cream-muted leading-[1.7] mb-5">
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
      </a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-16 md:py-[100px] px-6 md:px-12 max-w-[1100px] mx-auto">
      <Reveal>
        <p className="font-body text-xs text-cream-dim mb-3.5 font-medium tracking-[2px] uppercase">
          Selected Work
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-[30px] md:text-[38px] font-medium text-cream leading-[1.15] mb-8 md:mb-11">
          {"A few things I\u2019ve built."}
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            index={i}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}
