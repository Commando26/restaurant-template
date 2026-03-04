'use client';

import { useEffect, useRef, useState } from 'react';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const [active, setActive] = useState<string>(categories[0]?.slug?.current ?? '');
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: detect which category section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categories.forEach((cat) => {
      const el = document.getElementById(cat.slug?.current);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(cat.slug.current);
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  // Scroll the active tab button into view in the nav
  useEffect(() => {
    const btn = navRef.current?.querySelector(`[data-slug="${active}"]`) as HTMLElement | null;
    btn?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  if (categories.length < 2) return null;

  return (
    <div className="sticky top-[57px] z-40 bg-surface border-b border-border shadow-sm">
      <div
        ref={navRef}
        className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar py-2"
      >
        {categories.map((cat) => {
          const slug = cat.slug?.current;
          const isActive = active === slug;
          return (
            <a
              key={cat._id}
              href={`#${slug}`}
              data-slug={slug}
              onClick={() => setActive(slug)}
              className={`shrink-0 px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text-main hover:bg-surface-alt'
              }`}
            >
              {cat.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}
