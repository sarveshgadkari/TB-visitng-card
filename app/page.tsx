import type { Metadata } from "next";
import { DigitalBusinessCard } from "@/components/digital-card/DigitalBusinessCard";
import { profile, shareText, shareTitle } from "@/lib/profile";

export const metadata: Metadata = {
  title: shareTitle,
  description: shareText,
  alternates: { canonical: profile.profileUrl },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ face?: string }>;
}) {
  const query = await searchParams;

  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.title,
            worksFor: { "@type": "Organization", name: profile.company, url: profile.website },
            ...(profile.email ? { email: profile.email } : {}),
            ...(profile.phone ? { telephone: profile.phone } : {}),
            url: profile.profileUrl,
            ...(profile.linkedin ? { sameAs: [profile.linkedin] } : {}),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <DigitalBusinessCard startOnBack={query.face === "back"} />
    </main>
  );
}
