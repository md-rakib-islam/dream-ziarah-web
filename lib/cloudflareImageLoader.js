/**
 * Cloudflare Images Custom Loader
 *
 * This loader uses Cloudflare Images' own optimization instead of Next.js
 * Cloudflare Images URL format: https://imagedelivery.net/<account-hash>/<image-id>/<variant>
 */

export default function cloudflareImageLoader({ src, width, quality }) {
  // If the image is already from Cloudflare Images
  if (src.includes('imagedelivery.net')) {
    // Parse the Cloudflare image URL
    const url = new URL(src);
    const pathParts = url.pathname.split('/').filter(Boolean);

    // URL format: /account-hash/image-id/variant
    if (pathParts.length >= 2) {
      const accountHash = pathParts[0];
      const imageId = pathParts[1];

      // Determine the variant based on width
      let variant = 'public'; // default variant

      if (width <= 320) {
        variant = 'mobile'; // Create this variant in Cloudflare dashboard
      } else if (width <= 640) {
        variant = 'thumbnail';
      } else if (width <= 1080) {
        variant = 'medium';
      } else {
        variant = 'public';
      }

      // Return optimized Cloudflare Images URL
      return `https://imagedelivery.net/${accountHash}/${imageId}/${variant}`;
    }

    // If we can't parse it, return as-is
    return src;
  }

  // For local images, use default Next.js loader
  if (src.startsWith('/')) {
    const params = new URLSearchParams();
    params.set('url', src);
    params.set('w', width.toString());
    params.set('q', (quality || 75).toString());
    return `/_next/image?${params.toString()}`;
  }

  // For other external images, return as-is
  return src;
}
