'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Sparkles, Trophy, CheckCircle2, ArrowRight } from 'lucide-react';
import communityData from '@/data';
import { Button } from '@/components/ui/button';

export default function ContestsSection() {
  const { contests, currentEvent } = communityData;

  return (
    <section id="contests" className="py-20 md:py-28 bg-[#0a0c10] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Trophy className="h-3.5 w-3.5" />
            <span>Community Challenges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Contests & Special Giveaways
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300">
            Participate before and during the meetup for a chance to win official Grafana prizes!
          </p>
        </div>

        <div className="mt-14 max-w-3xl mx-auto">
          <Tabs defaultValue={contests[0]?.id || 'refer-and-earn'} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
              {contests.map((contest) => (
                <TabsTrigger
                  key={contest.id}
                  value={contest.id}
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-zinc-300 font-semibold py-2.5 rounded-lg transition-all"
                >
                  {contest.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {contests.map((contest) => (
              <TabsContent key={contest.id} value={contest.id} className="mt-6">
                <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2.5">
                      <Sparkles className="h-6 w-6 text-orange-400 shrink-0" />
                      <span>{contest.title}</span>
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300">
                      {contest.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                      How to Participate:
                    </h4>
                    <ul className="space-y-2.5">
                      {contest.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-zinc-400 font-medium">
                      Prizes announced live during the meetup!
                    </span>
                    <Button
                      asChild
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-5"
                    >
                      <a href={currentEvent.registration.rsvpUrl} target="_blank" rel="noopener noreferrer">
                        <span>Register to Enter</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
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
