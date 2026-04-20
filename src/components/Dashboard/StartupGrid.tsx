import { StartupCard } from "@/components/StartupCard";
import { StartupCardSkeleton } from "@/components/StartupCard/SkeletonStartupCard";
import { EmptyState } from "@/components/Shared/EmptyState";
import { SearchX } from "lucide-react";
import type { Startup } from "@/types";

interface StartupGridProps {
  startups?: Startup[];
  isLoading: boolean;
  onSelect: (id: string) => void;
}

export function StartupGrid({ startups, isLoading, onSelect }: StartupGridProps) {
  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 relative z-10 w-full";

  if (isLoading) {
    return (
      <section className={gridClasses}>
        {Array.from({ length: 8 }).map((_, i) => (
          <StartupCardSkeleton key={`skeleton-${i}`} index={i} />
        ))}
      </section>
    );
  }

  if (!startups || startups.length === 0) {
    return (
      <div className="col-span-full pt-10 w-full">
        <EmptyState 
          icon={SearchX}
          title="Sin resultados" 
          description="No encontramos ninguna startup que coincida con tus filtros."
        />
      </div>
    );
  }

  const gridKey = startups.map(s => s.id).join('-');

  return (
    <div className="w-full min-h-[600px]">
      <section 
        key={gridKey}
        className={gridClasses}
      >
        {startups.map((startup, i) => (
          <div 
            key={startup.id} 
            onClick={() => onSelect(startup.id)} 
            className="h-full cursor-pointer group"
          >
            <StartupCard startup={startup} index={i} />
          </div>
        ))}
      </section>

      <div className="w-full text-center pt-20 pb-10">
        <p className="text-sm font-medium text-textSecondary italic">
          No hay más resultados disponibles
        </p>
      </div>
    </div>
  );
}