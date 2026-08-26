'use client';

import { useState, useMemo } from 'react';
import {
  ExternalLink,
  Sparkles,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Cpu,
  RotateCcw,
} from 'lucide-react';
import communityData, { EcosystemItem } from '@/data';
import {
  GrafanaLogo,
  PrometheusLogo,
  OpenTelemetryLogo,
  LokiLogo,
  TempoLogo,
  MimirLogo,
  PyroscopeLogo,
  AlloyLogo,
  BeylaLogo,
  K6Logo,
  OnCallLogo,
  FaroLogo,
  CncfIcon,
} from '@/components/icons';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  grafana: (props) => (
    <div className="p-0.5 rounded-lg bg-orange-500/10">
      <GrafanaLogo className="h-7 w-7 text-orange-400" {...props} />
    </div>
  ),
  loki: (props) => <LokiLogo className="h-8 w-8" {...props} />,
  tempo: (props) => <TempoLogo className="h-8 w-8" {...props} />,
  mimir: (props) => <MimirLogo className="h-8 w-8" {...props} />,
  pyroscope: (props) => <PyroscopeLogo className="h-8 w-8" {...props} />,
  alloy: (props) => <AlloyLogo className="h-8 w-8" {...props} />,
  beyla: (props) => <BeylaLogo className="h-8 w-8" {...props} />,
  k6: (props) => <K6Logo className="h-8 w-8" {...props} />,
  oncall: (props) => <OnCallLogo className="h-8 w-8" {...props} />,
  faro: (props) => <FaroLogo className="h-8 w-8" {...props} />,
  prometheus: (props) => <PrometheusLogo className="h-8 w-8" {...props} />,
  opentelemetry: (props) => <OpenTelemetryLogo className="h-8 w-8" {...props} />,
};

function EcosystemCard({ item }: { item: EcosystemItem }) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = iconMap[item.icon] || Cpu;

  return (
    <div className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-orange-500/50 hover:bg-zinc-900/90 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/5">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950/80 border border-zinc-800 group-hover:scale-105 transition-transform shadow-inner p-1.5 overflow-hidden">
            {item.svgUrl && !imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.svgUrl}
                alt={`${item.name} official logo`}
                onError={() => setImgError(true)}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            ) : (
              <FallbackIcon />
            )}
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
}

const categories = [
  'All Tools',
  'Core LGTM',
  'eBPF & Profiling',
  'Testing & Frontend',
  'Pipeline & Standards',
];

const ITEMS_PER_PAGE = 6;

export default function EcosystemSection() {
  const { ecosystem } = communityData;
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return (ecosystem || []).filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q);

      if (selectedCategory === 'All Tools') return matchesSearch;
      if (selectedCategory === 'Core LGTM') {
        return (
          matchesSearch &&
          ['grafana', 'loki', 'tempo', 'mimir'].includes(item.id)
        );
      }
      if (selectedCategory === 'eBPF & Profiling') {
        return (
          matchesSearch &&
          ['beyla', 'pyroscope'].includes(item.id)
        );
      }
      if (selectedCategory === 'Testing & Frontend') {
        return (
          matchesSearch &&
          ['k6', 'faro', 'oncall'].includes(item.id)
        );
      }
      if (selectedCategory === 'Pipeline & Standards') {
        return (
          matchesSearch &&
          ['alloy', 'prometheus', 'opentelemetry'].includes(item.id)
        );
      }
      return matchesSearch;
    });
  }, [ecosystem, selectedCategory, searchQuery]);

  // Reset to page 1 whenever category or search query changes
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, safeCurrentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Tools');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <section id="ecosystem" className="relative py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#090b0e] text-white border-t border-zinc-800/80 overflow-hidden">
      {/* Subtle Background Lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(244, 104, 0, 0.18) 0%, transparent 55%), radial-gradient(circle at 15% 75%, rgba(255, 167, 38, 0.12) 0%, transparent 50%)',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <CncfIcon className="h-3.5 w-3.5" />
            <span>Grafana Stack & Observability Ecosystem</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            The Complete{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Grafana Observability Stack
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            From metrics, logs, and distributed traces to eBPF auto-instrumentation, continuous profiling, and frontend real user monitoring.
          </p>
        </div>

        {/* Filters & Improved Search Control Bar */}
        <div className="mt-10 sm:mt-14 max-w-5xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-[1.02]'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Enhanced Search Bar with Action Button */}
          <div className="flex items-center gap-2 w-full lg:w-80 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search tools, signals..."
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-9.5 pr-8 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => handleSearchChange(searchQuery)}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-orange-500 hover:text-white text-zinc-300 text-xs sm:text-sm font-semibold border border-zinc-700 transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="mt-4 max-w-5xl mx-auto flex items-center justify-between text-xs text-zinc-400 px-1">
          <div className="flex items-center gap-2">
            <span>
              Showing <span className="font-mono font-bold text-white">{filteredItems.length}</span> tools
              {searchQuery && <span> matching &ldquo;<span className="text-orange-400">{searchQuery}</span>&rdquo;</span>}
            </span>
            {selectedCategory !== 'All Tools' && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-orange-400 font-mono text-[11px]">
                {selectedCategory}
              </span>
            )}
          </div>

          {(selectedCategory !== 'All Tools' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-xs font-semibold"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Bento Grid / Tool Cards */}
        {filteredItems.length > 0 ? (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {paginatedItems.map((item) => (
              <EcosystemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="mt-12 max-w-md mx-auto text-center p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="flex justify-center mb-3 text-zinc-500">
              <Search className="h-8 w-8" />
            </div>
            <h4 className="text-base font-bold text-white">No tools found</h4>
            <p className="text-xs text-zinc-400 mt-1">
              No Grafana stack tools matched your search &ldquo;{searchQuery}&rdquo;.
            </p>
            <div className="mt-4">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto pt-6 border-t border-zinc-800/80">
            <div className="text-xs text-zinc-400">
              Showing{' '}
              <span className="font-mono text-white font-bold">
                {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{' '}
              to{' '}
              <span className="font-mono text-white font-bold">
                {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredItems.length)}
              </span>{' '}
              of <span className="font-mono text-white font-bold">{filteredItems.length}</span> tools
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 rounded-xl text-xs font-mono font-bold transition-all ${
                      safeCurrentPage === pageNum
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

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
