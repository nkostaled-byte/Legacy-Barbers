/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Clock, Scissors, Sparkles, ChevronRight } from "lucide-react";
import { SERVICES } from "../data";

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  // Filter for the 4 core services explicitly requested
  const coreServiceIds = ["precision-cuts", "luxury-beard", "hot-towel", "hair-treatments"];
  const selectedServices = SERVICES.filter((s) => coreServiceIds.includes(s.id));

  // Map elements for easy layout placement
  const precCuts = selectedServices.find((s) => s.id === "precision-cuts");
  const beardGroom = selectedServices.find((s) => s.id === "luxury-beard");
  const hotTowel = selectedServices.find((s) => s.id === "hot-towel");
  const hairTreat = selectedServices.find((s) => s.id === "hair-treatments");

  return (
    <div id="services" className="relative min-h-screen py-32 px-6 flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 text-brass font-mono text-xs tracking-[0.3em] uppercase mb-4"
          >
            <Scissors className="w-3.5 h-3.5" />
            THE SERVICES ATELIER
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight mb-6"
          >
            Sartorial Precision.
            <br />
            <span className="bg-gradient-to-r from-white via-gold-200 to-gold-400 bg-clip-text text-transparent">
              No Compromise.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold-100/70 font-sans font-light text-lg leading-relaxed max-w-2xl"
          >
            Every cut is treated as a piece of timeless sculpture. Explore our refined collection, meticulously designed to elevate your personal style.
          </motion.p>
        </div>

        {/* 
          Desktop: 3-column asymmetric layout with an empty center column.
          This ensures the gorgeous cinematic Barber Chair remains fully visible in the center of the viewport,
          as the floating glass cards flank it elegantly.
          Mobile: Standard single column stack.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1: Left Flank (Precision Cuts & Hot Towel Shaves) */}
          <div className="flex flex-col gap-8 justify-between">
            {precCuts && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectService(precCuts.id)}
                className="glass-premium glass-premium-hover p-8 cursor-pointer flex flex-col justify-between group relative h-[280px] select-none"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-gold-400/60 uppercase">
                      {precCuts.subtitle}
                    </span>
                    <span className="text-2xl font-mono text-gold-400/20 group-hover:text-gold-400/40 transition-colors duration-500">
                      {precCuts.accent}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-2 group-hover:text-gold-200 transition-colors duration-300">
                    {precCuts.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gold-100/60 group-hover:text-gold-100/75 leading-relaxed font-sans font-light">
                    {precCuts.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 group-hover:border-gold-500/10 transition-colors duration-500">
                  <div className="flex gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1 text-gold-300">
                      <span className="text-gold-400/50">PRICE:</span> {precCuts.price}
                    </div>
                    <div className="flex items-center gap-1 text-gold-300/80">
                      <Clock className="w-3 h-3 text-gold-400/40" /> {precCuts.duration}
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-brass group-hover:bg-gold-500 group-hover:text-black transition-all duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}

            {hotTowel && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectService(hotTowel.id)}
                className="glass-premium glass-premium-hover p-8 cursor-pointer flex flex-col justify-between group relative h-[280px] select-none"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-gold-400/60 uppercase">
                      {hotTowel.subtitle}
                    </span>
                    <span className="text-2xl font-mono text-gold-400/20 group-hover:text-gold-400/40 transition-colors duration-500">
                      {hotTowel.accent}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-2 group-hover:text-gold-200 transition-colors duration-300">
                    {hotTowel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gold-100/60 group-hover:text-gold-100/75 leading-relaxed font-sans font-light">
                    {hotTowel.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 group-hover:border-gold-500/10 transition-colors duration-500">
                  <div className="flex gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1 text-gold-300">
                      <span className="text-gold-400/50">PRICE:</span> {hotTowel.price}
                    </div>
                    <div className="flex items-center gap-1 text-gold-300/80">
                      <Clock className="w-3 h-3 text-gold-400/40" /> {hotTowel.duration}
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-brass group-hover:bg-gold-500 group-hover:text-black transition-all duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Column 2: Empty Space / Viewport for the Center-focused Barber Chair in the cinematic background */}
          <div className="hidden md:flex items-center justify-center pointer-events-none select-none">
            {/* Extremely subtle guideline or branding element that fades inside the negative space */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.2 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-400/30 to-transparent" />
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-gold-300/40">
                THE FOCAL CHAIR
              </span>
              <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-400/30 to-transparent" />
            </motion.div>
          </div>

          {/* Column 3: Right Flank (Beard Grooming & Hair Treatments) */}
          <div className="flex flex-col gap-8 justify-between">
            {beardGroom && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectService(beardGroom.id)}
                className="glass-premium glass-premium-hover p-8 cursor-pointer flex flex-col justify-between group relative h-[280px] select-none"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-gold-400/60 uppercase">
                      {beardGroom.subtitle}
                    </span>
                    <span className="text-2xl font-mono text-gold-400/20 group-hover:text-gold-400/40 transition-colors duration-500">
                      {beardGroom.accent}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-2 group-hover:text-gold-200 transition-colors duration-300">
                    Beard Grooming
                  </h3>
                  <p className="text-xs sm:text-sm text-gold-100/60 group-hover:text-gold-100/75 leading-relaxed font-sans font-light">
                    {beardGroom.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 group-hover:border-gold-500/10 transition-colors duration-500">
                  <div className="flex gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1 text-gold-300">
                      <span className="text-gold-400/50">PRICE:</span> {beardGroom.price}
                    </div>
                    <div className="flex items-center gap-1 text-gold-300/80">
                      <Clock className="w-3 h-3 text-gold-400/40" /> {beardGroom.duration}
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-brass group-hover:bg-gold-500 group-hover:text-black transition-all duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}

            {hairTreat && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectService(hairTreat.id)}
                className="glass-premium glass-premium-hover p-8 cursor-pointer flex flex-col justify-between group relative h-[280px] select-none"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-gold-400/60 uppercase">
                      {hairTreat.subtitle}
                    </span>
                    <span className="text-2xl font-mono text-gold-400/20 group-hover:text-gold-400/40 transition-colors duration-500">
                      {hairTreat.accent}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-2 group-hover:text-gold-200 transition-colors duration-300">
                    {hairTreat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gold-100/60 group-hover:text-gold-100/75 leading-relaxed font-sans font-light">
                    {hairTreat.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 group-hover:border-gold-500/10 transition-colors duration-500">
                  <div className="flex gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1 text-gold-300">
                      <span className="text-gold-400/50">PRICE:</span> {hairTreat.price}
                    </div>
                    <div className="flex items-center gap-1 text-gold-300/80">
                      <Clock className="w-3 h-3 text-gold-400/40" /> {hairTreat.duration}
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-brass group-hover:bg-gold-500 group-hover:text-black transition-all duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>

        {/* The Legacy Promise Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="mt-20 p-8 sm:p-10 glass-premium max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center select-none"
        >
          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-400/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-brass" />
          </div>
          <div className="text-left">
            <h4 className="text-md font-display font-semibold text-white tracking-tight mb-1">
              The Legacy Quality Promise
            </h4>
            <p className="text-xs sm:text-sm text-gold-100/70 leading-relaxed font-sans font-light">
              We utilize select artisanal oils, double-infused warm herbal lathers, and handcrafted carbon-steel shears to ensure our haircuts and beard trims are pristine, tailored architectural statements.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
