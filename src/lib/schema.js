const SITE_URL = 'https://t20worldcupnews.com';
const SITE_NAME = 'T20 World Cup News';
const LOGO_URL = `${SITE_URL}/logo.webp`;

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

// 1. Organization Schema (Add to your homepage or site-wide)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      width: '600',
      height: '600',
      caption: SITE_NAME,
    },
    sameAs: [
      'https://twitter.com/DeepakWin8',
      'https://www.linkedin.com/in/mail2dk'
    ],
  };
}

// 2. WebSite Schema (Add to homepage)
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'Your front-row seat to T20 World Cup 2026. Get the full schedule (Fixtures PDF), live ball-by-ball scores and coverage of India vs Pakistan from Colombo.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
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

// 3. Enhanced NewsArticle Schema
export function generateNewsArticleSchema(post) {
  if (!post) return null;

  const imageUrl = post.coverImage?.url;
  const articleUrl = `${SITE_URL}/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,

    // Dates - Use ISO 8601 format
    datePublished: post.date ? new Date(post.date).toISOString() : undefined,
    dateModified: post.updatedAt,

    // Author information - Enhanced with more details
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Deepak M.',
      url: SITE_URL,
      jobTitle: 'Sports Journalist',
      image: `${SITE_URL}/logo.webp`,
    },
    
    // Publisher - REQUIRED for NewsArticle
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: '600',
        height: '600',
      },
    },
    
    // Content details
    articleSection: post.categories?.[0]?.name || 'Cricket',
    keywords: post.categories?.map(cat => cat.name).join(', ') || 'T20 World Cup, Cricket, T20 World Cup Live Streaming, T20 World Cup Schedule',
    
    inLanguage: 'en-US',
  };
}

// 4. BreadcrumbList Schema
export function generateBreadcrumbSchema(breadcrumbs) {
  // breadcrumbs should be an array like:
  // [{ name: 'Home', url: '/' }, { name: 'News', url: '/news' }, { name: 'Article Title', url: '/article-slug' }]
  
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}/${crumb.url}`,
    })),
  };
}

/**
 * Generate CollectionPage Schema for Category/Archive Pages
 */
export function generateCollectionPageSchema(category, posts) {
  if (!category) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/category/${category.slug}`,
    url: `${SITE_URL}/category/${category.slug}`,
    name: `${category.name} - T20 World Cup 2026`,
    description: category.seoOverride.description,
    inLanguage: 'en-US',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/${post.slug}`,
        name: post.title,
      })),
    },
  };
}


/**
 * Generate SportsEvent Schema for Match Coverage
 */
export function generateSportsEventSchema(match) {
  if (!match) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    '@id': match.url,
    name: `${match.team1} vs ${match.team2} - T20 World Cup 2026`,
    description: match.description,
    startDate: match.date,
    sport: 'Cricket',
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
      name: 'International Cricket Council (ICC)',
      url: 'https://www.icc-cricket.com',
    },
  };
}


/**
 * CRITICAL: Generate Combined Schema for Blog Post using @graph
 * This is the CORRECT way to combine multiple schemas
 */
export function generateBlogPostSchema(post) {
  const schemas = [];

  // Build proper breadcrumb hierarchy
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: post.title, url: post.slug },
  ];

  // Organization Schema (CRITICAL: Required for publisher reference)
  schemas.push(generateOrganizationSchema());

  // NewsArticle Schema (CRITICAL: Main content)
  const articleSchema = generateNewsArticleSchema(post);
  if (articleSchema) schemas.push(articleSchema);

  // BreadcrumbList Schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  // FAQ Schema (if exists in content)
  if (post.content?.html) {
    const faqs = extractFAQFromHTML(post.content.html);
    const faqSchema = generateFAQSchema(faqs);
    if (faqSchema) schemas.push(faqSchema);
  }

  // SportsEvent Schema (if match data exists)
  if (post.match) {
    const eventSchema = generateSportsEventSchema(post.match);
    if (eventSchema) schemas.push(eventSchema);
  }

  // CRITICAL: Return as @graph for proper organization
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
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

  // FAQ Schema (if exists)
  if (html) {
    const faqs = extractFAQFromHTML(html);
    const faqSchema = generateFAQSchema(faqs);
    if (faqSchema) schemas.push(faqSchema);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

/**
 * Generate Combined Schema for Category Page
 */
export function generateCategoryPageSchema(category, posts) {
  const schemas = [];

  // Organization Schema
  schemas.push(generateOrganizationSchema());

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

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

/**
 * Render Schema as JSON-LD script tag
 * Use this in your page components
 */
export function SchemaScript({ schema }) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}