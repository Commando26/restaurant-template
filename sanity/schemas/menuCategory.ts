import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  icon: () => '📂',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Appetizers, Main Course, Drinks, Desserts',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first on the menu page',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
});
