import type { OrderingLinks as OrderingLinksType } from '@/lib/types';

interface Props {
  ordering: OrderingLinksType;
}

// Platform configs: name, brand color classes, SVG logo path
const platforms = [
  {
    key: 'doordash' as const,
    name: 'DoorDash',
    bg: 'bg-[#FF3008]',
    hover: 'hover:bg-[#e02a07]',
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V5zm0 3a4 4 0 0 1 4 4h-2a2 2 0 0 0-2-2V8zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-7 1a7 7 0 0 1 7-7v2a5 5 0 0 0-5 5H5z" />
      </svg>
    ),
  },
  {
    key: 'ubereats' as const,
    name: 'Uber Eats',
    bg: 'bg-black',
    hover: 'hover:bg-neutral-800',
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
  },
  {
    key: 'grubhub' as const,
    name: 'Grubhub',
    bg: 'bg-[#F63440]',
    hover: 'hover:bg-[#d92c37]',
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm.5 5h2v2h-2V7zm-3 0h2v2H9.5V7zm3 3h2l-1 7h-2l-1-7h2z" />
      </svg>
    ),
  },
  {
    key: 'toastTab' as const,
    name: 'Order Online',
    bg: 'bg-primary',
    hover: 'hover:bg-primary-dark',
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5.8 6l.9 2H19l-2.5 9H8L5.8 6H3V4h4l.8 2z" />
      </svg>
    ),
  },
];

export default function OrderingLinks({ ordering }: Props) {
  const activeLinks = platforms.filter((p) => ordering[p.key]);
  if (activeLinks.length === 0) return null;

  return (
    <section className="py-10 px-4 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-body text-xs uppercase tracking-widest text-primary font-semibold mb-1">
          Skip the wait
        </p>
        <h2 className="font-display text-2xl md:text-3xl text-text-main mb-6">
          Order Online
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {activeLinks.map((platform) => (
            <a
              key={platform.key}
              href={ordering[platform.key]!}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-white font-body
                          font-semibold text-sm shadow-sm transition-all duration-200
                          hover:shadow-md hover:scale-105 active:scale-95
                          ${platform.bg} ${platform.hover}`}
            >
              {platform.logo}
              {platform.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
