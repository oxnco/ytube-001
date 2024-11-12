import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useYouTubeStore } from '../store/youtube';
import { useSearch } from '../hooks/useSearch';
import VideoGrid from '../components/VideoGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { videos, isLoading } = useYouTubeStore();
  const searchResults = useSearch(videos, searchQuery);

  const handleVideoClick = (video: any) => {
    // TODO: Implement video player modal
    console.log('Video clicked:', video);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Search</h1>
      
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search across all your playlists..."
          className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <VideoGrid videos={searchResults} onVideoClick={handleVideoClick} />
      )}
    </div>
  );
}

export default Search;