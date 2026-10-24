import Branding from '@/components/Branding';
import SignUpForm from '@/components/SignUpForm';
import { Link } from '@inertiajs/react';

type Category = {
    category_id: number;
    category_name: string;
};

export default function SignUp({ categories }: { categories: Category[] }) {
    return (
        <div
            className="bg-auth-background flex min-h-screen w-full flex-col font-sans md:flex-row"
            dir="rtl"
        >
            <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-12">
                <SignUpForm categories={categories} />

                <div className="text-muted-foreground mt-8 pb-8 text-center text-sm">
                    لديك حساب بالفعل؟{' '}
                    <Link
                        href="/login"
                        className="text-auth-accent font-semibold hover:underline"
                    >
                        تسجيل الدخول
                    </Link>
                </div>
            </div>

            <div className="bg-auth-primary text-auth-primary-foreground relative hidden flex-1 flex-col items-start justify-between overflow-hidden p-12 md:sticky md:top-0 md:flex md:h-screen md:self-start">
                <Branding />
            </div>
        </div>
    );
}
