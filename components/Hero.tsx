"use client";

import { motion } from "framer-motion";

export function Hero({
  name,
  headline,
  summary,
  linkedin,
}: {
  name: string;
  headline: string;
  summary: string;
  linkedin: string | null;
}) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-24 w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-lilac/40" />
      <div className="absolute top-32 -right-32 w-[640px] h-[640px] rounded-full bg-primary/15 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-lilac/50 blur-3xl -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-heading text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-primary mb-6">
          A career, in milestones
        </p>
        <h1 className="font-heading text-7xl md:text-9xl lg:text-[10rem] text-ink leading-[0.92] mb-8">
          {name}
        </h1>
        <p className="font-heading italic text-3xl md:text-4xl lg:text-5xl text-ink-soft leading-snug mb-10 w-full pr-0 md:pr-12">
          {headline}
        </p>
        <p className="text-lg md:text-xl text-ink/85 leading-relaxed mb-12 w-full pr-0 md:pr-12">
          {summary}
        </p>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
          >
            Connect on LinkedIn <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </motion.div>
    </section>
  );
}
