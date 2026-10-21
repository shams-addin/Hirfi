import { Link } from "@inertiajs/react";
import React from "react";

interface TabButtonProps {
    label: string;
    isActive: boolean;
    url?: string;
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function TabButton({ label, isActive, url, handleClick }: TabButtonProps) {
    const className = `px-4 py-2 rounded-md font-semibold transition-colors ${isActive ? 'bg-auth-primary/10 text-auth-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`;

    if (url !== undefined) {
        return (
            <Link href={url} className={className}>
                {label}
            </Link>
        );
    }

    return (
        <button type="button" onClick={handleClick} className={className}>
            {label}
        </button>
    );
}