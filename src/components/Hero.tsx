import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-12 max-w-[1100px] mx-auto relative">
      <div className="max-w-[600px]">
        <Reveal>
          <p className="font-body text-[13px] text-cream-dim mb-7 tracking-[1.5px] uppercase">
            Computer Science &middot; University of Michigan
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display text-[52px] font-medium leading-[1.15] text-cream mb-6">
            I like building things
            <br />
            that are <span className="text-accent">useful</span> and
            <br />
            <span className="text-accent">well-crafted.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="w-12 h-px bg-gold opacity-40 my-7" />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-body text-base text-cream-soft leading-[1.8] max-w-[460px] mb-10">
            Full-stack applications, AI tools, developer platforms. Currently at
            the University of Michigan, always working on something new.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex gap-4 items-center">
            <a
              href="#work"
              className="bg-accent text-bg px-8 py-3.5 rounded-[10px] text-sm font-body font-semibold no-underline hover:opacity-90 transition-opacity"
            >
              See my work
            </a>
            <a
              href="https://github.com/thesanatt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-muted text-sm font-body no-underline px-5 py-3.5 hover:text-cream transition-colors"
            >
              {"GitHub \u2192"}
            </a>
          </div>
        </Reveal>
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          right: "8%",
          top: "25%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(201,184,140,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </section>
  );
}