import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  // Cambiamos a onChange que recibe todo el array, ya que aplicaremos en bloque
  onChange: (newSelected: string[]) => void; 
  dropdownPositionClass?: string;
}

export function FilterDropdown({ 
  label, 
  options, 
  selected, 
  onChange, 
  dropdownPositionClass = "left-0" 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado local para almacenar selecciones temporales antes de aplicar
  const [localSelected, setLocalSelected] = useState<string[]>(selected);

  // Sincronizar el estado local cada vez que se abre el dropdown
  useEffect(() => {
    if (isOpen) {
      setLocalSelected(selected);
    }
  }, [isOpen, selected]);

  const count = selected.length;

  let buttonClasses = "flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ";
  
  if (count > 0) {
    buttonClasses += "border-textMain bg-textMain text-cardBg";
  } else if (isOpen) {
    buttonClasses += "border-textSecondary bg-hoverBg text-textMain";
  } else {
    buttonClasses += "border-cardBorder bg-cardBg text-textMain hover:bg-hoverBg hover:border-textSecondary";
  }

  // Lógica de Toggle Local (no afecta la URL aún)
  const handleToggle = (opt: string) => {
    setLocalSelected(prev => 
      prev.includes(opt) 
        ? prev.filter(item => item !== opt) 
        : [...prev, opt]
    );
  };

  // Acción: Confirmar
  const handleApply = () => {
    onChange(localSelected);
    setIsOpen(false);
  };

  // Acción: Descartar
  const handleCancel = () => {
    setLocalSelected(selected); // Revertimos al valor original del padre
    setIsOpen(false);
  };

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
          {/* Al hacer clic fuera, disparamos handleApply como pediste */}
          <div className="fixed inset-0 z-20" onClick={handleApply} />
          
          <div className={`absolute top-full mt-2 ${dropdownPositionClass} w-[calc(100vw-2rem)] max-w-[280px] sm:w-64 sm:max-w-none bg-cardBg border border-cardBorder rounded-xl shadow-xl z-30 flex flex-col overflow-hidden`}>
            
            {/* Contenedor escrolleable para las opciones */}
            <div className="max-h-60 overflow-y-auto py-2">
              {options.map((opt: string) => (
                <label 
                  key={opt} 
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors group ${localSelected.includes(opt) ? 'bg-selectedBg' : 'hover:bg-hoverBg'}`}
                >
                  <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                    <input 
                      type="checkbox" 
                      checked={localSelected.includes(opt)} 
                      onChange={() => handleToggle(opt)}
                      // Manteniendo los bordes visibles y consistentes en todos los estados
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

            {/* Footer Fijo con Botones Reutilizando Clases */}
            <div className="p-4 border-t border-cardBorder bg-cardBg flex items-center justify-between gap-3">
              <button 
                onClick={handleCancel}
                className="px-4 py-2.5 rounded-full bg-hoverBg text-textMain text-xs font-black uppercase hover:bg-cardBorder transition-all w-full"
              >
                Cancelar
              </button>
              <button 
                onClick={handleApply}
                className="px-4 py-2.5 rounded-full bg-textMain text-cardBg text-xs font-black uppercase hover:opacity-90 transition-all w-full"
              >
                Aplicar
              </button>
            </div>
            
          </div>
        </>
      )}
    </div>
  );
}