'use client';

import Image from 'next/image';
import { Camera, Calendar, Sparkles, Eye } from 'lucide-react';
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
    Autoplay({ delay: 2600, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-28 2xl:py-36 bg-[#0e1117] text-white border-t border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl 2xl:max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Camera className="h-3.5 w-3.5" />
            <span>Community Memories</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight leading-tight">
            Moments From Past Meetups
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-xl text-zinc-300">
            A glimpse into the energy, learning, and connections at Grafana & Friends Mumbai.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className="mt-12 sm:mt-16 max-w-6xl 2xl:max-w-[1400px] mx-auto px-2 sm:px-4">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {gallery.map((item) => (
                <CarouselItem key={item.id} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 shadow-xl group hover:border-orange-500/50 transition-all duration-300">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-left">
                        <div className="inline-flex items-center gap-1 rounded-full bg-orange-500/85 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-white mb-1.5">
                          <Calendar className="h-3 w-3" />
                          <span>{item.date}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-md line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5 opacity-90">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6 h-10 w-10 border-zinc-700 bg-zinc-900/90 text-white hover:bg-orange-500 hover:border-orange-500" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-6 h-10 w-10 border-zinc-700 bg-zinc-900/90 text-white hover:bg-orange-500 hover:border-orange-500" />
          </Carousel>
        </div>

      </div>
    </section>
  );
}
