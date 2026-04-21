import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
}

export function ActionButton({
  icon: Icon,
  label,
  className = "",
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 px-6 py-3 rounded-full bg-hoverBg text-xs font-black uppercase hover:bg-textMain hover:text-cardBg transition-all ${className}`}
      {...props}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
