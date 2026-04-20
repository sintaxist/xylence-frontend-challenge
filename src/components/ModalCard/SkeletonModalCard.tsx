import { SEGMENTS_SCORE_BAR } from "@/utils/visuals";

export default function SkeletonStartupCard() {
    return (
        <div className="animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 mt-4">
            <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                {/* Nombre de Startup */}
                <div className="h-12 w-64 bg-textSecondary opacity-20 rounded-2xl" />
            </div>
            {/* Stage y Año */}
            <div className="h-3 w-40 bg-textSecondary opacity-20 rounded-full" />
            </div>
            
            {/* Bloque de Score Predictivo */}
            <div className="flex flex-col items-end gap-4 p-4 rounded-2xl border border-cardBorder min-w-[180px]">
            <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-end gap-1">
                <div className="h-10 w-12 bg-textSecondary opacity-20 rounded-xl" />
                <div className="h-4 w-8 bg-textSecondary opacity-20 rounded-full mb-1" />
                </div>
            </div>
            {/* Barras Segmentadas */}
            <div className="w-full h-1.5 flex gap-1">
                {SEGMENTS_SCORE_BAR.map((seg) => (
                    <div key={seg} className="h-full flex-1 rounded-full bg-textSecondary opacity-20 opacity-30" />
                ))}
            </div>
            </div>
        </div>

        {/* GRID DE SIGNALS SKELETON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
            <div 
                key={i} 
                className="flex flex-col border border-cardBorder rounded-2xl p-5 h-[160px]"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-2">
                        {/* Categoría */}
                        <div className="w-16 h-2.5 bg-textSecondary opacity-20 rounded-full" />
                        {/* Score de Signal */}
                        <div className="w-10 h-7 bg-textSecondary opacity-20 rounded-lg" />
                    </div>
                </div>
                
                {/* Barra de Signal */}
                <div className="w-full h-2 bg-textSecondary opacity-20 opacity-20 rounded-full mb-5" />
                
                {/* Label (Simulación de texto con borde gris) */}
                <div className="border-l-2 border-textSecondary/30 pl-3 space-y-2">
                <div className="w-full h-2.5 bg-textSecondary opacity-20 rounded-full" />
                <div className="w-2/3 h-2.5 bg-textSecondary opacity-20 rounded-full" />
                </div>
            </div>
            ))}
        </div>

        </div>
    );
}
