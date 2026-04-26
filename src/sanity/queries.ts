import { groq } from 'next-sanity';

export const getAllServicesQuery = groq`
  *[_type == "service"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    "imageUrl": mainImage.asset->url,
    localImagePath,
    tags,
    features,
    benefits
  }
`;

export const getServiceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    icon,
    "imageUrl": mainImage.asset->url,
    localImagePath,
    tags,
    features,
    benefits
  }
`;

export const getAllBlogPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image.asset->url,
    "imageUrl": mainImage.asset->url,
    localImagePath,
    "categories": categories[]->title
  }
`;

export const getBlogPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image.asset->url,
    "imageUrl": mainImage.asset->url,
    localImagePath,
    "categories": categories[]->title
  }
`;

export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    phoneNumber,
    email,
    whatsappNumber
  }
`;

export const getHomePageQuery = groq`
  *[_type == "pageHome"][0] {
    hero {
      title,
      subtitle,
      "imageUrl": backgroundImage.asset->url
    },
    about {
      title,
      description,
      "imageUrl": image.asset->url
    }
  }
`;

export const getStatCardsQuery = groq`
  *[_type == "statCard"] | order(sortOrder asc) {
    _id,
    title,
    description,
    icon,
    sortOrder
  }
`;

export const getPopularServicesQuery = groq`
  *[_type == "popularService"] | order(sortOrder asc) {
    _id,
    title,
    price,
    sortOrder,
    tags,
    "imageUrl": image.asset->url,
    localImagePath
  }
`;

export const getProjectsQuery = groq`
  *[_type == "project"] | order(sortOrder asc) {
    _id,
    title,
    description,
    category,
    year,
    "imageUrl": image.asset->url,
    localImagePath,
    sortOrder
  }
`;
