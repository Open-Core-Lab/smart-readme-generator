'use client';

import { useState } from 'react';
import Button from './Button';
import { Input } from '@/components/ui/input';

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
      <Input
        id="github-username"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter GitHub username…"
        autoComplete="off"
        className="flex-1 h-9"
        required
      />
      <Button type="submit" loading={loading} disabled={!value.trim()}>
        Fetch Profile
      </Button>
    </form>
  );
}
