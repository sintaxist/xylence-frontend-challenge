import { Startup } from "@/types";
import {
  calculateSegmentFill,
  getScoreColorClass,
  SEGMENTS_SCORE_BAR,
  trendConfigIcons,
} from "@/utils/visuals";
import { Info } from "lucide-react";

export default function FooterStartupCard({ startup }: { startup: Startup }) {
    const { trend, convictionScore } = startup;

    const { color, Icon } = trendConfigIcons[trend];
    const scoreColorClass = getScoreColorClass(convictionScore);

    return (
        <div className="mt-auto flex flex-col w-full gap-4">

            <div className="border-t border-cardBorder mb-1"></div>

            <div>
                <div className="flex items-center gap-2 mb-1 relative group/tooltip">
                <p className="text-xs text-textSecondary uppercase">
                    Score Predictivo
                </p>
                <Info className="w-3 h-3 text-textSecondary cursor-help" />
                <div className="absolute bottom-full left-0 w-56 p-2.5 bg-textMain text-cardBg text-xs font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-30 shadow-lg pointer-events-none">
                    Indicador del 0 al 100 generado por nuestra IA, que evalúa múltiples
                    señales del mercado para predecir la probabilidad de éxito.
                    <div className="absolute top-full left-4 border-4 border-transparent border-t-textMain" />
                </div>
                </div>

                <div className="flex items-center">
                <span className="text-4xl font-black text-textMain leading-none">
                    {convictionScore}
                </span>
                <span className="text-sm font-bold text-textSecondary ml-1">
                    {" "}
                    / 100
                </span>
                <Icon className={`w-6 h-6 ml-3 ${color}`} strokeWidth={1.5} />
                </div>
            </div>

            <div className="w-full h-2 flex gap-1">
                {SEGMENTS_SCORE_BAR.map((segmentIndex) => {
                const fillPercentage = calculateSegmentFill(
                    convictionScore,
                    segmentIndex,
                );

                return (
                    <div
                    key={segmentIndex}
                    className="h-full flex-1 rounded-full bg-black/5 relative overflow-hidden"
                    >
                    <div
                        className={`absolute top-0 left-0 h-full rounded-full ${scoreColorClass}`}
                        style={{ width: `${fillPercentage}%` }}
                    />
                    </div>
                );
                })}
            </div>
        </div>
  );
}
