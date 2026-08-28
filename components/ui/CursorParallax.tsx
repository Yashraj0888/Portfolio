"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CursorParallax({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 80, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2.5, 2.5]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reducedMotion);

    if (!finePointer || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX / window.innerWidth - 0.5);
      cursorY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  if (!enabled) return <>{children}</>;

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={cn("min-h-full origin-center will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
