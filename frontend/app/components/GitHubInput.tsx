'use client';

import { useState } from 'react';
import Button from './Button';

interface GitHubInputProps {
  onSubmit: (username: string) => void;
  loading?: boolean;
}

export default function GitHubInput({
  onSubmit,
  loading = false,
}: GitHubInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex sm:flex-row flex-col gap-3 w-full max-w-lg"
    >
      <label htmlFor="github-username" className="sr-only">
        GitHub username
      </label>
      <input
        id="github-username"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter GitHub username…"
        autoComplete="off"
        className="flex-1 bg-white/[0.05] backdrop-blur-sm px-4 py-2.5 border border-white/[0.1] focus:border-cyan-500/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white text-sm transition-all placeholder-white/30"
        required
      />
      <Button type="submit" loading={loading} disabled={!value.trim()}>
        Fetch Profile
      </Button>
    </form>
  );
}
