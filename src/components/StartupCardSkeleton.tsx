export interface StartupCardSkeletonProps {
  index?: number;
}

export function StartupCardSkeleton({ index = 0 }: StartupCardSkeletonProps) {
  const animationDelay = `${index * 150}ms`;

  return (
    <div 
      className="relative flex flex-col h-full rounded-3xl animate-skeleton-cycle"
      style={{ animationDelay }}
    >
      <div className="flex items-end justify-between gap-4 pr-2">
        {/* Top Bar */}
        <div className="flex-grow h-full bg-cardBg border-b-0 rounded-t-3xl flex items-center px-6 relative top-[1px] z-10">
          <div className="animate-pulse">
            <div className="w-12 h-3 bg-textSecondary opacity-15 rounded-full" />
          </div>
          <div className="absolute bottom-0 -right-6 w-6 h-6 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-0 w-[200%] h-[200%] rounded-full shadow-[-24px_24px_0_0_var(--color-bg-card)]" />
          </div>
        </div>
         {/* Boton Flecha */}
        <div className="flex-shrink-0 w-14 h-14 bg-cardBg rounded-full mb-4 relative z-20" />
      </div>

      <div className="px-6 pt-2 pb-6 bg-cardBg rounded-b-3xl rounded-tr-3xl flex gap-6 flex-col flex-grow relative z-0">
        
        {/* Título y Bandera */}
        <div className="flex items-center gap-4 animate-pulse">
          <div className="h-8 w-3/4 bg-textSecondary opacity-15 rounded-xl" />
        </div>

        {/* Sectores */}
        <div className="flex flex-wrap gap-2 animate-pulse">
          <div className="w-16 h-6 bg-textSecondary opacity-15 rounded-full" />
          <div className="w-20 h-6 bg-textSecondary opacity-15 rounded-full" />
        </div>

        {/* Descripción */}
        <div className="space-y-3 animate-pulse">
          <div className="h-3 w-full bg-textSecondary opacity-15 rounded-full" />
          <div className="h-3 w-5/6 bg-textSecondary opacity-15 rounded-full" />
          <div className="h-3 w-4/6 bg-textSecondary/10 rounded-full" />
        </div>

        {/* Capital y Fundación */}
        <div className="flex gap-8 animate-pulse">
          <div className="space-y-2">
            <div className="h-2 w-12 bg-textSecondary/10 rounded-full" />
            <div className="h-4 w-20 bg-textSecondary/10 rounded-md" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-12 bg-textSecondary/10 rounded-full" />
            <div className="h-4 w-12 bg-textSecondary/10 rounded-md" />
          </div>
        </div>

        {/* Contenedor Inferior: Score Predictivo */}
        <div className="mt-auto flex flex-col w-full gap-4">
          <div className="border-t border-cardBorder pt-1"></div>
          <div className="animate-pulse">
            <div className="h-2 w-24 bg-textSecondary opacity-15 rounded-full mb-3" />
            <div className="flex items-end gap-2">
              <div className="h-10 w-20 bg-textSecondary opacity-15 rounded-xl" />
            </div>
          </div>
          
          {/* Barras de Progreso */}
          <div className="w-full h-2 flex gap-1 animate-pulse">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-full flex-1 rounded-full bg-textSecondary opacity-15" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}