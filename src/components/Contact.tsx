import Reveal from "./Reveal";

const links = [
  { label: "Email", href: "mailto:sanatt@umich.edu" },
  { label: "GitHub", href: "https://github.com/thesanatt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sanat-gupta/" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-[100px] pb-20 px-12 max-w-[1100px] mx-auto">
      <div className="text-center max-w-[500px] mx-auto">
        <Reveal>
          <p className="font-body text-xs text-cream-dim mb-3.5 font-medium tracking-[2px] uppercase">
            Say Hello
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-[38px] font-medium text-cream leading-[1.15] mb-3.5">
            {"Let\u2019s connect."}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-[15px] text-cream-muted leading-[1.75] mb-11">
            Always open to interesting conversations, collaborations, and new opportunities.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex gap-3 justify-center mb-[72px]">
            {links.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[10px] px-6 py-3 text-cream-soft no-underline font-body text-[13.5px] font-medium hover:opacity-80 transition-opacity"
                style={{ background: "#141311", border: "1px solid rgba(228,224,208,0.08)" }}
              >
                {c.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="pt-7"
            style={{ borderTop: "1px solid rgba(228,224,208,0.08)" }}
          >
            <p className="font-body text-[12.5px] text-cream-dim">
              {"Built by Sanat Gupta with Next.js, TypeScript, Tailwind, Prisma & Claude"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
