import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/digital-card/BrandMark";
import { QrCode } from "@/components/qr/QrCode";
import { ShareButton } from "@/components/share/ShareButton";
import { cardLabel, profile, shareText } from "@/lib/profile";
import { CopyLink } from "@/components/share/CopyLink";

export const metadata: Metadata = {
  title: "Scan to connect — Terence L. Bolden",
  description: shareText,
  robots: { index: false, follow: true },
};

export default function QrPage() {
  return (
    <main id="content" className="grid min-h-dvh place-items-center px-4 py-8">
      <div className="w-full max-w-[400px] rounded-[28px] border border-[#f0b429]/25 bg-card px-6 py-8 text-center shadow-[0_18px_36px_rgba(0,0,0,0.35)]">
        <BrandMark />
        <h1 className="mt-4 font-serif text-[2.1rem] leading-none font-semibold">Scan to connect</h1>
        <p className="mt-1 text-sm text-muted">
          {profile.name} · {profile.title}
        </p>
        <div className="mx-auto mt-6 w-full max-w-[280px] rounded-[20px] bg-white p-3 shadow-[0_1px_2px_rgba(22,24,29,0.06)] ring-1 ring-ink/8 [&_svg]:h-auto [&_svg]:w-full">
          <QrCode size={280} framed={false} />
        </div>
        <p className="mt-4 text-sm font-medium text-leaf">{cardLabel}</p>
        <div className="mt-6 grid w-full gap-2">
          <ShareButton className="press h-11 rounded-full text-sm font-semibold text-[#07080f] [background:var(--mulsetu-brand)]" label="Share my card" />
          <CopyLink />
          <Link href="/" className="press flex h-11 items-center justify-center rounded-full border border-white/15 bg-white text-sm font-semibold text-[#07080f]">
            Open digital card
          </Link>
        </div>
      </div>
    </main>
  );
}
