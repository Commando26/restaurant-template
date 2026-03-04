# Restaurant Template — Enhancement Specs

This document defines the next set of UI/feature enhancements to implement.
Read this file at the start of a session before building anything.

---

## Enhancement 1 — Smart Map Link (iOS vs Android/Desktop)

**Goal:** When a user taps/clicks a map link, it opens in the native maps app automatically.
iOS users → Apple Maps. Android & desktop → Google Maps.

**How it works:**
- Create a client component `src/components/ui/SmartMapLink.tsx`
- Detect platform with `navigator.userAgent` or `navigator.platform` inside a `useEffect`
- iOS detection: check for `iPhone|iPad|iPod` in userAgent
- Apple Maps URL: `maps://maps.apple.com/?q=ENCODED_ADDRESS` (or `https://maps.apple.com/?q=...` as fallback)
- Google Maps URL: `https://www.google.com/maps/search/?api=1&query=ENCODED_ADDRESS`
- Default to Google Maps on SSR (no window access)
- Props: `address: string` (full address string), `label?: string` (button text, default "Get Directions")
- Style: same as existing "Get Directions" link — inline-flex, gap-1.5, text-primary, text-sm font-semibold

**Where to use it:**
- Replace the `<a href={mapsUrl}>` in `src/components/sections/ContactInfo.tsx`
- Replace the footer address block in `src/components/ui/Footer.tsx` (add a small directions link below address)

**Sanity changes:** None needed — address already stored in `businessInfo`.

---

## Enhancement 2 — Menu Item Badges: NEW + SEASONAL

**Goal:** Restaurant owners can flag items as "New" or "Seasonal" in the CMS.
These show as colored pill badges on both card and list menu item variants.

**Sanity schema changes — `sanity/schemas/menuItem.ts`:**
Add two new boolean fields after the existing `featured` field:

```ts
defineField({
  name: 'isNew',
  title: 'Mark as New',
  type: 'boolean',
  description: 'Shows a "New" badge on this item',
  initialValue: false,
}),
defineField({
  name: 'isSeasonal',
  title: 'Seasonal Item',
  type: 'boolean',
  description: 'Shows a "Seasonal" badge on this item',
  initialValue: false,
}),
```

**TypeScript — `src/lib/types.ts`:**
Add to the `MenuItem` interface:
```ts
isNew?: boolean;
isSeasonal?: boolean;
```

**GROQ queries — `src/lib/sanity.queries.ts`:**
Add `isNew`, `isSeasonal` to the menu item projection wherever `featured` appears.

**UI — `src/components/ui/MenuItem.tsx`:**
- Update the `item` prop interface to include `isNew?: boolean` and `isSeasonal?: boolean`
- Badge colors:
  - NEW → `bg-blue-100 text-blue-700` with label "New"
  - SEASONAL → `bg-orange-100 text-orange-700` with label "Seasonal"
  - POPULAR (existing `featured`) → keep current primary color badge "Chef's Pick" on card, "Popular" on list
- On **card variant**: show badges stacked in the top-left corner of the image (below or next to featured badge)
- On **list variant**: show badges inline next to the item name, same row as "Popular"
- Badge style: `text-xs px-2 py-0.5 rounded-full font-semibold font-body`
- Multiple badges can stack (e.g. an item can be both Seasonal and New)

---

## Enhancement 3 — Online Ordering Links

**Goal:** Restaurant owners can add links to DoorDash, UberEats, GrubHub, and their own website ordering.
These links appear as CTA buttons on the homepage and at the top of the menu page.

**Sanity schema — new file `sanity/schemas/orderingLinks.ts`:**
Singleton document (like businessInfo). Fields:
```ts
{
  name: 'orderingLinks',
  title: 'Online Ordering',
  type: 'document',
  fields: [
    { name: 'isEnabled', title: 'Show Online Ordering', type: 'boolean', initialValue: false },
    { name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Order Online' },
    { name: 'doordash',  title: 'DoorDash URL',  type: 'url' },
    { name: 'ubereats',  title: 'Uber Eats URL', type: 'url' },
    { name: 'grubhub',   title: 'GrubHub URL',   type: 'url' },
    { name: 'ownSite',   title: 'Direct Order URL (own website/system)', type: 'url' },
  ]
}
```

Register in `sanity/schemas/index.ts`.
Add to Sanity Studio sidebar structure in `sanity/sanity.config.ts` as a singleton item.

**TypeScript — `src/lib/types.ts`:**
```ts
export interface OrderingLinks {
  _id: string;
  isEnabled: boolean;
  sectionTitle?: string;
  doordash?: string;
  ubereats?: string;
  grubhub?: string;
  ownSite?: string;
}
```

**GROQ — `src/lib/sanity.queries.ts`:**
Add `orderingLinksQuery`:
```groq
*[_type == "orderingLinks"][0] {
  isEnabled, sectionTitle, doordash, ubereats, grubhub, ownSite
}
```
Include it in `homepageQuery` as well.

**UI — new component `src/components/sections/OrderingLinks.tsx`:**
- Only renders when `isEnabled === true` and at least one link exists
- Layout: a full-width section with heading + row of platform buttons
- Each platform button shows:
  - Platform logo/name (use text + emoji or simple inline SVG)
  - "Order on DoorDash" style label
  - Opens in new tab
- Button style: `border border-border rounded-xl px-5 py-3 flex items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all`
- Platform colors (subtle): DoorDash red accent, UberEats black, GrubHub orange, own site → primary color
- Own site button gets `bg-primary text-white` styling to stand out

**Where to use:**
- `src/app/page.tsx` — after the hero, before featured items (or after featured, before hours)
- `src/app/menu/page.tsx` — below the page header, above the category nav

