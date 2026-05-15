"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImagePreviewModalProps {
  selectedImage: string | null;
  onClose: () => void;
}

export default function ImagePreviewModal({
  selectedImage,
  onClose,
}: ImagePreviewModalProps) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset state when image changes
  useEffect(() => {
    if (selectedImage) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [selectedImage]);

  // Handle document scrolling lock when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  if (!selectedImage) return null;

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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      {/* Top Controls Toolbar */}
      <div
        className="absolute top-4 right-4 z-[110] flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleZoomOut}
          className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-white/20 mx-1 hidden sm:block"></div>
        <span className="text-white/80 text-sm font-bold min-w-[3rem] text-center hidden sm:block">
          {Math.round(scale * 100)}%
        </span>
        <div className="w-px h-6 bg-white/20 mx-1 hidden sm:block"></div>
        <button
          onClick={handleZoomIn}
          className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors ml-1"
          title="Reset View"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-white/20 mx-2"></div>
        <button
          onClick={onClose}
          className="p-2 bg-red-500/20 text-red-100 hover:bg-red-500 hover:text-white rounded-xl transition-colors"
          title="Close Modal"
        >
          <X strokeWidth={2.5} className="w-5 h-5" />
        </button>
      </div>

      {/* Workspace Area: Supports panning and wheel zooming */}
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${
          scale > 1
            ? isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-default"
        }`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onWheel={(e) => {
          if (e.deltaY < 0) {
            setScale((prev) => Math.min(prev + 0.1, 5));
          } else {
            setScale((prev) => Math.max(prev - 0.1, 0.5));
          }
        }}
      >
        <div
          className="relative w-full h-full max-w-6xl"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
        >
          <Image
            src={selectedImage}
            alt="Expanded Preview"
            fill
            className="object-contain pointer-events-none select-none"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
