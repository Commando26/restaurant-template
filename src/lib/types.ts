// ============================================
// CMS Content Types
// These mirror the Sanity schema definitions
// ============================================

export interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  image?: SanityImage;
  dietaryTags?: DietaryTag[];
  featured?: boolean;
  isNew?: boolean;
  isSeasonal?: boolean;
  available?: boolean;
  sortOrder?: number;
}

export interface MenuCategory {
  _id: string;
  title: string;
  description?: string;
  sortOrder: number;
  slug: { current: string };
}

export interface BusinessInfo {
  _id: string;
  name: string;
  tagline?: string;
  description?: string;
  phone: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    yelp?: string;
    googleBusiness?: string;
  };
  logo?: SanityImage;
  heroImage?: SanityImage;
}

export interface OperatingHours {
  _id: string;
  regularHours: DayHours[];
  specialClosures?: SpecialClosure[];
}

export interface DayHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  isClosed: boolean;
  openTime?: string;  // "09:00"
  closeTime?: string; // "21:00"
}

export interface SpecialClosure {
  date: string;       // ISO date
  reason: string;     // "Closed for Thanksgiving"
  isAllDay: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface Announcement {
  _id: string;
  message: string;
  isActive: boolean;
  backgroundColor?: string;
  startDate?: string;
  endDate?: string;
  link?: string;
}

export interface AboutSection {
  _id: string;
  headline: string;
  story: any[];       // Sanity block content (rich text)
  teamPhoto?: SanityImage;
  gallery?: SanityImage[];
}

export interface OrderingLinks {
  _id: string;
  doordash?: string;
  ubereats?: string;
  grubhub?: string;
  toastTab?: string;
}

export interface SiteSettings {
  _id: string;
  colorTheme: 'warm' | 'cool' | 'earth' | 'bold' | 'minimal' | 'dark' | 'rustic' | 'sakura' | 'ocean' | 'spice' | 'bistro' | 'smoke';
  favicon?: SanityImage;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  showHoursInHero?: boolean;
}

// Sanity-specific types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
  };
}

export type DietaryTag =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free'
  | 'spicy'
  | 'halal'
  | 'kosher';
