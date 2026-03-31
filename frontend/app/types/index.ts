export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  email: string | null;
  blog: string | null;
  company: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AISuggestion {
  section: string;
  content: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
}

export interface GenerateReadmePayload {
  user: GitHubUser;
  repos: GitHubRepo[];
  templateId?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
