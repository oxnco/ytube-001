import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Shield, RefreshCw, Database, Trash2 } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth0();

  const sections = [
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your account security and privacy preferences',
    },
    {
      icon: RefreshCw,
      title: 'Data Sync',
      description: 'Configure automatic synchronization with YouTube',
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Manage your stored data and export options',
    },
    {
      icon: Trash2,
      title: 'Account Deletion',
      description: 'Permanently delete your account and all associated data',
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-4">
          <img
            src={user?.picture}
            alt={user?.name}
            className="h-16 w-16 rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/64';
            }}
          />
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <Icon className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;