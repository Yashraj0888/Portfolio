"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navLinks, siteConfig, socialLinks } from "@/data/portfolio";
import PillButton, { ArrowIcon } from "@/components/ui/PillButton";
import { cn } from "@/lib/utils";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10">
          <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={close}>
            <Image
              src="/assets/image.png"
              alt={siteConfig.name}
              width={32}
              height={32}
              className="shrink-0 rounded-lg"
            />
            <span className="truncate font-display text-base font-bold tracking-tight sm:text-lg">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative py-1 text-sm font-medium transition-colors duration-300",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {link.count && (
                    <span className="ml-1 text-xs text-muted-foreground/70">[{link.count}]</span>
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-px w-full bg-foreground"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <PillButton href="/contact" variant="primary">
              Let&apos;s Talk <ArrowIcon />
            </PillButton>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center gap-1.5"
                >
                  <span className="block h-0.5 w-5 rounded-full bg-foreground" />
                  <span className="block h-0.5 w-5 rounded-full bg-foreground" />
                  <span className="block h-0.5 w-3.5 rounded-full bg-foreground" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[55] bg-foreground/25 backdrop-blur-sm md:hidden"
              onClick={close}
            />

            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[58] flex w-[min(100vw,320px)] flex-col border-l border-border bg-background shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card"
                >
                  <X className="size-4" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        className={cn(
                          "flex min-h-[52px] items-center justify-between rounded-xl px-4 py-3 transition-colors",
                          active
                            ? "bg-foreground text-background"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <span className="font-display text-lg font-bold">{link.label}</span>
                        {link.count && (
                          <span
                            className={cn(
                              "text-xs font-medium",
                              active ? "text-background/70" : "text-muted-foreground"
                            )}
                          >
                            {link.count}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="space-y-4 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <PillButton href="/contact" variant="primary" onClick={close} className="w-full justify-center">
                  Let&apos;s Talk <ArrowIcon />
                </PillButton>
                <div className="flex justify-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
