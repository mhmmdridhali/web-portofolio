import { NextRequest, NextResponse } from "next/server";
import type { PlaylistTrack } from "@/data/playlists";
import { SERVER_CURATED_PLAYLISTS } from "@/data/playlists-server";

interface PlaylistResponse {
  playlistId: string;
  playlistName: string;
  playlistDescription: string;
  playlistUrl: string;
  isConfigured: boolean;
  tracks: PlaylistTrack[];
}

const DEFAULT_SPOTIFY_PLAYLIST_URL =
  process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL || SERVER_CURATED_PLAYLISTS[0].id;

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const ITUNES_CONCURRENCY = 5;
const LIVE_CACHE_HEADER = "public, s-maxage=3600, stale-while-revalidate=86400";

const playlistCache = new Map<
  string,
  { data: PlaylistResponse; timestamp: number }
>();

function extractSpotifyPlaylistId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const urlMatch = trimmed.match(/playlist\/([a-zA-Z0-9]+)/);
  if (urlMatch?.[1]) return urlMatch[1];

  const uriMatch = trimmed.match(/spotify:playlist:([a-zA-Z0-9]+)/);
  if (uriMatch?.[1]) return uriMatch[1];

  if (/^[a-zA-Z0-9]{15,30}$/.test(trimmed)) return trimmed;
  return null;
}

interface SpotifyEmbedTrack {
  title?: string;
  subtitle?: string;
  uri?: string;
  audioPreview?: {
    url?: string;
  } | null;
}

async function resolveItunesPreviewAndCover(
  title: string,
  artist: string
): Promise<{ previewUrl: string | null; coverUrl: string | null }> {
  try {
    const cleanArtist = artist.replace(/\u00a0/g, " ").split(",")[0].trim();
    const query = encodeURIComponent(`${title} ${cleanArtist}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=1`,
      { signal: AbortSignal.timeout(3500) }
    );
    if (!res.ok) return { previewUrl: null, coverUrl: null };
    const json = await res.json();
    const item = json?.results?.[0];
    if (!item) return { previewUrl: null, coverUrl: null };

    const previewUrl: string | null = item.previewUrl || null;
    const coverUrl: string | null = item.artworkUrl100
      ? String(item.artworkUrl100).replace("100x100bb", "600x600bb")
      : null;
    return { previewUrl, coverUrl };
  } catch {
    return { previewUrl: null, coverUrl: null };
  }
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const current = nextIndex++;
      results[current] = await mapper(items[current]);
    }
  }

  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

export async function GET(request: NextRequest) {
  const rawParam =
    request.nextUrl.searchParams.get("id") ||
    request.nextUrl.searchParams.get("playlist") ||
    DEFAULT_SPOTIFY_PLAYLIST_URL;

  const extractedId = extractSpotifyPlaylistId(rawParam);
  const normalizedKey = rawParam.trim().toLowerCase();

  // Strictly allowlist against SERVER_CURATED_PLAYLISTS; unknown IDs fall back to default
  const curated =
    SERVER_CURATED_PLAYLISTS.find(
      (p) =>
        (extractedId !== null && p.id === extractedId) ||
        p.key === normalizedKey
    ) || SERVER_CURATED_PLAYLISTS[0];

  const playlistId = curated.id;
  const playlistUrl = curated.spotifyUrl;

  const cached = playlistCache.get(playlistId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, {
      headers: { "Cache-Control": LIVE_CACHE_HEADER },
    });
  }

  // Pre-indexed map of known covers/tracks so only newly added tracks hit iTunes
  const knownByTitle = new Map<string, PlaylistTrack>();
  for (const pl of SERVER_CURATED_PLAYLISTS) {
    for (const t of pl.tracks) {
      knownByTitle.set(t.title.toLowerCase(), t);
    }
  }

  try {
    const embedRes = await fetch(
      `https://open.spotify.com/embed/playlist/${playlistId}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!embedRes.ok) {
      throw new Error(`Spotify embed status ${embedRes.status}`);
    }

    const html = await embedRes.text();
    const match = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
    );

    if (!match?.[1]) {
      throw new Error("Could not find __NEXT_DATA__ in Spotify embed");
    }

    const nextData = JSON.parse(match[1]);
    const entity = nextData?.props?.pageProps?.state?.data?.entity;
    const playlistName: string = curated.name;
    const playlistDescription: string = curated.description;
    const playlistCover: string =
      entity?.coverArt?.sources?.[0]?.url || curated.playlistCover;
    const rawTracks: SpotifyEmbedTrack[] = Array.isArray(entity?.trackList)
      ? entity.trackList
      : [];

    const resolvedTracks = await mapWithConcurrency(
      rawTracks,
      ITUNES_CONCURRENCY,
      async (item): Promise<PlaylistTrack | null> => {
        const title = (item.title || "").trim();
        const artist = (item.subtitle || "Unknown Artist")
          .replace(/\u00a0/g, " ")
          .trim();
        if (!title) return null;

        const known = knownByTitle.get(title.toLowerCase());
        const spotifyPreview = item.audioPreview?.url || null;
        const trackId = item.uri?.split(":")?.[2];
        const spotifyTrackUrl = trackId
          ? `https://open.spotify.com/track/${trackId}`
          : playlistUrl;

        if (known && (spotifyPreview || known.src)) {
          return {
            title,
            artist,
            cover: known.cover || playlistCover,
            src: spotifyPreview || known.src,
            spotifyUrl: spotifyTrackUrl,
          };
        }

        const itunes = await resolveItunesPreviewAndCover(title, artist);
        const src = spotifyPreview || itunes.previewUrl;
        if (!src) return null;

        return {
          title,
          artist,
          cover: itunes.coverUrl || playlistCover,
          src,
          spotifyUrl: spotifyTrackUrl,
        };
      }
    );

    const validTracks = resolvedTracks.filter(
      (t): t is PlaylistTrack => t !== null
    );

    const isLive = validTracks.length > 0;
    const payload: PlaylistResponse = {
      playlistId,
      playlistName,
      playlistDescription,
      playlistUrl,
      isConfigured: true,
      tracks: isLive ? validTracks : curated.tracks,
    };

    if (isLive) {
      playlistCache.set(playlistId, {
        data: payload,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": isLive ? LIVE_CACHE_HEADER : "no-store",
      },
    });
  } catch {
    if (cached) {
      return NextResponse.json(cached.data, {
        headers: { "Cache-Control": "public, s-maxage=300" },
      });
    }

    return NextResponse.json(
      {
        playlistId,
        playlistName: curated.name,
        playlistDescription: curated.description,
        playlistUrl,
        isConfigured: true,
        tracks: curated.tracks,
      } satisfies PlaylistResponse,
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
