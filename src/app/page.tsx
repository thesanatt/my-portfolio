import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import CodeWalkthrough from "@/components/CodeWalkthrough";
import InteractiveMap from "@/components/InteractiveMap";
import About from "@/components/About";
import Contact from "@/components/Contact";
import CommandPalette from "@/components/CommandPalette";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Projects />

      {/* Under the Hood section */}
      <section className="pt-10 pb-[100px] px-12 max-w-[1100px] mx-auto">
        <Reveal>
          <p className="font-body text-xs text-cream-dim mb-3.5 font-medium tracking-[2px] uppercase">
            Under the Hood
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-[38px] font-medium text-cream leading-[1.15] mb-3.5">
            How the code works.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-[15px] text-cream-muted leading-[1.75] max-w-[480px] mb-11">
            Step through annotated code from one of my projects. Click any line to see what it does.
          </p>
        </Reveal>
        <div className="max-w-[580px]">
          <CodeWalkthrough />
        </div>
      </section>

      {/* World section */}
      <section id="world" className="py-[100px] pb-[60px] px-12 max-w-[1100px] mx-auto">
        <Reveal>
          <p className="font-body text-xs text-cream-dim mb-3.5 font-medium tracking-[2px] uppercase">
            Around the World
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-[38px] font-medium text-cream leading-[1.15] mb-3.5">
            Places and stories.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-[15px] text-cream-muted leading-[1.75] max-w-[480px] mb-11">
            The best ideas come from the most unexpected places.
          </p>
        </Reveal>
        <Reveal>
          <InteractiveMap />
        </Reveal>
      </section>

      <About />
      <Contact />
      <CommandPalette />
    </main>
  );
}
