"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Add new posts here (full TikTok URLs — videos or photos).
const POSTS = [
  "https://www.tiktok.com/@investwithgreg/photo/7643983342613875982",
  "https://www.tiktok.com/@investwithgreg/video/7637631019893394701",
  "https://www.tiktok.com/@investwithgreg/photo/7632112978405362957",
  "https://www.tiktok.com/@investwithgreg/photo/7618487198928653582",
  "https://www.tiktok.com/@investwithgreg/video/7613650045065317663",
  "https://www.tiktok.com/@investwithgreg/video/7611306234603375885",
];

// Match both /video/{id} and /photo/{id}
function extractId(url: string): string | null {
  const match = url.match(/\/(video|photo)\/(\d+)/);
  return match ? match[2] : null;
}

const EMBED_SCRIPT_SRC = "https://www.tiktok.com/embed.js";
const PROFILE_URL = "https://www.tiktok.com/@investwithgreg";

export function TikTokGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Duplicate the posts so the auto-scroll loop seams together at translateX(-50%)
  const trackPosts = [...POSTS, ...POSTS];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLoaded(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const existing = document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`);
    if (existing) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [loaded]);

  return (
    <section ref={sectionRef} style={{ paddingBlock: 80 }}>
      <div className="container-edge">
        <SectionHeader
          title="Watch"
          subtitle="Real posts. Real calls. No edits."
        />
      </div>

      {/* Carousel viewport — full bleed with edge fades */}
      <div className="tiktok-gallery" style={{ marginBottom: 24 }}>
        <div className="tiktok-track">
          {trackPosts.map((url, i) => {
            const id = extractId(url);
            if (!id) return null;
            const username = url.match(/@([^/]+)/)?.[1] ?? "investwithgreg";
            return (
              <div key={`${id}-${i}`} className="tiktok-card">
                {loaded ? (
                  <blockquote
                    className="tiktok-embed"
                    cite={url}
                    data-video-id={id}
                    style={{ maxWidth: 325, minWidth: 325 }}
                  >
                    <section>
                      <a target="_blank" rel="noopener noreferrer" title={`@${username}`} href={url}>
                        @{username}
                      </a>
                    </section>
                  </blockquote>
                ) : (
                  <div className="tiktok-placeholder" aria-hidden>
                    <div className="tiktok-placeholder-shimmer" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Follow button — sits directly beneath the carousel */}
      <div className="container-edge" style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <a
          href="https://www.tiktok.com/@investwithgreg"
          target="_blank"
          rel="noopener noreferrer"
          className="pill pill-primary"
          style={{ padding: "14px 28px", fontSize: 15, gap: 8 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
          </svg>
          Follow on TikTok
        </a>
      </div>
    </section>
  );
}
