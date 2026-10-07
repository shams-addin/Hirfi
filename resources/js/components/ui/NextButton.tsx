import { ArrowLeft } from "lucide-react";
import React from "react"

interface NextProps {
    stepNumber: number;
    buttonType: undefined|"submit";
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isProcessing: boolean;
}

export default function NextButton({stepNumber, onClick, buttonType, isProcessing}:NextProps) {
    return (
            <button
                onClick={onClick}
                disabled={isProcessing}
                type={buttonType}
                className="flex-1 bg-auth-primary text-auth-primary-foreground py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-auth-primary/90 transition-colors"
            >
                <span>{stepNumber === 3 ? 'تأكيد وإنشاء حساب' : 'التالي'}</span>
                {stepNumber !== 3 && <ArrowLeft size={18} />}
            </button>
    );
}