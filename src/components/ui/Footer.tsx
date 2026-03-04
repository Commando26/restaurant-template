import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import SmartMapLink from '@/components/ui/SmartMapLink';
import type { BusinessInfo } from '@/lib/types';

interface FooterProps {
  business: BusinessInfo;
}

// Inline SVG social icons (no extra deps)
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.83 1.55V6.8a4.85 4.85 0 0 1-1.06-.11z" />
    </svg>
  );
}
function YelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.111 18.226c-.141.977-2.137 3.296-3.063 3.523-.603.148-1.074-.195-2.669-2.196l-.803-1.027a1.856 1.856 0 0 1-.199-1.948c.211-.485.686-.815 1.296-.907.01-.001 1.282-.198 2.278-.351.978-.15 1.682-.248 1.682-.248.617-.075 1.157.175 1.418.662.261.487.235 1.077.06 2.492zm-9.95-1.004c-.133-.459-.476-.803-.929-.918-.057-.014-1.296-.353-2.276-.613-.98-.26-1.678-.442-1.678-.442-.59-.168-1.165.06-1.478.514-.267.389-.305.867-.199 1.779.148 1.247 1.044 3.791 1.851 4.313.557.362 1.108.103 2.943-1.471l.786-.68a1.865 1.865 0 0 0 .98-2.482zm8.547-6.617c-.275-.547-.833-.818-1.59-.759 0 0-.698.051-1.68.125-.984.073-2.26.169-2.278.171-.611.062-1.072.386-1.285.883-.215.497-.134 1.065.219 1.547l.78 1.036c1.573 2.052 2.052 2.555 2.658 2.555.061 0 .12-.006.183-.017.926-.205 2.952-2.491 3.108-3.466.1-.615-.055-1.528-.115-2.075zM10.88 11.3l.085-1.282c.064-.988.1-1.691.1-1.691.024-.618-.281-1.101-.803-1.306-.524-.206-1.099-.051-1.736.394 0 0-.616.419-1.352.912-.738.493-1.565 1.042-1.579 1.052-.49.354-.694.896-.542 1.461.154.565.629.979 1.333 1.108l1.284.235c2.028.371 2.658.373 3.006-.045.201-.24.247-.554.204-.838zm-.883-5.553c.428-.856.339-1.715-.188-2.134C9.238 3.147 8.47 2.986 7.136 3.2c-.96.154-2.82 1.144-3.046 1.951-.157.563.177 1.023 1.298 2.182l1.04 1.06c.307.318.726.461 1.145.39.418-.071.762-.346.95-.759.003-.005.474-1.02 1.474-2.277z"/>
    </svg>
  );
}
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Footer({ business }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const address = business?.address;
  const socials = business?.socialLinks;

  const socialLinks = [
    { key: 'facebook',       href: socials?.facebook,       Icon: FacebookIcon,  label: 'Facebook'  },
    { key: 'instagram',      href: socials?.instagram,      Icon: InstagramIcon, label: 'Instagram' },
    { key: 'tiktok',         href: socials?.tiktok,         Icon: TikTokIcon,    label: 'TikTok'    },
    { key: 'yelp',           href: socials?.yelp,           Icon: YelpIcon,      label: 'Yelp'      },
    { key: 'googleBusiness', href: socials?.googleBusiness, Icon: GoogleIcon,    label: 'Google'    },
  ].filter((s) => s.href);

  return (
    <footer className="bg-primary-dark text-white/85 pt-14 pb-8 px-4">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">

        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl text-white mb-3">
            {business?.name || 'Restaurant'}
          </h3>
          {business?.tagline && (
            <p className="text-white/60 text-sm leading-relaxed mb-5">{business.tagline}</p>
          )}
          {/* Social icons */}
          {socialLinks.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(({ key, href, Icon, label }) => (
                <a
                  key={key}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center
                             text-white/70 hover:text-white transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-body font-semibold text-white/50 mb-4 uppercase text-xs tracking-widest">
            Explore
          </h4>
          <div className="space-y-2.5">
            {[
              { href: '/',        label: 'Home'     },
              { href: '/menu',    label: 'Menu'     },
              { href: '/about',   label: 'About Us' },
              { href: '/contact', label: 'Contact'  },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white/65 hover:text-white transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body font-semibold text-white/50 mb-4 uppercase text-xs tracking-widest">
            Visit Us
          </h4>
          <div className="space-y-3 text-sm text-white/65">
            {address && (
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/40" />
                <div>
                  <span>
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}
                  </span>
                  <SmartMapLink
                    address={`${address.street}, ${address.city}, ${address.state} ${address.zip}`}
                    label="Get Directions"
                    className="inline-flex items-center gap-1 mt-1 text-white/50 hover:text-white transition-colors text-xs font-medium"
                  />
                </div>
              </div>
            )}
            {business?.phone && (
              <a href={`tel:${business.phone}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone size={16} className="text-white/40 shrink-0" />
                {business.phone}
              </a>
            )}
            {business?.email && (
              <a href={`mailto:${business.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors break-all">
                <Mail size={16} className="text-white/40 shrink-0 mt-0.5" />
                {business.email}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-white/10 text-center text-white/30 text-xs">
        &copy; {currentYear} {business?.name}. All rights reserved.
      </div>
    </footer>
  );
}
