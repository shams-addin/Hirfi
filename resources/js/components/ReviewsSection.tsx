import { Star, MessageSquareWarning } from 'lucide-react';

type Review = {
    providerId: number;
    customerId: number;
    rating: number;
    comment: string;
    date: string;
};

type User = {
    userId: number;
    name: string;
};

interface ReviewsSectionProps {
    reviews: Review[];
    users: User[];
}

export default function ReviewsSection({
    reviews,
    users,
}: ReviewsSectionProps) {
    const customers = new Map(users.map((user) => [user.userId, user]));
    return (
        <div className="space-y-4">
            {reviews.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    لا توجد مراجعات بعد.
                </p>
            )}
            {reviews.map((r, index) => (
                <div
                    key={`${r.customerId}-${index}`}
                    className="bg-muted/30 rounded-lg p-4"
                >
                    <div className="mb-1 flex items-center justify-between gap-2">
                        <div
                            key={r.customerId}
                            className="flex items-center gap-2"
                        >
                            {Array.from({ length: r.rating }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                            <span className="text-sm font-bold">
                                {customers.get(r.customerId)?.name}
                            </span>
                            <span className="text-muted-foreground text-xs">
                                {r.date}
                            </span>
                        </div>
                        // TODO create repert button
                        <MessageSquareWarning />
                    </div>
                    {r.comment && (
                        <p className="text-muted-foreground text-sm">
                            {r.comment}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
