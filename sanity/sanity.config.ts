import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

// Customize the Studio sidebar to organize content types
const structure = (S: any) =>
  S.list()
    .title('Restaurant Dashboard')
    .items([
      // Singletons at the top for easy access
      S.listItem()
        .title('🏪 Business Info')
        .child(S.document().schemaType('businessInfo').documentId('businessInfo')),
      S.listItem()
        .title('🕐 Operating Hours')
        .child(S.document().schemaType('operatingHours').documentId('operatingHours')),
      S.listItem()
        .title('📢 Announcement Banner')
        .child(S.document().schemaType('announcement').documentId('announcement')),
      S.listItem()
        .title('🛵 Online Ordering')
        .child(S.document().schemaType('orderingLinks').documentId('orderingLinks')),
      S.listItem()
        .title('⚙️ Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      // Content lists
      S.listItem()
        .title('🍽️ Menu Items')
        .schemaType('menuItem')
        .child(S.documentTypeList('menuItem').title('Menu Items')),
      S.listItem()
        .title('📂 Menu Categories')
        .schemaType('menuCategory')
        .child(S.documentTypeList('menuCategory').title('Menu Categories')),

      S.divider(),

      S.listItem()
        .title('📖 About Us')
        .child(S.document().schemaType('aboutSection').documentId('aboutSection')),
    ]);

export default defineConfig({
  name: 'restaurant-cms',
  title: 'Restaurant Dashboard',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
  ],

  schema: {
    types: schemaTypes,
  },
});
