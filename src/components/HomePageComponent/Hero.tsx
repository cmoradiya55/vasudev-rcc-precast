"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const HERO_IMAGES = ["/hero-bg1.webp", "/hero-bg2.webp", "/hero-bg3.webp"];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const advanceSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(advanceSlide, 6000);
    return () => clearInterval(interval);
  }, [advanceSlide]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center text-white overflow-hidden bg-gray-950"
    >
      {/* Image Carousel — uses next/image for AVIF/WebP auto-conversion + responsive sizing */}
      <div className="absolute inset-0 w-full h-full">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-40 scale-100 z-10"
                : "opacity-0 scale-105 z-0"
            }`}
          >
            <Image
              src={image}
              alt={`Vasudev Precast construction site ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
              // Priority-load the first hero image for LCP
              priority={index === 0}
              // Eagerly load all hero images (only 3, small carousel)
              loading={index === 0 ? "eager" : "lazy"}
              quality={75}
            />
          </div>
        ))}

        {/* Subtle gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-200/10 to-transparent z-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-30 w-full container mx-auto px-4 max-w-6xl pt-20 sm:pt-24 pb-6 sm:pb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:w-2/3 flex flex-col items-center text-center lg:items-start lg:text-left space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-semibold tracking-wide shadow-lg"
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
            Trusted Premium Precast Solutions
          </motion.div>

          {/* Main Typography & Titles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-2 sm:space-y-3 w-full"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Stronger.
              </span>
              <br />
              Build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Faster.
              </span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-gray-300 font-medium leading-relaxed">
              High-quality, durable precast concrete walls for residential,
              commercial, and industrial properties.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full max-w-[260px] sm:max-w-none mx-auto lg:mx-0"
          >
            <Link
              href="#contact"
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.4)] flex justify-center"
            >
              Get a Free Quote
            </Link>
            <Link
              href="#products"
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 flex justify-center"
            >
              Explore Products
            </Link>
          </motion.div>
        </div>

        {/* Right Side Unique Widget - Contact Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 sm:mt-8 lg:mt-0 flex flex-col items-center lg:items-end w-full lg:w-auto"
        >
          <div className="bg-white/10 lg:bg-white/5 backdrop-blur-xl border border-white/20 lg:border-white/10 p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[300px] sm:max-w-[320px] text-center lg:text-right group hover:bg-white/15 transition-all cursor-pointer">
            <div className="flex justify-center lg:justify-end mb-3 sm:mb-4">
              <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl text-white shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                <Phone fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
              Need a Wall Fast?
            </h3>
            <div className="flex flex-col gap-1 mb-2 sm:mb-3">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 font-bold text-sm sm:text-base tracking-wider">
                {process.env.NEXT_PUBLIC_PHONE_NUMBER_01}
              </p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 font-bold text-sm sm:text-base tracking-wider">
                {process.env.NEXT_PUBLIC_PHONE_NUMBER_02}
              </p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 font-bold text-sm sm:text-base tracking-wider">
                {process.env.NEXT_PUBLIC_PHONE_NUMBER_03}
              </p>
            </div>
            <p className="text-gray-300 lg:text-gray-400 text-xs font-medium border-t border-white/20 lg:border-white/10 pt-2 sm:pt-3">
              Available for instant estimation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
