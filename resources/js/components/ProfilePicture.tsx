import { Camera, User } from 'lucide-react';

export default function ProfilePicture() {
    return (
        <div className="flex shrink-0 flex-col items-center gap-4">
            <div className="border-muted group relative h-32 w-32 overflow-hidden rounded-full border-4">
                {/* {form.photo ? (
                                <img src={form.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground"><User /></div>
                            )} */}
                <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
                    <User size={70} />
                </div>
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera />
                </div>
            </div>
            <span className="text-muted-foreground text-xs">
                صورة الملف الشخصي
            </span>
        </div>
    );
}
