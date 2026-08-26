'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HelpCircle,
  Mail,
  MessageSquare,
  Sparkles,
  Send,
  ArrowRight,
} from 'lucide-react';
import communityData from '@/data';
import { Button } from '@/components/ui/button';

export default function FaqSection() {
  const { faqs, chapter } = communityData;

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0a0c10] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            Everything you need to know about Grafana & Friends Mumbai meetups, registrations, and talks.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="mt-10 sm:mt-16 max-w-3xl 2xl:max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3.5 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 px-4 sm:px-6 data-[state=open]:border-orange-500/40 data-[state=open]:bg-zinc-900/90 transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-sm xs:text-base sm:text-lg font-bold text-white hover:text-orange-400 hover:no-underline py-4 sm:py-5">
                  <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-orange-400/90 shrink-0 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-snug">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm md:text-base text-zinc-300 pb-5 pl-8 sm:pl-10 leading-relaxed font-normal">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact Organizers CTA Box */}
          <div className="mt-12 sm:mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-lg">
            <div className="flex justify-center mb-2 text-orange-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">Still have questions?</h4>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Feel free to reach out to the organizing team directly via email.
            </p>
            <div className="mt-5 flex justify-center">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full sm:w-auto border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-full px-6 h-10 text-xs sm:text-sm font-semibold"
              >
                <a href={`mailto:${chapter.email}`} className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 text-orange-400" />
                  <span>Email {chapter.email}</span>
                </a>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
