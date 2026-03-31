'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  generateReadme,
  generateSectionSuggestion,
} from '../services/aiClient';
import { setContent, setLoading, setError } from '../store/editorSlice';
import { generateLocalReadme } from '../utils/generateLocalReadme';
import type { AppDispatch, RootState } from '../store';
import type { GitHubUser, GitHubRepo } from '../types';

interface UseAIReturn {
  generate: (
    user: GitHubUser,
    repos: GitHubRepo[],
    templateId?: string
  ) => Promise<void>;
  suggest: (
    section: string,
    context: Record<string, unknown>
  ) => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export function useAI(): UseAIReturn {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.editor.isLoading);
  const error = useSelector((state: RootState) => state.editor.error);

  const generate = useCallback(
    async (user: GitHubUser, repos: GitHubRepo[], templateId?: string) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        // Try AI backend first; fall back to local generation when unavailable
        const readme = await generateReadme({ user, repos, templateId });
        dispatch(setContent(readme));
      } catch {
        try {
          const readme = generateLocalReadme(user, repos, templateId);
          dispatch(setContent(readme));
        } catch (localErr) {
          dispatch(
            setError(
              localErr instanceof Error
                ? localErr.message
                : 'Failed to generate README.'
            )
          );
        }
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const suggest = useCallback(
    async (
      section: string,
      context: Record<string, unknown>
    ): Promise<string | null> => {
      try {
        const suggestion = await generateSectionSuggestion(section, context);
        return suggestion.content;
      } catch {
        return null;
      }
    },
    []
  );

  return { generate, suggest, loading, error };
}
