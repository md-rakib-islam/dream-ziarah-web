/**
 * Utility for generating canonical URLs
 * @param {string} path - The path for the canonical URL (e.g., '/tour/makkah-tour')
 * @returns {string} - Full canonical URL
 */
export function getCanonicalUrl(path = '') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamziarah.com';

  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Remove trailing slash for consistency
  const url = `${baseUrl}/${cleanPath}`.replace(/\/$/, '');

  return url || baseUrl;
}

/**
 * Generate alternates for multi-language support (if needed in future)
 */
export function getAlternates(path = '') {
  const canonical = getCanonicalUrl(path);

  return {
    canonical,
    languages: {
      'en-US': canonical,
      'x-default': canonical,
    },
  };
}
