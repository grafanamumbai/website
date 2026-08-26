'use client';

import { Clock, User, Sparkles, Coffee, Presentation, Trophy, Users } from 'lucide-react';
import communityData from '@/data';

export default function ScheduleSection() {
  const { schedule, currentEvent } = communityData;

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'keynote':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30"><Sparkles className="h-3 w-3" /> Keynote</span>;
      case 'talk':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30"><Presentation className="h-3 w-3" /> Deep Dive</span>;
      case 'break':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700"><Coffee className="h-3 w-3" /> Break & Networking</span>;
      case 'workshop':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30"><Users className="h-3 w-3" /> Community Demos</span>;
      case 'contest':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"><Trophy className="h-3 w-3" /> Quiz & Swag</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">Session</span>;
    }
  };

  return (
    <section id="schedule" className="py-20 md:py-28 bg-[#0e1117] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Clock className="h-3.5 w-3.5" />
            <span>Event Agenda</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Schedule & Sessions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300">
            A packed day of observability keynotes, practical demonstrations, and networking.
          </p>
        </div>

        {/* Schedule Timeline */}
        <div className="mt-16 max-w-4xl mx-auto space-y-4">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-md hover:border-orange-500/40 hover:bg-zinc-900/90 transition-all duration-200"
            >
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-1.5 text-orange-400 font-mono text-sm font-semibold">
                    <Clock className="h-4 w-4" />
                    <span>{item.time}</span>
                  </div>
                  {getTypeBadge(item.type)}
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {item.speaker && (
                <div className="sm:text-right shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs font-medium text-zinc-300">
                    <User className="h-3.5 w-3.5 text-orange-400" />
                    <span>{item.speaker}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
