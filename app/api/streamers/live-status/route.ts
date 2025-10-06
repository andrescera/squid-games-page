import { NextResponse } from 'next/server';
import streamersData from '@/data/streamers.json';
import { Streamer, LiveStatus } from '@/lib/types';

// Cache for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
const cache = new Map<string, { data: LiveStatus; timestamp: number }>();

async function fetchKickLiveStatus(username: string): Promise<LiveStatus> {
  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${username}`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Kick API returned ${response.status}`);
    }

    const data = await response.json();
    
    return {
      isLive: data.livestream !== null && data.livestream !== undefined,
      currentViewers: data.livestream?.viewer_count || 0,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error(`Error fetching Kick status for ${username}:`, error);
    return {
      isLive: false,
      currentViewers: 0,
      lastUpdated: Date.now(),
    };
  }
}

function extractUsername(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/kick\.com\/([^/?]+)/i);
  return match ? match[1] : null;
}

export async function GET() {
  const streamers = streamersData as Streamer[];
  const liveStatuses: Record<string, LiveStatus> = {};
  
  // Fetch live status for all streamers with Kick links
  const promises = streamers
    .filter(s => s.kickLink)
    .map(async (streamer) => {
      const username = extractUsername(streamer.kickLink);
      if (!username) return;

      // Check cache first
      const cached = cache.get(username);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        liveStatuses[streamer.id] = cached.data;
        return;
      }

      // Fetch fresh data
      const status = await fetchKickLiveStatus(username);
      cache.set(username, { data: status, timestamp: Date.now() });
      liveStatuses[streamer.id] = status;
    });

  await Promise.all(promises);

  return NextResponse.json(liveStatuses, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}