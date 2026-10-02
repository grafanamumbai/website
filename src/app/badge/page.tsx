'use client';

import { useRef, useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import communityData from '@/data';

export default function BadgePage() {
  const { toast } = useToast();
  const { currentEvent } = communityData;
  const socialText = `I am attending ${currentEvent.title}! Join me in Mumbai for a full day of observability, Grafana deep-dives, and networking. #GrafanaMumbai #GrafanaConLocal #Observability #DevOps #SRE`;

  const badgeTemplateUrl = '/badge1.png';
  const badgeNoPhotoUrl = '/badge2.png';

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(socialText);
    setCopied(true);
    toast({
      title: 'Copied to clipboard',
      description: 'Paste it into LinkedIn or X.',
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawBadge = (download = false, photoUrl?: string) => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const badgeImage = new (window as any).Image();
    badgeImage.crossOrigin = 'anonymous';
    const badgeUrl = photoUrl ? badgeTemplateUrl : badgeNoPhotoUrl;
    badgeImage.src = badgeUrl.startsWith('/') ? window.location.origin + badgeUrl : badgeUrl;

    badgeImage.onload = () => {
      canvas.width = badgeImage.width;
      canvas.height = badgeImage.height;

      ctx.drawImage(badgeImage, 0, 0, canvas.width, canvas.height);

      if (photoUrl) {
        const user_image = new (window as any).Image();
        user_image.crossOrigin = 'anonymous';
        user_image.src = photoUrl;
        user_image.onload = () => {
          const size = 300;
          const x = (canvas.width / 2) - (size / 2) - 250;
          const y = (canvas.height / 2) - (size / 2) - 105;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();

          const aspect = user_image.width / user_image.height;
          let srcX = 0;
          let srcY = 0;
          let srcW = user_image.width;
          let srcH = user_image.height;

          if (aspect > 1) {
            srcW = user_image.height;
            srcX = (user_image.width - srcW) / 2;
          } else {
            srcH = user_image.width;
            srcY = (user_image.height - srcH) / 2;
          }

          ctx.drawImage(user_image, srcX, srcY, srcW, srcH, x, y, size, size);

          ctx.beginPath();
          ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2, true);
          ctx.strokeStyle = '#F47A20';
          ctx.lineWidth = 10;
          ctx.stroke();
          ctx.restore();

          if (download) {
            downloadCanvasAsImage();
          }
        };
      } else {
        if (download) {
          downloadCanvasAsImage();
        }
      }
    };
  };

  const downloadCanvasAsImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'grafana-mumbai-attendee-badge.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleDownload = () => {
    drawBadge(true, userImage || undefined);
  };

  const handleDownloadWithoutPhoto = () => {
    drawBadge(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <p className="label">Attendee badge</p>
        <h1 className="mt-2 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
          Make your badge, tell people you&apos;re coming
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-ink-soft">
          Add your photo to the official template, or take the standard one. Post it on LinkedIn, X or Instagram.
        </p>

        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">

          {/* Badge with your photo */}
          <section className="flex flex-col border-t border-ink pt-6">
            <h2 className="text-2xl font-semibold tracking-[-0.01em]">With your photo</h2>
            <p className="mt-1 text-ink-soft">Upload a picture and it goes inside the circle.</p>

            <div className="print mt-5 -rotate-[0.6deg]">
              <div className="relative aspect-[1200/630] w-full overflow-hidden bg-paper-deep">
                <canvas ref={canvasRef} className="hidden" />
                <Image src={badgeTemplateUrl} alt="Badge template" fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
                {userImage && (
                  <div
                    className="absolute aspect-square overflow-hidden rounded-full border-4 border-orange-500"
                    style={{ top: '30.7%', left: '13.3%', width: '27%' }}
                  >
                    <Image src={userImage} alt="Your photo" fill className="object-cover" />
                  </div>
                )}
                {!userImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/55">
                    <span className="rounded-md bg-paper px-3 py-1.5 text-sm font-semibold text-ink">No photo yet</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <label htmlFor="file-upload" className="btn btn-ink cursor-pointer">
                Choose a photo
              </label>
              <Input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <button
                type="button"
                onClick={handleDownload}
                disabled={!userImage}
                className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Download
              </button>
            </div>
          </section>

          {/* Standard badge */}
          <section className="flex flex-col border-t border-ink pt-6">
            <h2 className="text-2xl font-semibold tracking-[-0.01em]">Standard</h2>
            <p className="mt-1 text-ink-soft">The official card, ready to share as it is.</p>

            <div className="print mt-5 rotate-[0.6deg]">
              <div className="relative aspect-[1200/630] w-full overflow-hidden bg-paper-deep">
                <Image src={badgeNoPhotoUrl} alt="Standard attendee badge" fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
              </div>
            </div>

            <div className="mt-6">
              <button type="button" onClick={handleDownloadWithoutPhoto} className="btn btn-primary">
                Download standard badge
              </button>
            </div>
          </section>
        </div>

        {/* Caption to paste */}
        <section className="mt-16 max-w-3xl border-t border-ink pt-6">
          <h2 className="text-2xl font-semibold tracking-[-0.01em]">A caption to go with it</h2>
          <p className="mt-4 rounded-md border border-rule bg-[#fffdf8] p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-soft">
            {socialText}
          </p>
          <button type="button" onClick={handleCopyToClipboard} className="btn btn-ink mt-4">
            {copied ? 'Copied' : 'Copy caption'}
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
