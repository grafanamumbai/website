import {
  LineChart,
  Users2,
  Zap,
  BookOpen,
  Activity,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import communityData from '@/data';

export default function AboutSection() {
  const { chapter } = communityData;

  const pillars = [
    {
      icon: <Activity className="h-6 w-6 text-orange-400" />,
      title: 'Learn & Explore',
      badge: 'Workshops & Talks',
      description:
        'Master the open-source LGTM stack (Loki, Grafana, Tempo, Mimir), Prometheus telemetry, and OpenTelemetry standards with deep-dive technical talks and hands-on demonstrations.',
    },
    {
      icon: <Users2 className="h-6 w-6 text-orange-400" />,
      title: 'Connect & Network',
      badge: 'Hallway Track',
      description:
        'Engage with leading SREs, platform engineers, DevOps leads, and cloud-native developers across Mumbai. Build connections and exchange real-world architecture insights.',
    },
    {
      icon: <Layers className="h-6 w-6 text-orange-400" />,
      title: 'Innovate & Showcase',
      badge: 'Community Demos',
      description:
        'Demonstrate custom Grafana dashboards, infinity plugins, eBPF telemetry, and AI-assisted observability workflows to the broader community.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0e1117] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>About The Chapter</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Building Mumbai's Premier{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Observability Community
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300 leading-relaxed font-normal">
            {chapter.description}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col justify-between p-6 sm:p-8 2xl:p-10 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg hover:border-orange-500/50 hover:bg-zinc-900/90 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400 px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:text-orange-300">
                <span>Explore with Community</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
