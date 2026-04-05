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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Sparkles, Copy, Download, Check } from 'lucide-react';

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
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="justify-center p-0 rounded-full min-w-7 size-7 font-bold text-xs"
            >
              1
            </Badge>
            <CardTitle>Enter your GitHub username</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <GitHubInput onSubmit={handleFetchUser} loading={githubLoading} />
          {githubError && (
            <Alert variant="destructive" className="mt-3">
              <AlertCircle className="size-4" />
              <AlertDescription>{githubError}</AlertDescription>
            </Alert>
          )}
          {user && (
            <div className="flex items-center gap-3 bg-muted/40 mt-4 p-3 border border-border rounded-xl">
              <Avatar size="lg">
                <AvatarImage
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                />
                <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {user.name ?? user.login}
                </p>
                <p className="text-muted-foreground text-sm">
                  {user.public_repos} repos · {user.followers} followers
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Choose Template */}
      {user && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="justify-center p-0 rounded-full min-w-7 size-7 font-bold text-xs"
              >
                2
              </Badge>
              <CardTitle>Choose a template</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}

      {/* Step 3: Generate */}
      {user && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="justify-center p-0 rounded-full min-w-7 size-7 font-bold text-xs"
              >
                3
              </Badge>
              <CardTitle>Generate README</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleGenerate}
              loading={aiLoading}
              disabled={!user || aiLoading}
            >
              <Sparkles className="size-4" />
              Generate with AI
            </Button>
            {aiError && (
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="size-4" />
                <AlertDescription>{aiError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Editor + Preview */}
      <section className="flex flex-col flex-1 min-h-[500px]">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="justify-center p-0 rounded-full min-w-7 size-7 font-bold text-xs"
            >
              4
            </Badge>
            <h2 className="font-semibold text-foreground">Edit &amp; Export</h2>
          </div>
          {editorContent && (
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="secondary" size="sm" onClick={handleDownload}>
                <Download className="size-3.5" />
                Download .md
              </Button>
            </div>
          )}
        </div>
        <div className="flex md:flex-row flex-col border border-border rounded-2xl h-[680px] overflow-hidden">
          <div className="flex-1 border-border md:border-r min-w-0 overflow-hidden">
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
