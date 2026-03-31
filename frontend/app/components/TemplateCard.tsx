'use client';

import type { Template } from '../types';

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
    <button
      onClick={() => onSelect(template.id)}
      className={[
        'w-full text-left rounded-xl border-2 p-4 transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50',
        selected
          ? 'border-cyan-500/60 bg-cyan-500/[0.08] shadow-[0_0_20px_rgba(6,182,212,0.15)]'
          : 'border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20',
      ].join(' ')}
      aria-pressed={selected}
    >
      <p
        className={[
          'font-semibold text-sm',
          selected ? 'text-cyan-300' : 'text-white/90',
        ].join(' ')}
      >
        {template.name}
      </p>
      <p className="mt-1 text-white/40 text-xs leading-relaxed">
        {template.description}
      </p>
    </button>
  );
}
