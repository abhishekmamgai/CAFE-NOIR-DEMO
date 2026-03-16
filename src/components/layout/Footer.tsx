"use client";

import Link from "next/link";
import { Instagram, Mail, MapPin, Clock, Phone, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cafe-dark text-white pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-tighter text-white">
                CAFE <span className="text-cafe-amber">NOIR</span>
              </span>
            </Link>
            <p className="text-cafe-muted leading-relaxed max-w-xs">
              Where Every Cup Tells a Story. Experience artisanal coffee and seasonal dining in a premium setting.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com/infoasktech"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#BA7517" }}
                className="p-3 bg-white/5 rounded-full text-white/70 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="mailto:hello@cafenoir.in"
                whileHover={{ y: -3, color: "#BA7517" }}
                className="p-3 bg-white/5 rounded-full text-white/70 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-8 border-b border-white/10 pb-4 inline-block">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Menu", href: "/menu" },
                { name: "Gallery", href: "/gallery" },
                { name: "Book a Table", href: "/book" },
                { name: "Sign In", href: "/auth" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-cafe-muted hover:text-cafe-amber transition-colors flex items-center group"
                  >
                    <ChevronRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Menu Highlights */}
          <div>
            <h4 className="font-serif text-xl mb-8 border-b border-white/10 pb-4 inline-block">Highlights</h4>
            <ul className="space-y-4">
              {[
                "Signature Latte",
                "Pour-Over Coffee",
                "Avocado Toast",
                "Mushroom Risotto",
                "Dark Chocolate Tart",
              ].map((item) => (
                <li key={item} className="text-cafe-muted">
                  <span className="hover:text-white transition-colors cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Hours */}
          <div className="space-y-8">
            <h4 className="font-serif text-xl mb-8 border-b border-white/10 pb-4 inline-block">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin size={20} className="text-cafe-amber mt-1 flex-shrink-0" />
                <p className="text-cafe-muted text-sm leading-relaxed">
                  Connaught Place, New Delhi <br />
                  & Cyber Hub, Gurgaon
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <Clock size={20} className="text-cafe-amber mt-1 flex-shrink-0" />
                <p className="text-cafe-muted text-sm">
                  Mon – Fri: 7:30AM – 10PM <br />
                  Sat – Sun: 8:00AM – 11PM
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <Mail size={20} className="text-cafe-amber mt-1 flex-shrink-0" />
                <p className="text-cafe-muted text-sm">hello@cafenoir.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-cafe-muted text-sm tracking-widest uppercase">
            &copy; {currentYear} <span className="text-cafe-amber">Cafe Noir</span>. Built with ☕ in New Delhi
          </p>
        </div>
      </div>
    </footer>
  );
}
