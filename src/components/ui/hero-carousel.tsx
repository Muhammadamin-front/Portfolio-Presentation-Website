"use client";

import * as React from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

import { cn } from "@/lib/utils";

export interface HeroCarouselItem {
  id?: string | number;
  title: string;
  image: string;
  credit?: string;
  meta?: string[];
  accent?: string;
}

export interface HeroCarouselProps {
  items: HeroCarouselItem[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  brand?: React.ReactNode;
  onBack?: () => void;
  onMenu?: () => void;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

const CARD_H = 0.264;
const CARD_AR = 0.75;
const GAP = 0.038;
const STRIP_TOP = 0.5;
const TITLE = 0.067;
const LABEL = 0.0103;
const PAD = 0.017;
const RAIL = 0.2;
const WHEEL_THRESHOLD = 60;
const WHEEL_COOLDOWN = 420;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function HeroCarousel({
  items,
  index: controlled,
  defaultIndex = 0,
  onIndexChange,
  brand,
  onBack,
  onMenu,
  autoplay = false,
  autoplayDelay = 4000,
  className,
}: HeroCarouselProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [box, setBox] = React.useState({ w: 0, h: 0 });
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex);
  const [dragging, setDragging] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const reduced = useReducedMotion();

  const last = items.length - 1;
  const index = clamp(controlled ?? uncontrolled, 0, Math.max(0, last));

  const go = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, Math.max(0, last));
      if (controlled === undefined) setUncontrolled(clamped);
      if (clamped !== index) onIndexChange?.(clamped);
    },
    [controlled, index, last, onIndexChange],
  );

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const read = () => setBox({ w: stage.clientWidth, h: stage.clientHeight });
    read();

    const observer = new ResizeObserver(read);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const fullHeight = clamp(box.h * CARD_H, 96, 360);
  const halfHeight = fullHeight / 2;
  const cardWidth = fullHeight * CARD_AR;
  const gap = Math.max(4, Math.round(cardWidth * GAP));
  const step = cardWidth + gap;
  const padding = Math.max(16, Math.round(box.w * PAD));
  const labelSize = Math.max(9, Math.round(box.h * LABEL));

  const xFor = React.useCallback(
    (itemIndex: number) => box.w / 2 - (itemIndex * step + cardWidth / 2),
    [box.w, step, cardWidth],
  );
  const x = useMotionValue(0);
  const target = xFor(index);

  const swing = reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: "easeOut" as const };
  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 34, mass: 0.9 };

  React.useEffect(() => {
    if (dragging) return;
    const animation = animate(x, target, spring);
    return () => animation.stop();
  }, [target, dragging, reduced, x]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let accumulated = 0;
    let cooldownUntil = 0;

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      const atEnd =
        (delta > 0 && index === last) || (delta < 0 && index === 0);

      if (atEnd) {
        accumulated = 0;
        return;
      }

      event.preventDefault();
      if (event.timeStamp < cooldownUntil) return;

      accumulated += delta;
      if (Math.abs(accumulated) < WHEEL_THRESHOLD) return;

      go(index + Math.sign(accumulated));
      accumulated = 0;
      cooldownUntil = event.timeStamp + WHEEL_COOLDOWN;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [go, index, last]);

  React.useEffect(() => {
    if (!autoplay || paused || dragging || items.length < 2) return;
    const timeout = window.setTimeout(
      () => go(index === last ? 0 : index + 1),
      autoplayDelay,
    );
    return () => window.clearTimeout(timeout);
  }, [autoplay, autoplayDelay, dragging, go, index, items.length, last, paused]);

  const active = items[index];
  if (!active) return null;

  const lines = active.title.split("\n");
  const accent = active.accent ?? "#8a8a8a";

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Tanlangan loyihalar"
      onKeyDown={(event) => {
        const keys: Record<string, number> = {
          ArrowLeft: index - 1,
          ArrowRight: index + 1,
          Home: 0,
          End: last,
        };
        if (!(event.key in keys)) return;
        event.preventDefault();
        go(keys[event.key]!);
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        "relative h-full min-h-[24rem] w-full select-none overflow-hidden bg-black text-white",
        "outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-inset",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={swing}
        >
          <motion.img
            src={active.image}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: reduced ? 1.28 : 1.42 }}
            animate={{ scale: 1.28 }}
            transition={
              reduced ? { duration: 0 } : { duration: 6, ease: "linear" }
            }
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: accent, mixBlendMode: "color" }}
          />
          <div
            className="absolute inset-0 opacity-55"
            style={{ backgroundColor: accent, mixBlendMode: "multiply" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/45" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
      />

      <div
        className="absolute inset-x-0 flex items-center justify-center"
        style={{
          top: Math.max(16, box.h * 0.029),
          gap: `${Math.max(20, box.w * 0.06)}px`,
        }}
      >
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="opacity-90 transition-opacity hover:opacity-100"
            style={{ fontSize: labelSize * 1.15 }}
          >
            <span aria-hidden="true">↖</span> Orqaga
          </button>
        ) : null}
        {brand ? (
          <div
            className="font-semibold tracking-[0.06em]"
            style={{ fontSize: labelSize * 1.35 }}
          >
            {brand}
          </div>
        ) : null}
        {onMenu ? (
          <button
            type="button"
            onClick={onMenu}
            className="opacity-90 transition-opacity hover:opacity-100"
            style={{ fontSize: labelSize * 1.15 }}
          >
            Menyu <span aria-hidden="true">☰</span>
          </button>
        ) : null}
      </div>

      <div
        className="absolute inset-x-0 top-0 flex flex-col justify-end"
        style={{
          height: `${STRIP_TOP * 100}%`,
          paddingLeft: padding,
          paddingRight: padding,
          paddingBottom: Math.round(box.h * 0.028),
        }}
      >
        <div className="flex w-full flex-wrap items-end gap-x-[6vw] gap-y-2">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.h2
              key={index}
              className="font-semibold leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: Math.max(24, Math.round(box.h * TITLE)) }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
            >
              {lines.map((line, lineIndex) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : {
                            duration: 0.62,
                            delay: lineIndex * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </AnimatePresence>

          {active.credit ? (
            <motion.p
              key={`credit-${index}`}
              className="font-mono uppercase tracking-[0.14em] opacity-80"
              style={{ fontSize: labelSize }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {active.credit}
            </motion.p>
          ) : null}

          {active.meta?.length ? (
            <div
              className="ml-auto flex items-end"
              style={{ gap: `${Math.max(16, box.w * 0.055)}px` }}
            >
              {active.meta.map((fact, factIndex) => (
                <motion.span
                  key={`${index}-${fact}`}
                  className="font-mono whitespace-nowrap uppercase tracking-[0.14em] opacity-80"
                  style={{ fontSize: labelSize }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.45, delay: 0.12 + factIndex * 0.06 }
                  }
                >
                  {fact}
                </motion.span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="absolute inset-x-0"
        style={{ top: `${STRIP_TOP * 100}%`, height: fullHeight }}
      >
        <motion.div
          className="flex items-start"
          style={{ gap, x, cursor: dragging ? "grabbing" : "grab" }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{ left: xFor(last), right: xFor(0) }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setDragging(false);
            const thrown = x.get() + info.velocity.x * 0.12;
            go(Math.round((box.w / 2 - thrown - cardWidth / 2) / step));
          }}
        >
          {items.map((item, itemIndex) => (
            <motion.button
              key={item.id ?? itemIndex}
              type="button"
              aria-label={item.title.replace(/\n/g, " ")}
              aria-current={itemIndex === index}
              onClick={() => go(itemIndex)}
              className="relative shrink-0 overflow-hidden rounded-none bg-white/5"
              style={{ width: cardWidth }}
              animate={{ height: itemIndex === index ? fullHeight : halfHeight }}
              transition={spring}
            >
              <img
                src={item.image}
                alt={`${item.title.replace(/\n/g, " ")} loyihasi`}
                draggable={false}
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 24%" }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-black"
                animate={{ opacity: itemIndex === index ? 0 : 0.16 }}
                transition={spring}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute"
        style={{
          left: padding,
          bottom: Math.max(14, box.h * 0.022),
          width: box.w * RAIL,
        }}
      >
        <div
          className="flex justify-between font-mono tabular-nums opacity-80"
          style={{ fontSize: labelSize }}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>
        <div className="relative mt-2 h-px w-full bg-white/25">
          <motion.div
            className="absolute inset-y-0 bg-white"
            style={{ width: `${100 / items.length}%` }}
            animate={{ left: `${(index / items.length) * 100}%` }}
            transition={spring}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
