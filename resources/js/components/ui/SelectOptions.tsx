import { LucideIcon } from "lucide-react";
import React from "react";

interface Option {
    name: string;
    value: string;
}

interface OptionProps {
    icon: LucideIcon;
    label: string;
    value: string;
    placeholder?: string;
    optionValue: Option[];
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectOptions({ icon:Icon, label, value, placeholder, optionValue, handleChange }: OptionProps) {
    return (
        <>        
            <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
            <div className="relative">
                <Icon
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                    size={18}
                />
                <select
                    value={value}
                    onChange={handleChange}
                    className="w-full bg-auth-card border border-auth-border rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all appearance-none"
                >
                    <option value="" disabled>{placeholder}</option>
                    {optionValue.map((option) => (
                        <option value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        </>
    );
}