"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageData } from "../HomePageComponent/GalleryCard";

interface ImagePreviewModalProps {
  images: ImageData[];
  currentIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function ImagePreviewModal({
  images,
  currentIndex,
  onClose,
  onIndexChange,
}: ImagePreviewModalProps) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const isOpen = currentIndex !== null;
  const currentImage = currentIndex !== null ? images[currentIndex] : null;

  // Reset state when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  const handleNext = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      if (currentIndex !== null) {
        setDirection(1);
        onIndexChange((currentIndex + 1) % images.length);
      }
    },
    [currentIndex, images.length, onIndexChange],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      if (currentIndex !== null) {
        setDirection(-1);
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      }
    },
    [currentIndex, images.length, onIndexChange],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Handle document scrolling lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setDragStart({ x: clientX - position.x, y: clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging && scale > 1) {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Top Controls Toolbar */}
      <div
        className="absolute top-4 right-4 z-[110] flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-white/20 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleZoomOut}
          className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="w-px h-6 bg-white/20 mx-0.5 sm:mx-1 hidden sm:block"></div>
        <span className="text-white/80 text-[10px] sm:text-sm font-bold min-w-[2.5rem] sm:min-w-[3rem] text-center hidden sm:block">
          {Math.round(scale * 100)}%
        </span>
        <div className="w-px h-6 bg-white/20 mx-0.5 sm:mx-1 hidden sm:block"></div>
        <button
          onClick={handleZoomIn}
          className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors ml-0.5 sm:ml-1"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="w-px h-6 bg-white/20 mx-1 sm:mx-2"></div>
        <button
          onClick={onClose}
          className="p-1.5 sm:p-2 bg-red-500/20 text-red-100 hover:bg-red-500 hover:text-white rounded-xl transition-colors"
          title="Close Modal"
        >
          <X strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-xs font-bold tracking-widest uppercase">
        {(currentIndex || 0) + 1} / {images.length}
      </div>

      {/* Navigation Arrows (Desktop) */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] hidden md:flex p-2 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] hidden md:flex p-2 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Slider Area */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag={scale === 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, info) => {
              const swipe = info.offset.x;
              const velocity = info.velocity.x;

              if (swipe < -50 || velocity < -500) {
                handleNext();
              } else if (swipe > 50 || velocity > 500) {
                handlePrev();
              }
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            className={`relative w-full h-full flex items-center justify-center touch-none ${
              scale > 1
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-default"
            }`}
            onWheel={(e) => {
              if (e.deltaY < 0) setScale((prev) => Math.min(prev + 0.1, 5));
              else setScale((prev) => Math.max(prev - 0.1, 0.5));
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.15s ease-out",
              }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.title}
                fill
                className="object-contain pointer-events-none select-none"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
