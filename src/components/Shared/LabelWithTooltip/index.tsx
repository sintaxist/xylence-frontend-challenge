import { Info } from "lucide-react";

interface LabelWithTooltipProps {
  label: string;
  tooltipText: string;
  tooltipWidth?: string; 
  iconSize?: number;
  className?: string;
}

export function LabelWithTooltip({
  label,
  tooltipText,
  tooltipWidth = "w-64",
  iconSize = 12,
  className = "mb-1.5",
}: LabelWithTooltipProps) {
  return (
    <div className={`flex items-center gap-2 relative group/tooltip w-fit ${className}`}>
      <span className="text-xs text-textSecondary uppercase tracking-wider">
        {label}
      </span>
      
      <Info 
        size={iconSize} 
        className="text-textSecondary cursor-help opacity-70 hover:opacity-100 transition-opacity" 
      />

      <div 
        className={`absolute bottom-full left-0 mb-2 ${tooltipWidth} p-3 sm:p-4 bg-textMain text-cardBg text-xs font-medium leading-relaxed rounded-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 shadow-2xl pointer-events-none border border-white/10`}
      >
        {tooltipText}
        <div className="absolute top-full left-4 border-[5px] border-transparent border-t-textMain" />
      </div>
    </div>
  );
}