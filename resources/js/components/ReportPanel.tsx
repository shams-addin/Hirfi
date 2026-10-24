import { useForm } from '@inertiajs/react';
import { MessageSquareWarning, XIcon } from 'lucide-react';
import SelectOptions from './ui/SelectOptions';
import TextFeild from './TextFeild';

type Provider = {
    id: number;
    name: string;
    category: number;
    address: string;
    nationality?: string;
    starAvg: number;
    state: string;
    avatar?: string;
};

interface ReportPanelProps {
    provider: Provider;
    displayReport: (flag: boolean) => void;
}
export default function ReportPanel({
    provider,
    displayReport,
}: ReportPanelProps) {
    const { data, setData, post, processing, errors, reset, cancel } = useForm({
        reportType: '',
        description: '',
        reportedId: provider.id,
    });

    // TODO: it should be in backend
    const reportReasons = [
        'احتيال',
        'سلوك غير لائق',
        'خدمة سيئة',
        'محتوى مسيء',
        'معلومات مضللة',
        'أخرى',
    ];

    function handleSubmint(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/reports', {
            onSuccess: () => {
                reset();
                displayReport(false);
            },
        });
    }
    return (
        <div className="animate-in fade-in fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 duration-200">
            <div className="bg-card w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
                <div className="border-border bg-muted/30 flex items-center justify-between border-b p-4">
                    <h3 className="font-display text-destructive-foreground flex items-center gap-2 text-lg font-bold">
                        <MessageSquareWarning /> إبلاغ:{' '}
                        <span className="text-foreground">{provider.name}</span>
                    </h3>
                    <button
                        onClick={() => displayReport(false)}
                        className="hover:bg-muted rounded-full p-2 transition-colors"
                    >
                        <XIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmint} className="space-y-4 p-6">
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
                            handleChange={(e) =>
                                setData('reportType', e.target.value)
                            }
                        />
                        {errors && (
                            <p className="text-destructive mt-1 text-xs">
                                {errors.reportType}
                            </p>
                        )}
                    </div>

                    <div>
                        <TextFeild
                            handleChange={(e) =>
                                setData({
                                    ...data,
                                    description: e.target.value,
                                })
                            }
                            label="تفاصيل المشكلة"
                            textValue={data.description}
                            className="bg-muted/50 border-border focus:bg-card focus:ring-primary/50 w-full rounded-lg border p-3 outline-none focus:ring-2"
                            labelClassName="block text-sm font-semibold mb-1"
                            textPlaceholder="اشرح ما حدث بالتفصيل..."
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-destructive text-destructive-foreground flex-1 rounded-lg py-3 font-bold transition-opacity hover:opacity-90"
                        >
                            إرسال البلاغ
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                displayReport(false);
                                cancel();
                            }}
                            className="bg-card border-border hover:bg-muted rounded-lg border px-6 py-3 font-bold"
                        >
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
