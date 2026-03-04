import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'announcement',
  title: 'Announcement Banner',
  type: 'document',
  icon: () => '📢',
  fields: [
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
      validation: (Rule) => Rule.required().max(150),
      description: 'Keep it short! Max 150 characters.',
    }),
    defineField({
      name: 'isActive',
      title: 'Show Banner',
      type: 'boolean',
      description: 'Toggle this on/off to show or hide the announcement',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      title: 'Link (optional)',
      type: 'url',
      description: 'If set, the banner becomes clickable',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Banner Color',
      type: 'string',
      options: {
        list: [
          { title: '🔴 Red (Urgent)', value: 'red' },
          { title: '🟡 Yellow (Notice)', value: 'yellow' },
          { title: '🟢 Green (Good News)', value: 'green' },
          { title: '🔵 Blue (Info)', value: 'blue' },
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date (optional)',
      type: 'date',
      description: 'Banner will automatically show from this date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (optional)',
      type: 'date',
      description: 'Banner will automatically hide after this date',
    }),
  ],
  preview: {
    select: { title: 'message', isActive: 'isActive' },
    prepare({ title, isActive }) {
      return {
        title: title,
        subtitle: isActive ? '✅ Active' : '❌ Hidden',
      };
    },
  },
});
