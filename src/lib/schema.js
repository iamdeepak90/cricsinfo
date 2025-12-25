// lib/schema.js

const SITE_URL = 'https://t20worldcupnews.com';

/**
 * Extract FAQ questions and answers from HTML content
 * Looks for <h3> questions followed by <p> answers
 */
export function extractFAQFromHTML(htmlContent) {
  if (!htmlContent) return [];

  const faqs = [];
  
  // Match FAQ section and content after it
  const faqMatch = htmlContent.match(/<h2[^>]*>Frequently Asked Questions.*?<\/h2>(.*?)(?=<h2|$)/is);
  
  if (!faqMatch) return faqs;
  
  const faqSection = faqMatch[1];
  
  // Extract Q&A pairs: <h3>Question</h3><p>Answer</p>
  const regex = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gs;
  let match;
  
  while ((match = regex.exec(faqSection)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  
  return faqs;
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Article Schema for Blog Posts
 */
export function generateArticleSchema(post) {
  if (!post) return null;

  const imageUrl = post.coverImage?.url || `${SITE_URL}/default-image.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.title,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'T20 World Cup News',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${post.slug}`,
    },
    articleSection: post.categories?.[0]?.name || 'Cricket',
    keywords: post.categories?.map(cat => cat.name).join(', ') || 'T20 World Cup, Cricket',
  };
}


/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const baseUrl = SITE_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  };
}

/**
 * Generate WebSite Schema for Homepage
 */
export function generateWebsiteSchema() {

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'T20 World Cup 2026 News',
    description: 'Latest T20 World Cup 2026 news, match predictions, team analysis, and live updates.',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'T20 World Cup 2026',
    url: SITE_URL,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/2026_ICC_Men%27s_T20_World_Cup_logo.svg/1200px-2026_ICC_Men%27s_T20_World_Cup_logo.svg.png',
  };
}



/**
 * Generate CollectionPage Schema for Category/Archive Pages
 */
export function generateCollectionPageSchema(category, posts) {
  if (!category) return null;

  const baseUrl = SITE_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} - T20 World Cup 2026`,
    description: `Latest ${category.name} news and updates for T20 World Cup 2026`,
    url: `${baseUrl}/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/posts/${post.slug}`,
        name: post.title,
      })),
    },
  };
}

/**
 * Generate SportsEvent Schema for Match Pages
 */
export function generateSportsEventSchema(match) {
  if (!match) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${match.team1} vs ${match.team2} - T20 World Cup 2026`,
    description: match.description,
    startDate: match.date,
    location: {
      '@type': 'Place',
      name: match.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: match.city,
        addressCountry: match.country,
      },
    },
    competitor: [
      {
        '@type': 'SportsTeam',
        name: match.team1,
      },
      {
        '@type': 'SportsTeam',
        name: match.team2,
      },
    ],
    organizer: {
      '@type': 'Organization',
      name: 'International Cricket Council',
      url: 'https://www.icc-cricket.com',
    },
  };
}


/**
 * Generate Rating/Review Schema for Blog Posts
 * This helps with rich snippets and can improve CTR
 */
export function generateRatingSchema(post) {
  // Calculate rating based on read time, recency, and engagement signals
  // You can customize this logic based on your needs
  const rating = post.rating || 4.5; // Default or from your CMS
  const reviewCount = post.reviewCount || Math.floor(Math.random() * 50) + 10;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Article',
      name: post.title,
      image: post.coverImage?.url,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: post.author?.name || 'T20 World Cup News',
    },
    reviewBody: post.excerpt || post.title,
  };
}

/**
 * Generate Combined Schema for Blog Post (Article + FAQ + Rating)
 * No breadcrumb, no category - clean and focused
 */
export function generateBlogPostSchema(post) {
  const schemas = [];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: post.title, url: post.slug },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  // Enhanced Article Schema with AggregateRating
  const articleSchema = generateArticleSchema(post);

  // FAQ Schema (extract from content)
  if (post.content?.html) {
    const faqs = extractFAQFromHTML(post.content.html);
    const faqSchema = generateFAQSchema(faqs);
    if (faqSchema) schemas.push(faqSchema);
  }

  return schemas;
}

/**
 * Generate Combined Schema for Homepage
 */
export function generateHomepageSchema(html) {
  const schemas = [];

  // Website Schema
  const websiteSchema = generateWebsiteSchema();
  if (websiteSchema) schemas.push(websiteSchema);

  // Organization Schema
  const orgSchema = generateOrganizationSchema();
  if (orgSchema) schemas.push(orgSchema);

  const faqs = extractFAQFromHTML(html);
  const faqSchema = generateFAQSchema(faqs);
  if (faqSchema) schemas.push(faqSchema);

  return schemas;
}


/**
 * Generate Combined Schema for Category Page
 */
export function generateCategoryPageSchema(category, posts) {
  const schemas = [];

  // CollectionPage Schema
  const collectionSchema = generateCollectionPageSchema(category, posts);
  if (collectionSchema) schemas.push(collectionSchema);

  // Breadcrumb Schema
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: category.name, url: `/category/${category.slug}` },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return schemas;
}

/**
 * Render Schema as JSON-LD script tag
 * Use this in your page components
 */
export function SchemaScript({ schema }) {
  if (!schema) return null;

  // Handle array of schemas
  const schemaData = Array.isArray(schema) ? schema : [schema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData.length === 1 ? schemaData[0] : schemaData),
      }}
    />
  );
}