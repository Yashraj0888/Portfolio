"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { heroCodeLines } from "@/data/hero";
import type { MotionValue } from "framer-motion";
import { useTransform } from "framer-motion";

function CodeLine({ line, index }: { line: (typeof heroCodeLines)[0]; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), line.delay * 1000);
    return () => clearTimeout(timer);
  }, [line.delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35 }}
      className="font-mono text-[11px] leading-6 md:text-xs md:leading-7"
      style={{ paddingLeft: `${line.indent * 1.25}rem` }}
    >
      {line.text.includes("engineer") && line.text.includes("build") ? (
        <>
          <span className="text-emerald-400">engineer</span>
          <span className="text-white/50">.</span>
          <span className="text-sky-400">build</span>
          <span className="text-white/50">()</span>
          <span className="text-white/40">; // → scalable impact</span>
        </>
      ) : line.text.includes('"') ? (
        <>
          <span className="text-purple-400">
            {line.text.split(":")[0]}:
          </span>
          <span className="text-emerald-300/90">
            {line.text.split(":").slice(1).join(":")}
          </span>
        </>
      ) : (
        <span className="text-white/70">{line.text}</span>
      )}
    </motion.div>
  );
}

export default function HeroCodeVisual({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
    >
      <motion.div
        animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-2xl bg-[#0d0d0d] ring-1 ring-white/10 card-shadow">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[10px] text-white/30">portfolio.ts</span>
        </div>

        {/* Code body */}
        <div className="space-y-0.5 p-5 md:p-6">
          {heroCodeLines.map((line, i) => (
            <CodeLine key={`${line.text}-${i}`} line={line} index={i} />
          ))}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="ml-1 inline-block h-4 w-0.5 translate-y-0.5 bg-emerald-400"
          />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2">
          <span className="font-mono text-[10px] text-emerald-400/80">● Available for work</span>
          <span className="font-mono text-[10px] text-white/25">TypeScript</span>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8 }}
        className="absolute -bottom-4 -left-4 rounded-xl bg-card px-4 py-3 pill-shadow ring-1 ring-foreground/10"
      >
        <p className="font-display text-2xl font-bold text-foreground">1+</p>
        <p className="text-xs text-muted-foreground">Years professional</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="absolute -right-2 top-6 rounded-xl bg-card px-4 py-3 pill-shadow ring-1 ring-foreground/10 md:-right-6"
      >
        <p className="font-display text-2xl font-bold text-foreground">04</p>
        <p className="text-xs text-muted-foreground">Projects shipped</p>
      </motion.div>
    </motion.div>
  );
}
