'use client';

import { useState } from 'react';
import {
  Layers,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Search,
} from 'lucide-react';
import communityData from '@/data';
import {
  GrafanaLogo,
  PrometheusLogo,
  OpenTelemetryLogo,
  LokiLogo,
  TempoLogo,
  MimirLogo,
  PyroscopeLogo,
  KubernetesLogo,
  CiliumLogo,
  JaegerLogo,
  CncfIcon,
} from '@/components/icons';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  grafana: (props) => <div className="p-1 rounded-lg bg-orange-500/10"><GrafanaLogo className="h-7 w-7 text-orange-400" {...props} /></div>,
  prometheus: (props) => <PrometheusLogo className="h-9 w-9" {...props} />,
  opentelemetry: (props) => <OpenTelemetryLogo className="h-9 w-9" {...props} />,
  loki: (props) => <LokiLogo className="h-9 w-9" {...props} />,
  tempo: (props) => <TempoLogo className="h-9 w-9" {...props} />,
  mimir: (props) => <MimirLogo className="h-9 w-9" {...props} />,
  pyroscope: (props) => <PyroscopeLogo className="h-9 w-9" {...props} />,
  kubernetes: (props) => <KubernetesLogo className="h-9 w-9" {...props} />,
  cilium: (props) => <CiliumLogo className="h-9 w-9" {...props} />,
  jaeger: (props) => <JaegerLogo className="h-9 w-9" {...props} />,
};

const categories = [
  'All Technologies',
  'Metrics & Alerting',
  'Logs & Traces',
  'Continuous Profiling',
  'Cloud Native Infrastructure',
];

export default function EcosystemSection() {
  const { ecosystem } = communityData;
  const [selectedCategory, setSelectedCategory] = useState('All Technologies');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = (ecosystem || []).filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'All Technologies') return matchesSearch;
    if (selectedCategory === 'Metrics & Alerting') {
      return (
        matchesSearch &&
        (item.category.includes('Metrics') || item.id === 'prometheus' || item.id === 'mimir')
      );
    }
    if (selectedCategory === 'Logs & Traces') {
      return (
        matchesSearch &&
        (item.category.includes('Log') ||
          item.category.includes('Tracing') ||
          item.id === 'loki' ||
          item.id === 'tempo' ||
          item.id === 'jaeger' ||
          item.id === 'opentelemetry')
      );
    }
    if (selectedCategory === 'Continuous Profiling') {
      return matchesSearch && (item.category.includes('Profiling') || item.id === 'pyroscope');
    }
    if (selectedCategory === 'Cloud Native Infrastructure') {
      return (
        matchesSearch &&
        (item.category.includes('Orchestration') ||
          item.category.includes('eBPF') ||
          item.id === 'kubernetes' ||
          item.id === 'cilium')
      );
    }
    return matchesSearch;
  });

  return (
    <section id="ecosystem" className="relative py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#090b0e] text-white border-t border-zinc-800/80 overflow-hidden">
      {/* Subtle Background Lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(244, 104, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(66, 92, 199, 0.15) 0%, transparent 50%)',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <CncfIcon className="h-3.5 w-3.5" />
            <span>Open Source & CNCF Ecosystem</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            The Observability &{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Cloud-Native Stack
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            From metrics and logs to distributed traces, continuous profiling, and eBPF telemetry—explore the foundational technologies powering modern cloud engineering.
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech stack..."
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/80 transition-colors"
            />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => {
            const IconComponent = iconMap[item.icon] || Cpu;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-orange-500/40 hover:bg-zinc-900/90 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/5"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950/80 border border-zinc-800 group-hover:scale-105 transition-transform">
                      <IconComponent />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        item.status.includes('CNCF')
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-orange-400/90 font-mono mt-0.5">{item.category}</p>

                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">{item.status}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <span>Documentation</span>
                    <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Want to showcase a tool or demo?</h4>
              <p className="text-xs text-zinc-400">Present your custom plugin, exporter, or dashboard at our next meetup.</p>
            </div>
          </div>
          <a
            href={communityData.socials.cfp}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-orange-500/20"
          >
            Submit Talk (CFP)
          </a>
        </div>
      </div>
    </section>
  );
}
