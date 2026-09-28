import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, Geist, Inter } from "next/font/google";
import { RegisterServiceWorker } from "@/components/pwa/RegisterServiceWorker";
import { profile, shareText, shareTitle } from "@/lib/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-cormorant", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://terence.tlbisbig.world"),
  applicationName: "TLBISBIG",
  title: { default: shareTitle, template: "%s" },
  description: shareText,
  alternates: { canonical: profile.profileUrl },
  appleWebApp: {
    capable: true,
    title: "TLBISBIG",
    statusBarStyle: "default",
  },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Terence L. Bolden — Founder | TLBISBIG",
    description: shareText,
    url: profile.profileUrl,
    siteName: "TLBISBIG",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terence L. Bolden — Founder | TLBISBIG",
    description: shareText,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        {children}
        <RegisterServiceWorker />
        <Analytics />
      </body>
    </html>
  );
}
