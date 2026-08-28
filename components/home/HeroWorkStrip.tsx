"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowIcon } from "@/components/ui/PillButton";
import { fadeUp } from "@/lib/animations";

export default function HeroWorkStrip() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="mt-16 border-t border-border pt-10"
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Featured work
          </p>
          <h2 className="mt-1 font-display text-xl font-bold md:text-2xl">
            Recent projects
          </h2>
        </div>
        <Link
          href="/design"
          className="group hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          View all
          <ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
            </div>
            <div className="p-3 md:p-4">
              <p className="truncate font-display text-sm font-bold md:text-base">{project.title}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{project.tags[0]}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <Link
        href="/design"
        className="mt-6 flex items-center justify-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:hidden"
      >
        View all work <ArrowIcon />
      </Link>
    </motion.div>
  );
}
