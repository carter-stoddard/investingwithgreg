"use client";

import Image from "next/image";

export type TikTokCard = {
  url: string;
  thumbnail: string | null;
};

export function TikTokGalleryClient({ cards }: { cards: TikTokCard[] }) {
  const track = [...cards, ...cards];

  return (
    <div className="tiktok-gallery" style={{ marginBottom: 24 }}>
      <div className="tiktok-track">
        {track.map((card, i) => (
          <a
            key={`${card.url}-${i}`}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tiktok-card"
            aria-label="Open on TikTok"
          >
            {card.thumbnail ? (
              <Image
                src={card.thumbnail}
                alt=""
                fill
                sizes="270px"
                className="tiktok-thumb"
                unoptimized={false}
              />
            ) : (
              <div className="tiktok-thumb tiktok-thumb-fallback" aria-hidden>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
                </svg>
              </div>
            )}
            <div className="tiktok-overlay" aria-hidden>
              <div className="tiktok-play">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
