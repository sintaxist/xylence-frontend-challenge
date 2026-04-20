import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onSelect: (val: string) => void;
  dropdownPositionClass?: string;
}

export function FilterDropdown({ 
  label, 
  options, 
  selected, 
  onSelect, 
  dropdownPositionClass = "left-0" 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const count = selected.length;

  // Lógica para definir las clases del botón principal según sus 3 estados
  let buttonClasses = "flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ";
  
  if (count > 0) {
    // ESTADO 1: Tiene opciones seleccionadas
    buttonClasses += "border-textMain bg-textMain text-cardBg";
  } else if (isOpen) {
    // ESTADO 2: Está abierto, pero NO tiene selecciones
    buttonClasses += "border-textSecondary bg-hoverBg text-textMain";
  } else {
    // ESTADO 3: Cerrado por defecto
    buttonClasses += "border-cardBorder bg-cardBg text-textMain hover:bg-hoverBg hover:border-textSecondary";
  }

  return (
    <div className="relative shrink-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
      >
        {label} 
        {count > 0 && <span className="bg-accent text-black px-1.5 py-0.5 rounded-md text-[10px] leading-none">{count}</span>}
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${count > 0 ? "text-cardBg" : "text-textSecondary"}`} 
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          
          <div className={`absolute top-full mt-2 ${dropdownPositionClass} w-[calc(100vw-2rem)] max-w-[224px] sm:w-56 sm:max-w-none bg-cardBg border border-cardBorder rounded-xl shadow-xl z-30 py-2 flex flex-col max-h-64 overflow-y-auto`}>
            {options.map((opt: string) => (
              <label 
                key={opt} 
                // APLICAMOS bg-selectedBg cuando está seleccionado, y bg-hoverBg para el hover normal
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors group ${selected.includes(opt) ? 'bg-selectedBg' : 'hover:bg-hoverBg'}`}
              >
                <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                  <input 
                    type="checkbox" 
                    checked={selected.includes(opt)} 
                    onChange={() => onSelect(opt)}
                    className="peer appearance-none w-4 h-4 border-2 border-textSecondary rounded-[3px] bg-cardBg cursor-pointer checked:bg-accent checked:border-textMain transition-all"
                  />
                  <svg className="absolute w-3 h-3 text-textMain pointer-events-none hidden peer-checked:block" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-textMain">{opt}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}