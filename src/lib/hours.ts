import type { DayHours } from './types';

const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export function getTodayDay(): string {
  return DAY_ORDER[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
}

export function formatTime(t?: string): string {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
}

export function isCurrentlyOpen(h?: DayHours): boolean {
  if (!h || h.isClosed || !h.openTime || !h.closeTime) return false;
  const now = new Date();
  const [oH, oM] = h.openTime.split(':').map(Number);
  const [cH, cM] = h.closeTime.split(':').map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= oH * 60 + oM && mins < cH * 60 + cM;
}

/** Returns a human-readable status string, e.g. "Open until 9 PM" or "Opens at 11 AM" */
export function getHeroHoursStatus(hours?: DayHours[]): string | null {
  if (!hours || hours.length === 0) return null;
  const today = getTodayDay();
  const todayHours = hours.find((h) => h.day === today);
  if (!todayHours || todayHours.isClosed) return 'Closed today';
  if (isCurrentlyOpen(todayHours)) {
    return `Open until ${formatTime(todayHours.closeTime)}`;
  }
  // Check if we're before open time
  if (todayHours.openTime) {
    const now = new Date();
    const [oH, oM] = todayHours.openTime.split(':').map(Number);
    const mins = now.getHours() * 60 + now.getMinutes();
    if (mins < oH * 60 + oM) {
      return `Opens at ${formatTime(todayHours.openTime)}`;
    }
  }
  return 'Closed for the day';
}

export { DAY_ORDER };
