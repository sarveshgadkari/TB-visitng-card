import Image from "next/image";
import { ArrowUpRight, Bot, Briefcase, Building2, Landmark, RotateCcw, ShoppingBag, Sprout } from "lucide-react";
import { displayWebsite } from "@/lib/contact";
import { profile } from "@/lib/profile";

const divisions = [
  { icon: Building2, label: "Engineering" },
  { icon: Sprout, label: "Agriculture" },
  { icon: ShoppingBag, label: "E-Commerce" },
  { icon: Landmark, label: "Advisory" },
  { icon: Briefcase, label: "SME Digital" },
  { icon: Bot, label: "Workforce 2.0" },
];

const facts = ["Est. 1987", "37+ Years", "6 Divisions"];

export function CardBack({ onFlip }: { onFlip: () => void }) {
  return (
    <div className="card-face card-face-back">
      <div className="relative flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-[13px] bg-[#12081c] shadow-[0_8px_18px_rgba(0,0,0,0.22)]">
          <Image src={profile.logo} alt="" width={165} height={169} className="h-auto w-11" />
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold tracking-[0.28em]">TLBISBIG</span>
          <span className="mt-0.5 block text-[9.5px] tracking-[0.14em] text-white/55 uppercase">Global Enterprise Holdings</span>
        </span>
      </div>

      <h2 className="relative mt-4 font-serif text-[1.7rem] leading-[1.05] font-semibold text-balance">Transforming Industries. Building Legacies.</h2>

      <section className="relative mt-4 rounded-[18px] bg-[#f7f4ea] p-3.5 text-[#07080f] shadow-[0_12px_26px_-10px_rgba(0,0,0,0.45)]" aria-labelledby="divisions-heading">
        <div className="flex items-center justify-between gap-2">
          <h3 id="divisions-heading" className="eyebrow flex items-center gap-2 text-[10px] text-[#c8941f]">
            Strategic Divisions
            <span className="h-px w-6 bg-[#c8941f]/40" aria-hidden="true" />
          </h3>
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-[11px] font-medium text-[#07080f]/55 hover:text-[#c8941f]"
          >
            {displayWebsite(profile.website)}
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-y-2.5">
          {divisions.map((item, i) => (
            <li
              key={item.label}
              className={`flex min-w-0 items-center gap-2 text-[12px] leading-tight font-medium text-[#07080f]/90 ${i % 2 ? "border-l border-[#07080f]/10 pl-2.5" : "pr-2"}`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#07080f] text-[#f0b429]">
                <item.icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="min-w-0">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <a
        href={profile.website}
        target="_blank"
        rel="noopener noreferrer"
        className="press relative mt-3 block rounded-[18px] bg-[#f7f4ea] p-3.5 text-[#07080f] shadow-[0_12px_26px_-10px_rgba(0,0,0,0.45)]"
        aria-label="TLBISBIG heritage — established 1987"
      >
        <span className="eyebrow block text-[10px] text-[#c8941f]">Our Heritage</span>
        <span className="mt-1 block font-serif text-[1.65rem] leading-none font-semibold">1987</span>
        <span className="mt-1.5 block text-[12.5px] leading-snug text-[#07080f]/70">
          Founded as a consulting practice. Now a diversified global enterprise across engineering, technology, and agriculture.
        </span>
        <span className="mt-2.5 flex items-center justify-between gap-2">
          <span className="flex min-w-0 flex-wrap gap-1">
            {facts.map((fact) => (
              <span key={fact} className="rounded-full bg-[#f0b429]/15 px-2 py-0.5 text-[10.5px] font-medium text-[#8a6810] ring-1 ring-[#f0b429]/30">
                {fact}
              </span>
            ))}
          </span>
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#07080f] text-[#f0b429]">
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </span>
      </a>

      <div className="min-h-5 flex-1" aria-hidden="true" />
      <button
        type="button"
        onClick={onFlip}
        className="press relative mx-auto flex h-9 shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 text-[12.5px] font-semibold"
      >
        <RotateCcw className="size-3.5 text-[#ffca4a]" aria-hidden="true" />
        Flip back
      </button>
    </div>
  );
}
