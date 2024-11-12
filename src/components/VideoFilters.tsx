import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

interface VideoFiltersProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  filterChannel: string;
  onFilterChange: (value: string) => void;
  channels: string[];
}

const VideoFilters = ({
  sortBy,
  onSortChange,
  filterChannel,
  onFilterChange,
  channels,
}: VideoFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
      <div className="flex items-center space-x-3">
        <SortAsc className="h-5 w-5 text-gray-400" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="date">Date Added</option>
          <option value="views">View Count</option>
          <option value="title">Title</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      <div className="flex items-center space-x-3">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={filterChannel}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Channels</option>
          {channels.map(channel => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoFilters;