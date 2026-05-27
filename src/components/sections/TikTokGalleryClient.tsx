"use client";

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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.thumbnail}
                alt=""
                className="tiktok-thumb"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="tiktok-thumb tiktok-thumb-fallback" aria-hidden />
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
