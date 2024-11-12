import React from 'react';
import { X } from 'lucide-react';
import type { YouTubeVideo } from '../types/youtube';
import { formatDuration, formatViewCount, formatDate } from '../utils/formatters';

interface VideoPlayerProps {
  video: YouTubeVideo;
  onClose: () => void;
}

const VideoPlayer = ({ video, onClose }: VideoPlayerProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-5xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{video.title}</h2>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
            <span>{formatViewCount(video.viewCount)} views</span>
            <span>•</span>
            <span>{formatDate(video.publishedAt)}</span>
            <span>•</span>
            <span>{formatDuration(video.duration)}</span>
          </div>

          <div className="text-gray-300 whitespace-pre-wrap">{video.description}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;