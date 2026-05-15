"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Eye, MoveUpRight } from "lucide-react";
import ImagePreviewModal from "../ImagePreviewModal/ImagePreviewModal";
import images from "@/src/data/galleryData.json";
import { motion } from "framer-motion";

interface CardProps {
  img: { src: string; title: string };
  onClick: () => void;
  className?: string;
  sizes?: string;
  large?: boolean;
}

const Card = ({
  img,
  onClick,
  className = "",
  sizes = "25vw",
  large,
}: CardProps) => (
  <div
    onClick={onClick}
    className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-300 ${className}`}
  >
    <Image
      src={img.src}
      alt={img.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
      sizes={sizes}
      quality={80}
      loading="lazy"
    />

    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Info */}
    <div
      className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ${
        large ? "p-5 sm:p-6" : "p-3"
      }`}
    >
      <div>
        {large && (
          <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">
            Featured
          </p>
        )}
        <p
          className={`text-white font-bold leading-tight ${
            large ? "text-lg sm:text-xl" : "text-xs sm:text-sm"
          }`}
        >
          {img.title}
        </p>
      </div>
      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center">
        {large ? (
          <MoveUpRight className="w-4 h-4 text-white" />
        ) : (
          <Eye className="w-3.5 h-3.5 text-white" />
        )}
      </div>
    </div>
  </div>
);

const PhotoGallery = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="gallery" className="w-full text-left">
      <div className="container mx-auto px-6">
        {/*  Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8 gap-4"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-2">
              Our Portfolio
            </p>
            <h2 className="text-4xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Photo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Gallery
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Desktop: Spotlight layout */}
        <div
          className="hidden md:grid grid-cols-12 grid-rows-4 gap-3"
          style={{ height: "600px" }}
        >
          {/* img 1 — large spotlight (7 cols × 3 rows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="col-span-7 row-span-3"
          >
            <Card
              img={images[0]}
              onClick={() => setSelected(images[0].src)}
              className="h-full"
              sizes="58vw"
              large
            />
          </motion.div>

          {/* img 2, 3, 4 — right stack (5 cols × 1 row each) */}
          {images.slice(1, 4).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="col-span-5 row-span-1"
            >
              <Card
                img={img}
                onClick={() => setSelected(img.src)}
                className="h-full"
                sizes="40vw"
              />
            </motion.div>
          ))}

          {/* img 5–8 — bottom strip (3 cols × 1 row each) */}
          {images.slice(4, 8).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="col-span-3 row-span-1"
            >
              <Card
                img={img}
                onClick={() => setSelected(img.src)}
                className="h-full"
                sizes="25vw"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: 2-col grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card
                img={img}
                onClick={() => setSelected(img.src)}
                className="aspect-[3/4]"
                sizes="50vw"
                large={i === 0}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <ImagePreviewModal
        selectedImage={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

export default PhotoGallery;
