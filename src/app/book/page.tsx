"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Coffee, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { format, addDays } from "date-fns";
import { sendBookingEmail } from "@/app/actions/send-email";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SeatingType = 'Indoor' | 'Outdoor Terrace' | 'Bar Seating' | 'Private Dining';

interface BookingState {
  date: Date;
  time: string;
  guests: number;
  seating: SeatingType;
  name: string;
  email: string;
  phone: string;
  requests: string;
}

const timeSlots = [
  "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
  "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
  "19:30", "20:00", "20:30"
];

const busySlots = ["12:30", "13:00", "19:00", "19:30"];

const seatingOptions: { type: SeatingType; description: string }[] = [
  { type: 'Indoor', description: 'Cozy atmosphere, air-conditioned' },
  { type: 'Outdoor Terrace', description: 'Fresh air, garden view' },
  { type: 'Bar Seating', description: 'Quick service, watch our baristas' },
  { type: 'Private Dining', description: 'Quiet space for meetings or events' },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    date: new Date(),
    time: "",
    guests: 2,
    seating: "Indoor",
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [refCode, setRefCode] = useState("");

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleConfirm = async () => {
    setIsSending(true);
    const code = "CN-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    try {
      await sendBookingEmail({
        bookingRef: code,
        name: booking.name,
        email: booking.email,
        date: format(booking.date, 'EEEE, dd MMMM yyyy'),
        time: booking.time,
        guests: booking.guests,
        seating: booking.seating,
      });
    } catch (error) {
      console.error("Email failed but reservation confirmed locally:", error);
    }

    setRefCode(code);
    setIsSending(false);
    setStep(5); // Success state
  };

  const steps = [
    { id: 1, name: "Date & Time", icon: Calendar },
    { id: 2, name: "Guests & Seating", icon: Users },
    { id: 3, name: "Your Details", icon: Coffee },
    { id: 4, name: "Review", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-cafe-bg">
      <Navbar />

      <main className="pt-28 md:pt-32 pb-20 md:pb-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-12 px-2">
            <h1 className="font-serif text-3xl md:text-4xl text-cafe-dark mb-4 tracking-tight">Book a Table</h1>
            <p className="text-cafe-muted">Join us for a premium dining experience.</p>
          </div>

          {/* Stepper */}
          {step <= 4 && (
            <div className="flex justify-between items-center mb-10 md:mb-12 overflow-x-auto pb-4 scrollbar-hide">
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center flex-1 min-w-[72px]">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    step >= s.id ? "bg-cafe-amber border-cafe-amber text-white" : "bg-white border-cafe-border text-cafe-muted"
                  )}>
                    <s.icon size={18} />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] mt-2 font-bold uppercase tracking-widest",
                      step >= s.id ? "text-cafe-amber" : "text-cafe-muted",
                      "hidden xs:inline-block sm:inline-block"
                    )}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Form Container */}
          <div className="bg-white border border-cafe-border p-6 md:p-10 relative overflow-hidden min-h-[480px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="font-serif text-xl font-bold text-cafe-dark mb-6">Select Date</h3>
                    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                       {[...Array(60)].map((_, i) => {
                         const d = addDays(new Date(), i);
                         const isSelected = format(d, 'yyyy-MM-dd') === format(booking.date, 'yyyy-MM-dd');
                         return (
                           <button
                             key={i}
                             onClick={() => setBooking({...booking, date: d})}
                             className={cn(
                               "flex flex-col items-center justify-center px-4 py-3 border text-center transition-all duration-200 min-w-[80px]",
                               isSelected ? "bg-cafe-amber border-cafe-amber text-white shadow-sm" : "bg-white border-cafe-border hover:border-cafe-amber text-cafe-dark"
                             )}
                           >
                             <span className="text-[10px] uppercase font-bold opacity-70 mb-1">{format(d, 'EEE')}</span>
                             <span className="text-xl font-serif font-bold leading-none">{format(d, 'dd')}</span>
                             <span className="text-[10px] uppercase font-bold opacity-70 mt-1">{format(d, 'MMM')}</span>
                           </button>
                         )
                       })}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-cafe-dark mb-6">Available Slots</h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                      {timeSlots.map((time) => {
                        const isBusy = busySlots.includes(time);
                        const isSelected = booking.time === time;
                        return (
                          <button
                            key={time}
                            disabled={isBusy}
                            onClick={() => setBooking({...booking, time})}
                            className={cn(
                              "py-2 min-h-[44px] text-sm font-medium border transition-all duration-200",
                              isSelected ? "bg-cafe-amber border-cafe-amber text-white shadow-sm" : 
                              isBusy ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" : 
                              "bg-white border-cafe-border hover:border-cafe-amber text-cafe-dark"
                            )}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <Button 
                      disabled={!booking.time} 
                      onClick={nextStep}
                      className="group"
                    >
                      Continue <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="max-w-xs">
                    <h3 className="font-serif text-xl font-bold text-cafe-dark mb-6">Number of Guests</h3>
                    <select 
                      value={booking.guests}
                      onChange={(e) => setBooking({...booking, guests: parseInt(e.target.value)})}
                      className="w-full bg-white border border-cafe-border p-3 outline-none focus:border-cafe-amber transition-colors text-cafe-dark"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-cafe-dark mb-6 text-center md:text-left">Seating Preference</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {seatingOptions.map((opt) => (
                        <button
                          key={opt.type}
                          onClick={() => setBooking({...booking, seating: opt.type})}
                          className={cn(
                            "p-6 text-left border transition-all duration-200",
                            booking.seating === opt.type ? "bg-cafe-amber border-cafe-amber border-2" : "bg-white border-cafe-border hover:border-cafe-amber/50"
                          )}
                        >
                          <h4 className={cn(
                             "font-serif text-lg font-bold mb-1",
                             booking.seating === opt.type ? "text-white" : "text-cafe-dark"
                          )}>{opt.type}</h4>
                          <p className={cn(
                             "text-xs leading-relaxed",
                             booking.seating === opt.type ? "text-white/80" : "text-cafe-muted"
                          )}>{opt.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-8">
                    <Button variant="outline" onClick={prevStep} className="group">
                      <ChevronLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                    </Button>
                    <Button onClick={nextStep} className="group">
                      Continue <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="font-serif text-xl font-bold text-cafe-dark mb-6">Your Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-cafe-muted">Full Name</label>
                      <input 
                        type="text"
                        value={booking.name}
                        onChange={(e) => setBooking({...booking, name: e.target.value})}
                        className="w-full bg-transparent border-b border-cafe-border pb-3 outline-none focus:border-cafe-amber transition-colors text-cafe-dark text-[16px]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-cafe-muted">Email Address</label>
                      <input 
                        type="email"
                        value={booking.email}
                        onChange={(e) => setBooking({...booking, email: e.target.value})}
                        className="w-full bg-transparent border-b border-cafe-border pb-3 outline-none focus:border-cafe-amber transition-colors text-cafe-dark text-[16px]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-cafe-muted">Phone Number</label>
                      <input 
                        type="tel"
                        value={booking.phone}
                        onChange={(e) => setBooking({...booking, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-cafe-border pb-3 outline-none focus:border-cafe-amber transition-colors text-cafe-dark text-[16px]"
                        placeholder="+91 99999 99999"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-cafe-muted">Special Requests (Optional)</label>
                    <textarea 
                      value={booking.requests}
                      onChange={(e) => setBooking({...booking, requests: e.target.value})}
                      rows={3}
                      className="w-full bg-transparent border border-cafe-border p-4 outline-none focus:border-cafe-amber transition-colors text-cafe-dark text-[16px]"
                      placeholder="Birthdays, dietary requirements, or any special moments..."
                    />
                  </div>

                  <div className="flex justify-between pt-8">
                    <Button variant="outline" onClick={prevStep} className="group">
                      <ChevronLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                    </Button>
                    <Button 
                      disabled={!booking.name || !booking.email || !booking.phone}
                      onClick={nextStep} 
                      className="group"
                    >
                      Review Booking <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                   <h3 className="font-serif text-xl font-bold text-cafe-dark mb-6">Review Reservation</h3>
                  
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 border-y border-cafe-border py-8">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-cafe-muted mb-1">Date & Time</p>
                        <p className="font-serif text-lg font-bold text-cafe-dark">{format(booking.date, 'EEEE, dd MMMM yyyy')}</p>
                        <p className="text-cafe-amber font-bold">{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-cafe-muted mb-1">Guests & Seating</p>
                        <p className="font-serif text-lg font-bold text-cafe-dark">{booking.guests} Guests</p>
                        <p className="text-cafe-amber font-bold">{booking.seating}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-cafe-muted mb-1">Contact Details</p>
                        <p className="font-serif text-lg font-bold text-cafe-dark">{booking.name}</p>
                        <p className="text-cafe-muted text-sm">{booking.email} · {booking.phone}</p>
                      </div>
                   </div>

                   <p className="text-xs text-cafe-muted leading-relaxed text-center italic">
                     By confirming, you agree to our reservation policy. We hold tables for 15 minutes past the reservation time.
                   </p>

                   <div className="flex justify-between pt-8">
                    <Button variant="outline" onClick={prevStep} className="group">
                      <ChevronLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                    </Button>
                    <Button 
                      onClick={handleConfirm} 
                      size="lg" 
                      className="w-full md:w-auto"
                      disabled={isSending}
                    >
                      {isSending ? "Processing..." : "Confirm Reservation"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={40} />
                  </div>
                  <h2 className="font-serif text-3xl text-cafe-dark mb-4">Reservation Confirmed!</h2>
                  <p className="text-cafe-muted mb-12">We&apos;ve sent the details to {booking.email}</p>
                  
                  <div className="bg-cafe-bg border border-cafe-border p-8 mb-12 max-w-sm mx-auto">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cafe-muted mb-2">Booking Reference</p>
                    <p className="text-3xl font-serif text-cafe-amber tracking-widest font-bold">{refCode}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button onClick={() => window.location.href = '/'}>Go to Home</Button>
                    <Button variant="outline" onClick={() => setStep(1)}>New Booking</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
