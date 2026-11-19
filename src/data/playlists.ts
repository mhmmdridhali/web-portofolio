export interface PlaylistTrack {
  title: string;
  artist: string;
  cover: string;
  src: string;
  spotifyUrl?: string;
}

export interface CuratedPlaylist {
  key: "seoul" | "ranum";
  id: string;
  name: string;
  description: string;
  spotifyUrl: string;
  playlistCover: string;
  tracks: PlaylistTrack[];
}

/**
 * Lightweight client-safe playlist metadata.
 * Full fallback tracks live in `src/data/playlists-server.ts` and are served via `/api/spotify-playlist`.
 */
export const CURATED_PLAYLISTS: CuratedPlaylist[] = [
  {
    key: "seoul",
    id: "5P0hFUrtO9EBFAyrbmkGLV",
    name: "Somewhere in Seoul",
    description:
      "A collection of melodies, quiet feelings, and memories somewhere in Seoul.",
    spotifyUrl:
      "https://open.spotify.com/playlist/5P0hFUrtO9EBFAyrbmkGLV?si=c876ec5c34ca43a4",
    playlistCover:
      "https://mosaic.scdn.co/640/ab67616d00001e027833c4c10979d7c3cfb67f09ab67616d00001e02a66e0e273f304294df029d17ab67616d00001e02d41cdd1f3e033a0ea1642112ab67616d00001e02e01d70b9b2173b44b863099f",
    tracks: [],
  },
  {
    key: "ranum",
    id: "4P8tIjKHTrj9lxTIdk4wbA",
    name: "Ranum",
    description:
      "Tentang rasa yang tumbuh perlahan, pikiran yang mengembara, dan waktu yang berjalan lebih tenang.",
    spotifyUrl:
      "https://open.spotify.com/playlist/4P8tIjKHTrj9lxTIdk4wbA?si=343cbecf979744e7",
    playlistCover:
      "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
    tracks: [],
  },
];
