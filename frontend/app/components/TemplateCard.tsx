'use client';

import type { Template } from '../types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  template: Template;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function TemplateCard({
  template,
  selected,
  onSelect,
}: TemplateCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={() => onSelect(template.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(template.id);
        }
      }}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 transition-all duration-200 cursor-pointer',
        selected
          ? 'ring-2 ring-cyan-500/60 bg-cyan-500/[0.08] shadow-[0_0_20px_rgba(6,182,212,0.15)]'
          : 'hover:bg-muted/50 hover:ring-white/20'
      )}
    >
      <CardHeader>
        <CardTitle className={cn('text-sm', selected ? 'text-cyan-400' : '')}>
          {template.name}
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed">
          {template.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
