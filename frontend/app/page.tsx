import Link from 'next/link';
import Button from './components/Button';

async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/Open-Core-Lab/smart-readme-generator',
      {
        next: { revalidate: 300 },
        headers: {
          'User-Agent': 'smart-readme-generator',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

const FEATURES = [
  {
    title: 'GitHub Profile Fetch',
    description:
      'Automatically pulls your bio, repositories, and stats from GitHub.',
    icon: '🐙',
  },
  {
    title: 'AI-Powered Generation',
    description: 'GPT integration writes detailed README sections in seconds.',
    icon: '✨',
  },
  {
    title: 'Live Preview',
    description: 'See rendered Markdown side-by-side as you edit.',
    icon: '👀',
  },
  {
    title: 'Multiple Templates',
    description: 'Choose from Minimal, Detailed, or Profile README templates.',
    icon: '🗂️',
  },
  {
    title: 'Undo / Redo',
    description: 'Full edit history so you can experiment without fear.',
    icon: '↩️',
  },
  {
    title: 'Export Instantly',
    description: 'Copy to clipboard or download your README.md with one click.',
    icon: '⬇️',
  },
];

export default async function HomePage() {
  const stars = await getStarCount();
  return (
    <div className="flex flex-col items-center px-4 sm:px-6">
      {/* Hero */}
      <section className="flex flex-col items-center gap-7 py-24 max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm px-4 py-1.5 border border-white/[0.12] rounded-full font-medium text-cyan-300 text-sm">
          <span className="bg-cyan-400 rounded-full w-1.5 h-1.5 animate-pulse" />
          Open Source · AI-Powered
        </span>

        <h1 className="font-bold text-4xl sm:text-6xl leading-[1.1] tracking-tight">
          <span className="text-white">Generate beautiful </span>
          <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent">
            README files
          </span>
          <span className="text-white"> in seconds</span>
        </h1>

        <p className="max-w-xl text-white/50 text-lg leading-relaxed">
          Smart README Generator fetches your GitHub profile and uses AI to
          craft professional, visually appealing README.md files — so you can
          focus on building.
        </p>

        <div className="flex sm:flex-row flex-col gap-3 mt-2">
          <Link href="/generate">
            <Button size="lg">Get Started — It&apos;s Free</Button>
          </Link>
          <a
            href="https://github.com/Open-Core-Lab/smart-readme-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary">
              {stars !== null && (
                <span className="inline-flex items-center bg-white/[0.1] ml-1 px-2 py-0.5 border border-white/[0.12] rounded-lg font-semibold tabular-nums text-xs">
                  {stars.toLocaleString()} ⭐
                </span>
              )}
              View on GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="pb-24 w-full max-w-5xl">
        <h2 className="mb-12 font-bold text-white/80 text-2xl text-center">
          Everything you need
        </h2>
        <div className="gap-5 grid sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col gap-3 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-sm p-6 border border-white/[0.08] hover:border-white/[0.15] rounded-2xl transition-all duration-300"
            >
              <span
                className="flex justify-center items-center bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/[0.08] rounded-xl w-11 h-11 text-xl"
                aria-hidden="true"
              >
                {f.icon}
              </span>
              <h3 className="font-semibold text-white/90">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
