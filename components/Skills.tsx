"use client";

import { motion } from "framer-motion";

export function Skills({
  skills,
  alsoCurrently,
}: {
  skills: string[];
  alsoCurrently?: { title: string; description: string };
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
              className="group px-4 py-3 text-sm md:text-base font-medium border border-ink/20 rounded-full bg-cream text-ink-soft hover:bg-[color:var(--accent-warm)] hover:text-cream hover:border-[color:var(--accent-warm)] hover:shadow-[0_8px_24px_-12px_oklch(0.58_0.14_38_/_0.6)] transition-colors duration-300 cursor-pointer"
            >
              {s}
            </motion.button>
          ))}
        </div>

        {alsoCurrently && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 pt-10 border-t border-ink/10 max-w-4xl mx-auto text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft mb-3">
              Also currently
            </p>
            <p className="font-heading italic text-2xl md:text-3xl text-ink leading-snug">
              {alsoCurrently.title}
            </p>
            <p className="text-sm md:text-base text-ink-soft mt-3 leading-relaxed">
              {alsoCurrently.description}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
