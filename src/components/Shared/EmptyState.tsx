import { SearchX, AlertCircle } from "lucide-react";

export function EmptyState({ message = "No se encontraron resultados", isModal = false }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-10 ${isModal ? 'h-[300px]' : 'min-h-[400px]'}`}>
      <div className="w-20 h-20 bg-textMain/5 rounded-full flex items-center justify-center mb-6">
        {isModal ? <AlertCircle size={40} className="text-textSecondary" /> : <SearchX size={40} className="text-textSecondary" />}
      </div>
      <h3 className="text-2xl font-black text-textMain tracking-tighter mb-2">{message}</h3>
      <p className="text-textSecondary text-sm max-w-xs">
        Intenta ajustar tus filtros o criterios de búsqueda para encontrar lo que necesitas.
      </p>
    </div>
  );
}