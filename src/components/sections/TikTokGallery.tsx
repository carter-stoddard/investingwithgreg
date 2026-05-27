import { SectionHeader } from "@/components/ui/SectionHeader";
import { TikTokGalleryClient, type TikTokCard } from "./TikTokGalleryClient";

type PostConfig = { url: string; thumbnailOverride?: string };

const POSTS: PostConfig[] = [
  {
    url: "https://www.tiktok.com/@investwithgreg/photo/7643983342613875982",
    thumbnailOverride: "/images/tiktok/7643983342613875982.jpg",
  },
  { url: "https://www.tiktok.com/@investwithgreg/video/7637631019893394701" },
  {
    url: "https://www.tiktok.com/@investwithgreg/photo/7632112978405362957",
    thumbnailOverride: "/images/tiktok/7632112978405362957.jpg",
  },
  { url: "https://www.tiktok.com/@investwithgreg/video/7632061420850416926" },
  { url: "https://www.tiktok.com/@investwithgreg/video/7613650045065317663" },
  { url: "https://www.tiktok.com/@investwithgreg/video/7611306234603375885" },
];

async function fetchCard({ url, thumbnailOverride }: PostConfig): Promise<TikTokCard> {
  if (thumbnailOverride) return { url, thumbnail: thumbnailOverride };
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return { url, thumbnail: null };
    const data = (await res.json()) as { thumbnail_url?: string };
    return { url, thumbnail: data.thumbnail_url ?? null };
  } catch {
    return { url, thumbnail: null };
  }
}

export async function TikTokGallery() {
  const cards = await Promise.all(POSTS.map(fetchCard));

  return (
    <section style={{ paddingBlock: 40 }}>
      <div className="container-edge">
        <SectionHeader title="Watch" subtitle="Real posts. Real calls. No edits." />
      </div>

      <TikTokGalleryClient cards={cards} />

      <div
        className="container-edge"
        style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
      >
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
