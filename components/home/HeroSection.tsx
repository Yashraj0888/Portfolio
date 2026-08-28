"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { siteConfig, socialLinks } from "@/data/portfolio";
import { heroRoles, heroTechOrbit } from "@/data/hero";
import HeroCodeVisual from "@/components/home/HeroCodeVisual";
import HeroWorkStrip from "@/components/home/HeroWorkStrip";
import PillButton, { ArrowIcon } from "@/components/ui/PillButton";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/animations";

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 flex flex-wrap items-baseline gap-x-2 font-display text-xl font-bold md:text-2xl">
      <span className="shrink-0 text-muted-foreground">I&apos;m a</span>
      <span className="relative inline-flex h-9 items-center overflow-hidden md:h-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={heroRoles[index]}
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -32, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center whitespace-nowrap text-foreground"
          >
            {heroRoles[index]}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="ml-1 inline-block font-bold text-emerald-500"
              aria-hidden
            >
              |
            </motion.span>
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

function SkillMarquee() {
  const items = [...heroTechOrbit, ...heroTechOrbit];

  return (
    <div className="relative mt-10 overflow-hidden border-y border-border py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        className="flex w-max gap-8"
      >
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex shrink-0 items-center gap-8 font-display text-sm font-medium uppercase tracking-widest text-muted-foreground/60"
          >
            {skill}
            <span className="text-emerald-500">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 80, damping: 20 });

  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["35%", "65%"]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["30%", "70%"]);
  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(16,185,129,0.07), transparent 60%)`;

  const textX = useTransform(mouseX, [-0.5, 0.5], [-16, 16]);
  const textY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-interactive relative overflow-hidden pt-36 pb-20 md:pt-40 md:pb-24"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: spotlightBg }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-1/2 top-20 z-20 -translate-x-1/2"
      >
        <AvailabilityBadge />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div style={{ x: textX, y: textY }} className="relative">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Portfolio / 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-3 font-display text-[clamp(3.2rem,11vw,7rem)] font-bold uppercase leading-[0.88] tracking-tighter text-foreground"
            >
              <span className="text-stroke">Yashraj</span>
              <br />
              <span>Singh</span>
            </motion.h1>

            <RoleRotator />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <PillButton href="/contact" variant="primary">
                Let&apos;s collaborate <ArrowIcon />
              </PillButton>
              <PillButton href="/design" variant="secondary">
                View work
              </PillButton>
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-2 lg:hidden">
              {heroTechOrbit.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="rounded-full text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-4"
            >
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <ArrowIcon className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="relative flex justify-center lg:justify-end lg:pt-4"
          >
            <HeroCodeVisual mouseX={mouseX} mouseY={mouseY} />
          </motion.div>
        </div>

        <HeroWorkStrip />
        <SkillMarquee />
      </div>
    </section>
  );
}
