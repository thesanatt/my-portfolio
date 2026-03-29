import Reveal from "@/components/Reveal";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <Reveal>
          <h1 className="font-display text-[72px] md:text-[96px] font-medium text-cream leading-none mb-4">
            404
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-base text-cream-muted mb-8">
            This page does not exist.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="/"
            className="font-body text-sm text-accent no-underline hover:opacity-80 transition-opacity"
          >
            {"\u2190 Back home"}
          </a>
        </Reveal>
      </div>
    </main>
  );
}