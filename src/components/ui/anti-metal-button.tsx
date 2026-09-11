"use client";

import React from "react";
import { cn } from "@/lib/utils";

type DoubleChevronProps = {
  index: number;
  dotColor: string;
};

function DoubleChevron({ index, dotColor }: DoubleChevronProps) {
  const base = index * 0.12;
  const dots = [
    { cx: 2, cy: 2, delay: 0 },
    { cx: 5, cy: 5, delay: 0.05 },
    { cx: 8, cy: 8, delay: 0.1 },
    { cx: 5, cy: 11, delay: 0.15 },
    { cx: 2, cy: 14, delay: 0.2 },
    { cx: 6, cy: 2, delay: 0.05 },
    { cx: 9, cy: 5, delay: 0.1 },
    { cx: 12, cy: 8, delay: 0.15 },
    { cx: 9, cy: 11, delay: 0.2 },
    { cx: 6, cy: 14, delay: 0.25 },
  ];

  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 overflow-visible"
    >
      <g fill={dotColor}>
        {dots.map((point, dotIndex) => (
          <circle
            key={dotIndex}
            cx={point.cx}
            cy={point.cy}
            r="1"
            className="bd-dot"
            style={{ animationDelay: `${base + point.delay}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

type AntiMetalButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: React.ReactNode;
  accentFrom?: string;
  accentTo?: string;
  dotColor?: string;
};

export const AntiMetalButton = React.forwardRef<
  HTMLButtonElement,
  AntiMetalButtonProps
>(
  (
    {
      className,
      children,
      label,
      accentFrom = "#d6f54a",
      accentTo = "#c5ea2c",
      dotColor = "#0f0f0f",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const content = label ?? children ?? "Book a demo";

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "group/btn relative inline-flex h-11 min-w-36 overflow-hidden rounded-xl bg-[linear-gradient(180deg,#1a1a1a_0%,#0a0a0a_100%)] px-4 pl-14 font-mono text-xs text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.18)] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          className,
        )}
        {...props}
      >
        <span className="relative z-0 flex w-full items-center justify-end whitespace-nowrap font-medium tracking-tight">
          {content}
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-1 left-1 top-1 z-10 flex w-9 items-center justify-start gap-2.5 overflow-hidden rounded-lg pl-3 pr-2.5 transition-[width,gap] duration-200 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/btn:w-[calc(100%-0.5rem)]"
          style={{
            background: `linear-gradient(180deg, ${accentFrom} 0%, ${accentTo} 100%)`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <DoubleChevron key={index} index={index} dotColor={dotColor} />
          ))}
        </span>
      </button>
    );
  },
);

AntiMetalButton.displayName = "AntiMetalButton";

export default AntiMetalButton;
