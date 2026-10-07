import { LucideIcon } from "lucide-react";

interface InputProps {
    label: string;
    icon: LucideIcon;
    inputType: string;
    inputName: string;
    inputValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputPlaceholder?: string;
    error?: string|undefined;
}

export default function InputField({label, icon:Icon, inputType, inputName, inputValue, handleChange, inputPlaceholder, error}: InputProps) {
    
    return (
        <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
            <div className="relative">
                <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                <input
                    type={inputType}
                    inputMode={inputType == "tel" ? "numeric" : "none"}
                    name={inputName}
                    value={inputValue}
                    onChange={handleChange}
                    className="w-full bg-auth-card border border-auth-border rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all"
                    placeholder={inputPlaceholder}
                />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}