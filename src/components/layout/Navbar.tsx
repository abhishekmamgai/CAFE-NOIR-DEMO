"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Logo } from "@/components/ui/Logo";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Gallery", href: "/gallery" },
  { name: "Book a Table", href: "/book" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-cafe-bg/80 backdrop-blur-md border-b border-cafe-border" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="transition-opacity duration-200 hover:opacity-80"
          aria-label="Cafe Noir home"
        >
          <Logo size="sm" variant="dark" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-cafe-amber",
                pathname === link.href ? "text-cafe-amber" : "text-cafe-dark"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/auth"
            className="flex items-center space-x-2 text-sm font-medium text-cafe-dark hover:text-cafe-amber transition-colors"
          >
            <User size={18} />
            <span>Sign In</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#633806]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed inset-0 top-[64px] bg-cafe-bg/95 backdrop-blur-md md:hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col divide-y divide-cafe-border/70">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-6 py-4 text-lg font-medium tracking-wide",
                      pathname === link.href ? "text-cafe-amber bg-white/40" : "text-cafe-dark hover:bg-white/40"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/auth"
                  className="px-6 py-4 text-lg font-medium flex items-center justify-between text-cafe-dark hover:bg-white/40"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Sign In</span>
                  <User size={20} />
                </Link>
              </nav>
            </div>
            <button
              className="absolute top-4 right-4 text-[#633806]"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

