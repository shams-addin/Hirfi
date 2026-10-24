import { MapPin, Toolbox, User } from 'lucide-react';

interface AvatarProps {
    name: string;
    category: string;
    address: string;
    image?: string;
    state?: string;
}

export default function Avatar({
    name,
    category,
    address,
    image,
    state,
}: AvatarProps) {
    return (
        <div className="mb-4 flex items-start justify-between">
            <div className="flex gap-4">
                <div className="border-muted bg-muted h-16 w-16 shrink-0 overflow-hidden rounded-full border-2">
                    {image === null ? (
                        <User className="h-full w-full object-cover" />
                    ) : (
                        <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                <div>
                    <div className="mt-1 flex items-center gap-3">
                        <h4 className="font-display group-hover:text-primary text-lg font-bold transition-colors">
                            {name}
                        </h4>
                        <span
                            className={`flex items-center gap-1 ${state === 'busy' ? 'bg-destructive-foreground text-destructive' : 'bg-success text-success-foreground'} w-fit rounded px-2 py-1 text-sm font-semibold`}
                        >
                            {state === 'busy' ? 'مشغول' : 'متفرغ'}
                        </span>
                    </div>

                    <div className="text-muted-foreground mt-1 flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                            <Toolbox /> {category}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin /> {address}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
