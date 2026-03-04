import { client } from '@/sanity/lib/client';
import { businessInfoQuery, hoursQuery } from '@/lib/sanity.queries';
import HoursDisplay from '@/components/sections/HoursDisplay';
import ContactInfo from '@/components/sections/ContactInfo';
import { AlertCircle } from 'lucide-react';

export const revalidate = 60;
export const metadata = { title: 'Contact' };

export default async function ContactPage() {
  const [business, hours] = await Promise.all([
    client.fetch(businessInfoQuery),
    client.fetch(hoursQuery),
  ]);

  const address = business?.address;
  const mapQuery = address
    ? encodeURIComponent(`${address.street}, ${address.city}, ${address.state} ${address.zip}`)
    : '';

  return (
    <div className="bg-surface min-h-screen">
      {/* Page header */}
      <div className="bg-surface-alt border-b border-border py-12 px-4 text-center">
        <p className="font-body text-xs uppercase tracking-widest text-primary font-semibold mb-2">
          Get In Touch
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-text-main">Contact Us</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Info + hours */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <ContactInfo business={business} />
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <HoursDisplay hours={hours?.regularHours} />
          </div>
        </div>

        {/* Google Maps */}
        {mapQuery && (
          <div className="rounded-2xl overflow-hidden shadow-md border border-border mb-10">
            <iframe
              title="Restaurant Location"
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${mapQuery}`}
            />
          </div>
        )}

        {/* Special Closures */}
        {hours?.specialClosures && hours.specialClosures.length > 0 && (
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <AlertCircle size={20} className="text-primary" />
              <h3 className="font-display text-xl text-text-main">Upcoming Special Hours</h3>
            </div>
            <div className="divide-y divide-border">
              {hours.specialClosures.map((closure: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center font-body py-3 text-sm gap-4">
                  <div>
                    <span className="text-text-main font-semibold">{closure.reason}</span>
                    <span className="text-text-muted ml-2">
                      {new Date(closure.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className={`shrink-0 font-medium ${closure.isAllDay ? 'text-red-500' : 'text-text-muted'}`}>
                    {closure.isAllDay ? 'Closed' : `${closure.openTime} – ${closure.closeTime}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
