import { calculateSegmentFill, getScoreColorClass, SEGMENTS_SCORE_BAR, trendConfigIcons } from '@/utils/visuals';
import { Bookmark, Share2, EyeOff } from 'lucide-react';
import { CircleFlag } from 'react-circle-flags';
import { SignalCard } from './SignalModalCard';
import { EmptyState } from '@/components/Shared/EmptyState';
import { Startup } from '@/types';
import { ActionButton } from '@/components/Shared/ActionButton';

export default function BodyModalCard({ details }: { details: Startup }) {

    const { trend } = details;
    const { color, Icon } = trendConfigIcons[trend];
    
    const hasSignals = details.signals && details.signals.length > 0;

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h2 className="text-4xl sm:text-5xl font-black text-textMain leading-none">{details.name}</h2>
                    <CircleFlag countryCode={details.country.toLowerCase()} className="w-8 h-8 rounded-full border border-cardBorder" />
                </div>
                <span className="text-xs font-black uppercase text-textSecondary">{details.stage} • {details.foundedYear}</span>
                </div>
                
                <div className="flex flex-col items-end gap-3 p-4 rounded-2xl border border-cardBorder min-w-[180px]">
                <div className="flex items-center justify-between w-full gap-4">
                    <div className="flex items-center gap-1">
                    <span className="text-3xl font-black">{details.convictionScore}</span>
                    <span className="text-xs font-bold text-textSecondary">/100</span>
                    </div>
                    <Icon className={`w-6 h-6 ml-3 ${color}`} strokeWidth={1.5} />
                </div>
                <div className="w-full h-1 flex gap-1">
                    {SEGMENTS_SCORE_BAR.map((seg) => (
                    <div key={seg} className="h-full flex-1 rounded-full bg-black/5 relative overflow-hidden">
                        <div 
                            className={`absolute top-0 left-0 h-full rounded-full ${getScoreColorClass(details.convictionScore)}`} 
                            style={{ width: `${calculateSegmentFill(details.convictionScore, seg)}%` }} 
                        />
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {hasSignals ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {details.signals.map((signal, index) => (
                        <SignalCard key={index} signal={signal} />
                    ))}
                </div>
            ) : (
                <div className="mb-8 bg-hoverBg border-2 border-dashed border-cardBorder rounded-[32px] overflow-hidden">
                    <EmptyState 
                        icon={EyeOff}
                        title="Sin datos suficientes"
                        description="Esta compañía se encuentra en etapa temprana o bajo perfil. Aún no hay señales públicas suficientes para generar un desglose detallado."
                        compact={true}
                    />
                </div>
            )}

            <div className="flex justify-center gap-4 pt-6 border-t border-cardBorder">
                <ActionButton icon={Share2} label="Compartir" onClick={() => console.log('Compartir')} />
                <ActionButton icon={Bookmark} label="Guardar" onClick={() => console.log('Guardar')} />
            </div>
        </>
  )
}