import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Youtube } from 'lucide-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <Youtube className="h-16 w-16 text-red-500 mx-auto" />
        <h1 className="text-4xl font-bold">YouTube Playlist Analyzer</h1>
        <p className="text-gray-400">
          Organize and analyze your YouTube playlists with powerful tools and insights
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;