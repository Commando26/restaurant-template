'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const current = images[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-fade-in"
      onClick={onClose}
    >
      {/* Image container — stop propagation so clicking image doesn't close */}
      <div
        className="relative max-w-5xl w-full mx-4 max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[85vh] aspect-auto flex items-center justify-center">
          <Image
            src={current.src}
            alt={current.alt}
            width={1200}
            height={900}
            className="object-contain max-h-[85vh] w-auto rounded-lg shadow-2xl"
            priority
          />
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body">
          {index + 1} / {images.length}
        </div>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20
                   text-white transition-colors"
      >
        <X size={22} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10
                     hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10
                     hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}
