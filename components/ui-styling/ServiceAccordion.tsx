"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function ServiceAccordion() {
  return (
    <section className="cloud-bg px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="SERVICE"
          watermark="SERVICE"
          subtitle="Frontend and backend capabilities"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Accordion defaultValue={[services[0].id]} className="divide-y divide-border border-t border-border">
            {services.map((service) => (
              <AccordionItem key={service.id} value={service.id} className="border-border">
                <AccordionTrigger className="py-6 text-xl font-bold uppercase tracking-tight hover:no-underline md:py-8 md:text-2xl lg:text-3xl [&>svg]:hidden">
                  <span className="font-display">{service.title}</span>
                  <span className="text-2xl text-muted-foreground group-aria-expanded/accordion-trigger:hidden">
                    ↗
                  </span>
                  <span className="hidden text-2xl text-muted-foreground group-aria-expanded/accordion-trigger:inline">
                    ×
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-8">
                  <div className="overflow-hidden rounded-2xl bg-[#111111] p-6 md:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                      <div>
                        <p className="text-base leading-relaxed text-[#888888] md:text-lg">
                          {service.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {service.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className={cn(
                                "rounded-full border-white/10 bg-transparent px-3 py-1.5 text-xs text-white/70 hover:border-white/30 hover:text-white"
                              )}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, rotate: -4, y: 20 }}
                        whileInView={{ opacity: 1, rotate: 3, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl lg:max-w-none"
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </motion.div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
