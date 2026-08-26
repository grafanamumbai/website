'use client';

import { useRef, useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Upload, Sparkles, Check } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import communityData from '@/data';

export default function BadgePage() {
  const { toast } = useToast();
  const { chapter, currentEvent } = communityData;
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
      title: 'Copied to Clipboard!',
      description: 'You can now share it on LinkedIn and Twitter/X.',
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
    <div className="flex flex-col min-h-screen bg-[#0c0e14] text-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 md:px-6 max-w-4xl relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-semibold text-orange-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Attendee Social Kit</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Generate Your Attendee Badge
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-md mx-auto">
            Showcase that you're joining the Grafana community in Mumbai on LinkedIn, X, and Instagram.
          </p>
        </div>

        {/* Social Share Box */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 mb-12 shadow-lg">
          <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-2">
            Social Share Template
          </h3>
          <p className="text-sm text-zinc-300 font-mono bg-zinc-950 p-4 rounded-xl border border-zinc-800 leading-relaxed">
            {socialText}
          </p>
          <div className="mt-4">
            <Button
              onClick={handleCopyToClipboard}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full"
            >
              {copied ? <Check className="h-4 w-4 mr-1.5" /> : <Copy className="h-4 w-4 mr-1.5" />}
              <span>{copied ? 'Copied!' : 'Copy Share Text'}</span>
            </Button>
          </div>
        </div>

        {/* Badge Generation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: With Photo */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Custom Photo Badge</h3>
              <p className="text-xs text-zinc-400 mb-4">Upload your picture to embed inside the official template.</p>
              
              <div className="relative w-full aspect-[1200/630] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                <canvas ref={canvasRef} className="hidden" />
                <Image
                  src={badgeTemplateUrl}
                  alt="Badge Template"
                  fill
                  className="object-cover"
                />
                {userImage && (
                  <div
                    className="absolute aspect-square rounded-full overflow-hidden border-4 border-orange-500"
                    style={{
                      top: '30.7%',
                      left: '13.3%',
                      width: '27%',
                    }}
                  >
                    <Image
                      src={userImage}
                      alt="Your photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {!userImage && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
                    <Upload className="h-8 w-8 text-orange-400 mb-2" />
                    <span className="text-xs font-semibold text-white">Upload your photo</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800">
                <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center">
                  <Upload className="h-4 w-4 mr-1.5" />
                  <span>Choose Photo</span>
                </label>
              </Button>
              <Input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

              <Button
                onClick={handleDownload}
                disabled={!userImage}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
                <Download className="h-4 w-4 mr-1.5" />
                <span>Download</span>
              </Button>
            </div>
          </div>

          {/* Card 2: Without Photo */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Standard Badge</h3>
              <p className="text-xs text-zinc-400 mb-4">Official event card ready to download and share instantly.</p>
              
              <div className="relative w-full aspect-[1200/630] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <Image
                  src={badgeNoPhotoUrl}
                  alt="Standard Badge"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleDownloadWithoutPhoto}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
                <Download className="h-4 w-4 mr-1.5" />
                <span>Download Standard Badge</span>
              </Button>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
