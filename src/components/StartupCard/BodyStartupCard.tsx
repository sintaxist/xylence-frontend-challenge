import { CircleFlag } from "react-circle-flags";

import { Startup } from "@/types";
import { formatCurrency } from "@/utils/formatters";

export default function BodyStartupCard({ startup }: { startup: Startup }) {
    const { name, country, sector, description, fundingAmount, foundedYear } = startup;

    return (
    <>
        <div className="flex items-center gap-3 sm:gap-4">
            <h3 className="text-2xl sm:text-3xl font-black text-textMain truncate">{name}</h3>
            <CircleFlag
                countryCode={country.toLowerCase()}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-cardBorder shrink-0"
            />
        </div>

        <div className="flex flex-wrap gap-2">
            {sector.slice(0, 2).map((pill) => (
            <span
                key={pill}
                className="text-xs font-bold text-textSecondary border border-textSecondary px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap"
            >
                {pill}
            </span>
            ))}
        </div>

        <p className="text-xs sm:text-sm font-medium text-textSecondary leading-relaxed line-clamp-3">
            {description}
        </p>

        <div className="flex gap-6 sm:gap-8">
            <div>
                <p className="text-xs text-textSecondary uppercase mb-0.5">Capital</p>
                <p className="text-xs sm:text-sm font-black text-textMain tracking-tight">
                    {formatCurrency(fundingAmount)}
                </p>
            </div>
            <div>
                <p className="text-xs text-textSecondary uppercase mb-0.5">Fundada</p>
                <p className="text-xs sm:text-sm font-black text-textMain tracking-tight">
                    {foundedYear}
                </p>
            </div>
        </div>
    </>
  );
}
