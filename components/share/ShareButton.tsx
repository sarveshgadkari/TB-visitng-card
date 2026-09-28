"use client";

import { Link2, MessageCircle, Share2, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cardLabel, profile } from "@/lib/profile";
import { copyCardLink, loadCardPhoto, shareCard, whatsAppCardUrl } from "@/lib/share";

export function ShareSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState("");
  const photoRef = useRef<File | null>(null);

  useEffect(() => {
    if (!open || photoRef.current) return;
    loadCardPhoto().then((file) => {
      photoRef.current = file;
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function onShare() {
    const result = await shareCard(photoRef.current);
    if (result === "shared") setNotice("Share sheet opened.");
    if (result === "unavailable") setNotice("Sharing is not available here. Copy the link instead.");
  }

  async function onCopy() {
    const ok = await copyCardLink();
    setNotice(ok ? "Link copied." : "Select the address below and copy it.");
  }

  // Portalled to <body>: the trigger sits inside dark, white-text sections and inside
  // animated (transformed) containers, which would recolour and trap a fixed overlay.
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(16,24,20,0.45)] p-3 text-ink backdrop-blur-[2px] sm:items-center">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close share" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[400px] rounded-[26px] border border-forest/10 bg-card p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_24px_60px_-12px_rgba(16,40,28,0.35)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 grid size-8 place-items-center rounded-full text-ink/50 hover:bg-ink/5"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
        <p className="eyebrow text-[10.5px] text-teal">Share my card</p>
        <h2 id={titleId} className="mt-2 font-serif text-[1.9rem] leading-none font-semibold">
          {profile.name}
        </h2>
        <p className="mt-1.5 text-[13.5px] text-muted">
          {profile.title}
          <span className="px-1.5 text-ink/30">·</span>
          TLBISBIG
        </p>
        <p className="mt-2 text-[13px] font-medium text-leaf">{cardLabel}</p>
        <div className="mt-5 grid gap-2.5">
          <button
            type="button"
            className="press flex h-12 items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold text-[#07080f] shadow-[0_10px_22px_-10px_rgba(240,180,41,0.55)]"
            style={{ background: "var(--mulsetu-brand)" }}
            onClick={onShare}
            data-autofocus
          >
            <Share2 className="size-4" aria-hidden="true" />
            Share
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={whatsAppCardUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white text-[14px] font-semibold text-[#07080f]"
            >
              <MessageCircle className="size-4 text-forest" aria-hidden="true" />
              WhatsApp
            </a>
            <button
              type="button"
              className="press flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white text-[14px] font-semibold text-[#07080f]"
              onClick={onCopy}
            >
              <Link2 className="size-4 text-teal" aria-hidden="true" />
              Copy link
            </button>
          </div>
        </div>
        {notice ? (
          <p className="mt-3 text-center text-[13px] font-medium text-teal" role="status">
            {notice}
          </p>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

export function ShareButton({
  label = "Share",
  className,
  children,
}: {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children ?? label}
      </button>
      <ShareSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
