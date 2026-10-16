import ConfirmPanel from "@/components/ConfirmPanel";
import ProfilePicture from "@/components/ProfilePicture";
import StepOne from "@/components/StepOne";
import StepThree from "@/components/StepThree";
import StepTwo from "@/components/StepTwo";
import InputField from "@/components/ui/InputField";
import { useForm, usePage } from "@inertiajs/react";
import { Camera, User } from "lucide-react";
import { useState } from "react";

type Category = {
    category_id: number;
    category_name: string;
}

export default function Profile() {
    const [confirmTypeChange, setConfirmTypeChange] = useState(false);
    const { categories } = usePage<{ categories: Category[]; }>().props;

    const { data, setData, put, processing, errors, reset, cancel } = useForm({
        firstName: "",
        lastName: "",
        birthDate: "",
        password: "",
        password_confirmation: "",
        phone: "",
        address: "",
        accountType: "",
        serviceType: "",
        nationality: "",
    });

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        put('/profile', {
            onSuccess: () => reset(),
        });
    }
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold font-display mb-2">إدارة الحساب الشخصي</h2>
                <p className="text-muted-foreground">قم بتحديث بياناتك وإعدادات حسابك.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <ProfilePicture />
                    <div className="flex-1 space-y-5 w-full">
                        <StepOne data={data} setData={setData} errors={errors} />

                        <div className="pt-4 border-t border-border">
                            <StepTwo data={data} setData={setData} categories={categories} errors={errors} />

                            <div className="pt-4 mt-4 border-t border-border">
                                <StepThree data={data} setData={setData} errors={errors} />

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type={data.accountType === "provider" ? "submit" : "button"}
                                        onClick={() => data.accountType === "provider" && setConfirmTypeChange(true)}
                                        disabled={processing}
                                        className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                                    >
                                        حفظ التعديلات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* { user.role === 'provider' && provider && <ProviderTools provider={provider} updateProvider={updateProvider} /> }
    {
        form.role === 'provider' && user.role !== 'provider' && (
            <p className="mt-6 text-sm text-muted-foreground text-center">احفظ التعديلات لتفعيل أدوات مقدم الخدمة (الحالة ومعرض الأعمال).</p>
        )
    }*/}

    {
        confirmTypeChange && (
            <ConfirmPanel
                pendingType={data.accountType}
                displayPanel={setConfirmTypeChange}
                processing={processing}
                cancel={cancel}
            />
        )
    } 
            </form >
        </div >
    );
}