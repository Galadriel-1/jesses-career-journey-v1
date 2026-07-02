import { ReactNode } from "react";

export function Path({ children }: { children: ReactNode }) {
  return (
    <section id="journey" className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-32">
      <header className="text-center mb-20">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.28em] text-primary mb-4">
          the journey
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tight leading-tight">
          A path, with stops.
        </h2>
      </header>
      <div
        className="md:hidden pointer-events-none absolute left-[34px] top-72 bottom-32 w-[2px] bg-gradient-to-b from-primary/40 via-foreground/15 to-primary/40"
        aria-hidden="true"
      />
      <div
        className="hidden md:block pointer-events-none absolute left-1/2 -translate-x-1/2 top-72 bottom-32 w-[2px] bg-gradient-to-b from-primary/40 via-foreground/15 to-primary/40 shadow-[0_0_24px_rgba(138,99,184,0.15)]"
        aria-hidden="true"
      />
      <div className="relative space-y-16 md:space-y-28">{children}</div>
    </section>
  );
}
