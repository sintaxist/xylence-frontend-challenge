import { ConvictionSignal } from "@/types";
import { normalizeScore, SIGNAL_BAR_COLOR } from "@/utils/visuals";
import { LabelWithTooltip } from "@/components/Shared/LabelWithTooltip";

export function SignalCard({ signal }: { signal: ConvictionSignal }) {
  const score = normalizeScore(signal.weight);

  const categoryNames: Record<string, string> = {
    team: "Equipo",
    market: "Mercado",
    traction: "Tracción",
    product: "Producto"
  };

  const tooltips: Record<string, string> = {
    team: "Evalúa la experiencia de los fundadores, roles clave y track record en la industria.",
    market: "Mide el tamaño del mercado direccionable (TAM), crecimiento anual y timing.",
    traction: "Analiza el crecimiento de ingresos, retención de usuarios y eficiencia en adquisición.",
    product: "Evalúa la diferenciación tecnológica, barreras de entrada y experiencia de usuario."
  };

  return (
    <div className="flex flex-col border border-cardBorder rounded-2xl p-5">
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col">
          <LabelWithTooltip 
            label={categoryNames[signal.type] || signal.type}
            tooltipText={tooltips[signal.type] || "Métrica de análisis algorítmico avanzada."}
            tooltipWidth="w-72"
            iconSize={16}
            className="mb-1"
          />
          <span className="text-2xl font-black text-textMain leading-none tracking-tighter">
            {score}
          </span>
        </div>
      </div>
      
      <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${SIGNAL_BAR_COLOR}`}
          style={{ width: `${score}%` }} 
        />
      </div>

      <p className="text-sm text-textMain leading-relaxed border-l-2 border-cardBorder pl-3 italic">
        {signal.label}
      </p>
    </div>
  );
}