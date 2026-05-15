import Image from "next/image";
import { Eye, MoveUpRight } from "lucide-react";

export type Category = "wall" | "bricks";

export interface ImageData {
  src: string;
  title: string;
  category: Category;
}

interface CardProps {
  img: ImageData;
  onClick: () => void;
  className?: string;
  sizes?: string;
  large?: boolean;
}

export const GalleryCard = ({
  img,
  onClick,
  className = "",
  sizes = "25vw",
  large,
}: CardProps) => (
  <div
    onClick={onClick}
    className={`group relative overflow-hidden rounded-lg sm:rounded-2xl cursor-pointer bg-gray-200 ${className}`}
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
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          className={`text-white font-bold leading-tight ${large ? "text-lg sm:text-xl" : "text-xs sm:text-sm"}`}
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
