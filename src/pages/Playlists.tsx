import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useYouTubeStore } from '../store/youtube';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import VideoGrid from '../components/VideoGrid';
import VideoPlayer from '../components/VideoPlayer';
import PlaylistAnalytics from '../components/PlaylistAnalytics';
import VideoFilters from '../components/VideoFilters';
import { PlaySquare, Clock, Lock } from 'lucide-react';
import type { YouTubeVideo } from '../types/youtube';

const Playlists = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { playlists, videos, isLoading, error, fetchPlaylists, fetchPlaylistVideos } = useYouTubeStore();
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [sortBy, setSortBy] = useState('date');
  const [filterChannel, setFilterChannel] = useState('');

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: 'https://www.googleapis.com/auth/youtube.readonly',
        });
        await fetchPlaylists(accessToken);
      } catch (error) {
        console.error('Failed to load playlists:', error);
      }
    };
    loadPlaylists();
  }, [fetchPlaylists, getAccessTokenSilently]);

  const handlePlaylistClick = async (playlistId: string) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: 'https://www.googleapis.com/auth/youtube.readonly',
      });
      await fetchPlaylistVideos(playlistId, accessToken);
    } catch (error) {
      console.error('Failed to load playlist videos:', error);
    }
  };

  const channels = Array.from(new Set(videos.map(video => video.channelTitle))).sort();

  const filteredAndSortedVideos = videos
    .filter(video => !filterChannel || video.channelTitle === filterChannel)
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return parseInt(b.viewCount) - parseInt(a.viewCount);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <button
          onClick={() => fetchPlaylists}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No playlists found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map(playlist => (
            <div
              key={playlist.id}
              onClick={() => handlePlaylistClick(playlist.id)}
              className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors overflow-hidden cursor-pointer"
            >
              <div className="aspect-video bg-gray-900">
                {playlist.thumbnailUrl ? (
                  <img
                    src={playlist.thumbnailUrl}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PlaySquare className="h-12 w-12 text-gray-600" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg line-clamp-2">{playlist.title}</h3>
                  {playlist.privacyStatus === 'private' && (
                    <Lock className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="mt-2 text-sm text-gray-400">
                  {playlist.itemCount} {playlist.itemCount === 1 ? 'video' : 'videos'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <>
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold">Playlist Analytics</h2>
            <PlaylistAnalytics videos={videos} />
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Playlist Videos</h2>
            <VideoFilters
              sortBy={sortBy}
              onSortChange={setSortBy}
              filterChannel={filterChannel}
              onFilterChange={setFilterChannel}
              channels={channels}
            />
            <VideoGrid 
              videos={filteredAndSortedVideos} 
              onVideoClick={setSelectedVideo}
            />
          </div>
        </>
      )}

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default Playlists;