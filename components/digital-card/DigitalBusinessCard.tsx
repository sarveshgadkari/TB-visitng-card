import Image from "next/image";
import { ConnectSection } from "@/components/digital-card/ConnectSection";
import { ContactGrid } from "@/components/digital-card/ContactGrid";
import { FlipCard } from "@/components/digital-card/FlipCard";
import { SaveContactButton } from "@/components/save-contact/SaveContactButton";
import { poweredBy } from "@/lib/profile";

export function DigitalBusinessCard({ startOnBack = false }: { startOnBack?: boolean }) {
  return (
    <div className="stage">
      <div className="stage-card">
        <FlipCard startFlipped={startOnBack} />
      </div>
      <div className="stage-actions">
        <SaveContactButton />
        <ContactGrid />
        <ConnectSection />
      </div>
      <a href={poweredBy.url} target="_blank" rel="noopener noreferrer" className="stage-foot powered-by">
        <span>Powered by</span>
        <Image src={poweredBy.mark} alt="" width={316} height={231} className="h-auto w-[22px]" />
        <span className="font-semibold tracking-[0.18em]">{poweredBy.name}</span>
      </a>
    </div>
  );
}
