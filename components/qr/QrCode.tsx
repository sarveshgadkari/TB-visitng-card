"use client";

import { QRCodeSVG } from "qrcode.react";
import { profile } from "@/lib/profile";

export function QrCode({ size = 220, framed = true }: { size?: number; framed?: boolean }) {
  const code = (
    <QRCodeSVG value={profile.profileUrl} size={size} level="H" marginSize={2} bgColor="#ffffff" fgColor="#07080f" />
  );
  if (!framed) return code;
  return <div className="inline-flex rounded-[16px] bg-white p-3">{code}</div>;
}
