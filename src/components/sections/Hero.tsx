import { urlFor } from '@/sanity/lib/client';
import { Phone, ChevronDown } from 'lucide-react';
import HeroHoursBadge from '@/components/ui/HeroHoursBadge';
import type { DayHours } from '@/lib/types';

interface HeroProps {
  name: string;
  tagline?: string;
  heroImage?: any;
  phone?: string;
  hours?: DayHours[];
}

export default function Hero({ name, tagline, heroImage, phone, hours }: HeroProps) {
  const bgUrl = heroImage ? urlFor(heroImage).width(1920).quality(85).url() : null;

  return (
    <section
      className="relative min-h-[82vh] flex items-center justify-center text-center px-4 overflow-hidden"
      style={
        bgUrl
          ? {
              backgroundImage: `url(${bgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {
              background:
                'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-accent) 100%)',
            }
      }
    >
      {/* Dark gradient overlay for photo backgrounds */}
      {bgUrl && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      )}

      {/* Subtle dot-pattern overlay for gradient (no-photo) backgrounds */}
      {!bgUrl && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto animate-fade-in-up">
        {hours && hours.length > 0 && <HeroHoursBadge hours={hours} />}

        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-5 leading-tight tracking-tight"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
        >
          {name || 'Welcome'}
        </h1>

        {tagline && (
          <p
            className="font-body text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-lg mx-auto font-light leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
          >
            {tagline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/menu"
            className="px-9 py-3.5 bg-white text-primary font-body font-semibold rounded-full
                       hover:bg-opacity-90 transition-all duration-200 hover:scale-105 active:scale-95
                       shadow-lg text-base"
          >
            View Menu
          </a>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 px-9 py-3.5
                         border-2 border-white text-white font-body font-semibold rounded-full
                         hover:bg-white/15 transition-all duration-200 hover:scale-105 active:scale-95
                         text-base"
            >
              <Phone size={17} />
              Call Us
            </a>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce-slow pointer-events-none"
        aria-hidden="true"
      >
        <ChevronDown size={30} strokeWidth={1.5} />
      </div>
    </section>
  );
}
