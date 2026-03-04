import { defineField, defineType } from 'sanity';

const DAYS = [
  { title: 'Monday', value: 'monday' },
  { title: 'Tuesday', value: 'tuesday' },
  { title: 'Wednesday', value: 'wednesday' },
  { title: 'Thursday', value: 'thursday' },
  { title: 'Friday', value: 'friday' },
  { title: 'Saturday', value: 'saturday' },
  { title: 'Sunday', value: 'sunday' },
];

export default defineType({
  name: 'operatingHours',
  title: 'Operating Hours',
  type: 'document',
  icon: () => '🕐',
  fields: [
    defineField({
      name: 'regularHours',
      title: 'Regular Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: { list: DAYS },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'isClosed',
              title: 'Closed This Day',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'openTime',
              title: 'Opening Time',
              type: 'string',
              description: 'e.g. 11:00 AM',
              hidden: ({ parent }: any) => parent?.isClosed,
            },
            {
              name: 'closeTime',
              title: 'Closing Time',
              type: 'string',
              description: 'e.g. 9:00 PM',
              hidden: ({ parent }: any) => parent?.isClosed,
            },
          ],
          preview: {
            select: { day: 'day', isClosed: 'isClosed', open: 'openTime', close: 'closeTime' },
            prepare({ day, isClosed, open, close }: any) {
              const dayLabel = day?.charAt(0).toUpperCase() + day?.slice(1);
              return {
                title: dayLabel,
                subtitle: isClosed ? '❌ Closed' : `${open || '?'} – ${close || '?'}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'specialClosures',
      title: 'Special Hours / Closures',
      description: 'Holiday closures, special events, etc.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'date',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'reason',
              title: 'Reason',
              type: 'string',
              description: 'e.g. "Closed for Thanksgiving"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'isAllDay',
              title: 'Closed All Day',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'openTime',
              title: 'Special Opening Time',
              type: 'string',
              hidden: ({ parent }: any) => parent?.isAllDay,
            },
            {
              name: 'closeTime',
              title: 'Special Closing Time',
              type: 'string',
              hidden: ({ parent }: any) => parent?.isAllDay,
            },
          ],
          preview: {
            select: { date: 'date', reason: 'reason' },
            prepare({ date, reason }: any) {
              return { title: reason, subtitle: date };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Operating Hours' };
    },
  },
});
