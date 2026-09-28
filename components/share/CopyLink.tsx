"use client";

import { useState } from "react";
import { copyCardLink } from "@/lib/share";

export function CopyLink() {
  const [label, setLabel] = useState("Copy link");

  async function onCopy() {
    const ok = await copyCardLink();
    setLabel(ok ? "Copied" : "Copy failed");
    if (ok) window.setTimeout(() => setLabel("Copy link"), 1600);
  }

  return (
    <button type="button" className="press h-11 rounded-full border border-white/15 bg-white text-sm font-semibold text-[#07080f]" onClick={onCopy}>
      {label}
    </button>
  );
}
