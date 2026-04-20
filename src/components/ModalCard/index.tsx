import { useEffect, useState } from "react";
import { fetchStartupById } from "@/api/mock";
import type { Startup } from "@/types";
import HeaderModalCard from "./HeaderModalCard";
import BodyModalCard from "./BodyModalCard";
import SkeletonStartupCard from "./SkeletonModalCard";

interface ModalCardProps {
  startupId: string | null;
  onClose: () => void;
}

export function ModalCard({ startupId, onClose }: ModalCardProps) {
  const [details, setDetails] = useState<Startup | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!startupId) return;
    setIsLoading(true);
    fetchStartupById(startupId).then(setDetails).finally(() => setIsLoading(false));
  }, [startupId]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => { setIsClosing(false); onClose(); }, 200);
  };

  if (!startupId && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 overflow-y-auto sm:overflow-hidden">
      <div className={`absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`} onClick={handleClose} />

      <div className={`relative w-full h-full sm:h-auto sm:max-w-3xl flex flex-col ${isClosing ? 'animate-modal-exit' : 'animate-modal-enter'}`}>
        
        <HeaderModalCard handleClose={handleClose}/>

        <div className="relative flex-grow bg-cardBg border-x sm:border border-cardBorder sm:rounded-b-2xl sm:rounded-tr-2xl p-6 shadow-2xl overflow-y-auto">
          

          {isLoading || !details ? (
            <SkeletonStartupCard />
          ) : (
            <BodyModalCard details={details}/>
          )}
        </div>
      </div>
    </div>
  );
}