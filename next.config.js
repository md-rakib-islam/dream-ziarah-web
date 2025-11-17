/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // Only Cloudflare Images - local images from /public work automatically
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60, // Reduce to 60 seconds for better updates
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false, // Keep Next.js image optimization
  },
  output: "standalone",
  reactStrictMode: true,
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps in production

  // Enable static optimization
  experimental: {
    // optimizeCss: true, // Disabled - requires 'critters' package
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return {
      fallback: [
        {
          source:
            "/:path((?!favicon\\.ico|_next|api|.*\\.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg|.*\\.css|.*\\.js|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot).*)",
          destination: "/api/gone",
        },
      ],
    };
  },
};

module.exports = nextConfig;
