import { create } from 'zustand';
import { fetchUserPlaylists, fetchPlaylistVideos } from '../services/youtube';
import type { YouTubePlaylist, YouTubeVideo } from '../services/youtube';

interface YouTubeStore {
  playlists: YouTubePlaylist[];
  videos: YouTubeVideo[];
  isLoading: boolean;
  error: string | null;
  fetchPlaylists: (accessToken: string) => Promise<void>;
  fetchPlaylistVideos: (playlistId: string, accessToken: string) => Promise<void>;
}

export const useYouTubeStore = create<YouTubeStore>((set) => ({
  playlists: [],
  videos: [],
  isLoading: false,
  error: null,
  fetchPlaylists: async (accessToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const playlists = await fetchUserPlaylists(accessToken);
      set({ playlists, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  fetchPlaylistVideos: async (playlistId: string, accessToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const videos = await fetchPlaylistVideos(playlistId, accessToken);
      set({ videos, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));