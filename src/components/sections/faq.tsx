'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Mail, MessageSquare } from 'lucide-react';
import communityData from '@/data';
import { Button } from '@/components/ui/button';

export default function FaqSection() {
  const { faqs, chapter } = communityData;

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#0a0c10] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300">
            Everything you need to know about Grafana & Friends Mumbai meetups, registrations, and talks.
          </p>
        </div>

        <div className="mt-14 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 px-6 data-[state=open]:border-orange-500/40 data-[state=open]:bg-zinc-900/90 transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-bold text-white hover:text-orange-400 hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-orange-400/80 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-zinc-300 pb-5 pl-7 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions card */}
          <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <h4 className="text-base font-bold text-white">Still have questions?</h4>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Feel free to reach out to the organizing committee directly.
            </p>
            <div className="mt-4">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-full"
              >
                <a href={`mailto:${chapter.email}`} className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-orange-400" />
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
