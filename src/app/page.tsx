"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import MenuCard from "@/components/ui/MenuCard";
import { menuItems } from "@/data/menu";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Utensils, Calendar, Star, Quote, MapPin, Clock, Smartphone } from "lucide-react";

export default function Home() {
  const featuredItems = menuItems.filter((item) => item.is_featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-cafe-bg">
      <Navbar />

      <main>
        {/* Section 1: Hero Section */}
        <section className="relative min-h-[92vh] flex items-center justify-center px-6 overflow-hidden">
          {/* Hero Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&auto=format&fit=crop"
              alt="Cafe Noir Interior"
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55" />
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10 text-white flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Logo size="md" className="md:hidden" variant="light" />
              <Logo size="lg" className="hidden md:inline-flex" variant="light" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cafe-amber font-medium tracking-[0.2em] text-xs uppercase mb-6"
            >
              Est. New Delhi · 2019
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-[2.5rem] md:text-5xl lg:text-7xl mb-8 leading-tight max-w-4xl mx-auto"
            >
              Where Every Cup <br /> Tells a Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              A premium cafe experience in the heart of the city. Specialty coffee, artisanal menus, and memorable dining experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link href="/book">
                <Button size="lg">Reserve a Table</Button>
              </Link>
              <Link href="/menu">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-cafe-dark">
                  View Menu
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Chef's Picks */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-white border-y border-cafe-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-cafe-amber font-medium tracking-[0.2em] text-xs uppercase mb-4">
                Our Favorites
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl text-cafe-dark">
                Chef&apos;s Picks This Week
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/menu">
                <Button variant="outline">Explore Full Menu</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION A: Our Story */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-[#FDF6EC]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex">
                <div className="w-1 bg-cafe-amber mr-6" />
                <h2 className="font-serif text-3xl md:text-5xl text-cafe-dark leading-tight">
                  Born in New Delhi, <br /> Brewed with Love
                </h2>
              </div>
              <p className="text-cafe-muted text-lg leading-relaxed">
                Cafe Noir was founded in 2019 with one belief — a perfect cup of coffee can change your entire day. We source single-origin beans from farms across India, Ethiopia, and Colombia, roasted fresh every week. Every dish is crafted with seasonal ingredients and served with the warmth of a home kitchen.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&auto=format&fit=crop"
                alt="Cafe Noir Story"
                fill
                className="object-cover rounded-sm"
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION B: Why Cafe Noir */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-cafe-amber font-medium tracking-[0.2em] text-xs uppercase mb-4">
                The Experience
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl text-cafe-dark">
                Why Cafe Noir
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: Coffee,
                  title: "Specialty Coffee",
                  desc: "Single origin beans, expertly brewed by our trained baristas. Every cup is a ritual."
                },
                {
                  icon: Utensils,
                  title: "All-Day Dining",
                  desc: "From sunrise breakfasts to candlelit dinners, our seasonal kitchen never sleeps."
                },
                {
                  icon: Calendar,
                  title: "Easy Reservations",
                  desc: "Book your table in under 2 minutes. Instant email confirmation guaranteed."
                }
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 border border-cafe-border shadow-sm hover:shadow-xl transition-all duration-300 text-center rounded-sm"
                >
                  <div className="w-16 h-16 bg-cafe-amber/10 text-cafe-amber rounded-full flex items-center justify-center mx-auto mb-8">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-cafe-dark mb-4">{feature.title}</h3>
                  <p className="text-cafe-muted leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION C: Testimonials */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-[#FDF6EC]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <p className="text-cafe-amber font-medium tracking-[0.2em] text-xs uppercase mb-4">
                Kind Words
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl text-cafe-dark">
                What Guests Say
              </h2>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 scrollbar-hide">
              {[
                {
                  text: "The Signature Latte changed my morning routine forever. Hands down the best cafe in Delhi.",
                  author: "Priya S.",
                  location: "New Delhi"
                },
                {
                  text: "Avocado Toast + Pour-Over on a Sunday morning — absolute perfection. The ambiance is unmatched.",
                  author: "Rahul M.",
                  location: "Gurgaon"
                },
                {
                  text: "Booked for my wife's birthday. Private dining, truffle pasta, chocolate tart. She cried happy tears.",
                  author: "Arjun K.",
                  location: "Delhi"
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 md:p-10 rounded-[12px] border border-cafe-border relative min-w-[280px] snap-center md:min-w-0"
                >
                  <Quote className="text-cafe-amber/20 absolute top-8 left-8 w-12 h-12" />
                  <div className="relative z-10">
                    <div className="flex text-cafe-amber mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-cafe-dark text-lg leading-relaxed mb-8 italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div>
                      <p className="font-bold text-cafe-dark">{testimonial.author}</p>
                      <p className="text-xs text-cafe-muted tracking-widest uppercase">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION D: Find Us Bar */}
        <section className="bg-cafe-dark text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="p-3 bg-white/10 rounded-full text-cafe-amber">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-cafe-muted mb-1">Visit Us</p>
                <p className="text-sm">Connaught Place, New Delhi <br /> Cyber Hub, Gurgaon</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="p-3 bg-white/10 rounded-full text-cafe-amber">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-cafe-muted mb-1">Hours</p>
                <p className="text-sm">Mon–Fri 7:30AM–10PM <br /> Sat–Sun 8AM–11PM</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-6 text-center md:text-right">
              <div className="flex items-center space-x-2 text-cafe-muted hover:text-white transition-colors">
                <Smartphone size={20} className="text-cafe-amber" />
                <span className="text-sm">@infoasktech</span>
              </div>
              <Link href="/book">
                <Button className="w-full md:w-auto">Reserve a Table</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
