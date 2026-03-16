"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuCard from "@/components/ui/MenuCard";
import { menuItems, MenuItem } from "@/data/menu";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const categories = [
  "Hot Drinks",
  "Cold Drinks",
  "All-Day Breakfast",
  "Mains",
  "Desserts",
  "Seasonal Specials",
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-cafe-bg">
      <Navbar />

      <main className="pt-28 md:pt-32 pb-20 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16 px-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cafe-amber font-medium tracking-[0.2em] text-xs uppercase mb-4"
            >
              Artisanal Selection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-6xl text-cafe-dark"
            >
              Our Menu
            </motion.h1>
          </div>

          {/* Category Tabs - Sticky below Navbar */}
          <div className="sticky top-[72px] md:top-[80px] z-30 bg-cafe-bg/95 backdrop-blur-sm py-4 md:py-6 -mx-4 md:-mx-6 px-4 md:px-6 mb-8 md:mb-12 border-b border-cafe-border/50">
            <div className="max-w-7xl mx-auto flex flex-nowrap sm:flex-wrap items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 md:px-6 py-2 md:py-2.5 text-[11px] md:text-xs font-bold tracking-widest uppercase border transition-all duration-300 whitespace-nowrap rounded-xs",
                    activeCategory === category
                      ? "bg-cafe-amber border-cafe-amber text-white shadow-lg shadow-cafe-amber/20"
                      : "bg-white border-cafe-border text-cafe-muted hover:border-cafe-amber/50 hover:text-cafe-amber"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid - Responsive: 1 mobile, 2 tablet, 3 desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredItems.map((item) => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center py-24 text-cafe-muted">
              Coming soon.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
