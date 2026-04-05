'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  return (
    <header className="top-0 z-50 sticky bg-[#020817]/70 backdrop-blur-xl border-white/[0.06] border-b">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 py-3 max-w-7xl">
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-90 font-bold transition-opacity"
        >
          <div className="flex justify-center items-center bg-gradient-to-br from-cyan-400 to-violet-600 shadow-[0_0_12px_rgba(139,92,246,0.5)] rounded-lg w-7 h-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span className="bg-clip-text bg-gradient-to-r from-white to-white/70 text-transparent">
            Smart README Generator
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/generate"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            Generate
          </Link>
          <a
            href="https://github.com/Open-Core-Lab/smart-readme-generator"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