---

## Enhancement 6 — "Open Until X" in Hero (OPTIONAL)

**Status: OPTIONAL — only implement if restaurant owner enables it via a toggle.**

**Goal:** Show a live "Open until 9 PM" or "Opens tomorrow at 11 AM" pill badge in the Hero,
below the tagline, so visitors immediately know if they can order right now.

**Implementation:**
- Create a client component `src/components/sections/HeroHoursBadge.tsx` marked `'use client'`
- Accepts `hours: DayHours[]` as prop
- Reuses the same time-parsing logic from `HoursDisplay.tsx` (extract to a shared utility)
  - Suggest: `src/lib/hours.ts` with exported `isCurrentlyOpen(hours)`, `getTodayHours(hours)`, `formatTime(t)` functions
- Badge states:
  - Open: `"Open until 9 PM"` → green pill `bg-green-500/20 text-green-300 border border-green-500/30`
  - Closing soon (< 60 min): `"Closing soon · 8:45 PM"` → amber pill
  - Closed, opens today: `"Closed · Opens at 5 PM"` → neutral/muted pill
  - Closed, opens tomorrow: `"Closed · Opens tomorrow at 11 AM"` → neutral pill
- Displayed below tagline in Hero, centered, with a `●` dot indicator

**To make it optional:**
- Add a boolean field `showHoursInHero` to `siteSettings` Sanity schema (default: `false`)
- In `src/app/layout.tsx` or `src/app/page.tsx`, only pass hours to Hero when this is `true`
- Hero component gains an optional `hours?: DayHours[]` prop — if absent, badge doesn't render

**Shared utility — `src/lib/hours.ts`:**
Extract and export:
```ts
export function getTodayHours(hours: DayHours[]): DayHours | undefined
export function isCurrentlyOpen(h: DayHours): boolean
export function formatTime(t: string): string  // "09:00" → "9 AM"
export function getNextOpenTime(hours: DayHours[]): { day: string; time: string } | null
```
Update `HoursDisplay.tsx` to import from this utility instead of inlining the logic.

---

## Enhancement 10 — Back-to-Top Button

**Goal:** A floating button appears after the user scrolls down 400px. Clicking it smoothly scrolls to the top.

**Implementation — new component `src/components/ui/BackToTop.tsx`:**
- `'use client'` component
- `useState(false)` for visibility, `useEffect` with scroll event listener
- Show when `window.scrollY > 400`, hide otherwise
- Button: fixed bottom-right, `bottom-6 right-6 z-40`
- Style: `w-11 h-11 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary-dark transition-all hover:scale-110 active:scale-95`
- Icon: `ChevronUp` from lucide-react, size 20
- Enter/exit transition: `transition-all duration-300` with `opacity-0 translate-y-4` → `opacity-100 translate-y-0`
- `aria-label="Back to top"`
- `onClick`: `window.scrollTo({ top: 0, behavior: 'smooth' })`

**Where to add it:**
- Import and render in `src/app/layout.tsx` inside `<body>`, after `<main>` and before `<Footer>`

---

## Enhancement 11 — Gallery Lightbox

**Goal:** Clicking a gallery photo on the About page opens it fullscreen with prev/next navigation.

**Implementation — new component `src/components/ui/Lightbox.tsx`:**
- `'use client'` component
- Props: `images: { src: string; alt: string }[]`, `initialIndex: number`, `onClose: () => void`
- State: `currentIndex: number`
- Overlay: `fixed inset-0 z-50 bg-black/92 flex items-center justify-center`
- Close on overlay click or `Escape` key (`useEffect` for keydown listener)
- Navigation: left/right arrow buttons (`ChevronLeft` / `ChevronRight` from lucide), hidden if only 1 image
- Image: `max-w-[90vw] max-h-[85vh] object-contain rounded-lg`
  - Use a regular `<img>` tag (not Next Image) to avoid layout complexity in the overlay
- Caption: show `alt` text below image in small white text if present
- Counter: "3 / 8" in top-right corner, white text
- Close button: top-right `X` button
- Keyboard: left arrow → prev, right arrow → next, Escape → close
- Prevent body scroll while open (`document.body.style.overflow = 'hidden'` on mount, restore on unmount)
- Transition: `animate-fade-in` on the overlay

**Integrate into `src/app/about/page.tsx`:**
- The About page is a server component — wrap the gallery grid in a new client component
- Create `src/components/sections/GalleryGrid.tsx` as `'use client'`
- It takes `photos: { src: string; alt: string }[]` as props
- Manages `lightboxOpen: boolean` and `lightboxIndex: number` state
- Each gallery photo div gets `cursor-pointer onClick={() => { setLightboxIndex(idx); setLightboxOpen(true) }}`
- Renders `<Lightbox>` when `lightboxOpen === true`
- Move the gallery Image rendering logic from `about/page.tsx` into this component
- `about/page.tsx` just passes pre-resolved URLs: `photos={about.gallery.map((p, i) => ({ src: urlFor(p).width(1200).quality(88).url(), alt: p.alt || \`Photo \${i+1}\` }))}`

---

## Implementation Notes

- Work through enhancements in order: 1 → 2 → 3 → 6 → 10 → 11
- Each enhancement is self-contained — commit after each one
- Enhancement 6 requires extracting hours logic to `src/lib/hours.ts` first — do this before touching Hero
- Enhancement 11 requires creating `GalleryGrid.tsx` before modifying `about/page.tsx`
- No new npm packages needed for any of these
- All Sanity schema changes require registering new schemas in `sanity/schemas/index.ts`
- Read `summary.txt` in the project root for full architecture context before starting
