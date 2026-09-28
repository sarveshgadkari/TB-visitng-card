import Image from "next/image";
import { profile } from "@/lib/profile";

export function BrandMark({ tone = "light" }: { tone?: "light" | "dark" }) {
  if (profile.logo) {
    return <Image src={profile.logo} alt="TLBISBIG" width={165} height={169} priority className="relative h-auto w-[84px]" />;
  }

  const gold = tone === "light" ? "text-[#f0b429]" : "text-[#c8941f]";
  const ink = tone === "light" ? "text-white" : "text-[#07080f]";
  const muted = tone === "light" ? "text-white/55" : "text-[#07080f]/55";

  return (
    <div className="relative text-center">
      <p className={`eyebrow text-[10px] ${gold}`}>Est. 1987 · LLC</p>
      <p className={`mt-1 font-serif text-[1.85rem] leading-none font-semibold tracking-[0.16em] ${ink}`}>TLBISBIG</p>
      <p className={`mt-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase ${muted}`}>Consulting Group</p>
    </div>
  );
}

export function Portrait() {
  if (profile.photo) {
    return (
      <div className="portrait relative rounded-full p-[2px] shadow-[0_14px_30px_-8px_rgba(240,180,41,0.45)]" style={{ background: "linear-gradient(135deg, #f0b429, #4f9cf9)" }}>
        <div className="relative size-full overflow-hidden rounded-full bg-[#0f1220] p-[4px]">
          <div className="relative size-full overflow-hidden rounded-full">
            <Image src={profile.photo} alt={profile.name} fill priority sizes="340px" className="scale-[1.08] object-cover object-[center_18%]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="portrait relative grid place-items-center rounded-full p-[2px] shadow-[0_14px_30px_-8px_rgba(240,180,41,0.45)]"
      style={{ background: "linear-gradient(135deg, #f0b429, #4f9cf9)" }}
      aria-hidden="true"
    >
      <div className="grid size-[calc(100%-8px)] place-items-center rounded-full bg-[#0b0d1a]">
        <span className="font-serif text-[3.1rem] leading-none font-semibold tracking-[0.04em] text-[#f0b429]">TB</span>
      </div>
    </div>
  );
}
