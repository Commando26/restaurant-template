import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutSection',
  title: 'About Us',
  type: 'document',
  icon: () => '📖',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'e.g. "Our Story", "About La Autentica"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
      ],
      description: 'Tell your story — how the restaurant started, your mission, what makes you special',
    }),
    defineField({
      name: 'teamPhoto',
      title: 'Team / Owner Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      description: 'Photos of your food, restaurant, events, etc.',
    }),
  ],
  preview: {
    select: { title: 'headline' },
  },
});
