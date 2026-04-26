import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'popularService',
  title: '🎠 Services Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      description: 'Shown on the card in the homepage scrolling carousel',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Starting Price',
      type: 'string',
      description: 'e.g. "$45" — shown as a label on the card',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first in the carousel (1, 2, 3...)',
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description: '📸 Upload the service photo shown on the carousel card',
    }),
    defineField({
      name: 'localImagePath',
      title: 'Local Image Path (auto-set, do not edit)',
      type: 'string',
      description: 'Fallback path used if no Sanity image is uploaded yet',
      readOnly: true,
    }),
    defineField({
      name: 'tags',
      title: 'Tags (shown on card)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short labels shown as pills on the card image (max 3)',
    }),
  ],
  orderings: [{ title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'price', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `Starting from ${subtitle || '—'}`, media };
    },
  },
});
