"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeInOut" as const };

  // Avoid hydration mismatches by not using an animated "initial" state.
  // We let the server and client both render the same static markup,
  // and only animate on route transitions (key changes) on the client.
  const animate = { opacity: 1, y: 0 };
  const exit = prefersReducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -10 };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={false}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

