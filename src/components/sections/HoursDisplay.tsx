'use client';

import { Clock } from 'lucide-react';
import type { DayHours } from '@/lib/types';
import { getTodayDay, isCurrentlyOpen, formatTime, DAY_ORDER } from '@/lib/hours';

interface HoursDisplayProps {
  hours?: DayHours[];
}

const dayShort: Record<string, string> = {
  monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed',
  thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun',
};

export default function HoursDisplay({ hours }: HoursDisplayProps) {
  if (!hours || hours.length === 0) return null;

  const today = getTodayDay();
  const sorted = [...hours].sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));
  const todayHours = sorted.find((h) => h.day === today);
  const openNow = isCurrentlyOpen(todayHours);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock size={22} className="text-primary" />
          <h3 className="font-display text-2xl text-text-main">Hours</h3>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold font-body px-3 py-1 rounded-full ${
            openNow ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${openNow ? 'bg-green-500' : 'bg-red-500'}`} />
          {openNow ? 'Open Now' : 'Closed'}
        </span>
      </div>

      {/* Hours table */}
      <div className="space-y-1">
        {sorted.map((dayHours) => {
          const isToday = dayHours.day === today;
          return (
            <div
              key={dayHours.day}
              className={`flex justify-between items-center py-2 px-3 rounded-lg font-body text-sm transition-colors ${
                isToday
                  ? 'bg-primary/10 ring-1 ring-primary/20 font-semibold'
                  : 'hover:bg-surface-alt'
              }`}
            >
              <span className="flex items-center gap-2 text-text-main capitalize">
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                )}
                <span className="hidden sm:inline">{dayHours.day}</span>
                <span className="sm:hidden">{dayShort[dayHours.day]}</span>
              </span>
              <span className={dayHours.isClosed ? 'text-red-500 font-medium' : 'text-text-muted'}>
                {dayHours.isClosed
                  ? 'Closed'
                  : `${formatTime(dayHours.openTime)} – ${formatTime(dayHours.closeTime)}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
