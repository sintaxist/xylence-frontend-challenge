import { useStartupFilters } from "@/hooks/useStartupFilters";
import { StartupGrid } from "./StartupGrid";
import { ModalCard } from "@/components/ModalCard";
import { useState } from "react";
import { Filters } from "@/components/Shared/Filters";

export default function Dashboard() {
  const { filters, updateFilters, startups, isLoading, totalResults } = useStartupFilters();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
     <div className="w-full flex flex-col items-center">
      <Filters 
        filters={filters} 
        onFilterChange={updateFilters} 
        totalResults={totalResults} 
      />

      <StartupGrid 
        startups={startups} 
        isLoading={isLoading} 
        onSelect={setSelectedId} 
      />

      <ModalCard 
        startupId={selectedId} 
        onClose={() => setSelectedId(null)} 
      />
    </div>
  );
}