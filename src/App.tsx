/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import BookingSection from "./components/BookingSection";
import { Scissors, MapPin, Sparkles } from "lucide-react";
import ScrollSequence from "./components/ScrollSequence";

export default function App() {
  const [selectedServiceId, setSelectedServiceId] =
    useState<string>("precision-cuts");

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);

    const bookingElement = document.getElementById("booking");
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">

      {/* Cinematic Background */}
      <ScrollSequence />

      {/* Everything else sits ABOVE the canvas */}
      <div className="relative z-10">

        <Header />

        <HeroSection />

        <ServicesSection
          onSelectService={handleSelectService}
        />

        <BookingSection
          selectedServiceId={selectedServiceId}
          setSelectedServiceId={setSelectedServiceId}
        />

        {/* KEEP YOUR ENTIRE FOOTER HERE EXACTLY AS IT IS */}

      </div>

    </div>
  );
}