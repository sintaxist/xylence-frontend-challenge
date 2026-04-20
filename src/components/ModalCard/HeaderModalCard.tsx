import { X } from "lucide-react";

export default function HeaderModalCard({handleClose} : {handleClose: () => void}) {
    
    return (
      <>
      <div className="hidden sm:flex items-end justify-between gap-4">
        <div className="flex-grow h-14 bg-cardBg border border-cardBorder border-b-0 rounded-t-3xl flex items-center px-8 relative top-[1px] z-10">
          <span className="text-sm font-black uppercase text-textSecondary mt-4">
            Analisis detallado
          </span>
          <div className="absolute bottom-0 -right-6 w-6 h-6 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-0 w-[200%] h-[200%] rounded-full shadow-[-24px_24px_0_0_var(--color-bg-card)]" />
          </div>
        </div>
        <button onClick={handleClose} className="group w-14 h-14 flex items-center justify-center rounded-full bg-accent mb-4 relative z-20 transition-all hover:bg-textMain">
          <X className="w-6 h-6 text-black group-hover:text-cardBg transition-colors" />
        </button>
      </div>
      <button onClick={handleClose} className="sm:hidden absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-accent text-black z-30">
        <X size={20} />
      </button>
      </>
    )
}
