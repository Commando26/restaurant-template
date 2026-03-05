import { sanityFetch } from '@/sanity/lib/client';
import { aboutQuery } from '@/lib/sanity.queries';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import GalleryGrid from '@/components/sections/GalleryGrid';

export const revalidate = 60;
export const metadata = { title: 'About Us' };

export default async function AboutPage() {
  const about = await sanityFetch(aboutQuery) as any;

  return (
    <div className="bg-surface min-h-screen">
      {/* Page header */}
      <div className="bg-surface-alt border-b border-border py-12 px-4 text-center">
        <p className="font-body text-xs uppercase tracking-widest text-primary font-semibold mb-2">
          Our Story
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-text-main">
          {about?.headline || 'About Us'}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* Story + team photo */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Rich text story */}
          <div className="rich-text font-body text-base leading-relaxed">
            {about?.story ? (
              <PortableText value={about.story} />
            ) : (
              <p className="text-text-muted italic">Our story is coming soon — check back!</p>
            )}
          </div>

          {/* Team photo */}
          {about?.teamPhoto && (
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={urlFor(about.teamPhoto).width(700).quality(82).url()}
                alt={about.teamPhoto.alt || 'Our team'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {about.teamPhoto.caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white
                              text-sm py-2.5 px-4 font-body">
                  {about.teamPhoto.caption}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Gallery */}
        {about?.gallery && about.gallery.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-8">
              <p className="font-body text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                Take a Look
              </p>
              <h2 className="font-display text-3xl text-text-main">Gallery</h2>
            </div>

            <GalleryGrid
              images={about.gallery.map((photo: any, idx: number) => ({
                src: urlFor(photo).width(800).height(800).quality(85).url(),
                alt: photo.alt || `Gallery photo ${idx + 1}`,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
