"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/animations";
import PillButton, { ArrowIcon } from "@/components/ui/PillButton";
import { Card } from "@/components/ui/card";

const quickLinks = [
  { href: "/design", label: "Work", desc: "Browse selected projects" },
  { href: "/ui-styling", label: "Services", desc: "Frontend & backend skills" },
  { href: "/contact", label: "Contact", desc: "Get in touch" },
];

export default function HomeAbout() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-square max-w-md overflow-hidden rounded-2xl"
        >
          <Image
            src="/assets/about-pic.jpg"
            alt="About Yashraj"
            fill
            className="object-cover card-shadow"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p custom={0} variants={fadeUp} className="text-sm font-medium text-muted-foreground">
            Get to know more
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="mt-2 font-display text-3xl font-bold md:text-4xl"
          >
            About Me
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I&apos;m a passionate full-stack developer crafting engaging user experiences
            and robust backend systems. From React interfaces to scalable APIs, I focus on
            clarity, performance, and thoughtful engineering.
          </motion.p>
          <motion.div custom={3} variants={fadeUp} className="mt-6 flex gap-3">
            <PillButton
              href={siteConfig.cv}
              download={siteConfig.cvFileName}
              variant="secondary"
            >
              Download CV
            </PillButton>
            <PillButton href="/contact" variant="primary">
              Contact <ArrowIcon />
            </PillButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mt-24 grid max-w-7xl gap-4 md:grid-cols-3 md:gap-6"
      >
        {quickLinks.map((link, i) => (
          <motion.div key={link.href} custom={i} variants={fadeUp}>
            <Link href={link.href}>
              <Card className="group rounded-2xl p-6 transition-all duration-500 hover:shadow-lg md:p-8">
                <span className="font-display text-lg font-bold md:text-xl">{link.label}</span>
                <p className="mt-2 text-sm text-muted-foreground">{link.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore <ArrowIcon />
                </span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
