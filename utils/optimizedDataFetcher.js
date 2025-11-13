// 🚀 OPTIMIZATION: Enhanced data fetching with caching, retries, and error handling

// Cache management
const cache = new Map();
const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  EXTENDED: 24 * 60 * 60 * 1000, // 24 hours
};

// Request deduplication
const pendingRequests = new Map();

// 🚀 OPTIMIZATION: Get cache key with query params
const getCacheKey = (url, options = {}) => {
  const { method = "GET", body, headers } = options;
  const key = `${method}:${url}`;
  if (body) {
    return `${key}:${JSON.stringify(body)}`;
  }
  return key;
};

// 🚀 OPTIMIZATION: Check if cache entry is valid
const isCacheValid = (entry) => {
  if (!entry) return false;
  return Date.now() - entry.timestamp < entry.duration;
};

// 🚀 OPTIMIZATION: Enhanced fetch with retry logic
const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
  const { timeout = 10000, ...fetchOptions } = options;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Don't retry on 4xx errors (client errors)
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Retry on 5xx errors (server errors) and network errors
        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff, max 10s
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      // Retry on network errors
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }
};

// 🚀 OPTIMIZATION: Main optimized data fetcher
export const optimizedDataFetcher = async (
  url,
  options = {},
  cacheConfig = { duration: CACHE_DURATION.MEDIUM, enabled: true }
) => {
  const {
    cache: enableCache = cacheConfig.enabled,
    cacheDuration = cacheConfig.duration,
    maxRetries = 3,
    timeout = 10000,
    fallback = null,
    transform = null,
    ...fetchOptions
  } = options;

  const cacheKey = getCacheKey(url, fetchOptions);

  // 🚀 OPTIMIZATION: Return cached data if valid
  if (enableCache && cache.has(cacheKey)) {
    const cachedEntry = cache.get(cacheKey);
    if (isCacheValid(cachedEntry)) {
      console.log(`Cache hit for ${url}`);
      return cachedEntry.data;
    } else {
      cache.delete(cacheKey);
    }
  }

  // 🚀 OPTIMIZATION: Request deduplication
  if (pendingRequests.has(cacheKey)) {
    console.log(`Request deduplication for ${url}`);
    return pendingRequests.get(cacheKey);
  }

  // Create the fetch promise
  const fetchPromise = (async () => {
    try {
      // console.log(`Fetching data from ${url}`);

      const response = await fetchWithRetry(
        url,
        {
          ...fetchOptions,
          timeout,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...fetchOptions.headers,
          },
        },
        maxRetries
      );

      let data = await response.json();

      // 🚀 OPTIMIZATION: Apply data transformation if provided
      if (transform && typeof transform === "function") {
        data = transform(data);
      }

      // 🚀 OPTIMIZATION: Cache the successful response
      if (enableCache) {
        cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
          duration: cacheDuration,
        });
      }

      return data;
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);

      // Return fallback data if provided
      if (fallback !== null) {
        return fallback;
      }

      throw error;
    } finally {
      // Remove from pending requests
      pendingRequests.delete(cacheKey);
    }
  })();

  // Add to pending requests for deduplication
  pendingRequests.set(cacheKey, fetchPromise);

  return fetchPromise;
};

// 🚀 OPTIMIZATION: Batch data fetcher for parallel requests
export const batchDataFetcher = async (requests, options = {}) => {
  const {
    maxConcurrency = 6, // Browser connection limit per domain
    failFast = false,
    timeout = 15000,
  } = options;

  // Chunk requests into batches
  const chunks = [];
  for (let i = 0; i < requests.length; i += maxConcurrency) {
    chunks.push(requests.slice(i, i + maxConcurrency));
  }

  const results = [];
  const errors = [];

  for (const chunk of chunks) {
    const chunkPromises = chunk.map(async (request, index) => {
      try {
        const { url, options: requestOptions = {}, fallback = null } = request;
        const data = await optimizedDataFetcher(url, {
          ...requestOptions,
          timeout,
          fallback,
        });
        return { index: results.length + index, data, error: null };
      } catch (error) {
        const errorResult = {
          index: results.length + index,
          data: request.fallback || null,
          error,
        };
        errors.push(errorResult);

        if (failFast) {
          throw error;
        }

        return errorResult;
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
  }

  return { results, errors };
};

// 🚀 OPTIMIZATION: Prefetch utility for warming cache
export const prefetchData = (url, options = {}) => {
  // Fire and forget - don't await
  optimizedDataFetcher(url, {
    ...options,
    fallback: null, // No fallback for prefetch
  }).catch((error) => {
    console.warn(`Prefetch failed for ${url}:`, error);
  });
};

// 🚀 OPTIMIZATION: Cache management utilities
export const cacheUtils = {
  // Clear all cache
  clear: () => {
    cache.clear();
    console.log("Cache cleared");
  },

  // Clear expired cache entries
  clearExpired: () => {
    let cleared = 0;
    for (const [key, entry] of cache.entries()) {
      if (!isCacheValid(entry)) {
        cache.delete(key);
        cleared++;
      }
    }
    console.log(`Cleared ${cleared} expired cache entries`);
  },

  // Get cache stats
  getStats: () => {
    const total = cache.size;
    let valid = 0;
    let expired = 0;

    for (const [, entry] of cache.entries()) {
      if (isCacheValid(entry)) {
        valid++;
      } else {
        expired++;
      }
    }

    return { total, valid, expired };
  },

  // Manual cache set
  set: (url, data, duration = CACHE_DURATION.MEDIUM) => {
    const cacheKey = getCacheKey(url);
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      duration,
    });
  },

  // Manual cache get
  get: (url) => {
    const cacheKey = getCacheKey(url);
    const entry = cache.get(cacheKey);
    return isCacheValid(entry) ? entry.data : null;
  },

  // Remove specific cache entry
  remove: (url) => {
    const cacheKey = getCacheKey(url);
    return cache.delete(cacheKey);
  },
};

// 🚀 OPTIMIZATION: Setup automatic cache cleanup
if (typeof window !== "undefined") {
  // Clear expired cache entries every 5 minutes
  setInterval(() => {
    cacheUtils.clearExpired();
  }, 5 * 60 * 1000);

  // Clear all cache on page unload to prevent memory leaks
  window.addEventListener("beforeunload", () => {
    cacheUtils.clear();
  });
}

export { CACHE_DURATION };
export default optimizedDataFetcher;
