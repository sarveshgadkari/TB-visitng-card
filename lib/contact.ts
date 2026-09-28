import { cardLabel, profile } from "@/lib/profile";

export function buildVCard(photoBase64?: string) {
  const { first, last } = splitName(profile.name);
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    fold(`N:${escapeText(last)};${escapeText(first)};;;`),
    fold(`FN:${escapeText(profile.name)}`),
    fold(`ORG:${escapeText(profile.company)}`),
    fold(`TITLE:${escapeText(profile.title)}`),
  ];

  const tel = phoneHref(profile.phone);
  if (tel) lines.push(fold(`TEL;TYPE=CELL:${tel.replace("tel:", "")}`));
  if (profile.email) lines.push(fold(`EMAIL;TYPE=INTERNET:${escapeText(profile.email)}`));
  if (profile.website) lines.push(fold(`URL:${profile.website}`));
  if (profile.linkedin) lines.push(fold(`URL;TYPE=LinkedIn:${profile.linkedin}`));
  lines.push(fold(`URL;TYPE=CARD:${profile.profileUrl}`));
  if (photoBase64) lines.push(fold(`PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`));
  lines.push("END:VCARD");
  return `${lines.join("\r\n")}\r\n`;
}

export function phoneHref(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return "";
  return `tel:${trimmed.startsWith("+") ? `+${digits}` : digits}`;
}

export function whatsappHref(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return "";
  return `https://wa.me/${digits}`;
}

export function displayUrl() {
  return cardLabel;
}

export const vcardPath = "/terence-l-bolden.vcf";

/**
 * How "Save Contact" should behave on this browser:
 * - "vcard": iPhone/iPad (Safari, Chrome, Edge, Firefox, SFSafariViewController) and desktop open the
 *   vCard as an "Add Contact" sheet or file.
 * - "android": Android browsers can only download the vCard; websites can't open the Contacts
 *   app there (Chrome only launches apps that accept BROWSABLE intents, and Contacts doesn't),
 *   so the visitor is shown the "tap Open, then Save" steps.
 * - "in-app": Instagram/Facebook/LinkedIn/etc. WebViews can't handle the vCard at all, so the
 *   visitor is asked to open the page in their real browser.
 */
export function saveContactMode(userAgent: string): "vcard" | "android" | "in-app" {
  const knownInApp = /FBAN|FBAV|FB_IAB|Instagram|LinkedInApp|Line\/|Snapchat|TikTok|musical_ly|Twitter|MicroMessenger|; wv\)/i;
  // iOS in-app WKWebViews drop the "Safari/" token that Safari and iOS Chrome/Edge/Firefox keep.
  const iosWebView = /iPhone|iPad|iPod/i.test(userAgent) && !/Safari\//i.test(userAgent);
  if (knownInApp.test(userAgent) || iosWebView) return "in-app";
  if (/Android/i.test(userAgent)) return "android";
  return "vcard";
}

export function displayPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return value.trim();
}

export function displayWebsite(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { first: parts[0] || "", last: "" };
  return { first: parts.slice(0, -1).join(" "), last: parts.at(-1) || "" };
}

function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\r\n|\n|\r/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function fold(line: string) {
  if (line.length <= 75) return line;
  let output = line.slice(0, 75);
  let index = 75;
  while (index < line.length) {
    output += `\r\n ${line.slice(index, index + 74)}`;
    index += 74;
  }
  return output;
}
