"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Ship,
  Sparkles,
  TrendingUp,
  Truck,
} from "lucide-react";

const ICONS = {
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  rocket: Rocket,
  ship: Ship,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  truck: Truck,
} as const;

export type MilestoneIcon = keyof typeof ICONS;

type Emphasis = "before" | "big-moment" | undefined;

export function Milestone({
  side,
  icon = "briefcase",
  emphasis,
  title,
  subtitle,
  bullets = [],
  index,
}: {
  side: "left" | "right";
  icon?: MilestoneIcon;
  emphasis?: Emphasis;
  title: string;
  subtitle?: string;
  bullets?: string[];
  index: number;
}) {
  const isBig = emphasis === "big-moment";
  const isBefore = emphasis === "before";
  const onLeft = side === "left";
  const Icon = ICONS[icon] ?? Briefcase;

  return (
    <div className="relative grid grid-cols-[auto_1fr] md:grid-cols-[1fr_56px_1fr] items-start gap-x-6 md:gap-x-0">
      <div className="row-start-1 col-start-1 md:col-start-2 md:col-end-3 flex justify-center pt-6">
        <div
          className={`relative h-5 w-5 rounded-full border-2 bg-background transition-all ${
            isBig
              ? "border-primary shadow-[0_0_24px_rgba(138,99,184,0.55)]"
              : "border-foreground/60"
          }`}
          aria-hidden="true"
        >
          {isBig && (
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse" />
          )}
        </div>
      </div>

      <div
        className={`hidden md:block ${onLeft ? "md:col-start-3" : "md:col-start-1"}`}
      />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9, rotate: onLeft ? 2.5 : -2.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.8,
          delay: index * 0.05,
          type: "spring",
          bounce: 0.35,
        }}
        className={`row-start-1 col-start-2 md:row-start-1 ${
          onLeft
            ? "md:col-start-1 md:col-end-2 md:pr-12"
            : "md:col-start-3 md:col-end-4 md:pl-12"
        }`}
      >
        <article
          className={`relative rounded-2xl border border-border/70 bg-card p-6 md:p-8 backdrop-blur-sm transition-all ${
            isBig ? "ring-1 ring-primary/30 shadow-xl shadow-primary/15" : ""
          } ${isBefore ? "opacity-80" : ""}`}
        >
          {isBig && (
            <span className="absolute -top-3 left-6 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              ★ where I am now
            </span>
          )}

          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                isBig ? "bg-primary/15 text-primary" : "bg-muted text-foreground/80"
              }`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-2xl md:text-3xl font-bold leading-tight tracking-tight text-foreground">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {bullets.length > 0 && (
            <div className="mt-5 text-foreground/85">
              <ul className="space-y-2 text-base leading-relaxed list-disc list-outside ml-5 marker:text-primary/70">
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </motion.div>
    </div>
  );
}
