import { useForm } from '@inertiajs/react';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';
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

// type Review = {
//     providerId: number;
//     rating: number;
//     comment: string;
// };

interface ReviewPanelProps {
    provider: Provider;
    displayReview: (flag: boolean) => void;
}

export default function ReviewPanel({
    provider,
    displayReview,
}: ReviewPanelProps) {
    const [hover, setHover] = useState(0);
    // const [stars, setStars] = useState(0);
    const { data, setData, post, processing, errors, reset, cancel } = useForm({
        rating: 0,
        comment: '',
        providerId: provider.id,
    });

    function handleSubmint(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/reviews', {
            onSuccess: () => {
                reset();
                displayReview(false);
            },
        });
    }
    return (
        <div className="animate-in fade-in fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-7 duration-200">
            <div className="bg-card w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
                <div className="border-border bg-muted/30 flex items-center justify-between border-b p-4">
                    <h3 className="font-display flex items-center gap-2 text-lg font-bold">
                        تقييم مقدم الخدمة
                    </h3>
                </div>
                <form onSubmit={handleSubmint} className="space-y-4 p-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            عدد النجوم (إلزامي)
                        </label>
                        <div
                            className="flex gap-1"
                            onMouseLeave={() => setHover(0)}
                        >
                            {[1, 2, 3, 4, 5].map((i) => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`${i} نجوم`}
                                    onMouseEnter={() => setHover(i)}
                                    onClick={() =>
                                        setData({ ...data, rating: i })
                                    }
                                    className="mx-1.5 scale-150 p-1 transition-transform hover:scale-[1.7]"
                                >
                                    <StarIcon
                                        key={i}
                                        className={`h-4 w-4 ${i <= (hover || data.rating) ? 'fill-yellow-400 text-yellow-400 hover:fill-yellow-400 hover:text-yellow-400' : 'fill-muted text-muted '}`}
                                    />
                                </button>
                            ))}
                        </div>
                        {errors && (
                            <p className="text-destructive-foreground mt-2 flex items-center gap-1 text-xs">
                                {errors.rating}
                            </p>
                        )}
                    </div>

                    <div>
                        <TextFeild
                            label="المراجعة (اختياري)"
                            labelClassName="block text-sm font-semibold mb-1"
                            className="bg-muted/50 border-border focus:bg-card focus:ring-primary/50 w-full rounded-lg border p-3 transition-all outline-none focus:ring-2"
                            textPlaceholder="شاركنا تجربتك مع مقدم الخدمة..."
                            textValue={data.comment}
                            handleChange={(e) =>
                                setData({ ...data, comment: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary text-primary-foreground flex-1 rounded-lg py-3 font-bold transition-opacity hover:opacity-70"
                        >
                            إرسال التقييم
                        </button>
                        <button
                            type="button"
                            disabled={processing}
                            onClick={() => {
                                displayReview(false);
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
