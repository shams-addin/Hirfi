interface ConfirmTypeProps {
    title: string;
    messageOne: string;
    messageTwo?: string;
    pendingType: boolean;
    processing: boolean;
    displayPanel: (flag: boolean) => void;
    cancel: () => void;
}

export default function ConfirmPanel({
    title,
    messageOne,
    messageTwo,
    pendingType,
    processing,
    displayPanel,
    cancel,
}: ConfirmTypeProps) {
    return (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-card w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {pendingType ? messageOne : messageTwo}
                </p>
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-lg py-2 font-bold transition-colors"
                    >
                        تأكيد التغيير
                    </button>
                    <button
                        disabled={processing}
                        onClick={() => {
                            displayPanel(false);
                            cancel();
                        }}
                        className="bg-muted text-foreground hover:bg-muted/80 flex-1 rounded-lg py-2 font-bold transition-colors"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}
