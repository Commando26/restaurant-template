import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import { client } from '@/sanity/lib/client';
import { businessInfoQuery, siteSettingsQuery } from '@/lib/sanity.queries';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import BackToTop from '@/components/ui/BackToTop';
import '@/styles/globals.css';

const displayFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const [business, settings] = await Promise.all([
    client.fetch(businessInfoQuery),
    client.fetch(siteSettingsQuery),
  ]);

  return {
    title: settings?.metaTitle || business?.name || 'Restaurant',
    description:
      settings?.metaDescription ||
      business?.description ||
      `${business?.name} — ${business?.tagline}`,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [business, settings] = await Promise.all([
    client.fetch(businessInfoQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const theme = settings?.colorTheme || 'warm';

  return (
    <html
      lang="en"
      data-theme={theme}
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar
          restaurantName={business?.name}
          logo={business?.logo}
          phone={business?.phone}
        />
        <main className="flex-1">{children}</main>
        <Footer business={business} />
        <BackToTop />
      </body>
    </html>
  );
}
