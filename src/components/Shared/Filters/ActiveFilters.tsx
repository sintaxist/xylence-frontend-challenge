import { X } from "lucide-react";
import type { StartupFilters } from "@/types";

interface ActiveFiltersProps {
  activeFilters: { key: keyof StartupFilters; value: string }[];
  onRemove: (key: keyof StartupFilters, value: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  activeFilters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 animate-in fade-in slide-in-from-top-2 duration-300">
        {activeFilters.map((f, index) => (
            <button
                onClick={() => onRemove(f.key, f.value)} 
                key={`${f.key}-${f.value}-${index}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-hoverBg hover:bg-selectedBg transition-all cursor-pointer border border-cardBorder rounded-lg text-xs font-bold text-textMain"
            >
                {f.value}
                <X size={12} strokeWidth={3} />
            </button>
        ))}

        <button
            onClick={onClearAll}
            className="text-xs font-bold text-textSecondary hover:text-textMain underline ml-2 transition-colors"
        >
            Limpiar filtros
        </button>
    </div>
  );
}
