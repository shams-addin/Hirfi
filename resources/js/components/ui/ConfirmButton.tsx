interface ConfirmButtonProps {
    label: string;
    isProcessing: boolean;
}
export default function ConfirmButton({ label, isProcessing }: ConfirmButtonProps) {
    return (
        <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-blue-200"
        >
            {label}
        </button>
    );
}