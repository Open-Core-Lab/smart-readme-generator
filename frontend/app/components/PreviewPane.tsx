'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function PreviewPane() {
  const content = useSelector((state: RootState) => state.editor.content);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-shrink-0 px-3 py-2">
        <span className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
          Preview
        </span>
      </div>
      <Separator />
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4">
          {content ? (
            <article className="prose-pre:bg-white/[0.06] prose-invert prose-pre:border prose-pre:border-white/[0.08] max-w-none prose-a:text-cyan-400 prose-code:text-cyan-300 prose-headings:text-white prose-p:text-white/75 [&_div[align]]:text-center [&_h1[align]]:text-center [&_p[align='center']]:text-center prose prose-sm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {content}
              </ReactMarkdown>
            </article>
          ) : (
            <p className="text-muted-foreground/60 text-sm italic">
              Preview will appear here once you generate or edit your README.
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
