import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { GrotMascot } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-start justify-center gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center md:gap-14 lg:px-10">
        <div className="h-52 w-72 shrink-0">
          <GrotMascot variant="search" eager animate={false} className="h-full w-full drop-shadow-[0_14px_16px_rgba(60,40,10,0.3)]" />
        </div>
        <div>
          <p className="label">404 · no data</p>
          <h1 className="mt-2 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em]">
            Grot looked everywhere.
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            This page isn&apos;t in any dashboard, log or trace. Let&apos;s get you back to somewhere that exists.
          </p>
          <Link href="/" className="btn btn-primary mt-8">
            Back to home <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
