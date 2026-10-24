import { Wrench, User } from 'lucide-react';

export default function Branding() {
    return (
        // <div className="hidden md:flex flex-1 bg-auth-primary text-auth-primary-foreground p-12 flex-col justify-between items-start relative overflow-hidden">
        <div className="relative z-10 max-w-md space-y-8">
            <div className="bg-auth-accent mb-12 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
                <Wrench className="text-white" size={24} />
            </div>

            <h2 className="text-4xl leading-tight font-bold">
                تواصل مع أفضل <br />
                <span className="text-auth-accent">الخبراء والعملاء</span>
            </h2>

            <p className="text-auth-primary-foreground/70 text-lg leading-relaxed">
                منصتنا تجمع بين أمهر الفنيين و الباحثين عن خدمات صيانة وإصلاح
                موثوقة وعالية الجودة.
            </p>

            <div className="flex items-center gap-4 pt-8">
                <div className="flex -space-x-3 space-x-reverse">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-auth-secondary border-auth-auth-primary flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2"
                        >
                            <User
                                size={16}
                                className="text-auth-secondary-foreground/50"
                            />
                        </div>
                    ))}
                </div>
                <div className="text-sm font-medium">
                    انضم إلى{' '}
                    <span className="text-auth-accent">أكثر من 10,000</span>{' '}
                    مستخدم
                </div>
            </div>
            {/* Decorative background elements */}
            <div className="bg-auth-accent/20 absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl" />
            <div className="bg-auth-secondary/10 absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/3 rounded-full blur-3xl" />
        </div>
        // </div>
    );
}
