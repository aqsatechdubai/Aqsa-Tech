import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: '🏗️ Projects',
  type: 'document',
  description: 'Showcase projects displayed on the homepage portfolio section',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'e.g. "Villa Renovation – Dubai Hills"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      description: '1–2 sentences describing what was done',
    }),
    defineField({
      name: 'image',
      title: 'Project Photo',
      type: 'image',
      options: { hotspot: true },
      description: '📸 Upload the before/after or finished-work photo',
    }),
    defineField({
      name: 'localImagePath',
      title: 'Local Image Path (auto-set)',
      type: 'string',
      readOnly: true,
      description: 'Fallback if no Sanity image uploaded',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Renovation, HVAC, Plumbing, Fit-out, Maintenance',
    }),
    defineField({
      name: 'year',
      title: 'Year Completed',
      type: 'string',
      description: 'e.g. 2024',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3...)',
    }),
  ],
  orderings: [{ title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image', year: 'year' },
    prepare({ title, subtitle, media, year }) {
      return { title: title || 'Untitled Project', subtitle: `${subtitle || ''} · ${year || ''}`, media };
    },
  },
});
