import { Eye, EyeOff, Lock } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
    label: string;
    inputName: string;
    inputValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputPlaceholder: string;
    error?: string | undefined;
}

export default function PasswordField({ label, inputName, inputValue, handleChange, inputPlaceholder, error }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                <input
                    type={showPassword ? 'text' : 'password'}
                    name={inputName}
                    value={inputValue}
                    onChange={handleChange}
                    className="w-full bg-auth-card border border-auth-border rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all"
                    placeholder={inputPlaceholder}
                    dir="ltr"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}