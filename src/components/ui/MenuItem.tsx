import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { Star } from 'lucide-react';

const tagColors: Record<string, string> = {
  vegetarian:   'bg-green-100 text-green-700',
  vegan:        'bg-emerald-100 text-emerald-700',
  'gluten-free':'bg-yellow-100 text-yellow-700',
  'dairy-free': 'bg-sky-100 text-sky-700',
  'nut-free':   'bg-orange-100 text-orange-700',
  spicy:        'bg-red-100 text-red-600',
  halal:        'bg-teal-100 text-teal-700',
  kosher:       'bg-purple-100 text-purple-700',
};

const tagLabel: Record<string, string> = {
  vegetarian:   'Vegetarian',
  vegan:        'Vegan',
  'gluten-free':'Gluten-Free',
  'dairy-free': 'Dairy-Free',
  'nut-free':   'Nut-Free',
  spicy:        'Spicy',
  halal:        'Halal',
  kosher:       'Kosher',
};

interface MenuItemProps {
  item: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    image?: any;
    dietaryTags?: string[];
    featured?: boolean;
    isNew?: boolean;
    isSeasonal?: boolean;
    categoryName?: string;
  };
  variant: 'card' | 'list';
}

export default function MenuItem({ item, variant }: MenuItemProps) {
  const imageUrl = item.image
    ? urlFor(item.image).width(500).height(375).quality(82).url()
    : null;

  // ── Card layout (homepage featured grid) ──────────────────────────────────
  if (variant === 'card') {
    return (
      <div className="bg-surface rounded-2xl overflow-hidden shadow-sm card-hover border border-border/60 flex flex-col">
        {/* Image or placeholder */}
        <div className="relative h-52 bg-surface-alt shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.image?.alt || item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl opacity-30 select-none">
              🍽️
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {item.featured && (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-primary text-white
                              text-xs font-semibold font-body rounded-full shadow-md">
                <Star size={11} fill="currentColor" />
                Chef's Pick
              </div>
            )}
            {item.isNew && (
              <div className="px-2.5 py-1 bg-blue-500 text-white text-xs font-semibold font-body rounded-full shadow-md">
                New
              </div>
            )}
            {item.isSeasonal && (
              <div className="px-2.5 py-1 bg-amber-500 text-white text-xs font-semibold font-body rounded-full shadow-md">
                Seasonal
              </div>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h3 className="font-display text-lg text-text-main leading-snug">{item.name}</h3>
            <span className="font-body font-bold text-primary whitespace-nowrap text-base">
              ${item.price.toFixed(2)}
            </span>
          </div>

          {item.description && (
            <p className="text-text-muted text-sm mb-3 line-clamp-2 leading-relaxed flex-1">
              {item.description}
            </p>
          )}

          {item.dietaryTags && item.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {item.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium font-body ${
                    tagColors[tag] || 'bg-surface-alt text-text-muted'
                  }`}
                >
                  {tagLabel[tag] || tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── List layout (full menu page) ──────────────────────────────────────────
  return (
    <div className="flex gap-4 items-start py-4 border-b border-border/50 last:border-0 group">
      {/* Thumbnail */}
      {imageUrl && (
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 bg-surface-alt">
          <Image
            src={imageUrl}
            alt={item.image?.alt || item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="96px"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        {/* Name + price row */}
        <div className="flex justify-between items-baseline gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-display text-lg text-text-main leading-snug truncate">{item.name}</h3>
            {item.featured && (
              <span className="shrink-0 inline-flex items-center gap-0.5 text-primary text-xs font-semibold font-body">
                <Star size={10} fill="currentColor" />
                Popular
              </span>
            )}
            {item.isNew && (
              <span className="shrink-0 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold font-body rounded-full">
                New
              </span>
            )}
            {item.isSeasonal && (
              <span className="shrink-0 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold font-body rounded-full">
                Seasonal
              </span>
            )}
          </div>
          <div className="border-b border-dotted border-text-muted/25 flex-1 mx-3 mb-1 min-w-4" />
          <span className="font-body font-bold text-primary whitespace-nowrap text-base shrink-0">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {item.description && (
          <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
        )}

        {item.dietaryTags && item.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.dietaryTags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full font-medium font-body ${
                  tagColors[tag] || 'bg-surface-alt text-text-muted'
                }`}
              >
                {tagLabel[tag] || tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
