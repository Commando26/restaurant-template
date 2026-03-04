'use client';

import { Clock } from 'lucide-react';
import { getHeroHoursStatus } from '@/lib/hours';
import type { DayHours } from '@/lib/types';

interface Props {
  hours: DayHours[];
}

export default function HeroHoursBadge({ hours }: Props) {
  const status = getHeroHoursStatus(hours);
  if (!status) return null;

  const isOpen = status.startsWith('Open');
  const isClosed = status === 'Closed today' || status === 'Closed for the day';

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-body font-semibold
                  backdrop-blur-sm shadow-sm mb-6
                  ${isOpen
                    ? 'bg-green-500/20 text-green-100 border border-green-400/30'
                    : isClosed
                    ? 'bg-black/25 text-white/70 border border-white/15'
                    : 'bg-amber-500/20 text-amber-100 border border-amber-400/30'
                  }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          isOpen ? 'bg-green-400' : isClosed ? 'bg-white/40' : 'bg-amber-400'
        }`}
      />
      <Clock size={13} className="shrink-0" />
      {status}
    </div>
  );
}
