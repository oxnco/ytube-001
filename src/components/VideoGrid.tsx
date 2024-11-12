import React from 'react';
import type { YouTubeVideo } from '../services/youtube';
import { Play, Eye } from 'lucide-react';

interface VideoGridProps {
  videos: YouTubeVideo[];
}

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map(video => (
        <div key={video.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
          <div className="aspect-video bg-gray-900 relative group">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="h-12 w-12" />
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
            <div className="text-sm text-gray-400 space-y-2">
              <p>{video.channelTitle}</p>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{parseInt(video.viewCount).toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;