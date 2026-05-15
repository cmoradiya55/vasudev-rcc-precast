"use client";

import { CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "5+", label: "Districts Served" },
  { value: "100%", label: "Quality Assured" },
];

const features = [
  "RCC Precast & Prestressed Walls",
  "Folding & Readymade Compound Walls",
  "Hotel, Resort & Farmhouse Fencing",
  "Industrial Shade & Boundary Walls",
];

const areas = ["Surat", "Navsari", "Ankleshwar", "Bardoli", "Valsad"];

const viewport = { once: true, margin: "-80px" };

export default function AboutUs() {
  return (
    <section className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Heading + Stats + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            {/* Heading */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-3">
                About Us
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                Building
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Stronger
                </span>
                <br />
                Foundations
              </h2>
              <p className="mt-4 text-base font-bold text-gray-400">
                Surat&apos;s Premier Precast Industries
              </p>
            </div>

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 transition-all duration-300"
                >
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 leading-none">
                    {value}
                  </p>
                  <p className="text-[11px] font-bold text-gray-500 mt-2 uppercase tracking-wider">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Get a Free Quote →
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Description + Features + Areas */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-8 lg:pt-14"
          >
            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-600 font-medium leading-relaxed">
                At{" "}
                <strong className="text-gray-900 font-bold">
                  Surat Precast Industries
                </strong>
                , we specialize in manufacturing high-grade RCC Precast and
                Prestressed Walls — offering durable and cost-effective
                solutions for residential, commercial, and industrial
                applications.
              </p>
              <p className="text-gray-500 leading-relaxed text-sm">
                Our walls are designed for quick installation, ensuring strength
                and longevity. Whether you need hotel fencing, resort boundary
                walls, farmhouse fencing, or industrial shade walls, we deliver
                quality precast solutions tailored to your exact needs.
              </p>
            </div>

            {/* Feature checklist */}
            <div className="space-y-3">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{f}</p>
                </motion.div>
              ))}
            </div>

            {/* Service areas */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3 h-3 text-gray-400" strokeWidth={2} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Service Areas
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {areas.map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                    className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
