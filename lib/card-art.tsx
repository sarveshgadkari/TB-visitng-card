/**
 * Static renderings of the card faces for next/og (Satori): only flexbox and a CSS
 * subset, so the live components can't be reused. Used by the link-preview image
 * and the shareable card photo.
 *
 * Cards take a scale factor `s` and multiply every length by it, because Satori
 * mis-clips images inside elements scaled or rotated with `transform`.
 */
import type { CSSProperties } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { displayPhone, displayWebsite } from "@/lib/contact";
import { iconSrc, svgDataUrl, type IconName } from "@/lib/og-icons";
import { profile } from "@/lib/profile";

export const c = {
  paper: "#07080f",
  card: "#0f1220",
  ink: "#e8eef8",
  muted: "#8b97ad",
  forest: "#f0b429",
  pine: "#c8941f",
  teal: "#4f9cf9",
  lime: "#ffca4a",
  brand: "linear-gradient(135deg, #f0b429 0%, #ffca4a 100%)",
  pageGlow:
    "radial-gradient(circle at 12% 0%, rgba(240,180,41,0.18), transparent 45%), radial-gradient(circle at 92% 100%, rgba(79,156,249,0.16), transparent 45%)",
};

/** Card size at s = 1. */
export const cardSize = { width: 340, height: 452 };

const services = ["Engineering", "Agriculture", "E-Commerce", "Advisory", "SME Digital", "Workforce 2.0"];

// Printable ASCII plus the few symbols used, so Google Fonts returns one small subset file.
const glyphs = `${Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("")}·—•`;

/** Fetches a static TTF from Google Fonts; returns null (default font) if offline. */
async function googleFont(family: string, weight: number) {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(glyphs)}`;
    const css = await (await fetch(cssUrl)).text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!fontUrl) return null;
    const response = await fetch(fontUrl);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

const toDataUrl = (bytes: Buffer, type: string) => `data:${type};base64,${bytes.toString("base64")}`;

function placeholderSvg(label: string) {
  return svgDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><rect width="240" height="240" rx="120" fill="#0b0d1a"/><text x="120" y="132" text-anchor="middle" font-family="Georgia, serif" font-size="72" fill="#f0b429">${label}</text></svg>`,
  );
}

async function readImage(relativePath: string) {
  try {
    const bytes = await readFile(join(process.cwd(), relativePath));
    const type = relativePath.endsWith(".png") ? "image/png" : "image/jpeg";
    return toDataUrl(bytes, type);
  } catch {
    return "";
  }
}

