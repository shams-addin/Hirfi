import { LucideIcon } from "lucide-react";
import React from "react";

interface AccountTypeProps {
    typeName: string;
    typePlaceholder: string;
    isSelected: boolean;
    icon: LucideIcon;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AccountTypeButton({icon:Icon, typeName, typePlaceholder, isSelected, handleClick}: AccountTypeProps) {

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                    className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl transition-all ${
                    isSelected
                        ? 'border-auth-accent bg-auth-accent/5 text-auth-accent'
                        : 'border-auth-border bg-auth-card text-muted-foreground hover:border-auth-accent/30 hover:bg-auth-secondary/30'
                        }`}
            >
                <Icon size={32} className="mb-3" />
                <span className="font-semibold">{typeName}</span>
                <span className="text-xs opacity-70 mt-1">{typePlaceholder}</span>
            </button>

        </>
    );
}