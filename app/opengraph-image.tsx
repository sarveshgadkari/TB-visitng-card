import { ImageResponse } from "next/og";
import { BackCard, BrandRule, c, cardSize, FrontCard, loadCardArt } from "@/lib/card-art";
import { cardLabel, profile } from "@/lib/profile";

export const alt = "Digital visiting card of Terence L. Bolden, Founder of TLBISBIG Consulting Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const s = 1.16;
const cardTop = (size.height - cardSize.height * s) / 2;

export default async function OpenGraphImage() {
  const art = await loadCardArt();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          fontFamily: "Geist",
          color: c.ink,
          backgroundColor: c.paper,
          backgroundImage: c.pageGlow,
        }}
      >
        {/* Front card, with the back card peeking out behind it (only the back is tilted). */}
        <div style={{ position: "relative", display: "flex", width: 610, height: size.height, flexShrink: 0 }}>
          <BackCard mark={art.mark} s={s} style={{ position: "absolute", left: 180, top: cardTop - 4, transform: "rotate(7deg)" }} />
          <FrontCard photo={art.photo} logo={art.logo} s={s} style={{ position: "absolute", left: 70, top: cardTop }} />
        </div>

        <div style={{ width: 590, display: "flex", flexDirection: "column", paddingLeft: 10, paddingRight: 56 }}>
          <div style={{ display: "flex", fontSize: 16, fontWeight: 700, letterSpacing: 5, color: c.teal }}>DIGITAL VISITING CARD</div>
          <div style={{ marginTop: 16, display: "flex", fontFamily: "Cormorant", fontWeight: 600, fontSize: 58, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ marginTop: 16, display: "flex", fontSize: 20, fontWeight: 700, letterSpacing: 5, color: c.forest }}>{profile.title.toUpperCase()}</div>
          <div style={{ marginTop: 8, display: "flex", fontSize: 23, color: c.muted }}>{profile.company}</div>
          <BrandRule width={110} style={{ marginTop: 26 }} />
          <div style={{ marginTop: 24, display: "flex", fontSize: 25, lineHeight: 1.35, color: "rgba(232,238,248,0.86)" }}>
            Tap to open my digital visiting card &amp; save my contact.
          </div>
          <div style={{ marginTop: 26, display: "flex" }}>
            <div style={{ display: "flex", padding: "12px 26px", borderRadius: 999, backgroundImage: c.brand, color: "#07080f", fontSize: 23, fontWeight: 700 }}>
              {cardLabel}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: art.fonts },
  );
}
