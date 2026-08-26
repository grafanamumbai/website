'use client';

import { useState } from 'react';
import {
  Sparkles,
  Lightbulb,
  Gift,
  RefreshCw,
  Quote,
  ShieldCheck,
  Heart,
  ArrowRight,
  Trophy,
  Compass,
  Smile,
  Search,
} from 'lucide-react';
import communityData from '@/data';
import { GrotMascot } from '@/components/icons';
import { Button } from '@/components/ui/button';

type GrotPose = 'hat' | 'smile' | 'search' | 'trophy';

const poses: { id: GrotPose; label: string; icon: React.ReactNode }[] = [
  { id: 'hat', label: 'Explorer Grot', icon: <Compass className="h-3.5 w-3.5" /> },
  { id: 'smile', label: 'Happy Dino', icon: <Smile className="h-3.5 w-3.5" /> },
  { id: 'search', label: 'Issue Triage', icon: <Search className="h-3.5 w-3.5" /> },
  { id: 'trophy', label: 'Golden Grot', icon: <Trophy className="h-3.5 w-3.5" /> },
];

export default function MascotGrotSection() {
  const { mascot, currentEvent } = communityData;
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [selectedPose, setSelectedPose] = useState<GrotPose>('hat');

  const tips = mascot?.tips || [
    {
      id: 'tip-1',
      topic: 'PromQL / Metrics',
      tip: 'Use rate() on counters with a time window at least 4x your scrape interval to avoid noisy spikes caused by missed scrapes.',
    },
    {
      id: 'tip-2',
      topic: 'LogQL / Loki',
      tip: 'Filter high-volume logs with stream selectors first (e.g. {env="prod", app="gateway"}) before running heavy regex or line extraction.',
    },
    {
      id: 'tip-3',
      topic: 'TraceQL / Tempo',
      tip: 'Pinpoint latency bottlenecks by querying traces with { duration > 500ms && status = error } for immediate root cause discovery.',
    },
    {
      id: 'tip-4',
      topic: 'Pyroscope / Profiling',
      tip: 'Continuous profiling with Pyroscope reveals CPU flame graphs across production without degrading system throughput.',
    },
    {
      id: 'tip-5',
      topic: 'Golden Signals',
      tip: 'Anchor your primary SRE dashboards on the 4 Golden Signals: Latency, Traffic, Errors, and Saturation.',
    },
  ];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const activeTip = tips[currentTipIndex];

  return (
    <section id="mascot" className="relative py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0c0e14] text-white border-t border-zinc-800/80 overflow-hidden">
      {/* Background Decorative Radial Rings */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(244, 104, 0, 0.2) 0%, transparent 60%), radial-gradient(circle at 85% 50%, rgba(255, 167, 38, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Official Grafana Labs Mascot</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Meet <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">Grot</span> • The Grafana Dino
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            Born from @grafanabot and 65 million years of hibernation, Grot guides observability adventurers through metrics, logs, traces, and profiles.
          </p>
        </div>

        {/* Mascot Spotlight Card */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-orange-500/30 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-[#0e1117] p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Mascot Visual & Interactive Poses Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative group p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800 shadow-inner flex flex-col items-center justify-center w-full max-w-[280px] sm:max-w-[340px]">
                <div className="relative h-48 w-48 sm:h-56 sm:w-56 flex items-center justify-center">
                  <GrotMascot
                    variant={selectedPose}
                    className="w-full h-full drop-shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold">
                  <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                  <span>Status: READY FOR SRE TRIAGE</span>
                </div>

                {/* Pose Selector Pills */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 w-full flex items-center justify-center gap-1.5 flex-wrap">
                  {poses.map((pose) => (
                    <button
                      key={pose.id}
                      onClick={() => setSelectedPose(pose.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                        selectedPose === pose.id
                          ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/25'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                      }`}
                    >
                      {pose.icon}
                      <span>{pose.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mascot Lore & Interactive Tip Generator Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  <Quote className="h-3.5 w-3.5 text-orange-400" />
                  <span>The Legend of Grot</span>
                </div>
                <blockquote className="text-base sm:text-lg md:text-xl font-bold text-white italic leading-snug">
                  {mascot?.quote || '"May your queries be fast, your dashboards clear, and your latency low!"'}
                </blockquote>
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Grot is the official mascot born from @grafanabot. According to Grafana legend, our friendly dino spent 65 million years in hibernation before awakening to help engineers sift through PRs, fix broken dashboards, and celebrate standout dashboards at the annual <strong>Golden Grot Awards</strong>!
                </p>
              </div>

              {/* Interactive Tip Generator Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Grot&apos;s Observability Tip
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                    {activeTip.topic}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                  {activeTip.tip}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-zinc-500 font-mono text-[11px]">
                    Tip {currentTipIndex + 1} of {tips.length}
                  </span>
                  <button
                    onClick={handleNextTip}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-orange-500 hover:text-white text-zinc-300 transition-all font-semibold active:scale-95"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Next Tip</span>
                  </button>
                </div>
              </div>

              {/* Swag & Grot Collectible Highlights */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-bold text-white">Win Official Grot Plushies & Swag</p>
                    <p className="text-[11px] sm:text-xs text-zinc-400">Participate in our live meetup Kahoot trivia quiz.</p>
                  </div>
                </div>

                <Button
                  asChild
                  size="sm"
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs sm:text-sm px-5 shadow-md shadow-orange-500/20"
                >
                  <a
                    href={currentEvent.registration.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <span>RSVP for Meetup</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
