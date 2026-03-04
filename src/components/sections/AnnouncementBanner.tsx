'use client';

import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface AnnouncementBannerProps {
  announcement: {
    message: string;
    backgroundColor?: string;
    link?: string;
  };
}

const colorMap: Record<string, { bar: string; btn: string }> = {
  red:    { bar: 'bg-red-600 text-white',          btn: 'hover:bg-red-700'    },
  yellow: { bar: 'bg-amber-400 text-amber-950',    btn: 'hover:bg-amber-500'  },
  green:  { bar: 'bg-green-600 text-white',         btn: 'hover:bg-green-700' },
  blue:   { bar: 'bg-blue-600 text-white',          btn: 'hover:bg-blue-700'  },
};

export default function AnnouncementBanner({ announcement }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const colors = colorMap[announcement.backgroundColor || 'blue'] ?? colorMap.blue;

  const inner = (
    <span className="font-body text-sm md:text-base font-medium flex items-center gap-2 justify-center">
      {announcement.message}
      {announcement.link && <ExternalLink size={14} className="shrink-0 opacity-75" />}
    </span>
  );

  return (
    <div className={`${colors.bar} py-2.5 px-4 flex items-center justify-between gap-4 animate-fade-in`}>
      <div className="flex-1 text-center">
        {announcement.link ? (
          <a
            href={announcement.link}
            target="_blank"
            rel="noopener"
            className="hover:underline underline-offset-2"
          >
            {inner}
          </a>
        ) : (
          inner
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className={`shrink-0 p-1 rounded-full opacity-70 hover:opacity-100 transition-opacity ${colors.btn}`}
      >
        <X size={16} />
      </button>
    </div>
  );
}
