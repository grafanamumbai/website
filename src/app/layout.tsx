import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import communityData from '@/data';

export const metadata: Metadata = {
  metadataBase: new URL(communityData.socials.website),
  title: `${communityData.chapter.name} | ${communityData.currentEvent.title}`,
  description: `${communityData.chapter.description} Join us on ${communityData.currentEvent.date} in Mumbai.`,
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
    title: `${communityData.chapter.name} | ${communityData.currentEvent.title}`,
    description: communityData.chapter.description,
    url: communityData.socials.website,
    siteName: communityData.chapter.name,
    images: [
      {
        url: '/badge2.png',
        width: 1200,
        height: 630,
        alt: communityData.chapter.name,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${communityData.chapter.name} | ${communityData.currentEvent.title}`,
    description: communityData.chapter.description,
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-[#0c0e14] font-sans antialiased text-white overflow-x-hidden selection:bg-orange-500 selection:text-white')}>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
