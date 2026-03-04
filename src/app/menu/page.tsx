import { client } from '@/sanity/lib/client';
import { fullMenuQuery, orderingLinksQuery } from '@/lib/sanity.queries';
import MenuSection from '@/components/sections/MenuSection';
import CategoryNav from '@/components/sections/CategoryNav';
import OrderingLinks from '@/components/sections/OrderingLinks';
import { UtensilsCrossed } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'Menu',
};

export default async function MenuPage() {
  const [categories, ordering] = await Promise.all([
    client.fetch(fullMenuQuery),
    client.fetch(orderingLinksQuery),
  ]);
  const hasMenu = categories && categories.length > 0;

  return (
    <div className="bg-surface min-h-screen">
      {/* Page header */}
      <div className="bg-surface-alt border-b border-border py-12 px-4 text-center">
        <p className="font-body text-xs uppercase tracking-widest text-primary font-semibold mb-2">
          What We Offer
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-text-main">Our Menu</h1>
      </div>

      {/* Online ordering links */}
      {ordering && <OrderingLinks ordering={ordering} />}

      {/* Sticky category pills */}
      {hasMenu && <CategoryNav categories={categories} />}

      <div className="max-w-5xl mx-auto px-4 py-12">
        {hasMenu ? (
          categories.map((category: any) => (
            <div
              key={category._id}
              id={category.slug?.current}
              className="mb-16 scroll-mt-28"
            >
              {/* Category heading */}
              <div className="mb-6">
                <h2 className="font-display text-2xl md:text-3xl text-primary mb-1">
                  {category.title}
                </h2>
                {category.description && (
                  <p className="text-text-muted text-sm">{category.description}</p>
                )}
              </div>

              <MenuSection items={category.items} layout="list" />
            </div>
          ))
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <UtensilsCrossed size={48} className="text-text-muted/30 mx-auto mb-4" />
            <h2 className="font-display text-2xl text-text-main mb-2">Menu Coming Soon</h2>
            <p className="text-text-muted">
              We're putting it together — call us for today's offerings!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
