import { google } from 'googleapis';
import type { YouTubePlaylist, YouTubeVideo } from '../types/youtube';

const youtube = google.youtube('v3');

export async function getAuthenticatedClient() {
  const client = new google.auth.OAuth2(
    import.meta.env.VITE_GOOGLE_CLIENT_ID,
    import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    `${window.location.origin}/callback`
  );

  // Get the access token from Auth0 user
  // This assumes you've set up Auth0 to include Google OAuth tokens
  // You'll need to implement this part based on your Auth0 setup
  const accessToken = localStorage.getItem('youtube_access_token');
  
  if (!accessToken) {
    throw new Error('No access token available');
  }

  client.setCredentials({ access_token: accessToken });
  return client;
}

export async function fetchUserPlaylists(): Promise<YouTubePlaylist[]> {
  try {
    const auth = await getAuthenticatedClient();
    const response = await youtube.playlists.list({
      auth,
      part: ['snippet', 'contentDetails', 'status'],
      mine: true,
      maxResults: 50,
    });

    return (response.data.items || []).map(playlist => ({
      id: playlist.id!,
      title: playlist.snippet!.title!,
      description: playlist.snippet!.description!,
      thumbnailUrl: playlist.snippet!.thumbnails?.default?.url || '',
      itemCount: playlist.contentDetails!.itemCount || 0,
      privacyStatus: playlist.status!.privacyStatus!,
      createdAt: playlist.snippet!.publishedAt!,
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
}

export async function fetchPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
  try {
    const auth = await getAuthenticatedClient();
    const response = await youtube.playlistItems.list({
      auth,
      part: ['snippet', 'contentDetails'],
      playlistId,
      maxResults: 50,
    });

    const videoIds = response.data.items?.map(item => item.contentDetails!.videoId!) || [];
    
    // Fetch additional video details
    const videoDetails = await youtube.videos.list({
      auth,
      part: ['snippet', 'contentDetails', 'statistics'],
      id: videoIds,
    });

    return (videoDetails.data.items || []).map(video => ({
      id: video.id!,
      title: video.snippet!.title!,
      description: video.snippet!.description!,
      thumbnailUrl: video.snippet!.thumbnails?.default?.url || '',
      channelTitle: video.snippet!.channelTitle!,
      channelId: video.snippet!.channelId!,
      publishedAt: video.snippet!.publishedAt!,
      duration: video.contentDetails!.duration!,
      viewCount: video.statistics!.viewCount!,
      playlistIds: [playlistId],
    }));
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    throw error;
  }
}