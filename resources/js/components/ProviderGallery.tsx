import { ImageIcon } from 'lucide-react';

type Photo = {
    id: number;
    photoNumber: number;
    path?: string;
};

interface ProviderGalleryProps {
    photos: Photo[];
}

export default function ProviderGallery({ photos }: ProviderGalleryProps) {
    return (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.length === 0 && (
                <div className="bg-muted/40 text-muted-foreground col-span-full flex flex-col items-center gap-2 rounded-lg p-6 text-sm">
                    <ImageIcon /> لم يضف الفني صوراً لأعماله بعد.
                </div>
            )}
            {photos.map((photo) => (
                <img
                    key={`${photo.id}-${photo.photoNumber}`}
                    src={photo.path}
                    alt={`صورة عمل ${photo.photoNumber}`}
                    className="bg-muted aspect-square w-full rounded-lg object-cover"
                />
            ))}
        </div>
    );
}
