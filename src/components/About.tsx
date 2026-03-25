import Reveal from "./Reveal";

const techStack = [
  { label: "Languages", items: "TypeScript \u00B7 Python \u00B7 Java \u00B7 C++" },
  { label: "Frontend", items: "React \u00B7 Next.js \u00B7 Tailwind" },
  { label: "Backend", items: "Node.js \u00B7 PostgreSQL \u00B7 Prisma" },
  { label: "ML", items: "PyTorch \u00B7 TensorFlow \u00B7 LLM APIs" },
  { label: "Infra", items: "Git \u00B7 Docker \u00B7 Vercel" },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-[100px] px-6 md:px-12 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
        <div>
          <Reveal>
            <p className="font-body text-xs text-cream-dim mb-3.5 font-medium tracking-[2px] uppercase">
              About
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[30px] md:text-[38px] font-medium text-cream leading-[1.15] mb-8 md:mb-11">
              A bit about me.
            </h2>
          </Reveal>

          <Reveal>
            <p className="font-body text-[15px] text-cream-muted leading-[1.85] mb-[18px]">
              {"I study computer science at the University of Michigan. I\u2019ve had the chance to live and study in a few different places, and that shaped how I approach building things."}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-body text-[15px] text-cream-muted leading-[1.85]">
              I work across the stack and care about making things that are useful and considered, not just functional.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="rounded-2xl p-6 md:p-7"
            style={{ background: "#141311", border: "1px solid rgba(228,224,208,0.08)" }}
          >
            <p className="font-body text-[11.5px] text-cream-dim mb-[18px] font-medium tracking-[2px] uppercase">
              What I work with
            </p>
            {techStack.map((row, i) => (
              <div
                key={row.label}
                className="flex justify-between py-[11px]"
                style={{
                  borderBottom: i < techStack.length - 1 ? "1px solid rgba(228,224,208,0.08)" : "none",
                }}
              >
                <span className="font-body text-[13px] text-cream-dim font-medium">
                  {row.label}
                </span>
                <span className="font-body text-[13px] text-cream-muted text-right">
                  {row.items}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
