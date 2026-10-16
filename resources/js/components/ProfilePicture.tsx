import { Camera, User } from "lucide-react";

export default function ProfilePicture() {
    return (
        <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted relative group">
                {/* {form.photo ? (
                                <img src={form.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground"><User /></div>
                            )} */}
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground"><User size={70}/></div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                    <Camera />
                </div>
            </div>
            <span className="text-xs text-muted-foreground">صورة الملف الشخصي</span>
        </div>
    );
}