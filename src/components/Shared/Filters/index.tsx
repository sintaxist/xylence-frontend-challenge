import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterDropdown } from "./FilterDropdown";
import { SortDropdown } from "./SortDropdown";
import { ActiveFilters } from "./ActiveFilters";
import type { StartupFilters } from "@/types";

interface FiltersProps {
  filters: StartupFilters;
  onFilterChange: (newFilters: Partial<StartupFilters>) => void;
  totalResults: number;
}

export function Filters({
  filters,
  onFilterChange,
  totalResults,
}: FiltersProps) {
  const [inputValue, setInputValue] = useState(filters.search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== filters.search) onFilterChange({ search: inputValue });
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, filters.search, onFilterChange]);

  useEffect(() => {
    setInputValue(filters.search || "");
  }, [filters.search]);

  const toggleArrayFilter = (key: keyof StartupFilters, value: string) => {
    const currentArray = (filters[key] as any[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    onFilterChange({ [key]: newArray });
  };

  const activeFilters: { key: keyof StartupFilters; value: string }[] = [];
  if (filters.sectors)
    filters.sectors.forEach((v) =>
      activeFilters.push({ key: "sectors", value: v }),
    );
  if (filters.stages)
    filters.stages.forEach((v) =>
      activeFilters.push({ key: "stages", value: v }),
    );
  if (filters.countries)
    filters.countries.forEach((v) =>
      activeFilters.push({ key: "countries", value: v }),
    );

  const handleClearAll = () => {
    onFilterChange({ sectors: [], stages: [], countries: [], search: "" });
    setInputValue("");
  };

  return (
    <div className="space-y-4 sm:space-y-5 mb-8 border-b border-cardBorder pb-6 w-full">
      <div className="flex flex-col md:flex-row gap-3 md:items-center z-20 w-full">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary w-4 h-4" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full bg-cardBg border border-cardBorder rounded-xl py-2 sm:py-3 pl-10 pr-4 text-sm text-textMain font-medium focus:outline-none focus:border-accent transition-all"
          />
          {inputValue && (
            <button
              onClick={() => {
                setInputValue("");
                onFilterChange({ search: "" });
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textMain"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 shrink-0">
          <FilterDropdown
            label="Categoría"
            options={[
              "FinTech",
              "B2B SaaS",
              "HealthTech",
              "AgriTech",
              "ClimaTech",
              "LogiTech",
              "PropTech",
              "EdTech",
            ]}
            selected={filters.sectors || []}
            onChange={(newArray) => onFilterChange({ sectors: newArray as any })}
            dropdownPositionClass="left-0"
          />
          <FilterDropdown
            label="Etapa"
            options={["Pre-seed", "Seed", "Series A", "Series B+"]}
            selected={filters.stages || []}
            onChange={(newArray) => onFilterChange({ stages: newArray as any })}
            dropdownPositionClass="right-0"
          />
          <FilterDropdown
            label="País"
            options={["MX", "AR", "CO", "CL", "BR", "PE"]}
            selected={filters.countries || []}
            onChange={(newArray) => onFilterChange({ countries: newArray as any })}
            dropdownPositionClass="left-0 md:right-0 md:left-auto"
          />
        </div>
      </div>

      <ActiveFilters
        activeFilters={activeFilters}
        onRemove={toggleArrayFilter}
        onClearAll={handleClearAll}
      />

      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center pt-2 sm:pt-3 mt-2 gap-4 sm:gap-0 w-full">
        <span className="text-sm text-textSecondary font-medium">
          {totalResults.toLocaleString()} resultados
        </span>

        <SortDropdown
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSortChange={(sortBy, sortOrder) => onFilterChange({ sortBy, sortOrder })}
        />
      </div>
    </div>
  );
}