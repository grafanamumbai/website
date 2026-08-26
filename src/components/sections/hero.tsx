'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function HeroSection() {
  const pathname = usePathname();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shared 3D drop-shadow generators for retro typography
  const textShadowGrafana = `
    1px 1px 0 #1A1A1A, 2px 2px 0 #1A1A1A, 3px 3px 0 #1A1A1A,
    4px 4px 0 #F15A24, 5px 5px 0 #F15A24, 6px 6px 0 #F15A24, 7px 7px 0 #F15A24,
    8px 8px 0 #1A1A1A, 9px 9px 0 #1A1A1A
  `;

  const textShadow2026 = `
    1px 1px 0 #1A1A1A, 2px 2px 0 #1A1A1A,
    3px 3px 0 #F15A24, 4px 4px 0 #F15A24, 5px 5px 0 #F15A24,
    6px 6px 0 #1A1A1A, 7px 7px 0 #1A1A1A
  `;

  const textShadowCon = `
    1px 1px 0 #1A1A1A, 2px 2px 0 #1A1A1A, 
    3px 3px 0 #2E88F5, 4px 4px 0 #2E88F5, 5px 5px 0 #2E88F5, 
    6px 6px 0 #1A1A1A, 7px 7px 0 #1A1A1A, 
    8px 8px 0 #F15A24, 9px 9px 0 #F15A24, 10px 10px 0 #F15A24, 
    11px 11px 0 #1A1A1A, 12px 12px 0 #1A1A1A
  `;

  return (
    <section id="home" className="relative flex flex-col h-[90vh] min-h-[600px] w-full pt-16 mt-0">
      <div
        className="absolute inset-0 z-0 h-full w-full overflow-hidden"
      >
        <div style={{ transform: `translateY(${offsetY * 0.4}px)`, height: '120%', top: '-10%', position: 'relative' }}>
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Central Hero Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center text-white pb-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
            
          {/* Stylized Logo text */}
          <div className="flex flex-col items-center select-none font-black tracking-tighter" style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}>
            <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl mb-1 mt-6 drop-shadow-lg" 
                style={{ 
                  backgroundImage: 'linear-gradient(to bottom, #FFC900, #FF6A00)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextStroke: '2px #1A1A1A',
                  filter: `drop-shadow(3px 3px 0px #1A1A1A) drop-shadow(0px 6px 0px #F15A24) drop-shadow(0px 8px 0px #1A1A1A)`
                }}>
              GrafanaCon
            </h1>
            
            <div className="flex items-center gap-1 sm:gap-4 md:gap-6 mt-1 md:mt-2">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl" 
                    style={{ 
                      color: '#FFB800', 
                      WebkitTextStroke: '3px #1A1A1A', 
                      textShadow: textShadow2026,
                      lineHeight: '1.2'
                    }}>
                20
              </span>
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl px-1 sm:px-4 leading-none" 
                    style={{ 
                      color: '#FFFFFF', 
                      WebkitTextStroke: '3px #1A1A1A', 
                      textShadow: textShadowCon,
                    }}>
                LOCAL
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl" 
                    style={{ 
                      color: '#FFB800', 
                      WebkitTextStroke: '3px #1A1A1A', 
                      textShadow: textShadow2026,
                      lineHeight: '1.2'
                    }}>
                26
              </span>
            </div>
          </div>

          <p className="mt-8 mb-4 text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
            Register today!
          </p>
          
          <p className="text-xl md:text-4xl font-bold tracking-wide text-center" style={{ color: '#FFB800', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            13th June 2026 • Mumbai
          </p>
          
        </div>
      </div>
      
      {/* Footer Banner */}
      <div className="relative z-20 w-full bg-[#FFE300] py-4 shadow-xl border-t-2 border-yellow-200">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-black font-semibold text-lg md:text-xl relative">
          <span>Limited Seats available</span>
          <a 
            href={pathname === '/register' ? "https://www.meetup.com/grafana-and-friends-mumbai/events/313668351/" : "/register"} 
            target={pathname === '/register' ? "_blank" : "_self"} 
            rel="noopener noreferrer" 
            className="flex items-center group text-[#0A52CC] font-bold sm:pl-4"
          >
            Register now 
            <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
