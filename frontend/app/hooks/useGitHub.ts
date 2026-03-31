'use client';

import { useState, useCallback } from 'react';
import { fetchGitHubUser, fetchGitHubRepos } from '../services/githubClient';
import type { GitHubUser, GitHubRepo } from '../types';

interface UseGitHubReturn {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
  fetchUser: (username: string) => Promise<void>;
  reset: () => void;
}

export function useGitHub(): UseGitHubReturn {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (username: string) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [userData, repoData] = await Promise.all([
        fetchGitHubUser(username),
        fetchGitHubRepos(username),
      ]);
      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch GitHub data.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUser(null);
    setRepos([]);
    setError(null);
  }, []);

  return { user, repos, loading, error, fetchUser, reset };
}
