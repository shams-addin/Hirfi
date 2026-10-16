import { ImageIcon } from "lucide-react";

type Photo = {
    id: number;
    photoNumber: number;
    path?: string;
}

interface ProviderGalleryProps {
    photos: Photo[];
}

export default function ProviderGallery({ photos }: ProviderGalleryProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {photos.length === 0 && (
                <div className="col-span-full bg-muted/40 rounded-lg p-6 flex flex-col items-center text-muted-foreground text-sm gap-2">
                    <ImageIcon /> لم يضف الفني صوراً لأعماله بعد.
                </div>
            )}
            {photos.map((photo) => (
                <img key={`${photo.id}-${photo.photoNumber}`} src={photo.path} alt={`صورة عمل ${photo.photoNumber}`} className="aspect-square w-full object-cover rounded-lg bg-muted" />
            ))}
        </div>
    );
}