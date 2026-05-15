"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Shield,
  Layers,
} from "lucide-react";
import { useScreenSize } from "../../utils/useScreenSize";
import { motion } from "framer-motion";
import products from "@/src/data/productData.json";
import { cn } from "../../lib/utils";

interface ProductData {
  id: number;
  image: string;
  title: string;
  discription: string;
}

export default function Product() {
  const { itemsPerSlide } = useScreenSize();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = products.length;
  const maxIndex = totalSlides - itemsPerSlide;

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="relative py-16 overflow-hidden bg-slate-50/50">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-72 h-72 bg-cyan-100/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Modern Header Section */}
        <div className="text-center mb-8 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider"
          >
            <Shield className="w-3 h-3" />
            Premium Precast Solutions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
          >
            Crafting the Future of{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Concrete
              </span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-2 left-0 h-3 bg-blue-100/50 -z-0"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            Durable, reliable, and expertly crafted precast concrete solutions
            tailored to build a stronger tomorrow.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden px-4 py-4 -mx-4 cursor-grab active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={{
                right: 0,
                left: -maxIndex * (100 / itemsPerSlide),
              }}
              dragElastic={0.1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = offset.x;
                const vel = velocity.x;

                if (swipe < -50 || vel < -500) {
                  nextSlide();
                } else if (swipe > 50 || vel > 500) {
                  prevSlide();
                }
              }}
              animate={{ x: `-${index * (100 / itemsPerSlide)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {products.map((product: ProductData) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (product.id % itemsPerSlide) * 0.1 }}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerSlide}%` }}
                  onMouseEnter={() => {
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                  }}
                >
                  <motion.div
                    layout
                    className="group/card relative bg-white rounded-[2rem] p-3 transition-all duration-500 border border-slate-100 h-full flex flex-col"
                  >
                    {/* Badge */}
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-[10px] font-bold text-slate-700 shadow-sm transition-transform duration-300 group-hover/card:-translate-y-1">
                      <Layers className="w-3 h-3 text-blue-500" />
                      PRECAST
                    </div>

                    {/* Image Section */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-slate-50">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      {/* Action Button on Hover */}
                      <div className="absolute bottom-5 right-5 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                        <button className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300">
                          <ArrowUpRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-5 py-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover/card:text-blue-600 transition-colors duration-300 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
                        {product.discription}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Premium Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-5 -right-5 flex justify-between pointer-events-none px-2 z-30">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-slate-200/80 backdrop-blur-xl border border-white shadow-2xl flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 pointer-events-auto"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-slate-200/80 backdrop-blur-xl border border-white shadow-2xl flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 pointer-events-auto"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Progress Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalSlides - itemsPerSlide + 1 }).map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    index === i
                      ? "w-6 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      : "w-2 bg-slate-300 hover:bg-slate-400",
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
