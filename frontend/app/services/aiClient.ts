import type { GenerateReadmePayload, AISuggestion } from '../types';

const BACKEND_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

async function apiFetch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BACKEND_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    throw new Error(
      'AI rate limit reached. Please wait a moment and try again.'
    );
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? `Server error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function generateReadme(
  payload: GenerateReadmePayload
): Promise<string> {
  const data = await apiFetch<{ readme: string }>('/api/generate', payload);
  return data.readme;
}

export async function generateSectionSuggestion(
  section: string,
  context: Record<string, unknown>
): Promise<AISuggestion> {
  return apiFetch<AISuggestion>('/api/suggest', { section, context });
}
