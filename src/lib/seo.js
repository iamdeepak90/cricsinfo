export function buildMetadata({ title, description, url, image }) {

  const siteUrl = 'https://t20worldcupnews.com';
  const absoluteImage = image?.startsWith('http') ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'T20 World Cup News',
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
      type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: absoluteImage,
        creator: '@DeepakWin8',
    },
  };
}