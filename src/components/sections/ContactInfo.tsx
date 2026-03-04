import { MapPin, Phone, Mail } from 'lucide-react';
import SmartMapLink from '@/components/ui/SmartMapLink';
import type { BusinessInfo } from '@/lib/types';

interface ContactInfoProps {
  business: BusinessInfo;
}

export default function ContactInfo({ business }: ContactInfoProps) {
  const address = business?.address;
  const fullAddress = address
    ? `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    : '';

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <MapPin size={22} className="text-primary" />
        <h3 className="font-display text-2xl text-text-main">Find Us</h3>
      </div>

      <div className="space-y-3 font-body">
        {/* Address card */}
        {address && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-alt border border-border/50">
            <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-text-main font-medium text-sm">{address.street}</p>
              <p className="text-text-muted text-sm">
                {address.city}, {address.state} {address.zip}
              </p>
              {fullAddress && <SmartMapLink address={fullAddress} />}
            </div>
          </div>
        )}

        {/* Phone card — tap to call */}
        {business?.phone && (
          <a
            href={`tel:${business.phone}`}
            className="flex items-center gap-3 p-4 rounded-xl bg-surface-alt border border-border/50
                       hover:border-primary/30 hover:bg-primary/5 transition-all group"
          >
            <Phone size={18} className="text-primary shrink-0" />
            <div>
              <span className="block text-text-main group-hover:text-primary transition-colors text-sm font-medium">
                {business.phone}
              </span>
              <span className="text-text-muted text-xs">Tap to call</span>
            </div>
          </a>
        )}

        {/* Email card */}
        {business?.email && (
          <a
            href={`mailto:${business.email}`}
            className="flex items-center gap-3 p-4 rounded-xl bg-surface-alt border border-border/50
                       hover:border-primary/30 hover:bg-primary/5 transition-all group"
          >
            <Mail size={18} className="text-primary shrink-0" />
            <span className="text-text-main group-hover:text-primary transition-colors text-sm font-medium break-all">
              {business.email}
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
