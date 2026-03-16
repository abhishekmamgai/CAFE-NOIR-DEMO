"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/data/menu";
import { Star, X } from "lucide-react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MenuCardProps {
  item: MenuItem;
  className?: string;
}

const tagColors = {
  V: "bg-green-100 text-green-800 border-green-200",
  VG: "bg-teal-100 text-teal-800 border-teal-200",
  GF: "bg-amber-100 text-amber-800 border-amber-200",
  N: "bg-red-100 text-red-800 border-red-200",
  D: "bg-blue-100 text-blue-800 border-blue-200",
};

const tagLabels = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-Free",
  N: "Contains Nuts",
  D: "Dairy",
};

export default function MenuCard({ item, className }: MenuCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`card-${item.id}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={() => setIsLightboxOpen(true)}
        className={cn(
          "bg-white border border-cafe-border overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl rounded-sm",
          className
        )}
      >
        <div className="relative h-[180px] sm:h-[220px] md:h-[240px] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full relative"
          >
              <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
            />
          </motion.div>
          
          {item.is_featured && (
            <div className="absolute top-4 left-4 bg-cafe-amber text-white text-[10px] font-bold px-3 py-1 flex items-center space-x-1.5 rounded-full z-10 shadow-lg">
              <Star size={10} fill="currentColor" />
              <span>CHEF&apos;S PICK</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-serif text-xl font-bold text-cafe-dark group-hover:text-cafe-amber transition-colors line-clamp-1">
              {item.name}
            </h3>
            <span className="font-sans font-bold text-cafe-brown whitespace-nowrap ml-2">
              ₹{item.price}
            </span>
          </div>

          <p className="text-sm text-cafe-muted mb-6 line-clamp-2 leading-relaxed min-h-[40px]">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-[9px] font-bold px-2 py-0.5 border rounded-xs tracking-tight uppercase",
                  tagColors[tag as keyof typeof tagColors]
                )}
                title={tagLabels[tag as keyof typeof tagLabels]}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={`card-${item.id}`}
              className="bg-white w-full h-full md:max-w-4xl md:h-auto md:max-h-[90vh] overflow-y-auto rounded-none md:rounded-sm relative z-10 flex flex-col md:flex-row"
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors md:bg-white md:text-cafe-dark md:hover:bg-cafe-bg"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-full">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-12 self-center">
                <div className="mb-6">
                  <p className="text-cafe-amber text-xs font-bold tracking-[0.2em] uppercase mb-4">
                    {item.category}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-cafe-dark mb-4">{item.name}</h2>
                  <p className="text-3xl font-sans font-medium text-cafe-brown">₹{item.price}</p>
                </div>

                <p className="text-cafe-muted text-lg leading-relaxed mb-8">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "text-xs font-bold px-3 py-1 border rounded-xs tracking-wide uppercase",
                        tagColors[tag as keyof typeof tagColors]
                      )}
                    >
                      {tagLabels[tag as keyof typeof tagLabels]}
                    </span>
                  ))}
                </div>

                <div className="pt-8 border-t border-cafe-border">
                  {item.is_available ? (
                    <div className="flex items-center text-green-600 text-sm font-bold tracking-widest uppercase">
                       <span className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                       Currently Available
                    </div>
                  ) : (
                    <div className="flex items-center text-cafe-muted text-sm font-bold tracking-widest uppercase">
                       <span className="w-2 h-2 bg-cafe-muted rounded-full mr-2" />
                       Currently Unavailable
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
