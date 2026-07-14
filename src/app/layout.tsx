import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { MaintenancePopup } from "@/components/MaintenancePopup";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Invest with Greg",
    template: "%s | Invest with Greg",
  },
  description:
    "20 years old. Six figures invested. Two years in. Book a 1-on-1 call with Greg for real stock picks, real strategy, no jargon.",
  keywords: [
    "investing coach",
    "stock market mentor",
    "TikTok investor",
    "1-on-1 investing call",
    "beginner investing",
    "stock picks",
  ],
  authors: [{ name: "Greg" }],
  creator: "Greg",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Invest with Greg",
    description:
      "20 years old. Six figures invested. Two years in. Book a 1-on-1 call with Greg.",
    siteName: "Invest with Greg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest with Greg",
    description: "20 years old. Six figures invested. Two years in.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Inline script to set theme class before paint — prevents flash
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('greg-theme');
    var theme = stored || 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <CookieConsent />
          <MaintenancePopup />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-4ECVVXBY5V" />
    </html>
  );
}
