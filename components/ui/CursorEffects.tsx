"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], [data-cursor-hover]';

type Ripple = { id: number; x: number; y: number };

export default function CursorEffects() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const glowX = useSpring(cursorX, { stiffness: 55, damping: 24, mass: 0.9 });
  const glowY = useSpring(cursorY, { stiffness: 55, damping: 24, mass: 0.9 });

  const ringX = useSpring(cursorX, { stiffness: 160, damping: 24, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 160, damping: 24, mass: 0.5 });

  const dotX = useSpring(cursorX, { stiffness: 480, damping: 38, mass: 0.2 });
  const dotY = useSpring(cursorY, { stiffness: 480, damping: 38, mass: 0.2 });

  const pageGlow = useMotionTemplate`
    radial-gradient(720px circle at ${glowX}px ${glowY}px, rgba(16,185,129,0.24) 0%, rgba(16,185,129,0.1) 38%, transparent 72%),
    radial-gradient(320px circle at ${glowX}px ${glowY}px, rgba(255,255,255,0.55) 0%, transparent 68%)
  `;

  const gridMask = useMotionTemplate`
    radial-gradient(420px circle at ${glowX}px ${glowY}px, black 0%, transparent 72%)
  `;

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isEnabled = finePointer && !reducedMotion;
    setEnabled(isEnabled);

    if (isEnabled) {
      document.documentElement.classList.add("cursor-fx-enabled");
    }

    return () => {
      document.documentElement.classList.remove("cursor-fx-enabled");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      setHovering(!!target.closest(INTERACTIVE_SELECTOR));
    };

    const onClick = (e: MouseEvent) => {
      const ripple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, ripple]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 700);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-20"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: pageGlow }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-21"
        animate={{ opacity: visible ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(10,10,10,0.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />

      {/* Outer ring — lags slightly, expands on interactive hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-55 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/80"
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          backgroundColor: hovering ? "rgba(10,10,10,0.04)" : "rgba(10,10,10,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        style={{ x: ringX, y: ringY }}
      />

      {/* Precise center dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-56 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        style={{ x: dotX, y: dotY }}
      />

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden
            initial={{ opacity: 0.45, scale: 0.35 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pointer-events-none fixed z-54 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
