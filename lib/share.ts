import { profile, shareMessage, shareTitle } from "@/lib/profile";

export const cardPhotoPath = "/share-card.png";

/**
 * Downloads the card photo ahead of time: Safari only allows navigator.share() straight
 * from the tap, so the file has to be ready before the visitor presses Share.
 */
export async function loadCardPhoto() {
  try {
    const response = await fetch(cardPhotoPath);
    if (!response.ok) return null;
    return new File([await response.blob()], "Terence-L-Bolden-TLBISBIG-card.png", { type: "image/png" });
  } catch {
    return null;
  }
}

/** Shares the card photo with the message and link as its caption, or just the link where files can't be shared. */
export async function shareCard(photo?: File | null) {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") return "unavailable" as const;
  const pageUrl = profile.profileUrl;
  try {
    if (photo && navigator.canShare?.({ files: [photo] })) {
      // With a file attached many apps drop the separate `url` field, so the link goes in the text.
      await navigator.share({ files: [photo], title: shareTitle, text: `${shareMessage}\n${pageUrl}` });
    } else {
      await navigator.share({ title: shareTitle, text: shareMessage, url: pageUrl });
    }
    return "shared" as const;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return "dismissed" as const;
    return "unavailable" as const;
  }
}

export async function copyCardLink() {
  const value = profile.profileUrl;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the selection method.
  }
  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  } catch {
    return false;
  }
}

export function whatsAppCardUrl() {
  return `https://wa.me/?text=${encodeURIComponent(`${shareMessage}\n${profile.profileUrl}`)}`;
}
