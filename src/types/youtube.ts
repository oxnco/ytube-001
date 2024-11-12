export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  itemCount: number;
  privacyStatus: string;
  createdAt: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  playlistIds: string[];
}

export interface YouTubeState {
  playlists: YouTubePlaylist[];
  videos: YouTubeVideo[];
  isLoading: boolean;
  error: string | null;
  fetchPlaylists: () => Promise<void>;
  fetchPlaylistVideos: (playlistId: string) => Promise<void>;
}