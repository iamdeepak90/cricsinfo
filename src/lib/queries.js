import { fetchStrapi } from "./strapi";

export const LATEST_POSTS_QUERY = `
  query LatestPosts($limit: Int!, $start: Int!) {
    posts(
      pagination: { limit: $limit, start: $start }
      sort: "createdAt:desc"
    ) {
      documentId
      Title
      Slug
      publishedAt
      FeaturedImage{
        url
        alternativeText
      }
      Author{
        name
      }
      Categories{
        name
      }
      SEO{
        metaDescription
      }
    }
  }
`;

export async function getLatestPosts(limit = 5, start = 0, options = {}) {
  const data = await fetchStrapi(LATEST_POSTS_QUERY, { limit, start }, options);
  return data.posts;
}


// Get single post by slug
const POST_BY_SLUG_QUERY = `
  query GetPost($slug: String!) {
    posts(
      filters: { Slug: { eq: $slug } }
    ) {
      documentId
      Title
      Slug
      Content
      publishedAt
      FeaturedImage{
        url
        alternativeText
      }
      Author{
        name
      }
      Categories{
        name
      }
      SEO{
        metaDescription
      }
    }
  }
`;

export async function getPostBySlug(slug, options = {}) {
  const data = await fetchStrapi(
    POST_BY_SLUG_QUERY,
    { slug },
    options
  );

  return data.posts?.[0] ?? null;
}
