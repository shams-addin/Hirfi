import { useForm } from "@inertiajs/react";
import { MessageSquareWarning, XIcon } from "lucide-react";
import SelectOptions from "./ui/SelectOptions";
import TextFeild from "./TextFeild";

type Provider = {
    id: number;
    name: string
    category: number;
    address: string;
    nationality?: string;
    starAvg: number;
    state: string;
    avatar?: string;
}

interface ReportPanelProps {
    provider: Provider;
    displayReport: (flag: boolean) => void
}
export default function ReportPanel({ provider, displayReport }: ReportPanelProps) {
    const { data, setData, post, processing, errors, reset, cancel } = useForm({
        reportType: "",
        description: "",
        reportedId: provider.id,
    });

    // TODO: it should be in backend
    const reportReasons = ["احتيال", "سلوك غير لائق", "خدمة سيئة", "محتوى مسيء", "معلومات مضللة", "أخرى"];

    function handleSubmint(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/reports', {
            onSuccess: () => {
                reset();
                displayReport(false);
            }
        });
    }
    return (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                    <h3 className="font-bold font-display text-lg flex items-center gap-2 text-destructive-foreground"><MessageSquareWarning /> إبلاغ: <span className="text-foreground">{provider.name}</span></h3>
                    <button onClick={() => displayReport(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><XIcon /></button>
                </div>

                <form onSubmit={handleSubmint} className="p-6 space-y-4">
                    <div>
                        <SelectOptions
                            icon={MessageSquareWarning}
                            label="سبب البلاغ (إلزامي)"
                            value={data.reportType}
                            placeholder="اختر السبب..."
                            optionValue={reportReasons.map((reason) => ({
                                value: String(reason),
                                name: reason,
                            }))}
                            handleChange={(e) => setData("reportType", e.target.value)}
                        />
                        {errors && <p className="text-destructive text-xs mt-1">{errors.reportType}</p>}
                    </div>

                    <div>
                        <TextFeild
                            handleChange={e => setData({ ...data, description: e.target.value })}
                            label="تفاصيل المشكلة"
                            textValue={data.description}
                            className="w-full p-3 bg-muted/50 border border-border rounded-lg outline-none focus:bg-card focus:ring-2 focus:ring-primary/50"
                            labelClassName="block text-sm font-semibold mb-1"
                            textPlaceholder="اشرح ما حدث بالتفصيل..."
                        />
                    </div>

                    <div className="flex gap-3">
                        <button type="submit" disabled={processing} className="flex-1 bg-destructive text-destructive-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">إرسال البلاغ</button>
                        <button type="button" onClick={() => {displayReport(false); cancel()}} className="px-6 bg-card border border-border py-3 rounded-lg font-bold hover:bg-muted">إلغاء</button>
                    </div>

                </form>
            </div>
        </div>
    );
}