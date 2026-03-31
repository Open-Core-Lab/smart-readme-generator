'use client';

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTemplate } from '../../store/templateSlice';
import { setContent } from '../../store/editorSlice';
import type { AppDispatch, RootState } from '../../store';
import { useGitHub } from '../../hooks/useGitHub';
import { useAI } from '../../hooks/useAI';
import { generateLocalReadme } from '../../utils/generateLocalReadme';
import { copyToClipboard } from '../../utils/clipboard';
import { downloadMarkdown } from '../../utils/download';
import Editor from '../../components/Editor';
import PreviewPane from '../../components/PreviewPane';
import GitHubInput from '../../components/GitHubInput';
import TemplateCard from '../../components/TemplateCard';
import Button from '../../components/Button';
import type { Template } from '../../types';

const TEMPLATES: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple single-page README.',
    content: '',
  },
  {
    id: 'detailed',
    name: 'Detailed',
    description: 'Full-featured README with badges, TOC, and sections.',
    content: '',
  },
  {
    id: 'profile',
    name: 'Profile',
    description: 'GitHub profile README with stats and skills.',
    content: '',
  },
];

export default function GeneratePage() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTemplateId = useSelector(
    (state: RootState) => state.template.selectedId
  );
  const editorContent = useSelector((state: RootState) => state.editor.content);

  const {
    user,
    repos,
    loading: githubLoading,
    error: githubError,
    fetchUser,
  } = useGitHub();
  const { generate, loading: aiLoading, error: aiError } = useAI();

  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = useCallback(
    (id: string) => {
      dispatch(setSelectedTemplate(id));
      if (user) {
        dispatch(setContent(generateLocalReadme(user, repos, id)));
      }
    },
    [dispatch, user, repos]
  );

  const handleFetchUser = async (username: string) => {
    await fetchUser(username);
  };

  const handleGenerate = async () => {
    if (!user) return;
    await generate(user, repos, selectedTemplateId ?? undefined);
  };

  const handleCopy = async () => {
    await copyToClipboard(editorContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadMarkdown(editorContent, `${user?.login ?? 'README'}.md`);
  };

  return (
    <div className="flex flex-col flex-1 gap-5 mx-auto px-4 sm:px-6 py-8 w-full max-w-7xl">
      {/* Step 1: GitHub Username */}
      <section className="bg-white/[0.04] backdrop-blur-md p-6 border border-white/[0.08] rounded-2xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="flex flex-shrink-0 justify-center items-center bg-cyan-500/15 border border-cyan-500/30 rounded-full w-7 h-7 font-bold text-cyan-400 text-xs">
            1
          </span>
          <h2 className="font-semibold text-white">
            Enter your GitHub username
          </h2>
        </div>
        <GitHubInput onSubmit={handleFetchUser} loading={githubLoading} />
        {githubError && (
          <p
            role="alert"
            className="bg-red-500/10 mt-3 px-3 py-2 border border-red-500/20 rounded-lg text-red-400 text-sm"
          >
            {githubError}
          </p>
        )}
        {user && (
          <div className="flex items-center gap-3 bg-white/[0.04] mt-4 p-3 border border-white/[0.06] rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="rounded-full ring-2 ring-cyan-500/30 w-10 h-10"
            />
            <div>
              <p className="font-medium text-white">
                {user.name ?? user.login}
              </p>
              <p className="text-white/45 text-sm">
                {user.public_repos} repos · {user.followers} followers
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Step 2: Choose Template */}
      {user && (
        <section className="bg-white/[0.04] backdrop-blur-md p-6 border border-white/[0.08] rounded-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex flex-shrink-0 justify-center items-center bg-cyan-500/15 border border-cyan-500/30 rounded-full w-7 h-7 font-bold text-cyan-400 text-xs">
              2
            </span>
            <h2 className="font-semibold text-white">Choose a template</h2>
          </div>
          <div className="gap-3 grid grid-cols-1 sm:grid-cols-3">
            {TEMPLATES.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                selected={selectedTemplateId === t.id}
                onSelect={handleSelectTemplate}
              />
            ))}
          </div>
        </section>
      )}

      {/* Step 3: Generate */}
      {user && (
        <section className="bg-white/[0.04] backdrop-blur-md p-6 border border-white/[0.08] rounded-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex flex-shrink-0 justify-center items-center bg-cyan-500/15 border border-cyan-500/30 rounded-full w-7 h-7 font-bold text-cyan-400 text-xs">
              3
            </span>
            <h2 className="font-semibold text-white">Generate README</h2>
          </div>
          <Button
            onClick={handleGenerate}
            loading={aiLoading}
            disabled={!user || aiLoading}
          >
            ✨ Generate with AI
          </Button>
          {aiError && (
            <p
              role="alert"
              className="bg-red-500/10 mt-3 px-3 py-2 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              {aiError}
            </p>
          )}
        </section>
      )}

      {/* Editor + Preview */}
      <section className="flex flex-col flex-1 min-h-[500px]">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <span className="flex flex-shrink-0 justify-center items-center bg-cyan-500/15 border border-cyan-500/30 rounded-full w-7 h-7 font-bold text-cyan-400 text-xs">
              4
            </span>
            <h2 className="font-semibold text-white">Edit &amp; Export</h2>
          </div>
          {editorContent && (
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? '✓ Copied!' : 'Copy'}
              </Button>
              <Button variant="secondary" size="sm" onClick={handleDownload}>
                ⬇ Download .md
              </Button>
            </div>
          )}
        </div>
        <div className="flex md:flex-row flex-col border border-white/[0.08] rounded-2xl h-[680px] overflow-hidden">
          <div className="flex-1 border-white/[0.06] md:border-r min-w-0 overflow-hidden">
            <Editor />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <PreviewPane />
          </div>
        </div>
      </section>
    </div>
  );
}
