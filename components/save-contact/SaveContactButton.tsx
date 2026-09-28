"use client";

import { ArrowRight, UserRound, X } from "lucide-react";
import { useState, type MouseEvent, type ReactNode } from "react";
import { saveContactMode, vcardPath } from "@/lib/contact";
import { copyCardLink } from "@/lib/share";

export function SaveContactButton() {
  const [label, setLabel] = useState("Save Contact");
  const [help, setHelp] = useState<"android" | "in-app" | null>(null);
  const [copyLabel, setCopyLabel] = useState("Copy link");

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    const mode = saveContactMode(navigator.userAgent);
    if (mode === "in-app") {
      event.preventDefault();
      setHelp("in-app");
      return;
    }
    setLabel("Opening contact");
    window.setTimeout(() => setLabel("Save Contact"), 2500);
    // iPhone opens the vCard as an "Add Contact" sheet by itself. Android browsers can
    // only download it (websites can't open the Contacts app there), so explain the last tap.
    if (mode === "android") setHelp("android");
  }

  async function onCopy() {
    const ok = await copyCardLink();
    setCopyLabel(ok ? "Link copied" : "Copy failed");
  }

  return (
    <>
      <a
        href={vcardPath}
        className="press flex h-13 items-center gap-3 rounded-full pr-2 pl-2 text-[15px] font-semibold text-[#07080f] shadow-[0_14px_28px_-10px_rgba(240,180,41,0.45),inset_0_1px_0_rgba(255,255,255,0.35)]"
        style={{ background: "var(--mulsetu-brand)" }}
        onClick={onClick}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#07080f]/12">
          <UserRound className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="flex-1 tracking-[0.02em]">{label}</span>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-card text-forest">
          <ArrowRight className="size-[18px]" aria-hidden="true" />
        </span>
      </a>

      {help === "android" ? (
        <HelpPanel title="Almost done — 2 quick taps" onClose={() => setHelp(null)}>
          <ol className="mt-2 grid gap-1.5">
            <Step n={1}>
              Tap <strong className="text-ink">Open</strong> on the download at the bottom of the screen (or in your notifications).
            </Step>
            <Step n={2}>
              Tap <strong className="text-ink">Save</strong> in Contacts.
            </Step>
          </ol>
          <a href={vcardPath} className="mt-3 inline-block text-[12.5px] font-semibold text-forest underline underline-offset-2">
            Didn&apos;t download? Tap here
          </a>
        </HelpPanel>
      ) : null}

      {help === "in-app" ? (
        <HelpPanel title="Open in your browser to save" onClose={() => setHelp(null)}>
          <p className="mt-1">
            This app&apos;s built-in browser can&apos;t add contacts. Tap <strong className="text-ink">⋯</strong> or <strong className="text-ink">⋮</strong> and choose{" "}
            <strong className="text-ink">Open in browser</strong> (Safari or Chrome), then tap Save Contact again.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={onCopy} className="press h-10 rounded-full bg-forest text-[13px] font-semibold text-[#07080f]">
              {copyLabel}
            </button>
            <a href={vcardPath} className="press flex h-10 items-center justify-center rounded-full border border-white/10 bg-white text-[13px] font-semibold text-[#07080f]">
              Try anyway
            </a>
          </div>
        </HelpPanel>
      ) : null}
    </>
  );
}

function HelpPanel({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div role="status" className="relative rounded-[18px] border border-forest/15 bg-card p-3.5 pr-10 text-[13px] leading-snug text-muted shadow-[0_1px_2px_rgba(22,24,29,0.05)]">
      <p className="font-semibold text-ink">{title}</p>
      {children}
      <button type="button" onClick={onClose} aria-label="Close" className="absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-full text-ink/50 hover:bg-ink/5">
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-forest text-[11px] font-bold text-white">{n}</span>
      <span>{children}</span>
    </li>
  );
}
