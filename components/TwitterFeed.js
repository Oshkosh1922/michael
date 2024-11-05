// components/TwitterFeed.js
import React, { useEffect } from 'react';

export default function TwitterFeed() {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div style={{ padding: '1rem', backgroundColor: '#e6f7ff', borderRadius: '15px', maxWidth: '100%', margin: '0 auto' }}>
      <a
        className="twitter-timeline"
        data-width="100%"  // Set to 100% to make it responsive
        data-height="500"
        data-theme="light"
        href="https://twitter.com/___swm" // Replace with your actual Twitter handle
      >
        Tweets by @___swm
      </a>
    </div>
  );
}
