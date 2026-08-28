"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Badge
        variant="secondary"
        className="h-auto gap-2.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide pill-shadow"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Available for New Project
      </Badge>
    </motion.div>
  );
}