export async function loadCardArt() {
  const [photoFile, logoFile, markFile, serif, sans, sansBold] = await Promise.all([
    readImage("public/profile/terence-l-bolden.jpg"),
    readImage("public/branding/tlbisbig-logo.png"),
    readImage("public/branding/tlbisbig-logo.png"),
    googleFont("Cormorant Garamond", 600),
    googleFont("Geist", 500),
    googleFont("Geist", 700),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 600 | 700; style: "normal" }[] = [];
  if (serif) fonts.push({ name: "Cormorant", data: serif, weight: 600, style: "normal" });
  if (sans) fonts.push({ name: "Geist", data: sans, weight: 500, style: "normal" });
  if (sansBold) fonts.push({ name: "Geist", data: sansBold, weight: 700, style: "normal" });

  return {
    fonts,
    photo: photoFile || placeholderSvg("TB"),
    logo: logoFile || placeholderSvg("TLB"),
    mark: markFile || placeholderSvg("TB"),
    cropped: Boolean(photoFile),
  };
}

function cardBox(s: number): CSSProperties {
  return {
    position: "relative",
    width: cardSize.width * s,
    height: cardSize.height * s,
    display: "flex",
    flexDirection: "column",
    borderRadius: 26 * s,
    overflow: "hidden",
  };
}

function Frame({ s, color }: { s: number; color: string }) {
  const inset = 7 * s;
  return (
    <div style={{ position: "absolute", top: inset, left: inset, right: inset, bottom: inset, borderRadius: 20 * s, border: `${Math.max(1, s)}px solid ${color}` }} />
  );
}

type CardProps = { s?: number; style?: CSSProperties };

export function FrontCard({ photo, logo, s = 1, style }: CardProps & { photo: string; logo: string }) {
  return (
    <div
      style={{
        ...cardBox(s),
        alignItems: "center",
        justifyContent: "center",
        padding: `${20 * s}px ${22 * s}px`,
        backgroundColor: c.card,
        backgroundImage: "radial-gradient(circle at 0% 0%, rgba(240,180,41,0.2), transparent 42%)",
        border: `${Math.max(1, s)}px solid rgba(240,180,41,0.28)`,
        boxShadow: `0 ${24 * s}px ${48 * s}px -${18 * s}px rgba(0,0,0,0.55)`,
        ...style,
      }}
    >
      <Frame s={s} color="rgba(240,180,41,0.28)" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt="" width={72 * s} height={74 * s} />
      <div
        style={{
          marginTop: 12 * s,
          width: 130 * s,
          height: 130 * s,
          display: "flex",
          padding: 2 * s,
          borderRadius: 65 * s,
          backgroundImage: `linear-gradient(135deg, ${c.forest}, ${c.teal})`,
        }}
      >
        <div style={{ display: "flex", width: 126 * s, height: 126 * s, padding: 3 * s, borderRadius: 63 * s, backgroundColor: c.card }}>
          <div style={{ position: "relative", display: "flex", width: 120 * s, height: 120 * s, borderRadius: 60 * s, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" width={120 * s} height={120 * s} style={{ objectFit: "cover", objectPosition: "center 18%" }} />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 14 * s, display: "flex", fontFamily: "Cormorant", fontWeight: 600, fontSize: 36 * s, lineHeight: 1 }}>{profile.name}</div>
      <div style={{ marginTop: 8 * s, display: "flex", fontSize: 12 * s, fontWeight: 700, letterSpacing: 3 * s, color: c.forest }}>{profile.title.toUpperCase()}</div>
      <div style={{ marginTop: 4 * s, display: "flex", fontSize: 13 * s, color: c.muted }}>{profile.company}</div>
      <BrandRule s={s} style={{ marginTop: 13 * s }} />
      <div style={{ marginTop: 12 * s, display: "flex", flexDirection: "column", gap: 6 * s }}>
        {[displayPhone(profile.phone), profile.email, displayWebsite(profile.website)].filter(Boolean).map((line) => (
          <div key={line} style={{ display: "flex", alignItems: "center", gap: 9 * s, fontSize: 14 * s, color: "rgba(232,238,248,0.86)" }}>
            <div style={{ width: 6 * s, height: 6 * s, borderRadius: 3 * s, backgroundColor: c.teal }} />
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BackCard({ mark, s = 1, style }: CardProps & { mark: string }) {
  return (
    <div
      style={{
        ...cardBox(s),
        padding: `${24 * s}px ${22 * s}px`,
        color: "white",
        backgroundImage: "linear-gradient(155deg, #0b0d1a 0%, #10162a 52%, #0c1c33 100%)",
        boxShadow: `0 ${24 * s}px ${48 * s}px -${18 * s}px rgba(0,0,0,0.55)`,
        ...style,
      }}
    >
      <Frame s={s} color="rgba(240,180,41,0.22)" />
      <div style={{ display: "flex", alignItems: "center", gap: 11 * s }}>
        <div
          style={{ width: 40 * s, height: 40 * s, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 11 * s, backgroundColor: c.card }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} alt="" width={28 * s} height={20 * s} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 14 * s, fontWeight: 700, letterSpacing: 4.5 * s }}>TLBISBIG</div>
          <div style={{ marginTop: 2 * s, display: "flex", fontSize: 8.5 * s, letterSpacing: 1.2 * s, color: "rgba(255,255,255,0.55)" }}>
            GLOBAL ENTERPRISE HOLDINGS
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14 * s, display: "flex", fontFamily: "Cormorant", fontWeight: 600, fontSize: 28 * s, lineHeight: 1.05 }}>
        Building Legacies.
      </div>

      <div
        style={{
          marginTop: 12 * s,
          display: "flex",
          flexDirection: "column",
          padding: 12 * s,
          borderRadius: 16 * s,
          backgroundColor: "rgba(255,255,255,0.06)",
          border: `${Math.max(1, s)}px solid rgba(255,255,255,0.1)`,
        }}
      >
        <div style={{ display: "flex", fontSize: 9.5 * s, fontWeight: 700, letterSpacing: 2.2 * s, color: c.lime }}>STRATEGIC DIVISIONS</div>
        <div style={{ marginTop: 8 * s, display: "flex", flexWrap: "wrap", rowGap: 7 * s }}>
          {services.map((service) => (
            <div
              key={service}
              style={{ width: "50%", display: "flex", alignItems: "center", gap: 7 * s, paddingRight: 6 * s, fontSize: 11.5 * s, color: "rgba(255,255,255,0.9)" }}
            >
              <div style={{ width: 7 * s, height: 7 * s, flexShrink: 0, borderRadius: 4 * s, backgroundColor: c.lime }} />
              {service}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 10 * s, display: "flex", flexDirection: "column", padding: 12 * s, borderRadius: 16 * s, backgroundColor: "#f7f4ea", color: "#07080f" }}>
        <div style={{ display: "flex", fontSize: 9.5 * s, fontWeight: 700, letterSpacing: 2.2 * s, color: c.pine }}>OUR HERITAGE</div>
        <div style={{ marginTop: 4 * s, display: "flex", fontSize: 22 * s, fontWeight: 700, lineHeight: 1 }}>1987</div>
        <div style={{ marginTop: 4 * s, display: "flex", fontSize: 12 * s, fontWeight: 700, color: c.pine }}>Founded. Global. Diversified.</div>
        <div style={{ marginTop: 3 * s, display: "flex", fontSize: 11 * s, color: c.muted }}>Engineering, technology, and agriculture since 1987.</div>
      </div>
    </div>
  );
}

/* ---------- Combined landscape card (front + back in one image) ---------- */

export const combinedSize = { width: 1520, height: 920 };

const serviceIcons: [IconName, string][] = [
  ["blocks", "Engineering"],
  ["globe", "Agriculture"],
  ["smartphone", "E-Commerce"],
  ["rocket", "Advisory"],
  ["cloud", "SME Digital"],
  ["bot", "Workforce 2.0"],
];

const leaf = "M70 50c-12 8-28 6-36-6 8 2 18-6 16-16 10 6 18 14 20 22Z M58 68c-8 4-18 2-24-6 6 2 12-2 12-8 6 4 10 8 12 14Z";

/** Background art: ivory left, curved lime stripe, dark green right, leaf accents. */
function combinedBackground() {
  const { width: w, height: h } = combinedSize;
  return svgDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <radialGradient id="glow" cx="0" cy="0" r="0.55"><stop offset="0" stop-color="#f0b429" stop-opacity="0.28"/><stop offset="1" stop-color="#f0b429" stop-opacity="0"/></radialGradient>
      <linearGradient id="deep" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b0d1a"/><stop offset="0.52" stop-color="#10162a"/><stop offset="1" stop-color="#0c1c33"/></linearGradient>
      <linearGradient id="stripe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0b429"/><stop offset="1" stop-color="#c8941f"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#07080f"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    <path d="M756 0 C 690 280, 690 620, 626 ${h} L 652 ${h} C 716 620, 716 280, 782 0 Z" fill="url(#stripe)"/>
    <path d="M782 0 C 716 280, 716 620, 652 ${h} L ${w} ${h} L ${w} 0 Z" fill="url(#deep)"/>
    <g transform="translate(-40 690) scale(2.6)" fill="#f0b429" fill-opacity="0.18"><path d="${leaf}" transform="scale(-1 1) translate(-80 0)"/></g>
    <g transform="translate(1330 720) scale(2.4)" fill="#4f9cf9" fill-opacity="0.16"><path d="${leaf}"/></g>
  </svg>`);
}

function SectionTitle({ children, color }: { children: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", fontSize: 19, fontWeight: 700, letterSpacing: 4, color }}>{children}</div>
      <div style={{ width: 60, height: 2, backgroundColor: color, opacity: 0.4 }} />
    </div>
  );
}

function IconDot({ name, size }: { name: IconName; size: number }) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: size / 2, backgroundColor: c.forest }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={iconSrc(name, "white")} alt="" width={size * 0.48} height={size * 0.48} />
    </div>
  );
}

export function CombinedCard({ photo, logo, mark }: { photo: string; logo: string; mark: string }) {
  const { width: w, height: h } = combinedSize;
  const portrait = 232;
  const inner = portrait - 16;

  return (
    <div style={{ position: "relative", width: w, height: h, display: "flex", borderRadius: 44, overflow: "hidden", boxShadow: "0 40px 80px -30px rgba(16,40,28,0.45)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={combinedBackground()} alt="" width={w} height={h} style={{ position: "absolute", left: 0, top: 0 }} />

      {/* Front half */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 640, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 56px" }}>
        {/* Same stack as the live front: logo, then the photo centred beneath it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={148} height={152} />
        <div style={{ marginTop: 24, display: "flex", boxShadow: "0 18px 36px -12px rgba(240,180,41,0.35)", borderRadius: portrait / 2 }}>
          <div style={{ width: portrait, height: portrait, display: "flex", padding: 5, borderRadius: portrait / 2, backgroundImage: `linear-gradient(135deg, ${c.forest}, ${c.teal})` }}>
            <div style={{ display: "flex", width: portrait - 10, height: portrait - 10, padding: 3, borderRadius: portrait / 2, backgroundColor: c.card }}>
              <div style={{ position: "relative", display: "flex", width: inner, height: inner, borderRadius: inner / 2, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="" width={inner} height={inner} style={{ objectFit: "cover", objectPosition: "center 18%" }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, display: "flex", fontFamily: "Cormorant", fontWeight: 600, fontSize: 58, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 70, height: 2, backgroundColor: c.forest, opacity: 0.6 }} />
          <div style={{ display: "flex", fontSize: 29, fontWeight: 700, letterSpacing: 5, color: c.forest }}>{profile.title.toUpperCase()}</div>
          <div style={{ width: 70, height: 2, backgroundColor: c.teal, opacity: 0.6 }} />
        </div>
        <div style={{ marginTop: 10, display: "flex", fontSize: 27, color: "rgba(232,238,248,0.82)" }}>{profile.company}</div>

        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 16 }}>
          {(
            [
              ["phone", displayPhone(profile.phone)],
              ["mail", profile.email],
              ["globe", displayWebsite(profile.website)],
            ] as [IconName, string][]
          ).map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 30, color: c.ink }}>
              <IconDot name={icon} size={54} />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Back half */}
      <div style={{ position: "absolute", left: 800, top: 0, width: w - 800 - 50, height: h, display: "flex", flexDirection: "column", justifyContent: "center", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 22, backgroundColor: c.card, boxShadow: "0 12px 24px rgba(0,0,0,0.25)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mark} alt="" width={66} height={48} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 42, fontWeight: 700, letterSpacing: 6, lineHeight: 1 }}>TLBISBIG</div>
            <div style={{ marginTop: 10, display: "flex", fontSize: 17, letterSpacing: 3.5, color: "rgba(255,255,255,0.72)" }}>GLOBAL ENTERPRISE HOLDINGS</div>
          </div>
        </div>

        <div style={{ marginTop: 30, display: "flex", fontFamily: "Cormorant", fontWeight: 600, fontSize: 47, lineHeight: 1 }}>Building Legacies.</div>

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", padding: "24px 28px", borderRadius: 26, backgroundColor: "#f7f4ea", color: "#07080f" }}>
          <SectionTitle color={c.forest}>STRATEGIC DIVISIONS</SectionTitle>
          <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", rowGap: 16 }}>
            {serviceIcons.map(([icon, label], i) => (
              <div
                key={label}
                style={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  paddingLeft: i % 2 ? 24 : 0,
                  paddingRight: i % 2 ? 0 : 16,
                  borderLeft: i % 2 ? "2px solid rgba(22,24,29,0.08)" : "none",
                  fontSize: 23,
                  lineHeight: 1.15,
                }}
              >
                <IconDot name={icon} size={50} />
                {/* Own flex box so long labels wrap inside the column instead of overflowing. */}
                <div style={{ display: "flex", flex: 1, minWidth: 0 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", padding: "24px 28px", borderRadius: 26, backgroundColor: "#f7f4ea", color: "#07080f" }}>
          <SectionTitle color={c.pine}>OUR HERITAGE</SectionTitle>
          <div style={{ marginTop: 10, display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1 }}>1987</div>
          <div style={{ marginTop: 8, display: "flex", fontSize: 28, fontWeight: 700, color: c.pine }}>Founded. Global. Diversified.</div>
          <div style={{ marginTop: 6, display: "flex", width: 470, fontSize: 20, lineHeight: 1.3, color: c.muted }}>
            A privately held enterprise across engineering, technology, and agriculture.
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 12 }}>
            {["Est. 1987", "37+ Years", "6 Divisions"].map((chip) => (
              <div key={chip} style={{ display: "flex", padding: "8px 18px", borderRadius: 999, backgroundColor: "rgba(240,180,41,0.16)", color: c.forest, fontSize: 19, fontWeight: 500 }}>
                {chip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandRule({ s = 1, width = 70, style }: CardProps & { width?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 * s, ...style }}>
      <div style={{ width: width * s, height: Math.max(1, s), backgroundImage: "linear-gradient(90deg, transparent, rgba(240,180,41,0.7))" }} />
      <div style={{ width: 7 * s, height: 7 * s, borderRadius: 4 * s, backgroundImage: `linear-gradient(90deg, ${c.forest} 50%, ${c.teal} 50%)` }} />
      <div style={{ width: width * s, height: Math.max(1, s), backgroundImage: "linear-gradient(90deg, rgba(79,156,249,0.7), transparent)" }} />
    </div>
  );
}
