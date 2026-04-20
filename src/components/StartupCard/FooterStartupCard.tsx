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
        <div className="mt-auto flex flex-col w-full gap-3 sm:gap-4">
            <div className="border-t border-cardBorder mb-1 opacity-50"></div>

            <div>
                <div className="flex items-center gap-2 mb-1.5 relative group/tooltip">
                    <p className="text-xs text-textSecondary uppercase tracking-wider">
                        Score Predictivo
                    </p>
                    <Info className="w-3 h-3 text-textSecondary cursor-help opacity-70" />
                    <div className="absolute bottom-full left-0 w-48 sm:w-56 p-3 bg-textMain text-cardBg text-xs font-medium rounded-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-30 shadow-2xl pointer-events-none border border-white/10">
                        Indicador del 0 al 100 generado por nuestra IA, que evalúa señales de mercado.
                        <div className="absolute top-full left-4 border-4 border-transparent border-t-textMain" />
                    </div>
                </div>

                <div className="flex items-center">
                    <span className="text-3xl sm:text-4xl font-black text-textMain leading-none">
                        {convictionScore}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-textSecondary ml-1.5">
                        / 100
                    </span>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ml-3 ${color}`} strokeWidth={2} />
                </div>
            </div>

            <div className="w-full h-1.5 sm:h-2 flex gap-1">
                {SEGMENTS_SCORE_BAR.map((segmentIndex) => {
                const fillPercentage = calculateSegmentFill(convictionScore, segmentIndex);
                return (
                    <div key={segmentIndex} className="h-full flex-1 rounded-full bg-black/5 relative overflow-hidden">
                        <div
                            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ${scoreColorClass}`}
                            style={{ width: `${fillPercentage}%` }}
                        />
                    </div>
                );
                })}
            </div>
        </div>
  );
}
