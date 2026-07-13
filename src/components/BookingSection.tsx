/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  Check,
  CheckCircle2,
  Copy,
  Sparkles,
  MapPin,
  Phone,
  Shield,
  HelpCircle,
} from "lucide-react";
import { SERVICES, BARBERS, Barber, Service } from "../data";

interface BookingSectionProps {
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
}

export default function BookingSection({
  selectedServiceId,
  setSelectedServiceId,
}: BookingSectionProps) {
  const [selectedBarberId, setSelectedBarberId] = useState<string>(BARBERS[0].id);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Generate date options for the next 7 days starting from Monday
  const dateOptions = Array.from({ length: 7 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() + index + 1);
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.toLocaleDateString("en-US", { day: "numeric" });
    const monthName = d.toLocaleDateString("en-US", { month: "short" });
    return {
      id: d.toISOString().split("T")[0],
      dayName,
      dayNum,
      monthName,
      fullText: `${dayName}, ${monthName} ${dayNum}`,
    };
  });

  // Default to first available date on mount
  useEffect(() => {
    if (dateOptions.length > 0) {
      setSelectedDate(dateOptions[0].id);
    }
  }, []);

  const timeSlots = [
    "09:30 AM",
    "11:00 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
  ];

  // Pick first time slot as default on mount
  useEffect(() => {
    setSelectedTimeSlot(timeSlots[1]);
  }, []);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const selectedBarber = BARBERS.find((b) => b.id === selectedBarberId) || BARBERS[0];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      return;
    }
    const randId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setTicketNumber(`LB-${randId}`);
    setIsBooked(true);
  };

  const copyTicket = () => {
    navigator.clipboard.writeText(ticketNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetBooking = () => {
    setIsBooked(false);
    setUserName("");
    setUserEmail("");
  };

  return (
    <div id="booking" className="relative min-h-screen py-32 px-6 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Editorial Info and Contact */}
        <div className="lg:col-span-5 text-left space-y-10 select-none">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-brass font-mono text-xs tracking-[0.3em] uppercase mb-4"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              BESPOKE APPOINTMENTS
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-6"
            >
              Secure Your
              <br />
              <span className="text-gold-300">Legacy Session.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gold-100/70 font-sans font-light text-base leading-relaxed"
            >
              Skip the queue. Select your preferred style, Barber Artisan, and time. Your luxury hot-towel beverage of choice and premium seat await.
            </motion.p>
          </div>

          {/* Location & Contact Info Cards */}
          <div className="space-y-6">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-walnut/30 border border-gold-400/5 hover:border-gold-400/15 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400/20 flex items-center justify-center text-brass shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-display font-medium text-white uppercase tracking-wider mb-1">
                  THE MAYFAIR SALON
                </h4>
                <p className="text-xs text-gold-100/50 leading-relaxed font-sans font-light">
                  42 Savile Row, Mayfair, London W1S 3PG
                </p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-walnut/30 border border-gold-400/5 hover:border-gold-400/15 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400/20 flex items-center justify-center text-brass shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-display font-medium text-white uppercase tracking-wider mb-1">
                  SALON HOURS
                </h4>
                <p className="text-xs text-gold-100/50 leading-relaxed font-sans font-light">
                  Mon – Sat: 09:00 AM – 08:30 PM <br />
                  Sun: 10:00 AM – 06:00 PM
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-[10px] text-gold-300/40 font-mono"
          >
            <Shield className="w-4 h-4 text-brass/40" />
            SECURE RE-SCHEDULING AVAILABLE UP TO 12 HOURS BEFORE TIME
          </motion.div>
        </div>

        {/* Right Column: Interactive Booking Card */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
            className="glass-premium rounded-[32px] p-6 sm:p-10 border border-gold-400/10 relative overflow-hidden shadow-2xl"
          >
            {/* Accent Gold Corner Ribbons */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isBooked ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBookAppointment}
                  className="space-y-8"
                >
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                      Book Appointment
                    </h3>
                    <p className="text-xs text-gold-100/50 mt-1 font-sans">
                      Complete the premium specifications below.
                    </p>
                  </div>

                  {/* 1. Choose Service Section */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-widest text-gold-300">
                      1. Choose Service
                    </label>
                    <div className="relative">
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full bg-[#120d09] border border-gold-400/20 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-white focus:outline-none focus:border-gold-500 transition-all cursor-pointer appearance-none shadow-inner"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-charcoal text-white">
                            {s.title} — {s.price} ({s.duration})
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-brass pointer-events-none">
                        <Scissors className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* 2. Choose Barber Section */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-widest text-gold-300">
                      2. Select Artisan Barber
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {BARBERS.map((barber) => (
                        <div
                          key={barber.id}
                          onClick={() => setSelectedBarberId(barber.id)}
                          className={`p-4 rounded-2xl cursor-pointer border flex flex-col items-center text-center transition-all duration-300 select-none ${
                            selectedBarberId === barber.id
                              ? "bg-gold-500/10 border-gold-500 shadow-[inset_0_1px_0_rgba(212,175,55,0.15)]"
                              : "bg-[#120d09]/40 border-white/5 hover:border-gold-400/20"
                          }`}
                        >
                          <div className="relative">
                            <img
                              src={barber.avatar}
                              alt={barber.name}
                              className="w-12 h-12 rounded-full object-cover border border-gold-400/20 filter grayscale contrast-125"
                              referrerPolicy="no-referrer"
                            />
                            {selectedBarberId === barber.id && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gold-500 border border-charcoal flex items-center justify-center text-charcoal">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-display font-semibold text-white mt-3">
                            {barber.name.split(" ")[0]}
                          </span>
                          <span className="text-[10px] text-gold-300/60 mt-0.5 leading-none font-mono">
                            {barber.role.split(" ")[0]} Artisan
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Select Date */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-widest text-gold-300">
                      3. Select Date
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gold-500">
                      {dateOptions.map((date) => (
                        <div
                          key={date.id}
                          onClick={() => setSelectedDate(date.id)}
                          className={`flex-1 min-w-[70px] py-3.5 px-2 rounded-2xl cursor-pointer border flex flex-col items-center text-center transition-all duration-300 ${
                            selectedDate === date.id
                              ? "bg-gold-500/10 border-gold-500 shadow-[inset_0_1px_0_rgba(212,175,55,0.15)]"
                              : "bg-[#120d09]/40 border-white/5 hover:border-gold-400/20"
                          }`}
                        >
                          <span className="text-[10px] font-mono uppercase text-gold-300/60 leading-none">
                            {date.dayName}
                          </span>
                          <span className="text-base font-display font-bold text-white mt-1">
                            {date.dayNum}
                          </span>
                          <span className="text-[9px] font-mono text-gold-400/50 uppercase tracking-widest leading-none mt-0.5">
                            {date.monthName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Select Time */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-widest text-gold-300">
                      4. Select Time Slot
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-3.5 px-1.5 rounded-xl cursor-pointer border text-center transition-all duration-300 text-xs font-mono ${
                            selectedTimeSlot === slot
                              ? "bg-gold-500/10 border-gold-500 text-gold-200"
                              : "bg-[#120d09]/40 border-white/5 text-gold-100/60 hover:border-gold-400/20"
                          }`}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* User Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-gold-300/70">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Arthur Pendelton"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-[#120d09]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gold-200/20 focus:outline-none focus:border-gold-500 focus:bg-[#120d09] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-gold-300/70">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="arthur@legacy.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-[#120d09]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gold-200/20 focus:outline-none focus:border-gold-500 focus:bg-[#120d09] transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal font-display font-medium text-base tracking-wide transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    Book Grooming Session
                  </button>
                </motion.form>
              ) : (
                // SUCCESS STATE: Luxury receipt confirmation modal
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-500/15 border border-gold-400/30 flex items-center justify-center text-brass mb-6 animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400">
                    LEGACY BARBERS LONDON
                  </span>

                  <h3 className="text-3xl font-display font-bold text-white tracking-tight mt-2 mb-8">
                    Session Reserved
                  </h3>

                  {/* The Ticket Receipt */}
                  <div className="w-full bg-[#120d09] border border-gold-400/15 rounded-3xl p-6 mb-8 text-left relative overflow-hidden">
                    {/* Ticket notches on left and right */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-black border-r border-gold-400/15 -translate-y-1/2" />
                    <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-black border-l border-gold-400/15 -translate-y-1/2" />

                    <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/5">
                      <div>
                        <span className="text-[9px] font-mono text-gold-400/50 uppercase block">
                          GROOMING TICKET
                        </span>
                        <span className="text-sm font-mono font-bold text-gold-300 tracking-wider">
                          {ticketNumber}
                        </span>
                      </div>
                      <button
                        onClick={copyTicket}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-gold-300 hover:bg-gold-500 hover:text-charcoal transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-mono">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-mono">Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                      <div>
                        <span className="text-[9px] font-mono text-gold-400/50 uppercase block">
                          SERVICE
                        </span>
                        <span className="font-display font-semibold text-white">
                          {selectedService.title}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gold-400/50 uppercase block">
                          ARTISAN
                        </span>
                        <span className="font-display font-semibold text-white">
                          {selectedBarber.name.split(" ")[0]}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gold-400/50 uppercase block">
                          DATE
                        </span>
                        <span className="font-display font-semibold text-white">
                          {dateOptions.find((d) => d.id === selectedDate)?.fullText ||
                            dateOptions[0].fullText}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gold-400/50 uppercase block">
                          TIME
                        </span>
                        <span className="font-display font-semibold text-white">
                          {selectedTimeSlot}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-white/10 flex justify-between items-center text-xs font-mono">
                      <span className="text-gold-300/60 uppercase">CLIENT:</span>
                      <span className="text-white font-medium truncate max-w-[180px]">
                        {userName}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gold-100/50 max-w-sm leading-relaxed mb-8">
                    A secure luxury voucher has been dispatched to{" "}
                    <span className="text-gold-300">{userEmail}</span>. Please arrive 5 minutes prior
                    to enjoy our complimentary single-malt bar.
                  </p>

                  <button
                    onClick={resetBooking}
                    className="px-6 py-3 rounded-full bg-white/5 border border-white/5 text-gold-200 text-xs font-mono hover:bg-white/10 hover:border-gold-400/30 transition-all cursor-pointer"
                  >
                    Schedule Another Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
