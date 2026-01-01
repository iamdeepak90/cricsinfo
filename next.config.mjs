/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  trailingSlash: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hygraph.com',
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: '*.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.cricsinfo.com',
      },
    ],
    minimumCacheTTL: 31536000,
  },

  compress: true,

  experimental: {
    inlineCss: true
  },
  
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ]
      }
    ];
  },
};

export default nextConfig;
