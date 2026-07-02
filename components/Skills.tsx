"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { ReactNode } from "react";

export function Skills({
  skills,
  certifications = [],
  alsoCurrently,
}: {
  skills: string[];
  certifications?: string[];
  alsoCurrently?: { title?: string; items: ReactNode[] };
}) {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-[color:var(--cream)] border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-ink-soft mb-3">
            Picked up along the way
          </p>
          <h2 className="font-heading text-5xl md:text-6xl text-ink">
            Skills &amp; superpowers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto">
          {skills.map((s, i) => (
            <motion.button
              key={s}
              type="button"
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.03,
                type: "spring",
                bounce: 0.5,
              }}
              whileHover={{
                scale: 1.08,
                rotate: i % 2 === 0 ? -1.5 : 1.5,
              }}
              whileTap={{ scale: 0.96 }}
              className="group px-4 py-3 text-sm md:text-base font-medium border border-ink/20 rounded-full bg-cream text-ink-soft hover:bg-[color:var(--accent-warm)] hover:text-cream hover:border-[color:var(--accent-warm)] hover:shadow-[0_8px_24px_-12px_oklch(0.56_0.12_300_/_0.6)] transition-colors duration-300 cursor-pointer"
            >
              {s}
            </motion.button>
          ))}
        </div>

        {certifications.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {certifications.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.05,
                  type: "spring",
                  bounce: 0.5,
                }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm md:text-base font-semibold rounded-full bg-[color:var(--accent-warm)] text-cream shadow-lg shadow-[oklch(0.56_0.12_300_/_0.3)] cursor-default"
              >
                <Award className="h-5 w-5" aria-hidden="true" />
                {c}
                <span className="ml-1 rounded-full bg-cream/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                  Certification
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {alsoCurrently && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 pt-10 border-t border-ink/10 max-w-5xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft mb-3 text-center">
              Also currently
            </p>
            {alsoCurrently.title && (
              <p className="font-heading italic text-2xl md:text-3xl text-ink leading-snug text-center">
                {alsoCurrently.title}
              </p>
            )}
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {alsoCurrently.items.map((item, i) => (
                <li
                  key={i}
                  className="relative pl-5 text-sm md:text-base text-ink-soft leading-relaxed"
                >
                  <span
                    className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full bg-[color:var(--accent-warm)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
