interface TextFeildProps {
    label: string;
    labelClassName?: string;
    className?: string;
    textValue: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    textPlaceholder?: string;
    error?: string | undefined;
}
export default function TextFeild({
    label,
    labelClassName,
    className,
    textValue,
    handleChange,
    textPlaceholder,
    error,
}: TextFeildProps) {
    return (
        <div>
            <label className={labelClassName}>{label}</label>
            <textarea
                className={className}
                rows={3}
                placeholder={textPlaceholder}
                value={textValue}
                onChange={handleChange}
            />
            {error && (
                <p className="text-destructive-foreground mt-1 text-xs">
                    {error}
                </p>
            )}
        </div>
    );
}
