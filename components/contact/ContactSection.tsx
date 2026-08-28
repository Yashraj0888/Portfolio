"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio";
import PillButton, { ArrowIcon } from "@/components/ui/PillButton";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send message.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <section className="cloud-bg min-h-screen px-6 py-32 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <AvailabilityBadge />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="font-display text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl"
          >
            Have a project
            <br />
            in mind?
          </motion.h1>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Send me a message and I&apos;ll get back to you at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
          </motion.p>

          <motion.div custom={2} variants={fadeUp} className="mt-10">
            <PillButton href={`mailto:${siteConfig.email}`} variant="primary">
              Email Me Directly <ArrowIcon />
            </PillButton>
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="mx-auto mt-20 max-w-lg space-y-5 text-left"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              required
              disabled={status === "loading"}
              placeholder="Your name"
              className="rounded-xl border-border bg-card"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={status === "loading"}
              placeholder="you@email.com"
              className="rounded-xl border-border bg-card"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              required
              disabled={status === "loading"}
              rows={8}
              placeholder="Tell me about your project, timeline, and what you're looking to build..."
              className="min-h-[180px] resize-y rounded-xl border-border bg-card"
            />
          </div>

          {status === "error" && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </p>
          )}

          {status === "success" && (
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700">
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}

          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={cn(
              "h-auto w-full rounded-full py-3.5 text-sm font-medium",
              status === "success" && "bg-emerald-600 hover:bg-emerald-600"
            )}
          >
            {status === "loading"
              ? "Sending..."
              : status === "success"
                ? "Message Sent ✓"
                : "Send Message"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
