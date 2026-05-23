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
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-24 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-ink-soft mb-6">
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
            className="inline-block border border-ink text-ink px-6 py-3 text-sm uppercase tracking-[0.18em] hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            Connect on LinkedIn
          </a>
        )}
      </motion.div>
    </section>
  );
}
