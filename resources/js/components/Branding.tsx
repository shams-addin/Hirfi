import { Wrench, User } from "lucide-react";

export default function Branding() {
    return (
        // <div className="hidden md:flex flex-1 bg-auth-primary text-auth-primary-foreground p-12 flex-col justify-between items-start relative overflow-hidden">
            <div className="relative z-10 space-y-8 max-w-md">
                <div className="w-12 h-12 bg-auth-accent rounded-xl flex items-center justify-center mb-12 shadow-lg">
                    <Wrench className="text-white" size={24} />
                </div>

                <h2 className="text-4xl font-bold leading-tight">
                    تواصل مع أفضل <br />
                    <span className="text-auth-accent">الخبراء والعملاء</span>
                </h2>

                <p className="text-auth-primary-foreground/70 text-lg leading-relaxed">
                    منصتنا تجمع بين أمهر الفنيين و الباحثين عن خدمات صيانة وإصلاح موثوقة وعالية الجودة.
                </p>

                <div className="pt-8 flex items-center gap-4">
                    <div className="flex -space-x-3 space-x-reverse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full bg-auth-secondary border-2 border-auth-auth-primary overflow-hidden flex items-center justify-center">
                                <User size={16} className="text-auth-secondary-foreground/50" />
                            </div>
                        ))}
                    </div>
                    <div className="text-sm font-medium">
                        انضم إلى <span className="text-auth-accent">أكثر من 10,000</span> مستخدم
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-auth-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-auth-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
            </div>
        // </div>
    );
}