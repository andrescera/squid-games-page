/**
 * Avatar Fetcher Utility
 * Fetches streamer avatars from Kick and provides fallbacks for Twitch
 */

// Cache avatar URLs in memory to reduce API calls
const avatarCache = new Map<string, string>();

// Cache TTL: 24 hours
const CACHE_TTL = 24 * 60 * 60 * 1000;

interface CacheEntry {
  url: string;
  timestamp: number;
}

// Local storage cache for persistence (client-side only)
const getCachedAvatar = (username: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(`avatar_${username}`);
    if (cached) {
      const entry: CacheEntry = JSON.parse(cached);
      if (Date.now() - entry.timestamp < CACHE_TTL) {
        return entry.url;
      }
      // Expired, remove it
      localStorage.removeItem(`avatar_${username}`);
    }
  } catch (e) {
    console.error('Error reading from cache:', e);
  }
  return null;
};

const setCachedAvatar = (username: string, url: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const entry: CacheEntry = {
      url,
      timestamp: Date.now(),
    };
    localStorage.setItem(`avatar_${username}`, JSON.stringify(entry));
  } catch (e) {
    console.error('Error writing to cache:', e);
  }
};

/**
 * Extract username from Kick URL
 */
export const extractKickUsername = (url: string): string | null => {
  try {
    const match = url.match(/kick\.com\/([^/?]+)/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

/**
 * Extract username from Twitch URL
 */
export const extractTwitchUsername = (url: string): string | null => {
  try {
    const match = url.match(/twitch\.tv\/([^/?]+)/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

/**
 * Fetch avatar from Kick API
 */
export const fetchKickAvatar = async (username: string): Promise<string> => {
  // Check memory cache first
  if (avatarCache.has(username)) {
    return avatarCache.get(username)!;
  }
  
  // Check local storage cache
  const cached = getCachedAvatar(username);
  if (cached) {
    avatarCache.set(username, cached);
    return cached;
  }
  
  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${username}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Kick API returned ${response.status}`);
    }
    
    const data = await response.json();
    const avatarUrl = data.user?.profile_pic || getPlaceholderAvatar(username);
    
    // Cache the result
    avatarCache.set(username, avatarUrl);
    setCachedAvatar(username, avatarUrl);
    
    return avatarUrl;
  } catch (error) {
    console.error(`Error fetching Kick avatar for ${username}:`, error);
    return getPlaceholderAvatar(username);
  }
};

/**
 * Get Twitch avatar (placeholder for now)
 * In production, you'd use Twitch API with OAuth
 */
export const getTwitchAvatar = (username: string): string => {
  const cached = getCachedAvatar(username);
  if (cached) return cached;
  
  // Use UI Avatars as placeholder
  const placeholderUrl = getPlaceholderAvatar(username);
  setCachedAvatar(username, placeholderUrl);
  
  return placeholderUrl;
};

/**
 * Generate placeholder avatar using UI Avatars service
 */
export const getPlaceholderAvatar = (name: string): string => {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&background=D32F2F&color=fff&size=256&bold=true`;
};

/**
 * Main function to fetch avatar for a streamer
 */
export const fetchStreamerAvatar = async (
  kickLink?: string,
  twitchLink?: string,
  nombre?: string
): Promise<string> => {
  // Try Kick first
  if (kickLink) {
    const username = extractKickUsername(kickLink);
    if (username) {
      try {
        return await fetchKickAvatar(username);
      } catch (error) {
        console.error('Error fetching Kick avatar:', error);
      }
    }
  }
  
  // Try Twitch
  if (twitchLink) {
    const username = extractTwitchUsername(twitchLink);
    if (username) {
      return getTwitchAvatar(username);
    }
  }
  
  // Fallback to placeholder with streamer name
  return getPlaceholderAvatar(nombre || 'Streamer');
};

/**
 * Prefetch avatars for multiple streamers
 * Useful for initial page load
 */
export const prefetchAvatars = async (
  streamers: Array<{ kickLink?: string; twitchLink?: string; nombre: string }>
): Promise<void> => {
  const promises = streamers.map(s => 
    fetchStreamerAvatar(s.kickLink, s.twitchLink, s.nombre)
  );
  
  await Promise.allSettled(promises);
};