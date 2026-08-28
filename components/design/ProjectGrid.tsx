"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type ProjectCategory } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import PillButton, { ArrowIcon } from "@/components/ui/PillButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scaleIn, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const filters: ProjectCategory[] = ["All", "Web App", "Platform", "Automation"];

export default function ProjectGrid() {
  const [active, setActive] = useState<ProjectCategory>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="SELECTED WORK"
          watermark="PORTFOLIO"
          subtitle="Client projects and shipped products"
        />

        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 md:gap-6">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  active === filter ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter}
                {active === filter && (
                  <motion.span
                    layoutId="filter-dot"
                    className="mt-1 block h-0.5 w-full bg-foreground"
                  />
                )}
              </button>
            ))}
          </div>
          <PillButton href="https://github.com/Yashraj0888" external variant="secondary">
            GitHub <ArrowIcon />
          </PillButton>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                variants={scaleIn}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                className="group"
              >
                <Card className="overflow-hidden rounded-2xl border-2 border-border ring-0 card-shadow py-0">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowIcon />
                    </motion.a>
                    <Badge
                      variant="secondary"
                      className="absolute right-4 top-4 rounded-full bg-card/90 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm"
                    >
                      Live
                    </Badge>
                  </div>
                  <CardContent className="border-t-2 border-border p-6">
                    <h3 className="font-display text-lg font-bold md:text-xl">{project.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full bg-muted text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Visit site ↗
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
