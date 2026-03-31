import type { GitHubUser, GitHubRepo } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

async function githubFetch<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const res = await fetch(`${GITHUB_API_BASE}${path}`, { headers });

  if (res.status === 403) {
    const resetAt = res.headers.get('X-RateLimit-Reset');
    const resetDate = resetAt
      ? new Date(Number(resetAt) * 1000).toLocaleTimeString()
      : 'soon';
    throw new Error(`GitHub API rate limit exceeded. Resets at ${resetDate}.`);
  }

  if (res.status === 404) {
    throw new Error(`GitHub user or resource not found.`);
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  if (
    !username ||
    !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username)
  ) {
    throw new Error('Invalid GitHub username.');
  }
  return githubFetch<GitHubUser>(`/users/${encodeURIComponent(username)}`);
}

export async function fetchGitHubRepos(
  username: string
): Promise<GitHubRepo[]> {
  if (
    !username ||
    !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username)
  ) {
    throw new Error('Invalid GitHub username.');
  }
  return githubFetch<GitHubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`
  );
}
