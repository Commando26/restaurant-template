import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'colorTheme',
      title: 'Color Theme',
      type: 'string',
      description: 'Choose a color palette for the website',
      options: {
        list: [
          { title: '🔥 Warm — reds, oranges, golds', value: 'warm' },
          { title: '🌊 Cool — blues, teals, slate', value: 'cool' },
          { title: '🌿 Earth — greens, browns, cream', value: 'earth' },
          { title: '⚡ Bold — deep colors, high contrast', value: 'bold' },
          { title: '🤍 Minimal — black, white, clean', value: 'minimal' },
          { title: '🌙 Dark — dark background, warm accents', value: 'dark' },
          { title: '🍕 Rustic — terracotta & olive (Italian, Pizzeria, Mediterranean)', value: 'rustic' },
          { title: '🌸 Sakura — cherry blossom & indigo (Japanese, Sushi, Asian)', value: 'sakura' },
          { title: '🦞 Ocean — teal & coral (Seafood, Coastal, Hawaiian)', value: 'ocean' },
          { title: '🌶️ Spice — saffron & magenta (Indian, Thai, Middle Eastern)', value: 'spice' },
          { title: '🥂 Bistro — gold & navy (French, Fine Dining, Upscale)', value: 'bistro' },
          { title: '🔥 Smoke — charcoal & amber (BBQ, Steakhouse, American Grill)', value: 'smoke' },
        ],
        layout: 'radio',
      },
      initialValue: 'warm',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon that appears in the browser tab',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title shown in Google results. If empty, uses restaurant name.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Description shown in Google results. Keep under 160 characters.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when your site is shared on Facebook, Twitter, etc.',
    }),
    defineField({
      name: 'showHoursInHero',
      title: 'Show Hours Badge in Hero',
      type: 'boolean',
      description: 'Display "Open until X" or "Opens at X" badge on the homepage hero image',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
