import { ArrowRight } from "lucide-react";
import React from "react";

interface BackProps {
    stepNumber: number;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isProcessing: boolean;
}

export default function BackButton({stepNumber, onClick, isProcessing}:BackProps) {
    return (
        <button
            className="px-6 py-3.5 bg-auth-secondary text-auth-secondary-foreground rounded-lg font-semibold flex items-center justify-center hover:bg-auth-secondary/80 transition-colors"
            onClick={onClick}
            disabled={isProcessing}
        >
            <ArrowRight size={18} />
        </button>
    );
}