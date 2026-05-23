"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Emphasis = "before" | "big-moment" | undefined;
type Shape = "star" | "moon" | "flower";

function Ornament({ shape, emphasis }: { shape: Shape; emphasis: Emphasis }) {
  const isBig = emphasis === "big-moment";
  const isBefore = emphasis === "before";
  const size = isBig ? 96 : 56;
  const opacity = isBefore ? 0.45 : 1;
  const glow = isBig
    ? "drop-shadow(0 0 24px oklch(0.58 0.14 38 / 0.6)) drop-shadow(0 0 8px oklch(0.58 0.14 38 / 0.4))"
    : "none";
  const stroke = isBig ? "oklch(0.58 0.14 38)" : "oklch(0.18 0.008 60)";
  const fill = isBig ? "oklch(0.92 0.08 60)" : "oklch(0.977 0.013 92)";

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ opacity, filter: glow }}
      animate={
        isBig
          ? { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }
          : { rotate: [0, 4, -4, 0] }
      }
      transition={{
        duration: isBig ? 4 : 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      {shape === "star" && (
        <path
          d="M20 4 L24.2 15.5 L36 16.4 L26.8 24 L29.8 35.6 L20 29 L10.2 35.6 L13.2 24 L4 16.4 L15.8 15.5 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      )}
      {shape === "moon" && (
        <path
          d="M28 6 a16 16 0 1 0 6 22 a12 12 0 0 1 -6 -22 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.4"
        />
      )}
      {shape === "flower" && (
        <g fill={fill} stroke={stroke} strokeWidth="1.4">
          <circle cx="20" cy="10" r="5" />
          <circle cx="30" cy="20" r="5" />
          <circle cx="20" cy="30" r="5" />
          <circle cx="10" cy="20" r="5" />
          <circle cx="20" cy="20" r="3.5" fill={stroke} />
        </g>
      )}
    </motion.svg>
  );
}

const ART_PALETTES: Record<
  string,
  { from: string; to: string; ink: string; tag: string }
> = {
  Autodesk: {
    from: "oklch(0.78 0.08 38)",
    to: "oklch(0.58 0.14 38)",
    ink: "oklch(0.99 0.01 90)",
    tag: "The Leap",
  },
  Barter: {
    from: "oklch(0.92 0.06 80)",
    to: "oklch(0.75 0.09 70)",
    ink: "oklch(0.25 0.02 60)",
    tag: "Built",
  },
  DoorDash: {
    from: "oklch(0.86 0.07 30)",
    to: "oklch(0.7 0.12 25)",
    ink: "oklch(0.99 0.01 90)",
    tag: "Scaled",
  },
  Flexport: {
    from: "oklch(0.88 0.05 220)",
    to: "oklch(0.7 0.09 235)",
    ink: "oklch(0.99 0.01 90)",
    tag: "Promoted",
  },
  Independent: {
    from: "oklch(0.9 0.04 300)",
    to: "oklch(0.72 0.07 290)",
    ink: "oklch(0.99 0.01 90)",
    tag: "Advised",
  },
  "Dartmouth College": {
    from: "oklch(0.94 0.04 140)",
    to: "oklch(0.78 0.07 145)",
    ink: "oklch(0.22 0.02 60)",
    tag: "Where it began",
  },
};

function ArtCard({
  title,
  emphasis,
}: {
  title: string;
  emphasis: Emphasis;
}) {
  const palette = ART_PALETTES[title] ?? {
    from: "oklch(0.92 0.02 60)",
    to: "oklch(0.78 0.04 60)",
    ink: "oklch(0.25 0.02 60)",
    tag: "Chapter",
  };
  const isBig = emphasis === "big-moment";
  const isBefore = emphasis === "before";
  const initial = title.charAt(0);

  return (
    <div
      className={`relative aspect-[4/5] w-full max-w-[260px] rounded-sm overflow-hidden shadow-[0_10px_40px_-20px_rgba(40,30,20,0.45)] ${
        isBefore ? "opacity-70" : ""
      } ${
        isBig
          ? "ring-2 ring-offset-2 ring-offset-cream ring-[oklch(0.58_0.14_38)]"
          : ""
      }`}
      style={{
        background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <p
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: palette.ink, opacity: 0.8 }}
        >
          {palette.tag}
        </p>
        <p
          className="font-heading leading-none text-[140px] -mb-4"
          style={{ color: palette.ink, opacity: 0.95 }}
        >
          {initial}
        </p>
        <p
          className="font-heading italic text-base"
          style={{ color: palette.ink }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

export function Milestone({
  side,
  shape,
  emphasis,
  meta,
  title,
  subtitle,
  children,
  index,
  showArt = true,
}: {
  side: "left" | "right";
  shape: Shape;
  emphasis?: Emphasis;
  meta?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  index: number;
  showArt?: boolean;
}) {
  const initialX = side === "left" ? -120 : 120;
  const rotate = side === "left" ? -2 : 2;
  const isBig = emphasis === "big-moment";

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: 60, rotate }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.95,
        delay: index * 0.06,
        type: "spring",
        bounce: 0.45,
      }}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-14"
    >
      {side === "left" ? (
        <>
          <div className="order-2 md:order-1 flex md:justify-end">
            <MilestoneBody
              meta={meta}
              title={title}
              subtitle={subtitle}
              emphasis={emphasis}
              align="right"
            >
              {children}
            </MilestoneBody>
          </div>
          <div className="order-1 md:order-2 flex justify-center items-center z-10">
            <Ornament shape={shape} emphasis={emphasis} />
          </div>
          <div className="order-3 flex md:justify-start">
            {showArt && <ArtCard title={title} emphasis={emphasis} />}
          </div>
        </>
      ) : (
        <>
          <div className="order-2 md:order-1 flex md:justify-end">
            {showArt && <ArtCard title={title} emphasis={emphasis} />}
          </div>
          <div className="order-1 md:order-2 flex justify-center items-center z-10">
            <Ornament shape={shape} emphasis={emphasis} />
          </div>
          <div className="order-3 flex md:justify-start">
            <MilestoneBody
              meta={meta}
              title={title}
              subtitle={subtitle}
              emphasis={emphasis}
              align="left"
            >
              {children}
            </MilestoneBody>
          </div>
        </>
      )}

      {isBig && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.5, type: "spring", bounce: 0.6 }}
          className="absolute left-1/2 -translate-x-1/2 -top-6 px-4 py-1 rounded-full bg-[color:var(--accent-warm)] text-cream text-[10px] uppercase tracking-[0.25em] font-semibold shadow-lg"
        >
          ★ Where I Am Now
        </motion.div>
      )}
    </motion.div>
  );
}

function MilestoneBody({
  meta,
  title,
  subtitle,
  emphasis,
  align,
  children,
}: {
  meta?: string;
  title: string;
  subtitle?: string;
  emphasis?: Emphasis;
  align: "left" | "right";
  children?: ReactNode;
}) {
  const isBig = emphasis === "big-moment";
  const isBefore = emphasis === "before";
  return (
    <div
      className={`max-w-md ${isBefore ? "opacity-70" : ""} ${
        align === "right" ? "md:text-right" : "md:text-left"
      }`}
    >
      {meta && (
        <p
          className={`text-xs uppercase tracking-[0.25em] mb-3 ${
            isBig ? "text-[color:var(--accent-warm)] font-semibold" : "text-ink-soft"
          }`}
        >
          {meta}
        </p>
      )}
      <h2
        className={`font-heading leading-[1.05] text-ink ${
          isBig
            ? "text-5xl md:text-6xl lg:text-7xl"
            : "text-3xl md:text-4xl"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-heading italic text-ink-soft mt-2 ${
            isBig ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {subtitle}
        </p>
      )}
      {children && (
        <div className="mt-5 text-sm md:text-base text-ink/85 leading-relaxed space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}
