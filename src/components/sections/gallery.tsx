'use client';

import Image from 'next/image';
import { Camera, Calendar, Sparkles } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import communityData from '@/data';

export default function GallerySection() {
  const { gallery } = communityData;
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#0e1117] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Camera className="h-3.5 w-3.5" />
            <span>Community Memories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Moments From Past Meetups
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300">
            A glimpse into the energy, learning, and vibrant connections at Grafana & Friends Mumbai.
          </p>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {gallery.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 p-3">
                  <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 shadow-lg group hover:border-orange-500/40 transition-all duration-300">
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <span className="inline-block rounded-full bg-orange-500/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white mb-1">
                          {item.date}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-snug drop-shadow-md">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12 border-zinc-700 bg-zinc-900 text-white hover:bg-orange-500 hover:border-orange-500" />
            <CarouselNext className="hidden sm:flex -right-4 lg:-right-12 border-zinc-700 bg-zinc-900 text-white hover:bg-orange-500 hover:border-orange-500" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
