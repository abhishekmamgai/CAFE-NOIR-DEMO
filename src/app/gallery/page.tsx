"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515215316771-2742baa337f4?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop",
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const threshold = 40;
    if (deltaX > threshold) {
      prevImage(e);
    } else if (deltaX < -threshold) {
      nextImage(e);
    }
    setTouchStartX(null);
  };

  return (
    <div className="min-h-screen bg-cafe-bg">
      <Navbar />

      <main className="pt-28 md:pt-32 pb-20 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cafe-amber font-medium tracking-[0.2em] text-xs uppercase mb-4"
            >
              Visual Journey
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-6xl text-cafe-dark mb-6"
            >
              Gallery
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-1 w-24 bg-cafe-amber mx-auto"
            />
          </div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {galleryImages.map((src, index) => (
              <motion.div
                key={src}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="relative group cursor-pointer overflow-hidden rounded-sm"
                onClick={() => setSelectedIndex(index)}
              >
                <div className="relative">
                  <Image
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-cafe-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white w-8 h-8" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white z-[110]"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={40} />
            </button>

            <button
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-[110] p-2 bg-white/10 rounded-full transition-all"
              onClick={prevImage}
            >
              <ChevronLeft size={40} />
            </button>

            <button
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-[110] p-2 bg-white/10 rounded-full transition-all"
              onClick={nextImage}
            >
              <ChevronRight size={40} />
            </button>

            {/* Mobile arrows at bottom */}
            <div className="flex md:hidden absolute bottom-6 inset-x-0 justify-center gap-8 z-[110]">
              <button
                className="p-3 bg-white/10 rounded-full text-white/80"
                onClick={prevImage}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="p-3 bg-white/10 rounded-full text-white/80"
                onClick={nextImage}
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedIndex]}
                alt="Selected"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-[0.3em] font-medium uppercase">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
