import ConfirmButton from "@/components/ui/ConfirmButton";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import { Link, useForm } from "@inertiajs/react";
import { AnimatePresence } from "framer-motion";
import { AlertCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

export default function Login() {
    const { data, setData, reset, post, processing } = useForm({
        phone: "",
        password: ""
    })

    const { flash } = usePage<{ flash?: { error?: string } }>().props;

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/admin-dashboard/login', {
            onSuccess: () => reset(),
        });
    }

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">تسجيل الدخول</h1>
                    <p className="text-gray-500 mt-2">إلى لوحة تحكم مدير النظام</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <AnimatePresence mode="wait">
                        {flash?.error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="rounded-md border border-red-500 bg-red-50 m-auto p-4 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="size-6 text-red-700" />
                                    <p className="mt-0.5 text-red-700">{flash.error}</p>
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
                        handleChange={(e) => setData("phone", e.target.value)}
                        className="w-full bg-auth-card border border-auth-border rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all"
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

            </div>
        </div>
    );
}