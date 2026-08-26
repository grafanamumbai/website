'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Gift,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Share2,
  Flame,
} from 'lucide-react';
import communityData from '@/data';
import { Button } from '@/components/ui/button';

export default function ContestsSection() {
  const { contests, currentEvent } = communityData;

  return (
    <section id="contests" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0a0c10] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Trophy className="h-3.5 w-3.5" />
            <span>Community Challenges</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Contests & Special Giveaways
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            Participate before and during the meetup for a chance to win official Grafana prizes and swag!
          </p>
        </div>

        {/* Tabs Container */}
        <div className="mt-10 sm:mt-16 max-w-3xl 2xl:max-w-4xl mx-auto">
          <Tabs defaultValue={contests[0]?.id || 'refer-and-earn'} className="w-full">
            
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl h-auto">
              {contests.map((contest) => (
                <TabsTrigger
                  key={contest.id}
                  value={contest.id}
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-zinc-300 font-bold py-2.5 sm:py-3 rounded-xl transition-all text-xs xs:text-sm sm:text-base flex items-center justify-center gap-1.5"
                >
                  <Gift className="h-4 w-4 shrink-0" />
                  <span className="truncate">{contest.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {contests.map((contest) => (
              <TabsContent key={contest.id} value={contest.id} className="mt-6 sm:mt-8">
                <div className="p-6 sm:p-10 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-2xl space-y-6 sm:space-y-8">
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-2.5">
                      <Sparkles className="h-6 w-6 text-orange-400 shrink-0" />
                      <span>{contest.title}</span>
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
                      {contest.description}
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <h4 className="text-xs sm:text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="h-4 w-4" />
                      <span>How to Participate & Win:</span>
                    </h4>
                    <ul className="space-y-3">
                      {contest.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs text-zinc-400 font-medium">
                      Prizes announced live on stage during the meetup!
                    </span>
                    <Button
                      asChild
                      size="sm"
                      className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-6 h-11 text-sm shadow-lg shadow-orange-500/20 active:scale-95 transition-all hover:scale-105"
                    >
                      <a href={currentEvent.registration.rsvpUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <span>Register to Enter</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                </div>
              </TabsContent>
            ))}

          </Tabs>
        </div>

      </div>
    </section>
  );
}
