import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'statCard',
  title: '📊 Stats Banner',
  type: 'document',
  description: 'The 3 stat cards shown in the grey band below the hero (50+ Services, 200+ Providers, 5000+ Customers)',
  fields: [
    defineField({
      name: 'title',
      title: 'Stat Title',
      type: 'string',
      description: 'The large bold number/text e.g. "50+ Services"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: '1–2 sentences explaining what this stat means',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon: Paintbrush (services), Users (providers), Smile (customers)',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order shown left to right: 1, 2, 3',
    }),
  ],
  orderings: [{ title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'description' },
    prepare({ title, subtitle }) {
      return { title: title || 'Untitled Stat', subtitle: subtitle?.slice(0, 80) };
    },
  },
});
