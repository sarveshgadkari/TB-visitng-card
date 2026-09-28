import { Globe, Mail, MapPin, Phone, RotateCcw } from "lucide-react";
import { displayPhone, displayWebsite, phoneHref } from "@/lib/contact";
import { profile } from "@/lib/profile";
import { BrandMark, Portrait } from "@/components/digital-card/BrandMark";

export function CardFront({ onFlip }: { onFlip: () => void }) {
  const call = phoneHref(profile.phone);

  return (
    <div className="card-face card-face-front">
      <BrandMark />

      <div className="face-gap" aria-hidden="true" />
      <Portrait />

      <h1 className="card-name relative mt-5">{profile.name}</h1>
      <p className="relative mt-1.5 text-[12.5px] tracking-[0.04em] text-white/55">{profile.formalName}</p>
      <p className="eyebrow relative mt-2.5 text-gold">{profile.title}</p>
      <p className="relative mt-1 text-[13px] text-white/70">{profile.company}</p>

      <div className="face-gap" aria-hidden="true" />
      <div className="brand-rule relative max-w-[240px]" aria-hidden="true">
        <span />
      </div>

      <div className="card-details relative mt-4 grid w-fit max-w-full gap-2.5 text-left">
        <p>
          <MapPin aria-hidden="true" />
          <span className="truncate">{profile.location}</span>
        </p>
        {call ? (
          <a href={call}>
            <Phone aria-hidden="true" />
            <span className="truncate tabular-nums">{displayPhone(profile.phone)}</span>
          </a>
        ) : null}
        {profile.email ? (
          <a href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" />
            <span className="truncate">{profile.email}</span>
          </a>
        ) : null}
        <a href={profile.website} target="_blank" rel="noopener noreferrer">
          <Globe aria-hidden="true" />
          <span className="truncate">{displayWebsite(profile.website)}</span>
        </a>
      </div>

      <div className="face-gap" aria-hidden="true" />
      <button
        type="button"
        onClick={onFlip}
        className="press relative inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-[#f0b429]/30 bg-white/[0.06] px-4 text-[12.5px] font-semibold text-white/85"
      >
        <RotateCcw className="size-3.5 text-gold" aria-hidden="true" />
        Flip card
      </button>
    </div>
  );
}
