import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './Providers';
import Navbar from './components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Smart README Generator',
  description:
    'AI-powered tool to generate professional, beautiful README.md files for your GitHub repositories.',
  keywords: ['README', 'GitHub', 'AI', 'Markdown', 'Generator', 'Open Source'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="flex flex-col min-h-full">
        <Providers>
          <Navbar />
          <main className="flex flex-col flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
