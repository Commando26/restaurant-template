/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Allow iframes only from same origin (Google Maps embed uses a src URL, not iframe embedding us)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Don't send full referrer to cross-origin sites
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable features the site doesn't need
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Enable browser DNS prefetching for performance
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
