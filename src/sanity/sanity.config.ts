import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'aqsa-tech-studio',
  title: 'Aqsa Tech Studio',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('📂 Aqsa Tech CMS')
          .items([
            // ─── PAGES ───────────────────────────────────────────────
            S.listItem()
              .title('🏠 Home Page')
              .child(
                S.document()
                  .schemaType('pageHome')
                  .documentId('home-page-singleton')
                  .title('Home Page Content')
              ),
            S.divider(),

            // ─── CONTENT ──────────────────────────────────────────────
            S.listItem().title('⚙️ Services (Detail Pages)').child(
              S.documentList().title('All Services').filter('_type == "service"')
            ),
            S.listItem().title('🎠 Carousel (Homepage)').child(
              S.documentList().title('Popular Services Carousel').filter('_type == "popularService"')
            ),
            S.listItem().title('📝 Blog Posts').child(
              S.documentList().title('All Blog Posts').filter('_type == "post"')
            ),
            S.listItem().title('🏗️ Projects').child(
              S.documentList().title('Projects Showcase').filter('_type == "project"')
            ),
            S.listItem().title('📊 Stats Banner').child(
              S.documentList().title('Stat Cards (Sub-hero)').filter('_type == "statCard"')
            ),
            S.divider(),

            // ─── SETTINGS ─────────────────────────────────────────────
            S.listItem().title('⚙️ Site Settings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')
            ),
            S.listItem().title('👤 Authors').child(
              S.documentList().title('Authors').filter('_type == "author"')
            ),
            S.listItem().title('🏷️ Categories').child(
              S.documentList().title('Categories').filter('_type == "category"')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});

