import ConfirmPanel from '@/components/ConfirmPanel';
import ProfilePicture from '@/components/ProfilePicture';
import ProviderTools from '@/components/ProviderTools';
import StepOne from '@/components/StepOne';
import StepThree from '@/components/StepThree';
import StepTwo from '@/components/StepTwo';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Category = {
    category_id: number;
    category_name: string;
};

type User = {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    password: string;
    password_confirmation: string;
    phone: string;
    address: string;
    nationality: string;
};

type Provider = {
    id: number;
    category: string;
    starAvg: number;
    state: string;
};

export default function EditProfile() {
    const [confirmTypeChange, setConfirmTypeChange] = useState(false);
    const { user, providers, categories } = usePage<{
        categories: Category[];
        user: User;
        providers: Provider[];
    }>().props;

    const { data, setData, put, processing, errors, reset, cancel } = useForm({
        firstName: '',
        lastName: '',
        birthDate: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        accountType: '',
        serviceType: '',
        nationality: '',
        ProviderState: '',
    });

    const isProvider = providers.find((p) => p.id === user.id);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        put(`/profile/${user.id}/edit`, {
            onSuccess: () => reset(),
        });
    }
    return (
        <div className="animate-in fade-in mx-auto max-w-3xl duration-500">
            <div className="mb-8">
                <h2 className="font-display mb-2 text-3xl font-bold">
                    إدارة الحساب الشخصي
                </h2>
                <p className="text-muted-foreground">
                    قم بتحديث بياناتك وإعدادات حسابك.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-card border-border overflow-hidden rounded-xl border p-6 shadow-sm md:p-8"
            >
                <div className="flex flex-col items-start gap-8 md:flex-row">
                    <ProfilePicture />

                    <div className="w-full flex-1 space-y-5">
                        <StepOne
                            data={data}
                            setData={setData}
                            errors={errors}
                        />

                        <div className="border-border border-t pt-4">
                            <StepTwo
                                data={data}
                                setData={setData}
                                categories={categories}
                                errors={errors}
                            />

                            <div className="border-border mt-4 border-t pt-4">
                                <StepThree
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />

                                {/* {isProvider &&
                                    <ProviderTools
                                        providerState={data.ProviderState}
                                        handleClick={e => setData('ProviderState', data.ProviderState)}
                                    />
                                } */}

                                <div className="flex justify-end pt-4">
                                    <button
                                        type={
                                            data.accountType === ''
                                                ? 'submit'
                                                : 'button'
                                        }
                                        onClick={() =>
                                            data.accountType === 'provider' &&
                                            setConfirmTypeChange(true)
                                        }
                                        disabled={processing}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg px-8 py-3 font-bold transition-colors md:w-auto"
                                    >
                                        حفظ التعديلات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {isProvider && <ProviderTools providerState={data.ProviderState} handleClick={e => setData('ProviderState', data.ProviderState)} />} */}
                {data.accountType === 'provider' && !isProvider && (
                    <p className="text-muted-foreground mt-6 text-center text-sm">
                        احفظ التعديلات لتفعيل أدوات مقدم الخدمة (الحالة ومعرض
                        الأعمال).
                    </p>
                )}

                {confirmTypeChange && (
                    <ConfirmPanel
                        title="تأكيد تغيير نوع الحساب"
                        messageOne="هل أنت متأكد من تحويل حسابك إلى «مقدم خدمة»؟ سيطلب منك ذلك إدخال تخصصك لتتمكن من استقبال الطلبات."
                        messageTwo="هل أنت متأكد من تحويل حسابك إلى «عميل»؟ ستفقد القدرة على استقبال الطلبات كفني."
                        pendingType={data.accountType === 'provider'}
                        displayPanel={setConfirmTypeChange}
                        processing={processing}
                        cancel={cancel}
                    />
                )}
            </form>
        </div>
    );
}
