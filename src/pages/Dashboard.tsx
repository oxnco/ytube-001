import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PlaySquare, Clock, Tag, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth0();

  const stats = [
    { icon: PlaySquare, label: 'Total Playlists', value: '0' },
    { icon: Clock, label: 'Total Watch Time', value: '0 hrs' },
    { icon: Tag, label: 'Unique Tags', value: '0' },
    { icon: AlertCircle, label: 'Duplicate Videos', value: '0' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Welcome to YouTube Playlist Analyzer</h2>
        <p className="text-gray-400 mb-8">Please login to access your YouTube data</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="text-gray-400 text-center py-8">
            No recent activity to display
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Popular Playlists</h2>
          <div className="text-gray-400 text-center py-8">
            No playlists to display
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;