import { sanityFetch } from '@/sanity/lib/client';
import { homepageQuery } from '@/lib/sanity.queries';
import Hero from '@/components/sections/Hero';
import AnnouncementBanner from '@/components/sections/AnnouncementBanner';
import MenuSection from '@/components/sections/MenuSection';
import HoursDisplay from '@/components/sections/HoursDisplay';
import ContactInfo from '@/components/sections/ContactInfo';
import OrderingLinks from '@/components/sections/OrderingLinks';

export const revalidate = 60;

export default async function HomePage() {
  const data = await sanityFetch(homepageQuery);
  const { business, hours, featured, announcement, ordering, settings } = (data as any) ?? {};

  return (
    <>
      {announcement && <AnnouncementBanner announcement={announcement} />}

      <Hero
        name={business?.name}
        tagline={business?.tagline}
        heroImage={business?.heroImage}
        phone={business?.phone}
        hours={settings?.showHoursInHero !== false ? hours?.regularHours : undefined}
      />

      {/* Featured Items */}
      {featured && featured.length > 0 && (
        <section id="featured" className="py-20 px-4 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="section-heading">
              <p className="font-body text-xs uppercase tracking-widest text-primary font-semibold">
                Handpicked
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-text-main">
                Our Favorites
              </h2>
            </div>

            <div className="stagger-children">
              <MenuSection items={featured} layout="grid" />
            </div>

            <div className="text-center mt-12">
              <a
                href="/menu"
                className="inline-block px-9 py-3.5 bg-primary text-white rounded-full
                           hover:bg-primary-dark transition-all duration-200 font-body font-semibold
                           shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              >
                View Full Menu
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Online Ordering */}
      {ordering && <OrderingLinks ordering={ordering} />}

      {/* Hours & Contact */}
      <section className="py-20 px-4 bg-surface-alt border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
              <HoursDisplay hours={hours?.regularHours} />
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
              <ContactInfo business={business} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
