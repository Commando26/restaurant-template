import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import { sanityFetch } from '@/sanity/lib/client';
import { businessInfoQuery, siteSettingsQuery } from '@/lib/sanity.queries';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import BackToTop from '@/components/ui/BackToTop';
import ThemeDevSwitcher from '@/components/dev/ThemeDevSwitcher';
import type { CustomColors } from '@/lib/types';
import '@/styles/globals.css';

/** Only allow valid 3- or 6-digit hex codes to prevent CSS injection */
function sanitizeHex(val: unknown): string | null {
  if (typeof val !== 'string') return null;
  return /^#[0-9a-fA-F]{3,6}$/.test(val.trim()) ? val.trim() : null;
}

function buildCustomCss(colors: CustomColors): string {
  const pairs: [keyof CustomColors, string][] = [
    ['primary',    '--color-primary'],
    ['primaryDark','--color-primary-dark'],
    ['accent',     '--color-accent'],
    ['surface',    '--color-surface'],
    ['surfaceAlt', '--color-surface-alt'],
    ['textMain',   '--color-text-main'],
    ['textMuted',  '--color-text-muted'],
    ['border',     '--color-border'],
  ];
  const vars = pairs
    .map(([key, cssVar]) => {
      const hex = sanitizeHex(colors[key]);
      return hex ? `${cssVar}:${hex}` : null;
    })
    .filter(Boolean)
    .join(';');
  return vars ? `[data-theme]{${vars}}` : '';
}

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
    sanityFetch(businessInfoQuery),
    sanityFetch(siteSettingsQuery),
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
    sanityFetch(businessInfoQuery),
    sanityFetch(siteSettingsQuery),
  ]);

  const theme = settings?.colorTheme || 'warm';
  const customCss = (settings as any)?.customColors
    ? buildCustomCss((settings as any).customColors as CustomColors)
    : '';

  return (
    <html
      lang="en"
      data-theme={theme}
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
        <Navbar
          restaurantName={business?.name}
          logo={business?.logo}
          phone={business?.phone}
        />
        <main className="flex-1">{children}</main>
        <Footer business={business} />
        <BackToTop />
        {process.env.NODE_ENV === 'development' && <ThemeDevSwitcher />}
      </body>
    </html>
  );
}
