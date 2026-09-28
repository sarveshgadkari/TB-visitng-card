"use client";

import { ArrowUpRight, Globe, Mail, Phone, Share2 } from "lucide-react";
import type { ReactNode } from "react";
import { phoneHref, whatsappHref } from "@/lib/contact";
import { profile } from "@/lib/profile";
import { ShareButton } from "@/components/share/ShareButton";

type Tile = {
  label: string;
  tone: string;
  icon: ReactNode;
  href?: string;
  external?: boolean;
  share?: boolean;
};

export function ContactGrid() {
  const tiles: Tile[] = [];
  const whatsapp = whatsappHref(profile.whatsapp);
  const call = phoneHref(profile.phone);
  if (whatsapp) tiles.push({ label: "WhatsApp", href: whatsapp, external: true, tone: "#f0b429", icon: <WhatsAppIcon /> });
  if (call) tiles.push({ label: "Call", href: call, tone: "#4f9cf9", icon: <Phone className="size-4" /> });
  if (profile.email) tiles.push({ label: "Email", href: `mailto:${profile.email}`, tone: "#c8941f", icon: <Mail className="size-4" /> });
  if (profile.linkedin) tiles.push({ label: "LinkedIn", href: profile.linkedin, external: true, tone: "#4f9cf9", icon: <LinkedInIcon /> });
  if (profile.website) tiles.push({ label: "Website", href: profile.website, external: true, tone: "#f0b429", icon: <Globe className="size-4" /> });
  tiles.push({ label: "Share Card", tone: "#4f9cf9", share: true, icon: <Share2 className="size-4" /> });

  return (
    <div className="contact-grid">
      {tiles.map((tile) => {
        const inner = (
          <>
            <span className="flex w-full items-start justify-between">
              <span
                className="grid size-9 shrink-0 place-items-center rounded-full"
                style={{ color: tile.tone, background: `color-mix(in srgb, ${tile.tone} 11%, white)`, boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${tile.tone} 16%, transparent)` }}
              >
                {tile.icon}
              </span>
              <ArrowUpRight className="size-3.5 text-ink/30" aria-hidden="true" />
            </span>
            <span className="w-full truncate text-[12.5px] leading-tight font-semibold text-ink/85">{tile.label}</span>
          </>
        );
        if (tile.share) {
          return (
            <ShareButton key={tile.label} className="contact-tile press">
              {inner}
            </ShareButton>
          );
        }
        return (
          <a
            key={tile.label}
            href={tile.href}
            className="contact-tile press"
            target={tile.external ? "_blank" : undefined}
            rel={tile.external ? "noopener noreferrer" : undefined}
          >
            {inner}
          </a>
        );
      })}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 4C7.61 4 4 7.55 4 11.9c0 1.4.38 2.76 1.1 3.96L4 20l4.28-1.12a8.1 8.1 0 0 0 3.76.92c4.43 0 8.04-3.55 8.04-7.9S16.47 4 12.04 4Zm4.67 11.18c-.18.52-1.07.99-1.49 1.05-.38.06-.86.08-1.39-.09-.32-.1-.73-.24-1.26-.47-2.22-.96-3.66-3.2-3.77-3.35-.11-.15-.9-1.2-.9-2.29 0-1.09.57-1.63.77-1.85.2-.22.44-.28.59-.28h.42c.14 0 .32-.05.5.38.18.44.63 1.52.68 1.63.06.11.1.24.02.39-.08.15-.12.24-.24.37-.12.13-.25.29-.36.39-.12.11-.24.23-.1.45.14.22.62 1.02 1.33 1.66.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.12 1.1Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9H4V20h2.5V9ZM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.55-.56-2.4-1.72-2.4-1.04 0-1.6.7-1.87 1.38-.1.23-.08.56-.08.88V20H11.3s.04-9.7 0-10.7H13.8v1.66c.33-.55 1.12-1.86 2.92-1.86 2.07 0 3.28 1.35 3.28 4.26V20Z" />
    </svg>
  );
}
