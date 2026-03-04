import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  icon: () => '🍽️',
  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short description of the dish',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
      ],
    }),
    defineField({
      name: 'dietaryTags',
      title: 'Dietary Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🥬 Vegetarian', value: 'vegetarian' },
          { title: '🌱 Vegan', value: 'vegan' },
          { title: '🌾 Gluten-Free', value: 'gluten-free' },
          { title: '🥛 Dairy-Free', value: 'dairy-free' },
          { title: '🥜 Nut-Free', value: 'nut-free' },
          { title: '🌶️ Spicy', value: 'spicy' },
          { title: 'Halal', value: 'halal' },
          { title: 'Kosher', value: 'kosher' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Item',
      type: 'boolean',
      description: "Show this item on the homepage as a \"Chef's Pick\"",
      initialValue: false,
    }),
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
    defineField({
      name: 'available',
      title: 'Currently Available',
      type: 'boolean',
      description: 'Uncheck to temporarily hide this item',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first within the category',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'image',
      available: 'available',
    },
    prepare({ title, subtitle, media, available }) {
      return {
        title: `${available === false ? '❌ ' : ''}${title}`,
        subtitle: subtitle ? `$${subtitle.toFixed(2)}` : 'No price',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
