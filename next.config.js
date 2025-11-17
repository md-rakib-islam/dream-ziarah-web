/** @type {import('next').NextConfig} */

const prodConfig = {
  protocol: "https",
  hostname: "ziarahapi.dreamtourism.co.uk",
  port: "",
  pathname: "**/media/**",
};
const localConfig = {
  protocol: "http",
  hostname: "192.168.0.101",
  port: "8000",
  pathname: "**/media/**",
};
const cloudFlareConfig = {
  protocol: "https",
  hostname: "imagedelivery.net",
  port: "",
  pathname: "",
};

const nextConfig = {
  images: {
    domains: ["imagedelivery.net"], // Add the hostname here
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: "standalone",
  reactStrictMode: true,
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Performance optimizations
  swcMinify: true, // Use SWC for minification (faster than Terser)

  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps in production

  // Enable static optimization
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path((?!favicon\\.ico|_next|api|.*\\.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg|.*\\.css|.*\\.js|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot).*)",
          destination: "/api/gone",
        },
      ],
    };
  },
};

module.exports = nextConfig;
