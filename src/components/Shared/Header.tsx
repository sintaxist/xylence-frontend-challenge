import { Sun, Moon } from "lucide-react";
import xylenceLogo from "@/assets/xylence-logo.svg";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Header({ isDark, toggleTheme }: HeaderProps) {
  return (
    <header className="mb-10 flex justify-between items-center w-full">
      <div className="flex items-center gap-2 sm:gap-3">
        <img 
          src={xylenceLogo} 
          alt="Xylence Logo" 
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain" 
        />
        <h1 className="text-3xl sm:text-4xl font-black text-textMain tracking-tighter leading-none">
          Xylence
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme} 
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-cardBg border border-cardBorder text-textMain hover:bg-textMain hover:text-cardBg transition-all duration-300 shadow-sm"
        >
          {isDark ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
        </button>
      </div>
    </header>
  );
}