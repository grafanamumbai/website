'use client';

import {
  Activity,
  FileText,
  Network,
  Cpu,
  CheckCircle2,
  Sparkles,
  Send,
  Layers,
} from 'lucide-react';
import communityData, { LearningTrack } from '@/data';
import {
  GrafanaLogo,
  PrometheusLogo,
  OpenTelemetryLogo,
  LokiLogo,
  TempoLogo,
  MimirLogo,
  PyroscopeLogo,
  BeylaLogo,
} from '@/components/icons';

const trackIcons: Record<string, React.ReactNode> = {
  metrics: (
    <div className="flex items-center gap-1.5">
      <div className="p-1 rounded-lg bg-orange-500/10">
        <GrafanaLogo className="h-5 w-5 text-orange-400" />
      </div>
      <PrometheusLogo className="h-7 w-7" />
    </div>
  ),
  logs: (
    <div className="flex items-center gap-1.5">
      <LokiLogo className="h-7 w-7" />
      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
        <FileText className="h-4 w-4" />
      </div>
    </div>
  ),
  traces: (
    <div className="flex items-center gap-1.5">
      <OpenTelemetryLogo className="h-7 w-7" />
      <TempoLogo className="h-7 w-7" />
    </div>
  ),
  profiling: (
    <div className="flex items-center gap-1.5">
      <BeylaLogo className="h-7 w-7" />
      <PyroscopeLogo className="h-7 w-7" />
    </div>
  ),
};

export default function EcosystemSection() {
  const { tracks, socials } = communityData;

  return (
    <section id="tracks" className="relative py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#090b0e] text-white border-t border-zinc-800/80 overflow-hidden">
      {/* Background Lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(244, 104, 0, 0.15) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(255, 167, 38, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Layers className="h-3.5 w-3.5" />
            <span>Community Learning Tracks</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            What We Explore at{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Mumbai Meetups
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            Our community meetups, hands-on workshops, and lightning talks focus on 4 core pillars of cloud-native observability and reliability engineering.
          </p>
        </div>

        {/* 4 Core Learning Tracks Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-orange-500/50 hover:bg-zinc-900/80 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/5"
            >
              <div>
                {/* Header with Icons & Badge */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex h-12 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 px-3 shadow-inner">
                    {trackIcons[track.icon] || <Activity className="h-6 w-6 text-orange-400" />}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                    {track.badge}
                  </span>
                </div>

                {/* Track Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-orange-400/90 mt-1">
                  {track.tagline}
                </p>

                {/* Description */}
                <p className="mt-3.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {track.description}
                </p>

                {/* Key Workshop Highlights Checklist */}
                <div className="mt-5 space-y-2 pt-4 border-t border-zinc-800/70">
                  {track.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag Strip */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-zinc-500 font-mono mr-1">Stack:</span>
                {track.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-semibold font-mono px-2.5 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 group-hover:border-zinc-700 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CFP Callout Banner */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-zinc-900/90 to-zinc-900 p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">Have a talk or demo for one of these tracks?</h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">Share your production architectures, incident stories, or custom dashboards at our next meetup.</p>
            </div>
          </div>
          <a
            href={socials.cfp}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
          >
            <Send className="h-4 w-4" />
            <span>Submit a Talk Proposal (CFP)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
