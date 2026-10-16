
interface ConfirmTypeProps {
    pendingType: string;
    processing: boolean;
    displayPanel: (flag: boolean) => void;
    cancel: () => void
}

export default function ConfirmPanel({ pendingType, processing, displayPanel, cancel }: ConfirmTypeProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in">
                <div className="bg-card w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                    <h3 className="text-xl font-bold mb-3">تأكيد تغيير نوع الحساب</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {pendingType === 'provider'
                            ? "هل أنت متأكد من تحويل حسابك إلى «مقدم خدمة»؟ سيطلب منك ذلك إدخال تخصصك لتتمكن من استقبال الطلبات."
                            : "هل أنت متأكد من تحويل حسابك إلى «عميل»؟ ستفقد القدرة على استقبال الطلبات كفني."}
                    </p>
                    <div className="flex gap-3">
                        <button type="submit" disabled={processing} className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                            تأكيد التغيير
                        </button>
                        <button disabled={processing} onClick={() => {displayPanel(false); cancel();}} className="flex-1 bg-muted text-foreground py-2 rounded-lg font-bold hover:bg-muted/80 transition-colors">
                            إلغاء
                        </button>
                    </div>
                </div>
            </div>
    );
}