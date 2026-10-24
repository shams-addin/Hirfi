import { useForm } from "@inertiajs/react";
import { AlertCircleIcon, StarIcon } from "lucide-react";
import { useState } from "react";
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

type Review = {
    providerId: number;
    rating: number;
    comment: string;
}

interface ReviewPanelProps {
    provider: Provider;
    displayReview: (flag: boolean) => void;
}

export default function ReviewPanel({ provider, displayReview }: ReviewPanelProps) {
    const [hover, setHover] = useState(0);
    const [stars, setStars] = useState(0);
    const { data, setData, post, processing, errors, reset, cancel } = useForm({
        rating: 0,
        comment: "",
        providerId: provider.id
    });

    function handleSubmint(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/reviews', {
            onSuccess: () => {
                reset();
                displayReview(false);
            }
        });
    }
    return (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-7 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                    <h3 className="font-bold font-display text-lg flex items-center gap-2">تقييم مقدم الخدمة</h3>
                </div>
                <form onSubmit={handleSubmint} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">عدد النجوم (إلزامي)</label>
                        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`${i} نجوم`}
                                    onMouseEnter={() => setHover(i)}
                                    onClick={() => setData({ ...data, rating: i })}
                                    className="p-1 scale-150 mx-1.5 transition-transform hover:scale-[1.7]"
                                >
                                    <StarIcon key={i} className={`w-4 h-4 ${i <= (hover || data.rating) ?'fill-yellow-400 text-yellow-400 hover:fill-yellow-400 hover:text-yellow-400' : 'fill-muted text-muted '}`} />
                                </button>
                            ))}
                        </div>
                        {errors && <p className="text-destructive-foreground text-xs mt-2 flex items-center gap-1">{errors.rating}</p>}
                    </div>

                    <div>
                        <TextFeild
                            label="المراجعة (اختياري)"
                            labelClassName="block text-sm font-semibold mb-1"
                            className="w-full p-3 bg-muted/50 border border-border rounded-lg outline-none focus:bg-card focus:ring-2 focus:ring-primary/50 transition-all"
                            textPlaceholder="شاركنا تجربتك مع مقدم الخدمة..."
                            textValue={data.comment}
                            handleChange={e => setData({ ...data, comment: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" disabled={processing} className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-70 transition-opacity">إرسال التقييم</button>
                        <button type="button" disabled={processing} onClick={() => {displayReview(false); cancel();}} className="px-6 bg-card border border-border py-3 rounded-lg font-bold hover:bg-muted">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    );
}