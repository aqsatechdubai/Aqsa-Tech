import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: '📝 Blog Posts',
  type: 'document',
  groups: [
    { name: 'basics',   title: '① Post Info' },
    { name: 'content',  title: '② Content' },
    { name: 'media',    title: '③ Media' },
    { name: 'meta',     title: '④ Author & Date' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      group: 'basics',
      description: 'The blog post headline shown on cards and at the top of the article',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basics',
      description: 'Auto-generated. Used in the URL: /blog/[slug]',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Excerpt / Summary',
      type: 'text',
      group: 'basics',
      description: '2–3 sentences shown on the blog listing cards',
    }),
    defineField({
      name: 'categories',
      title: 'Category',
      type: 'array',
      group: 'basics',
      description: 'e.g. HVAC, Plumbing, Renovation, Home Maintenance',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Article Body (Rich Text)',
      type: 'array',
      group: 'content',
      description: 'Full article content. Supports headings, bold, links, images.',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'The cover image shown at the top of the article and on listing cards',
    }),
    defineField({
      name: 'localImagePath',
      title: 'Local Image Path (fallback)',
      type: 'string',
      group: 'media',
      readOnly: true,
      description: 'Fallback if no Sanity image uploaded',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'meta',
      description: 'The date shown on the blog card and article page',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary', media: 'mainImage', date: 'publishedAt' },
    prepare({ title, subtitle, media, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date';
      return { title: title || 'Untitled Post', subtitle: `${dateStr} · ${subtitle?.slice(0,60) || ''}`, media };
    },
  },
  orderings: [
    { title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
});
