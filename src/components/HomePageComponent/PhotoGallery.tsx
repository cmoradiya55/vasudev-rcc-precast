"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ImagePreviewModal from "../ImagePreviewModal/ImagePreviewModal";
import allImages from "@/src/data/galleryData.json";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryCard, ImageData } from "./GalleryCard";

const PhotoGallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeImages, setActiveImages] = useState<ImageData[]>([]);
  const [showAllWall, setShowAllWall] = useState(false);
  const [showAllBricks, setShowAllBricks] = useState(false);

  const wallImages = (allImages as ImageData[]).filter(
    (img) => img.category === "wall",
  );
  const bricksImages = (allImages as ImageData[]).filter(
    (img) => img.category === "bricks",
  );
  const wallExtra = wallImages.slice(8);
  const bricksExtra = bricksImages.slice(8);

  const open = (images: ImageData[], index: number) => {
    setActiveImages(images);
    setActiveIndex(index);
  };

  return (
    <section id="gallery" className="w-full text-left">
      <div className="container mx-auto px-6 space-y-10">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-2">
            Our Portfolio
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-none">
            Photo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Gallery
            </span>
          </h2>
        </motion.div>

        {/* WALL SECTION */}
        <div>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-7"
          >
            <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-blue-600 to-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-0.5">
                Category
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                Compound Wall
              </h3>
            </div>
            <span className="ml-auto text-xs font-semibold text-blue-500 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
              {wallImages.length} photos
            </span>
          </motion.div>

          {/* Desktop: spotlight for first 8 */}
          <div
            className="hidden md:grid grid-cols-12 grid-rows-4 gap-3"
            style={{ height: "600px" }}
          >
            {wallImages[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="col-span-7 row-span-3"
              >
                <GalleryCard
                  img={wallImages[0]}
                  onClick={() => open(wallImages, 0)}
                  className="h-full"
                  sizes="58vw"
                  large
                />
              </motion.div>
            )}
            {wallImages.slice(1, 4).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="col-span-5 row-span-1"
              >
                <GalleryCard
                  img={img}
                  onClick={() => open(wallImages, i + 1)}
                  className="h-full"
                  sizes="40vw"
                />
              </motion.div>
            ))}
            {wallImages.slice(4, 8).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="col-span-3 row-span-1"
              >
                <GalleryCard
                  img={img}
                  onClick={() => open(wallImages, i + 4)}
                  className="h-full"
                  sizes="25vw"
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile: 3-col grid (first image full-width, others 3-col) */}
          <div className="grid grid-cols-3 gap-2 md:hidden">
            {wallImages
              .slice(0, showAllWall ? wallImages.length : 7)
              .map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={i === 0 ? "col-span-3" : "col-span-1"}
                >
                  <GalleryCard
                    img={img}
                    onClick={() => open(wallImages, i)}
                    className={
                      i === 0 ? "aspect-[2/3] h-full" : "aspect-[3/4] h-full"
                    }
                    sizes={i === 0 ? "100vw" : "33vw"}
                    large={i === 0}
                  />
                </motion.div>
              ))}
          </div>

          {/* Expanded: remaining wall images (desktop 4-col, hidden on mobile) */}
          <AnimatePresence>
            {showAllWall && wallExtra.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="hidden md:grid grid-cols-4 gap-3 mt-3">
                  {wallExtra.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <GalleryCard
                        img={img}
                        onClick={() => open(wallImages, i + 8)}
                        className="aspect-[4/3]"
                        sizes="25vw"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View All toggle */}
          <div className="flex justify-center mt-7">
            <button
              onClick={() => setShowAllWall((v) => !v)}
              className="flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full border-2 border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all duration-200"
            >
              {showAllWall ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> View All{" "}
                  {wallImages.length} Photos
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
            Also in our portfolio
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* BRICKS SECTION */}
        <div>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-7"
          >
            <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-0.5">
                Category
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                Bricks
              </h3>
            </div>
            <span className="ml-auto text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
              {bricksImages.length} photos
            </span>
          </motion.div>

          {/* Desktop: spotlight layout (same as wall) */}
          <div
            className="hidden md:grid grid-cols-12 grid-rows-4 gap-3"
            style={{ height: "600px" }}
          >
            {bricksImages[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="col-span-7 row-span-3"
              >
                <GalleryCard
                  img={bricksImages[0]}
                  onClick={() => open(bricksImages, 0)}
                  className="h-full"
                  sizes="58vw"
                  large
                />
              </motion.div>
            )}
            {bricksImages.slice(1, 4).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="col-span-5 row-span-1"
              >
                <GalleryCard
                  img={img}
                  onClick={() => open(bricksImages, i + 1)}
                  className="h-full"
                  sizes="40vw"
                />
              </motion.div>
            ))}
            {bricksImages.slice(4, 8).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="col-span-3 row-span-1"
              >
                <GalleryCard
                  img={img}
                  onClick={() => open(bricksImages, i + 4)}
                  className="h-full"
                  sizes="25vw"
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile: 3-col grid (first image full-width, others 3-col) */}
          <div className="grid grid-cols-3 gap-2 md:hidden">
            {bricksImages
              .slice(0, showAllBricks ? bricksImages.length : 7)
              .map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={i === 0 ? "col-span-3" : "col-span-1"}
                >
                  <GalleryCard
                    img={img}
                    onClick={() => open(bricksImages, i)}
                    className={
                      i === 0 ? "aspect-[2/3] h-full" : "aspect-[3/4] h-full"
                    }
                    sizes={i === 0 ? "100vw" : "33vw"}
                    large={i === 0}
                  />
                </motion.div>
              ))}
          </div>

          {/* Expanded: remaining bricks images (desktop 4-col, hidden on mobile) */}
          <AnimatePresence>
            {showAllBricks && bricksExtra.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="hidden md:grid grid-cols-4 gap-3 mt-3">
                  {bricksExtra.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <GalleryCard
                        img={img}
                        onClick={() => open(bricksImages, i + 8)}
                        className="aspect-[4/3]"
                        sizes="25vw"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View All toggle */}
          <div className="flex justify-center mt-7">
            <button
              onClick={() => setShowAllBricks((v) => !v)}
              className="flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full border-2 border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all duration-200"
            >
              {showAllBricks ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> View All{" "}
                  {bricksImages.length} Photos
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <ImagePreviewModal
        images={activeImages}
        currentIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
};

export default PhotoGallery;
