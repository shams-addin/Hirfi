import ConfirmButton from "@/components/ui/ConfirmButton";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import { useForm } from "@inertiajs/react";
import { AnimatePresence } from "framer-motion";
import { AlertCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

export default function Login() {
    const { data, setData, errors, reset, post, processing } = useForm({
        phone: "",
        password: ""
    })

    const { flash } = usePage<{ flash?: { error?: string } }>().props;

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/login', {
            onSuccess: () => reset(),
        });
    }

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">تسجيل الدخول</h1>
                    <p className="text-gray-500 mt-2">منصة حرفي</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {flash?.error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3 text-sm"
                            >
                                <AlertCircle size={18} />
                                <span>{flash.error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <InputField
                        label="رقم الهاتف"
                        icon={Phone}
                        inputType="tel"
                        inputName="phone"
                        inputValue={data.phone}
                        handleChange={(e) => setData("phone", e.target.value)}
                        inputPlaceholder="09X XXX XXXX"
                    />

                    <PasswordField
                        label="كلمة المرور"
                        inputName="password"
                        inputValue={data.password}
                        handleChange={(e) => setData("password", e.target.value)}
                        inputPlaceholder="••••••••"
                    />

                    <ConfirmButton label="تسجيل الدخول" isProcessing={processing} />
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    ليس لديك حساب؟
                    <a href="/sign-up" className="text-blue-600 hover:text-blue-800 font-bold">سجل الآن كعميل أو مزود خدمة</a>
                </div>
            </div>
        </div>
    );
}