import { ArrowRight } from "lucide-react";

export default function HeaderStartupCard({ stage }: { stage: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex-grow h-full bg-cardBg border border-cardBorder border-b-0 rounded-t-3xl flex items-center px-5 sm:px-6 relative top-[1px] z-10">
        <span className="text-xs sm:text-xs font-black uppercase text-textSecondary truncate">
          {stage}
        </span>
        <div className="absolute bottom-0 -right-6 w-6 h-6 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[200%] h-[200%] rounded-full shadow-[-24px_24px_0_0_var(--color-bg-card)]" />
        </div>
      </div>

      <button className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center transition-all duration-300 mb-3 sm:mb-4 relative z-20 group-hover:bg-textMain border border-cardBorder">
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-black transition-all duration-300 group-hover:-rotate-45 group-hover:text-cardBg" />
      </button>
    </div>
  );
}
