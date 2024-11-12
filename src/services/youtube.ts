const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  itemCount: number;
  privacyStatus: 'private' | 'public' | 'unlisted';
  createdAt: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
}

async function fetchFromYouTube(endpoint: string, params: Record<string, string>) {
  const queryParams = new URLSearchParams({
    ...params,
    key: API_KEY,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch from YouTube API');
  }

  return response.json();
}

export async function fetchUserPlaylists(accessToken: string): Promise<YouTubePlaylist[]> {
  const data = await fetchFromYouTube('/playlists', {
    part: 'snippet,contentDetails,status',
    mine: 'true',
    maxResults: '50',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails?.high?.url || null,
    itemCount: item.contentDetails.itemCount,
    privacyStatus: item.status.privacyStatus,
    createdAt: item.snippet.publishedAt,
  }));
}

export async function fetchPlaylistVideos(playlistId: string, accessToken: string): Promise<YouTubeVideo[]> {
  const data = await fetchFromYouTube('/playlistItems', {
    part: 'snippet,contentDetails',
    playlistId,
    maxResults: '50',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const videoIds = data.items.map((item: any) => item.contentDetails.videoId).join(',');
  const videosData = await fetchFromYouTube('/videos', {
    part: 'snippet,contentDetails,statistics',
    id: videoIds,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return videosData.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails?.high?.url || null,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    duration: item.contentDetails.duration,
    viewCount: item.statistics.viewCount,
  }));
}