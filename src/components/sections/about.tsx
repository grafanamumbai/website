import { Target, Users, Zap, Terminal, LineChart, ShieldCheck } from 'lucide-react';
import communityData from '@/data';

export default function AboutSection() {
  const { chapter } = communityData;

  const pillars = [
    {
      icon: <LineChart className="h-6 w-6 text-orange-400" />,
      title: 'Learn & Explore',
      description: 'Master the LGTM stack (Loki, Grafana, Tempo, Mimir), Prometheus metrics, distributed tracing, and OpenTelemetry standards with deep-dive technical sessions.',
    },
    {
      icon: <Users className="h-6 w-6 text-orange-400" />,
      title: 'Connect & Network',
      description: 'Engage with top SREs, platform engineers, DevOps leads, and cloud-native developers across Mumbai. Build connections and exchange real-world architecture insights.',
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-400" />,
      title: 'Innovate & Showcase',
      description: 'Demonstrate custom Grafana dashboards, infinity plugins, eBPF telemetry, and AI-assisted observability workflows to the broader open-source community.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#0e1117] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <span>About The Chapter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Building Mumbai's Strongest{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Observability Community
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            {chapter.description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-md hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
