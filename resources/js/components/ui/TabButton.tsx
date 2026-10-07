import React from "react";

interface TabButtonProps {
    label: string;
    isActive: boolean;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function TabButton({ label, isActive, handleClick }: TabButtonProps) {
    return (
        <button
            onClick={handleClick}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${isActive ? 'bg-auth-primary/10 text-auth-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
        >
            {label}
        </button>
    );
}