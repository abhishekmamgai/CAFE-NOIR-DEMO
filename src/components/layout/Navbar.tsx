"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
        <Link href="/" className="font-serif text-2xl font-bold text-cafe-dark tracking-wider">
          CAFE NOIR
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
          className="md:hidden text-cafe-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-cafe-bg border-b border-cafe-border p-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-lg font-medium",
                  pathname === link.href ? "text-cafe-amber" : "text-cafe-dark"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/auth"
              className="flex items-center space-x-2 text-lg font-medium text-cafe-dark"
              onClick={() => setIsOpen(false)}
            >
              <User size={20} />
              <span>Sign In</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
