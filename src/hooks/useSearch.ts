import { useMemo } from 'react';
import Fuse from 'fuse.js';
import type { YouTubeVideo } from '../types/youtube';

const fuseOptions = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'description', weight: 1 },
    'channelTitle',
  ],
  threshold: 0.3,
  includeScore: true,
};

export function useSearch(videos: YouTubeVideo[], query: string) {
  const fuse = useMemo(() => new Fuse(videos, fuseOptions), [videos]);

  const results = useMemo(() => {
    if (!query) return videos;
    return fuse.search(query).map(result => result.item);
  }, [fuse, query, videos]);

  return results;
}