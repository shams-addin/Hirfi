import { Star } from "lucide-react";

interface RatingBadgeProps {
    ratings: number;
}

export default function RatingBadge({ ratings }: RatingBadgeProps) {
    return (
        <div className="flex items-center gap-1 mb-3 bg-accent/50 text-accent-foreground w-fit px-2 py-1 rounded text-sm font-semibold">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{ratings}</span>
        </div>
    );
}