import { SchemaTypeDefinition } from 'sanity';

import post from './post';
import service from './service';
import author from './author';
import category from './category';
import siteSettings from './siteSettings';
import home from './home';
import popularService from './popularService';
import statCard from './statCard';
import project from './project';

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  service,
  author,
  category,
  siteSettings,
  home,
  popularService,
  statCard,
  project,
];

