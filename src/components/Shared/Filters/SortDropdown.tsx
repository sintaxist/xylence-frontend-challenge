import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortChange: (sortBy?: string, sortOrder?: "asc" | "desc") => void;
}

export function SortDropdown({ sortBy, sortOrder, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { id: "convictionScore", label: "Score" },
    { id: "fundingAmount", label: "Funding" },
    { id: "foundedYear", label: "Año" },
  ];

  const isActive = !!sortBy;
  const activeLabel = options.find(o => o.id === sortBy)?.label || "Por defecto";

  return (
    <div className="relative flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
      <span className="text-sm text-textSecondary font-medium">Ordenar por:</span>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
          isActive ? "border-textMain bg-textMain text-cardBg" : "border-cardBorder bg-cardBg text-textMain hover:border-textSecondary"
        }`}
      >
        {activeLabel}
        {isActive && <span className="text-[10px] ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-48 bg-cardBg border border-cardBorder rounded-xl shadow-xl z-30 py-2 flex flex-col">
            <button 
              onClick={() => { onSortChange(undefined, undefined); setIsOpen(false); }}
              className={`text-left px-4 py-2.5 text-sm font-medium transition-colors ${!sortBy ? 'text-textMain bg-selectedBg' : 'text-textSecondary hover:bg-hoverBg'}`}
            >
              Por defecto
            </button>
            {options.map(opt => (
              <button 
                key={opt.id}
                onClick={() => {
                  if (sortBy === opt.id) {
                    onSortChange(opt.id, sortOrder === 'desc' ? 'asc' : 'desc');
                  } else {
                    onSortChange(opt.id, 'desc');
                  }
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${sortBy === opt.id ? 'bg-selectedBg text-textMain' : 'text-textSecondary hover:bg-hoverBg'}`}
              >
                {opt.label}
                {sortBy === opt.id && <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}