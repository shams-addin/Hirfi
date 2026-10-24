import { Star } from "lucide-react";
import { ReactNode } from "react";

interface RatingBadgeProps {
    children: ReactNode;
    color: 'blue' | 'green' | 'red' | 'amber' | 'gray';
}

export default function Badge({ children, color }: RatingBadgeProps) {
    const colorMap = {
    blue: 'bg-accent/50 text-accent-foreground',
    green: 'bg-success text-success-foreground',
    red: 'bg-destructive text-destructive-foreground',
    amber: 'bg-amber/50 text-amber-foreground',
    gray: 'bg-muted/50 text-muted-foreground',
  }
    return (
        <div className={`flex items-center gap-1 mb-3 ${colorMap[color]} w-fit px-2 py-1 rounded text-sm font-semibold`}>
            {children}
        </div>
    );
}