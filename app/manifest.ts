import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TLBISBIG",
    short_name: "TLBISBIG",
    description: "Terence L. Bolden's digital visiting card.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#07080f",
    theme_color: "#07080f",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
