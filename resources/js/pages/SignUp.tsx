import Branding from '@/components/Branding';
import SignUpForm from '@/components/SignUpForm';

type Category = {
    category_id: number;
    category_name: string;
}

export default function SignUp({ categories }: { categories: Category[] }) {
    return (
        <div className="flex min-h-screen w-full flex-col font-sans md:flex-row bg-auth-background" dir="rtl">
            <div className="flex-1 flex flex-col p-6 md:p-12 overflow-y-auto">
                <SignUpForm categories={categories}/>
             
             <div className="mt-8 text-center text-sm text-muted-foreground pb-8">
            لديك حساب بالفعل؟{" "}
            <a href="/login" className="text-auth-accent font-semibold hover:underline">
              تسجيل الدخول
            </a>
          </div>
            </div>
            
            <div className="hidden md:sticky md:top-0 md:flex md:h-screen md:self-start flex-1 bg-auth-primary text-auth-primary-foreground p-12 flex-col justify-between items-start relative overflow-hidden">
                <Branding />
            </div>
        </div>
    );
}