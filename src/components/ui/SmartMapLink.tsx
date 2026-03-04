'use client';

import { useEffect, useState } from 'react';
import { Navigation } from 'lucide-react';

interface SmartMapLinkProps {
  address: string;
  label?: string;
  className?: string;
}

export default function SmartMapLink({
  address,
  label = 'Get Directions',
  className,
}: SmartMapLinkProps) {
  const [href, setHref] = useState(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  );

  useEffect(() => {
    // Detect iOS — opens Apple Maps natively
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      setHref(`maps://maps.apple.com/?q=${encodeURIComponent(address)}`);
    }
  }, [address]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        'inline-flex items-center gap-1.5 mt-2 text-primary hover:text-primary-dark transition-colors text-sm font-semibold'
      }
    >
      <Navigation size={13} />
      {label}
    </a>
  );
}
