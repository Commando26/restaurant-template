import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'orderingLinks',
  title: 'Online Ordering',
  type: 'document',
  icon: () => '🛵',
  fields: [
    defineField({
      name: 'doordash',
      title: 'DoorDash URL',
      type: 'url',
      description: 'Paste your full DoorDash restaurant link',
    }),
    defineField({
      name: 'ubereats',
      title: 'Uber Eats URL',
      type: 'url',
      description: 'Paste your full Uber Eats restaurant link',
    }),
    defineField({
      name: 'grubhub',
      title: 'Grubhub URL',
      type: 'url',
      description: 'Paste your full Grubhub restaurant link',
    }),
    defineField({
      name: 'toastTab',
      title: 'Toast / Direct Ordering URL',
      type: 'url',
      description: 'Link to your own online ordering system (Toast, Square, etc.)',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Online Ordering Links' };
    },
  },
});
