import { LucideIcon } from "lucide-react";

interface InputProps {
    label?: string;
    labelClassName?: string;
    icon?: LucideIcon;
    inputType?: string;
    inputName?: string;
    inputValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputPlaceholder?: string;
    className?: string;
    error?: string|undefined;
}

export default function InputField({label, labelClassName, icon:Icon, inputType, inputName, inputValue, handleChange, inputPlaceholder, className, error}: InputProps) {
    
    return (
        <div>
            <label className={labelClassName}>{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />}
                <input
                    type={inputType}
                    inputMode={inputType === "tel" ? "numeric" : "none"}
                    name={inputName}
                    value={inputValue}
                    onChange={handleChange}
                    className={className}
                    placeholder={inputPlaceholder}
                />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}