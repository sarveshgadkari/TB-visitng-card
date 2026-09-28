export const profile = {
  name: "Terence L. Bolden",
  formalName: "T.L. Bryant Bolden",
  title: "Founder",
  company: "TLBISBIG Consulting Group",
  location: "United States of America",
  email: "pres@tlbenterprise.com",
  phone: "+18507669073",
  whatsapp: "+18507669073",
  linkedin: "",
  website: "https://www.tlbisbig.world/",
  profileUrl: "https://terence.tlbisbig.world/",
  bio: "Founder of TLBISBIG, a privately held global enterprise conglomerate delivering institutional-grade solutions across engineering, technology, sustainable agriculture, and strategic investment.",
  photo: "/profile/terence-l-bolden.jpg",
  logo: "/branding/tlbisbig-logo.png",
} as const;

export const cardLabel = "terence.tlbisbig.world";

export const poweredBy = {
  name: "Mulsetu",
  url: "https://mulsetu.com",
  mark: "/branding/mulsetu-mark.png",
} as const;

export const shareTitle = "Terence L. Bolden — Founder, TLBISBIG";
/** Page description used by search engines and link previews. */
export const shareText =
  "Digital visiting card of Terence L. Bolden, Founder of TLBISBIG Consulting Group. Save the contact or open terence.tlbisbig.world.";

/** The personal note sent when someone shares the card, including the Mulsetu credit and both links. */
export const shareMessage = [
  "Hi! Here's my digital visiting card.",
  "",
  `${profile.name} — ${profile.title}, ${profile.company}`,
  "Tap the link to view my card and save my contact:",
  profile.profileUrl,
  "",
  `Powered by ${poweredBy.name} — digital visiting cards for your business`,
  poweredBy.url,
].join("\n");
