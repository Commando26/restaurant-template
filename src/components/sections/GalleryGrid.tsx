'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => open(idx)}
            className="relative aspect-square rounded-xl overflow-hidden shadow-sm card-hover
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Open ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
