/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Scissors, Calendar, Menu, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 select-none ${
          isScrolled
            ? "py-3 bg-black/70 border-b border-gold-400/10 backdrop-blur-md shadow-lg"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-400/20 flex items-center justify-center text-brass group-hover:bg-gold-500 group-hover:text-charcoal transition-all duration-300">
              <Scissors className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg tracking-[0.25em] uppercase text-white group-hover:text-gold-300 transition-colors duration-300">
              LEGACY<span className="font-light text-gold-400">BARBERS</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-gold-200/70">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-white transition-colors duration-300 cursor-pointer uppercase"
            >
              Craftsmanship
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-white transition-colors duration-300 cursor-pointer uppercase"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="hover:text-white transition-colors duration-300 cursor-pointer uppercase"
            >
              Reserve
            </button>
          </nav>

          {/* Action Callout Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection("booking")}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1c140e] hover:bg-gold-500 hover:text-charcoal border border-gold-400/30 hover:border-transparent text-gold-200 text-xs font-mono tracking-wider transition-all duration-300 hover:scale-[1.03]"
            >
              <Calendar className="w-3.5 h-3.5" />
              RESERVE SEAT
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#1c140e]/40 border border-gold-400/10 text-brass hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-screen bg-black/98 z-40 pt-28 px-8 flex flex-col justify-between"
          >
            <div className="space-y-6 flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase border-b border-white/5 pb-2">
                LEGACY NAVIGATION
              </span>
              <button
                onClick={() => scrollToSection("hero")}
                className="text-3xl font-display font-light text-left text-white hover:text-gold-300 transition-colors"
              >
                The Atelier
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-3xl font-display font-light text-left text-white hover:text-gold-300 transition-colors"
              >
                Artisanal Services
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                className="text-3xl font-display font-light text-left text-white hover:text-gold-300 transition-colors"
              >
                Bespoke Booking
              </button>
              
              <button
                onClick={() => scrollToSection("booking")}
                className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal font-display font-medium text-base tracking-wide flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </button>
            </div>

            {/* Bottom details inside menu drawer */}
            <div className="pb-12 space-y-4">
              <div className="flex items-center gap-2 text-xs text-gold-100/40 font-sans">
                <MapPin className="w-4 h-4 text-brass" />
                42 Savile Row, Mayfair, London
              </div>
              <div className="text-[10px] font-mono text-gold-400/30">
                © 2026 LEGACY BARBERS. ALL RIGHTS RESERVED.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
