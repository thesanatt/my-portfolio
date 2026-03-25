import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} \u2014 Sanat Gupta`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen px-6 md:px-12 pt-28 pb-20 max-w-[860px] mx-auto">
      {/* Back link */}
      <Reveal>
        <a
          href="/#work"
          className="font-body text-sm text-cream-dim no-underline hover:text-cream transition-colors"
        >
          {"\u2190 Back to all projects"}
        </a>
      </Reveal>

      {/* Header */}
      <div className="mt-8 mb-12">
        <Reveal>
          <p className="font-body text-xs text-cream-dim mb-3 font-medium tracking-[2px] uppercase">
            {project.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-[36px] md:text-[48px] font-medium text-cream leading-[1.1] mb-5">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((t) => (
              <span
                key={t}
                className="font-body text-cream-soft text-xs font-medium px-3 py-1 rounded-md"
                style={{
                  background: "rgba(212,197,169,0.06)",
                  border: "1px solid rgba(212,197,169,0.08)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-accent no-underline hover:opacity-80 transition-opacity"
              >
                {"GitHub \u2192"}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-accent no-underline hover:opacity-80 transition-opacity"
              >
                {"Live Demo \u2192"}
              </a>
            )}
          </div>
        </Reveal>
      </div>

      {/* Divider */}
      <div className="w-12 h-px bg-gold opacity-40 mb-12" />

      {/* Long description */}
      <Reveal>
        <p className="font-body text-[15px] text-cream-soft leading-[1.85] mb-14">
          {project.longDescription}
        </p>
      </Reveal>

      {/* Features */}
      <Reveal>
        <div className="mb-14">
          <p className="font-body text-xs text-cream-dim mb-5 font-medium tracking-[2px] uppercase">
            What it does
          </p>
          <div className="space-y-3">
            {project.features.map((f, i) => (
              <div
                key={i}
                className="flex gap-3 items-start"
              >
                <span className="text-cream-dim mt-1.5 text-[8px]">{"\u25CF"}</span>
                <p className="font-body text-sm text-cream-muted leading-[1.7]">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Tech details */}
      <Reveal>
        <div className="mb-14">
          <p className="font-body text-xs text-cream-dim mb-5 font-medium tracking-[2px] uppercase">
            Tech stack
          </p>
          <div
            className="rounded-2xl p-6"
            style={{ background: "#141311", border: "1px solid rgba(228,224,208,0.08)" }}
          >
            {project.techDetails.map((row, i) => (
              <div
                key={row.label}
                className="flex justify-between py-3"
                style={{
                  borderBottom:
                    i < project.techDetails.length - 1
                      ? "1px solid rgba(228,224,208,0.08)"
                      : "none",
                }}
              >
                <span className="font-body text-[13px] text-cream-dim font-medium">
                  {row.label}
                </span>
                <span className="font-body text-[13px] text-cream-muted text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Back to projects */}
      <Reveal>
        <a
          href="/#work"
          className="font-body text-sm text-cream-dim no-underline hover:text-cream transition-colors"
        >
          {"\u2190 Back to all projects"}
        </a>
      </Reveal>
    </main>
  );
}
