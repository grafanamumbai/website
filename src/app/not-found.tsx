import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { GrotMascot } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#090b0e] text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="h-52 w-72">
          <GrotMascot variant="search" eager animate={false} className="h-full w-full drop-shadow-2xl" />
        </div>
        <p className="mt-6 font-mono text-sm font-bold text-orange-400">404 • no data</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-black tracking-tight">Grot looked everywhere</h1>
        <p className="mt-3 max-w-md text-base text-zinc-300">
          This page doesn&apos;t exist in any dashboard, log or trace. Let&apos;s get you back on the map.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-orange-500 px-7 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:scale-105"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
