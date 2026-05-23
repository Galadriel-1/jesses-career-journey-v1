"use client";

import { ReactNode } from "react";

export function Path({ children }: { children: ReactNode }) {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-32">
      <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full pointer-events-none">
        <svg
          width="160"
          height="100%"
          viewBox="0 0 160 1000"
          preserveAspectRatio="none"
          className="h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.18 0.008 60)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="oklch(0.58 0.14 38)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.18 0.008 60)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 80 0 C 10 200, 150 380, 80 500 C 10 620, 150 800, 80 1000"
            stroke="url(#pathGrad)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="3 8"
          />
        </svg>
      </div>
      <div className="relative flex flex-col gap-40 md:gap-48">{children}</div>
    </section>
  );
}
