"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

import testimonials from "@/src/data/testimonialData.json";

const infiniteTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = rating >= star;
        const isHalf = !isFull && rating >= star - 0.5;
        return (
          <div key={star} className="relative w-3.5 h-3.5">
            <Star
              className="absolute inset-0 w-3.5 h-3.5 text-gray-200"
              fill="currentColor"
              strokeWidth={0}
            />
            {(isFull || isHalf) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: isHalf ? "50%" : "100%" }}
              >
                <Star
                  className="w-3.5 h-3.5 text-yellow-400"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>
            )}
          </div>
        );
      })}
      <span className="text-[11px] font-bold text-gray-400 ml-1">{rating}</span>
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="w-full py-12 md:py-16">
      {/* Header */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center mb-10 gap-4"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-2">
              Client Reviews
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Clients
              </span>{" "}
              Say
            </h2>
          </div>
          <p className="text-sm text-gray-500 font-medium max-w-lg leading-relaxed">
            Hear from businesses and individuals who trust Vasudev Precast for
            their boundary and structural needs.
          </p>
        </motion.div>
      </div>

      {/* Scrolling strip */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        <div className="flex w-max animate-scroll hover:pause-scroll items-stretch py-3">
          {infiniteTestimonials.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="w-[280px] sm:w-[320px] md:w-[360px] px-3 flex-shrink-0"
            >
              <div className="relative bg-white rounded-2xl border border-gray-100 p-6 flex flex-col h-full hover:-translate-y-1.5 transition-all duration-500">
                {/* Decorative quote */}
                <div className="absolute top-4 right-4 text-blue-200/60">
                  <Quote
                    className="w-8 h-8"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </div>

                {/* Avatar + name + stars */}
                <div className="flex items-center gap-3 mb-4">
                  {t.userPhoto ? (
                    <Image
                      src={t.userPhoto}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-base font-black shadow-sm">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-black text-gray-900 leading-tight">
                      {t.name}
                    </p>
                    <div className="mt-1">
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-gray-500 text-sm leading-relaxed flex-grow border-t border-gray-100 pt-4">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .mask-fade-edges {
              mask-image: linear-gradient(to right, transparent, black 10%, black 80%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 80%, transparent);
            }
          `,
        }}
      />
    </section>
  );
}
