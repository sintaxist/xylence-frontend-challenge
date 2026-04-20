import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  Info,
} from "lucide-react";
import { CircleFlag } from "react-circle-flags";
import type { Startup } from "../types";

interface StartupCardProps {
  startup: Startup;
}

const formatCurrency = (amount?: number) => {
  if (!amount) return "N/A";
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  return `$${(amount / 1_000).toFixed(0)}K`;
};

const getScoreColorClass = (score: number) => {
  if (score >= 80) return "bg-trendUp";
  if (score >= 70) return "bg-[#FDE047]";
  if (score >= 50) return "bg-[#ffa45a]";
  return "bg-trendDown";
};

const calculateSegmentFill = (score: number, segmentIndex: number): number => {
  const pointsPerSegment = 20;
  const segmentStart = segmentIndex * pointsPerSegment;
  const segmentEnd = segmentStart + pointsPerSegment;

  if (score >= segmentEnd) return 100;
  if (score <= segmentStart) return 0;

  return ((score - segmentStart) / pointsPerSegment) * 100;
};

export function StartupCard({ startup }: StartupCardProps) {
  const trendConfigIcons = {
    up: { color: "text-trendUp", Icon: TrendingUp },
    down: { color: "text-trendDown", Icon: TrendingDown },
    neutral: { color: "text-trendNeutral", Icon: Minus },
  };

  const { color, Icon } = trendConfigIcons[startup.trend];
  const scoreColorClass = getScoreColorClass(startup.convictionScore);
  const SEGMENTS = [0, 1, 2, 3, 4];

  return (
    <div className="relative group flex flex-col h-full rounded-3xl transition-all duration-300 ease-out hover:-translate-y-[8px] hover:shadow-glow cursor-pointer">
      <div className="flex items-end justify-between gap-4">
        <div className="flex-grow h-full bg-cardBg border border-cardBorder border-b-0 rounded-t-3xl flex items-center px-6 relative top-[1px] z-10">
          <span className="text-xs font-black uppercase text-textSecondary">
            {startup.stage}
          </span>
          <div className="absolute bottom-0 -right-6 w-6 h-6 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-0 w-[200%] h-[200%] rounded-full shadow-[-24px_24px_0_0_var(--color-bg-card)]" />
          </div>
        </div>

        <button className="flex-shrink-0 w-14 h-14 bg-accent rounded-full flex items-center justify-center transition-all duration-300 mb-4 relative z-20 group-hover:bg-textMain">
          <ArrowRight className="w-6 h-6 text-black transition-all duration-300 group-hover:-rotate-45 group-hover:text-cardBg" />
        </button>
      </div>

      <div className="px-6 pt-2 pb-6 bg-cardBg border border-cardBorder rounded-b-3xl rounded-tr-3xl flex gap-6 flex-col flex-grow relative z-0">
        <div className="flex items-center gap-4">
          <h3 className="text-3xl font-black text-textMain">{startup.name}</h3>
          <CircleFlag
            countryCode={startup.country.toLowerCase()}
            className="w-6 h-6 rounded-full border border-cardBorder"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {startup.sector.slice(0, 2).map((sector) => (
            <span
              key={sector}
              className="text-xs font-bold text-textSecondary border border-textSecondary px-3 py-1 rounded-full"
            >
              {sector}
            </span>
          ))}
        </div>

        <p className="text-sm font-medium text-textSecondary leading-relaxe line-clamp-3">
          {startup.description}
        </p>

        <div className="flex gap-8">
          <div>
            <p className="text-xs text-textSecondary uppercase mb-1">Capital</p>
            <p className="text-sm font-black text-textMain tracking-tight">
              {formatCurrency(startup.fundingAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-textSecondary uppercase mb-1">Fundada</p>
            <p className="text-sm font-black text-textMain tracking-tight">
              {startup.foundedYear}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col w-full gap-4">
          <div className="border-t border-cardBorder mb-1"></div>

          <div>
            <div className="flex items-center gap-2 mb-1 relative group/tooltip">
              <p className="text-xs text-textSecondary uppercase">
                Score Predictivo
              </p>
              <Info className="w-3 h-3 text-textSecondary cursor-help" />
              <div className="absolute bottom-full left-0 w-56 p-2.5 bg-textMain text-cardBg text-xs font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-30 shadow-lg pointer-events-none">
                Indicador del 0 al 100 generado por nuestra IA, que evalúa
                múltiples señales del mercado para predecir la probabilidad de
                éxito.
                <div className="absolute top-full left-4 border-4 border-transparent border-t-textMain" />
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-4xl font-black text-textMain leading-none">
                {startup.convictionScore}
              </span>
              <span className="text-sm font-bold text-textSecondary ml-1">
                {" "}
                / 100
              </span>
              <Icon className={`w-6 h-6 ml-3 ${color}`} strokeWidth={1.5} />
            </div>
          </div>

          <div className="w-full h-2 flex gap-1">
            {SEGMENTS.map((segmentIndex) => {
              const fillPercentage = calculateSegmentFill(
                startup.convictionScore,
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
      </div>
    </div>
  );
}
