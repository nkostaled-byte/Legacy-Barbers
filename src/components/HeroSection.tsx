/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();

  // Scroll-linked animations for the Hero content
  // Fully visible at scroll 0, fades out smoothly as we transition to services (0.22 to 0.32)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.22, 0.32], [0, 0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0.95]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="hero" className="relative h-screen flex items-end justify-center overflow-hidden px-6 pb-16 md:pb-24">
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="w-full max-w-xl z-30 select-none flex flex-col sm:flex-row gap-4 items-center justify-center mb-4"
      >
        {/* Main Booking CTA */}
        <button
          onClick={() => scrollToSection("booking")}
          className="group relative px-8 py-3.5 w-full sm:w-auto rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-display font-semibold text-sm tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(181,132,68,0.25)] hover:shadow-[0_8px_30px_rgba(181,132,68,0.45)] hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          Book Appointment
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {/* Secondary Services Button */}
        <button
          onClick={() => scrollToSection("services")}
          className="px-8 py-3.5 w-full sm:w-auto rounded-full bg-black/40 hover:bg-white/10 text-gold-100 font-display font-semibold text-sm tracking-wider border border-white/10 hover:border-gold-400/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer backdrop-blur-md"
        >
          View Services
        </button>
      </motion.div>
    </div>
  );
}
