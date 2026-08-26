'use client';

import { useEffect } from 'react';

export default function TwitterTimeline() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.setAttribute('charset', 'utf-8');
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
      // Twitter's widget script might leave things behind,
      // this is a simple way to help clean up, though not perfect.
      const widget = document.querySelector('.twitter-timeline-rendered');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return (
    <a
      className="twitter-timeline"
      data-height="600"
      data-theme="dark"
      href="https://twitter.com/i/lists/1544229563254927360"
    >
      A Twitter List by grafanafriendsmumbai
    </a>
  );
}
