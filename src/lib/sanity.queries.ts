import { groq } from 'next-sanity';

// ============================================
// GROQ Queries — fetch data from Sanity CMS
// ============================================

// Business Info (singleton)
export const businessInfoQuery = groq`
  *[_type == "businessInfo"][0] {
    _id, name, tagline, description, phone, email,
    address { street, city, state, zip },
    socialLinks,
    logo, heroImage
  }
`;

// Full menu with categories
export const fullMenuQuery = groq`
  *[_type == "menuCategory"] | order(sortOrder asc) {
    _id, title, description, slug,
    "items": *[_type == "menuItem" && category._ref == ^._id && available != false] | order(sortOrder asc) {
      _id, name, description, price, image, dietaryTags, featured, isNew, isSeasonal
    }
  }
`;

// Featured menu items only (for homepage)
export const featuredMenuQuery = groq`
  *[_type == "menuItem" && featured == true && available != false] | order(sortOrder asc) {
    _id, name, description, price, image, dietaryTags, isNew, isSeasonal,
    "categoryName": category->title
  }
`;

// Operating hours
export const hoursQuery = groq`
  *[_type == "operatingHours"][0] {
    regularHours[] { day, isClosed, openTime, closeTime },
    specialClosures[] { date, reason, isAllDay, openTime, closeTime }
  }
`;

// Active announcement
export const announcementQuery = groq`
  *[_type == "announcement" && isActive == true][0] {
    _id, message, backgroundColor, link, startDate, endDate
  }
`;

// About section
export const aboutQuery = groq`
  *[_type == "aboutSection"][0] {
    _id, headline, story, teamPhoto, gallery
  }
`;

// Online ordering links
export const orderingLinksQuery = groq`
  *[_type == "orderingLinks"][0] {
    _id, doordash, ubereats, grubhub, toastTab
  }
`;

// Site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id, colorTheme, favicon, metaTitle, metaDescription, ogImage
  }
`;

// Homepage — fetch everything needed in one call
export const homepageQuery = groq`{
  "business": *[_type == "businessInfo"][0] {
    name, tagline, description, phone, address, heroImage, logo, socialLinks
  },
  "hours": *[_type == "operatingHours"][0] {
    regularHours[] { day, isClosed, openTime, closeTime }
  },
  "featured": *[_type == "menuItem" && featured == true && available != false] | order(sortOrder asc) [0...6] {
    _id, name, description, price, image, dietaryTags, isNew, isSeasonal,
    "categoryName": category->title
  },
  "announcement": *[_type == "announcement" && isActive == true][0] {
    message, backgroundColor, link
  },
  "settings": *[_type == "siteSettings"][0] {
    colorTheme, metaTitle, metaDescription, showHoursInHero
  },
  "ordering": *[_type == "orderingLinks"][0] {
    doordash, ubereats, grubhub, toastTab
  }
}`;
