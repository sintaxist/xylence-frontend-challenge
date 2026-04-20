
import type { Startup } from "@/types";

import HeaderStartupCard from "./HeaderStartupCard";
import BodyStartupCard from "./BodyStartupCard";
import FooterStartupCard from "./FooterStartupCard";

interface StartupCardProps {
  startup: Startup;
  index?: number;
}

export function StartupCard({ startup, index = 0 }: StartupCardProps) {
  const animationDelay = `${index * 100}ms`;

  return (
    <div className="animate-card-entrance h-full" style={{ animationDelay }}>
      <div className="relative group flex flex-col h-full rounded-3xl transition-all duration-300 ease-out hover:-translate-y-[8px] hover:shadow-glow cursor-pointer">
        <HeaderStartupCard stage={startup.stage} />

        <div className="px-5 sm:px-6 pt-2 pb-6 bg-cardBg border border-cardBorder rounded-b-3xl rounded-tr-3xl flex gap-5 sm:gap-6 flex-col flex-grow relative z-0">
          <BodyStartupCard startup={startup} />
          <FooterStartupCard startup={startup} />
        </div>
      </div>
    </div>
  );
}
