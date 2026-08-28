"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  subtitle?: string;
  watermark?: string;
  dark?: boolean;
  className?: string;
};

export default function SectionHeading({
  label,
  subtitle,
  watermark,
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative mb-16 md:mb-20", className)}>
      {watermark && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            "pointer-events-none absolute -top-6 left-0 select-none font-display text-[clamp(3.5rem,12vw,9rem)] font-bold uppercase leading-none tracking-tighter",
            dark ? "text-white/[0.09]" : "text-foreground/[0.11]"
          )}
          aria-hidden
        >
          {watermark}
        </motion.span>
      )}
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="relative z-10"
      >
        <h1
          className={cn(
            "font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
            dark ? "text-white" : "text-ink"
          )}
        >
          <span className="text-muted-foreground">/</span>
          {label}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-3 text-base md:text-lg",
              dark ? "text-dark-muted" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
