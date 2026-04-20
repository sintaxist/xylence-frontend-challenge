import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: any;
  compact?: boolean;
}

export function EmptyState({
  title = "No se encontraron resultados",
  description = "Intenta ajustar tus filtros o criterios de búsqueda para encontrar lo que necesitas.",
  icon: Icon = SearchX,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-4 ${
        compact 
          ? "py-8 sm:py-10" 
          : "py-12 sm:p-10 min-h-[300px] sm:min-h-[400px]"
      }`}
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-hoverBg rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-sm transition-all">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-textSecondary" />
      </div>
      
      <h3 className="text-lg sm:text-xl font-black text-textMain tracking-tighter mb-1.5 sm:mb-2 uppercase">
        {title}
      </h3>
      
      <p className="text-xs sm:text-sm text-textSecondary max-w-[260px] sm:max-w-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}