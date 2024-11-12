import React from 'react';
import { BarChart3, Clock, Tag, Repeat2 } from 'lucide-react';
import type { YouTubeVideo } from '../types/youtube';
import { formatDuration } from '../utils/formatters';

interface PlaylistAnalyticsProps {
  videos: YouTubeVideo[];
}

const PlaylistAnalytics = ({ videos }: PlaylistAnalyticsProps) => {
  const totalDuration = videos.reduce((acc, video) => {
    const duration = video.duration;
    // Convert ISO 8601 duration to seconds
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return acc;
    
    const hours = (match[1] || '').replace('H', '') || '0';
    const minutes = (match[2] || '').replace('M', '') || '0';
    const seconds = (match[3] || '').replace('S', '') || '0';
    
    return acc + parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  }, 0);

  const uniqueChannels = new Set(videos.map(video => video.channelTitle)).size;
  const duplicateVideos = videos.length - new Set(videos.map(video => video.id)).size;

  const stats = [
    {
      icon: BarChart3,
      label: 'Total Videos',
      value: videos.length.toString(),
    },
    {
      icon: Clock,
      label: 'Total Duration',
      value: formatDuration(`PT${totalDuration}S`),
    },
    {
      icon: Tag,
      label: 'Unique Channels',
      value: uniqueChannels.toString(),
    },
    {
      icon: Repeat2,
      label: 'Duplicate Videos',
      value: duplicateVideos.toString(),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-700 rounded-lg">
              <Icon className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistAnalytics;