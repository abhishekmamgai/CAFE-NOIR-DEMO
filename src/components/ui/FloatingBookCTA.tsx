"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";

export default function FloatingBookCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShow = pathname !== "/book" && pathname !== "/auth";

  return (
    <AnimatePresence>
      {visible && shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed inset-x-0 bottom-20 z-40 flex justify-center px-4 md:hidden"
        >
          <Link
            href="/book"
            className="inline-flex items-center justify-center w-full max-w-xs rounded-full bg-cafe-amber text-white py-3.5 shadow-xl text-sm font-semibold tracking-[0.18em] uppercase"
          >
            <Calendar size={18} className="mr-2" />
            Book a Table
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

