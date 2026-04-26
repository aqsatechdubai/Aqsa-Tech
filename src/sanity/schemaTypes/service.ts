import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: '⚙️ Services',
  type: 'document',
  groups: [
    { name: 'basics',   title: '① Basic Info' },
    { name: 'content',  title: '② Full Content' },
    { name: 'media',    title: '③ Images' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      group: 'basics',
      description: 'e.g. "AC Maintenance" — shown on cards and the detail page heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basics',
      description: 'Auto-generated from title. Used in the URL: /services/[slug]',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'basics',
      description: '1–2 sentences shown on service cards on the homepage and /services page',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide)',
      type: 'string',
      group: 'basics',
      description: 'Lucide React icon name e.g. Wrench, Droplets, AirVent, Home, Paintbrush',
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      group: 'content',
      description: 'Bullet points shown in the "What\'s Included" section on the detail page',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits List',
      type: 'array',
      group: 'content',
      description: 'Bullet points shown in the "Benefits" section on the detail page',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description (Rich Text)',
      type: 'array',
      group: 'content',
      description: 'Detailed text shown on the /services/[slug] detail page',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Service Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Main image shown on the service detail page and cards',
    }),
    defineField({
      name: 'localImagePath',
      title: 'Local Image Path (fallback)',
      type: 'string',
      group: 'media',
      description: 'Used if no Sanity image is uploaded. e.g. /Services Stock images/AC Maintenance.png',
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription', media: 'mainImage' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Untitled Service', subtitle: subtitle?.slice(0, 80) || 'No description yet', media };
    },
  },
  orderings: [{ title: 'Title A-Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] }],
});
