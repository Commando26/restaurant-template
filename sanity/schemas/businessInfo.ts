import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'businessInfo',
  title: 'Business Info',
  type: 'document',
  icon: () => '🏪',
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short catchy phrase, e.g. "Authentic Nigerian Cuisine"',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Used in Google search results (meta description)',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'city', title: 'City', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'state', title: 'State', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'zip', title: 'ZIP Code', type: 'string', validation: (Rule: any) => Rule.required() },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Large banner image for the homepage',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'tiktok', title: 'TikTok URL', type: 'url' },
        { name: 'yelp', title: 'Yelp URL', type: 'url' },
        { name: 'googleBusiness', title: 'Google Business URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
});
