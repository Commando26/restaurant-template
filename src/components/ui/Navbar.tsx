'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { urlFor } from '@/sanity/lib/client';
import type { SanityImage } from '@/lib/types';

interface NavbarProps {
  restaurantName: string;
  logo?: SanityImage;
  phone?: string;
}

export default function Navbar({ restaurantName, logo, phone }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const logoUrl = logo ? urlFor(logo).height(80).quality(90).url() : null;

  const links = [
    { href: '/',        label: 'Home'    },
    { href: '/menu',    label: 'Menu'    },
    { href: '/about',   label: 'About'   },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface shadow-md border-b border-border'
          : 'bg-surface/95 backdrop-blur-sm border-b border-border/50'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo / Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={restaurantName}
              width={36}
              height={36}
              className="rounded-md object-contain"
            />
          )}
          <span className="font-display text-xl md:text-2xl text-primary font-bold leading-none">
            {restaurantName || 'Restaurant'}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium transition-colors relative py-1 group ${
                  active ? 'text-primary' : 'text-text-muted hover:text-text-main'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-200 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-full
                         hover:bg-primary-dark transition-all duration-200 font-body text-sm font-semibold
                         shadow-sm hover:shadow-md active:scale-95"
            >
              <Phone size={14} />
              {phone}
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-surface-alt transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden animate-slide-down border-t border-border bg-surface px-4 py-3 space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block font-body text-base py-2.5 px-3 rounded-lg transition-colors ${
                  active
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-text-main hover:text-primary hover:bg-surface-alt'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 mt-2 px-4 py-2.5 bg-primary text-white rounded-full
                         font-body text-sm font-semibold w-full justify-center"
            >
              <Phone size={15} />
              {phone}
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
