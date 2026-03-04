# 🍽️ Restaurant Template — Next.js + Sanity CMS

A production-ready restaurant website template with a headless CMS so owners can update their own menu, hours, and content without touching code.

## Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Framework | Next.js 14 (App Router) | SEO via SSR/SSG, React-based, fast |
| CMS | Sanity.io | Visual editor for restaurant owners |
| Hosting | Vercel | One-click deploys, custom domains |
| Styling | Tailwind CSS | Rapid theming, responsive |
| Language | TypeScript | Type safety across CMS + frontend |

## Features

- **12 color themes** — General: Warm, Cool, Earth, Bold, Minimal, Dark. Cuisine-specific: Rustic (Italian), Sakura (Japanese), Ocean (Seafood), Spice (Indian/Thai), Bistro (Fine Dining), Smoke (BBQ) — switchable from Sanity Studio
- **Full menu system** — Categories, items, photos, dietary tags, sort order
- **NEW + SEASONAL badges** — Flag items in Sanity, badges render automatically
- **Featured items** — Mark items as Chef's Pick, shown on homepage grid
- **Online ordering links** — DoorDash, Uber Eats, Grubhub, or direct ordering URL
- **Smart map link** — iOS users get Apple Maps, everyone else gets Google Maps
- **Tap-to-call phone** — Phone number is a `tel:` link throughout
- **Open/Closed status** — Live badge in hero ("Open until 9 PM") and on hours display
- **Announcement banner** — Dismissible, date-scheduled, optional link
- **Gallery lightbox** — Click any About page photo to open a full-screen viewer with keyboard nav
- **Back-to-top button** — Appears after scrolling 400px, smooth scroll
- **Category scroll-spy nav** — Sticky pill nav on menu page, highlights active section
- **ISR** — Pages revalidate every 60 seconds, no manual redeploys needed

## What Restaurant Owners Can Edit (via Sanity Studio)

- **Menu** — Add/remove items, set prices, descriptions, photos, dietary tags, sort order
- **Hours** — Per-day hours, holiday/special closures
- **Announcements** — Toggle a banner with optional link and date range
- **Online Ordering** — Paste in DoorDash/UberEats/Grubhub/direct URLs
- **About** — Story (rich text), team photo + caption, photo gallery
- **Business Info** — Name, tagline, address, phone, email, social links, hero image, logo
- **Site Settings** — Color theme, favicon, SEO title/description, social share image, hero hours badge toggle

## Project Structure

```
restaurant-template/
├── sanity/
│   ├── schemas/
│   │   ├── index.ts          # Schema registry
│   │   ├── menuItem.ts       # Menu items (name, price, photo, tags, badges)
│   │   ├── menuCategory.ts   # Menu sections (Appetizers, Mains, etc.)
│   │   ├── businessInfo.ts   # Name, address, phone, socials, hero image
│   │   ├── hours.ts          # Operating hours + special closures
│   │   ├── announcement.ts   # Banner messages
│   │   ├── aboutSection.ts   # Story, team photo, gallery
│   │   ├── orderingLinks.ts  # DoorDash, UberEats, Grubhub, direct
│   │   └── siteSettings.ts   # Theme, favicon, SEO, hero hours toggle
│   └── sanity.config.ts      # Studio sidebar layout
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout — theme, fonts, nav, footer, BackToTop
│   │   ├── page.tsx          # Homepage
│   │   ├── menu/page.tsx     # Full menu with category nav
│   │   ├── about/page.tsx    # About + gallery lightbox
│   │   └── contact/page.tsx  # Contact + hours
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx              # Hero with hours badge
│   │   │   ├── MenuSection.tsx       # Grid or list of menu items
│   │   │   ├── HoursDisplay.tsx      # Hours table with open/closed badge
│   │   │   ├── AnnouncementBanner.tsx
│   │   │   ├── ContactInfo.tsx       # Address, phone, email cards
│   │   │   ├── OrderingLinks.tsx     # Delivery platform buttons
│   │   │   ├── CategoryNav.tsx       # Sticky scroll-spy category pills
│   │   │   └── GalleryGrid.tsx       # Photo grid with lightbox
│   │   └── ui/
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       ├── MenuItem.tsx          # Card and list variants
│   │       ├── SmartMapLink.tsx      # Apple Maps / Google Maps
│   │       ├── HeroHoursBadge.tsx    # "Open until X" pill
│   │       ├── BackToTop.tsx
│   │       └── Lightbox.tsx
│   ├── lib/
│   │   ├── sanity.queries.ts   # GROQ queries
│   │   ├── types.ts            # TypeScript interfaces
│   │   └── hours.ts            # Shared open/closed utilities
│   └── styles/
│       └── globals.css         # CSS variables for theming + animations
├── tailwind.config.ts
├── next.config.js
└── .env.local.example
```

## Per-Client Setup (2–3 hours)

1. Clone this repo and rename the folder
2. Create a new Sanity project
3. Set environment variables
4. Deploy to Vercel
5. Add client's custom domain
6. Send client their Studio login

See **Deploying a New Client** below for exact commands.

## Monthly Costs

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Sanity.io | 3 users, 500K API req/mo | Plenty for a small restaurant |
| Vercel | Hobby (non-commercial) | $20/mo Pro covers unlimited projects |
| Domain | N/A | ~$12/year via Namecheap/Cloudflare |
| **Total per client** | **~$1/mo** | On Vercel Pro, each added client costs nearly nothing |

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Next.js dev server (localhost:3000)
npx sanity dev       # Start Sanity Studio (localhost:3333)
npm run build        # Production build
npm run lint         # Lint check
```

## Deploying a New Client

```bash
# 1. Clone and rename
git clone <this-repo> client-name-site
cd client-name-site

# 2. Install dependencies
npm install

# 3. Create a new Sanity project for this client
npx sanity@latest init --create-project "Client Name Restaurant" --dataset production
# Note the project ID it gives you

# 4. Set environment variables
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET

# 5. Push to a new GitHub repo (private)
git init
git add .
git commit -m "Initial setup for Client Name"
gh repo create client-name-site --private --push --source=.

# 6. Deploy to Vercel (links to the GitHub repo)
vercel --prod
# Add environment variables in Vercel dashboard under Project Settings → Environment Variables

# 7. Add custom domain in Vercel dashboard → Domains

# 8. Send client:
#    - Their website URL
#    - Their Sanity Studio URL: https://your-project-id.sanity.studio
#    - Login instructions for Sanity
```

## Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```
