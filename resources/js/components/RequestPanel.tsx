import { useForm } from '@inertiajs/react';
import { Camera, XIcon } from 'lucide-react';
import InputField from './ui/InputField';
import TextFeild from './TextFeild';
import InsertField from './ui/InsertField';

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
interface RequestPanelProps {
    provider: Provider;
    displayRequest: (flag: boolean) => void;
}

export default function RequestPanel({
    provider,
    displayRequest,
}: RequestPanelProps) {
    const { data, setData, post, processing, errors, reset, cancel } = useForm({
        description: '',
        photo: '',
        address: '',
        provider_id: provider.id,
    });

    function handleSubmint(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/requests', {
            onSuccess: () => {
                reset();
                displayRequest(false);
            },
        });
    }

    return (
        <div className="animate-in fade-in fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 duration-200">
            <div className="bg-card flex w-full max-w-lg flex-col overflow-hidden rounded-2xl shadow-2xl">
                <div className="border-border bg-muted/30 flex items-center justify-between border-b p-4">
                    <h3 className="font-display text-lg font-bold">
                        طلب خدمة من {provider.name}
                    </h3>
                    <button
                        onClick={() => displayRequest(false)}
                        className="hover:bg-muted rounded-full p-2 transition-colors"
                    >
                        <XIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmint} className="space-y-4 p-6">
                    <TextFeild
                        label="تفاصيل العمل (إلزامي)"
                        labelClassName="block text-sm font-semibold mb-1"
                        className={`bg-muted/50 focus:bg-card focus:ring-primary/50 w-full rounded-lg border p-3 transition-all outline-none focus:ring-2 ${errors.description ? 'border-destructive-foreground' : 'border-border'}`}
                        textPlaceholder="صف المشكلة أو الخدمة التي تحتاجها..."
                        textValue={data.description}
                        handleChange={(e) =>
                            setData({ ...data, description: e.target.value })
                        }
                        error={errors.description}
                    />

                    <div>
                        <InputField
                            label="موقع التنفيذ (إلزامي)"
                            labelClassName="block text-sm font-semibold mb-1"
                            inputType="text"
                            className={`bg-muted/50 focus:bg-card focus:ring-primary/50 w-full rounded-lg border p-3 transition-all outline-none focus:ring-2 ${errors.address ? 'border-destructive-foreground' : 'border-border'}`}
                            inputPlaceholder="المدينة، الحي، الشارع..."
                            inputValue={data.address}
                            handleChange={(e) =>
                                setData({ ...data, address: e.target.value })
                            }
                            error={errors.address}
                        />
                    </div>

                    <InsertField
                        label="صورة توضيحية (اختياري)"
                        labelClassName="block text-sm font-semibold mb-1"
                        className="border-border text-muted-foreground hover:bg-muted/30 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors"
                        icon={Camera}
                        span="انقر لرفع صورة"
                        spanClassName="text-sm mt-2"
                    />

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-lg py-3 font-bold transition-colors"
                        >
                            إرسال الطلب
                        </button>

                        <button
                            type="button"
                            disabled={processing}
                            onClick={() => {
                                displayRequest(false);
                                cancel();
                            }}
                            className="bg-card border-border text-foreground hover:bg-muted rounded-lg border px-6 py-3 font-bold transition-colors"
                        >
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
