import ConfirmButton from '@/components/ui/ConfirmButton';
import InputField from '@/components/ui/InputField';
import PasswordField from '@/components/ui/PasswordField';
import { Link, useForm } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import { AlertCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';

export default function Login() {
    const { data, setData, reset, post, processing } = useForm({
        phone: '',
        password: '',
    });

    const { flash } = usePage<{ flash?: { error?: string } }>().props;

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/login', {
            onSuccess: () => reset(),
        });
    }

    return (
        <div
            dir="rtl"
            className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans"
        >
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        تسجيل الدخول
                    </h1>
                    <p className="mt-2 text-gray-500">منصة حرفي</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {flash?.error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="m-auto rounded-md border border-red-500 bg-red-50 p-4 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="size-6 text-red-700" />
                                    <p className="mt-0.5 text-red-700">
                                        {flash.error}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <InputField
                        label="رقم الهاتف"
                        labelClassName="block text-sm font-medium text-foreground mb-1.5"
                        icon={Phone}
                        inputType="tel"
                        inputName="phone"
                        inputValue={data.phone}
                        handleChange={(e) => setData('phone', e.target.value)}
                        className="bg-auth-card border-auth-border focus:ring-auth-accent/50 focus:border-auth-accent w-full rounded-lg border py-3 pr-10 pl-4 text-sm transition-all focus:ring-2 focus:outline-none"
                        inputPlaceholder="09X XXX XXXX"
                    />

                    <PasswordField
                        label="كلمة المرور"
                        inputName="password"
                        inputValue={data.password}
                        handleChange={(e) =>
                            setData('password', e.target.value)
                        }
                        inputPlaceholder="••••••••"
                    />

                    <ConfirmButton
                        label="تسجيل الدخول"
                        isProcessing={processing}
                    />
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    ليس لديك حساب؟
                    <Link
                        href="/sign-up"
                        className="font-bold text-blue-600 hover:text-blue-800"
                    >
                        سجل الآن كعميل أو مزود خدمة
                    </Link>
                </div>
            </div>
        </div>
    );
}
