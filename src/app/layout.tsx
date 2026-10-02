import type { Metadata } from 'next';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import communityData from '@/data';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
});
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

const { chapter, currentEvent, socials } = communityData;
const pageTitle = currentEvent.hasUpcomingEvent
  ? `${currentEvent.title} · ${chapter.name}`
  : `${chapter.name} · free observability meetups in Mumbai`;

export const metadata: Metadata = {
  metadataBase: new URL(socials.website),
  title: pageTitle,
  description: currentEvent.hasUpcomingEvent
    ? `${chapter.description} Next meetup: ${currentEvent.date}, Mumbai.`
    : chapter.description,
  keywords: [
    'Grafana',
    'Grafana Mumbai',
    'Grafana & Friends',
    'Observability',
    'Prometheus',
    'Loki',
    'Tempo',
    'Mimir',
    'OpenTelemetry',
    'DevOps Mumbai',
    'SRE Community',
  ],
  authors: [{ name: 'Grafana & Friends Mumbai Community' }],
  openGraph: {
    title: pageTitle,
    description: chapter.description,
    url: socials.website,
    siteName: chapter.name,
    images: [
      {
        url: '/badge2.png',
        width: 1200,
        height: 630,
        alt: chapter.name,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: chapter.description,
    creator: '@grafanamumbai',
    images: ['/badge2.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('scroll-smooth', fraunces.variable, geist.variable, geistMono.variable)}>
      <body className="min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
