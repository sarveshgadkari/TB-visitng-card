import { ImageResponse } from "next/og";
import { c, CombinedCard, loadCardArt } from "@/lib/card-art";
import { cardLabel } from "@/lib/profile";

// Rendered once at build time; attached as a photo when visitors tap "Share Card".
export const dynamic = "force-static";

const size = { width: 1600, height: 1080 };

export async function GET() {
  const art = await loadCardArt();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Geist",
          color: c.ink,
          backgroundColor: c.paper,
          backgroundImage: c.pageGlow,
        }}
      >
        <CombinedCard photo={art.photo} logo={art.logo} mark={art.mark} />
        {/* Instagram and Facebook drop the share caption, so the card link is printed on the photo too. */}
        <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: c.muted }}>
          Open my digital card
          <div style={{ display: "flex", padding: "8px 24px", borderRadius: 999, backgroundImage: c.brand, color: "#07080f", fontWeight: 700 }}>{cardLabel}</div>
        </div>
      </div>
    ),
    { ...size, fonts: art.fonts },
  );
}
