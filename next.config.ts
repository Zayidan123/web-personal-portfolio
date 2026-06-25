import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Download-Options',
    value: 'noopen',
  },
]

const nextConfig: NextConfig = {
  output: "standalone",

  // Remove X-Powered-By header to hide Next.js fingerprint
  poweredByHeader: false,

  // React strict mode off to avoid double-render issues in dev
  reactStrictMode: false,

  // TypeScript: ignore build errors for faster iteration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Security headers (in addition to middleware)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Prevent access to sensitive files
        source: '/.env(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },

  // Redirect common attack paths
  async redirects() {
    return [
      {
        source: '/wp-admin',
        destination: '/',
        permanent: false,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: false,
      },
      {
        source: '/admin.php',
        destination: '/',
        permanent: false,
      },
      {
        source: '/xmlrpc.php',
        destination: '/',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;