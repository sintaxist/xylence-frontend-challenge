import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import { fetchStartups } from "@/api/mock";
import { Filters } from "@/components/Shared/Filters";
import { StartupGrid } from "./StartupGrid";
import { ModalCard } from "@/components/ModalCard";
import type { StartupFilters, Stage, Sector, Country } from "@/types";

export function Dashboard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isClosingModal, setIsClosingModal] = useState(false);

  const [filters, setFilters] = useState<StartupFilters>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get("q") || "",
      stages: (params.get("stages")?.split(",").filter(Boolean) as Stage[]) || [],
      sectors: (params.get("sectors")?.split(",").filter(Boolean) as Sector[]) || [],
      countries: (params.get("countries")?.split(",").filter(Boolean) as Country[]) || [],
      sortBy: (params.get("sortBy") as any) || undefined,
      sortOrder: (params.get("sortOrder") as any) || undefined
    };
  });

  const { data: startups, isLoading, isFetching } = useQuery({
    queryKey: ["startups", filters], 
    queryFn: () => fetchStartups(filters),
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("q", filters.search);
    if (filters.stages?.length) params.set("stages", filters.stages.join(","));
    if (filters.sectors?.length) params.set("sectors", filters.sectors.join(","));
    if (filters.countries?.length) params.set("countries", filters.countries.join(","));
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
    
    if (selectedId) {
        params.set("selectedStartup", selectedId);
    } else {
        const startupIdInUrl = new URLSearchParams(window.location.search).get("selectedStartup");
        if (startupIdInUrl && !isClosingModal) params.set("selectedStartup", startupIdInUrl);
    }

    const queryString = params.toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`;
    window.history.replaceState({}, '', newUrl);
  }, [filters, selectedId, isClosingModal]);

  const handleFilterChange = useCallback((newFilters: Partial<StartupFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isLoading || isFetching || selectedId) ? 'hidden' : 'unset';
  }, [isLoading, isFetching, selectedId]);

  return (
    <div className="w-full flex flex-col items-center">
      <Filters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        totalResults={startups?.length || 0}
      />

      <StartupGrid 
        startups={startups} 
        isLoading={isLoading || isFetching} 
        onSelect={setSelectedId} 
      />

      <ModalCard 
        startupId={selectedId} 
        onClose={() => {
            setIsClosingModal(true);
            setSelectedId(null);
            setTimeout(() => setIsClosingModal(false), 300);
        }} 
      />
    </div>
  );
}