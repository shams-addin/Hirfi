import ProfilePicture from '@/components/ProfilePicture';
import Navbar from '@/components/Navbar';
import TabButton from '@/components/ui/TabButton';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

type Category = {
    category_id: number;
    category_name: string;
};

type User = {
    id: number;
    name: string;
    birthDate: string;
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

export default function Profile() {
    const { flash } = usePage<{
        flash?: { error?: string; success?: string };
    }>().props;
    const message = flash?.error ?? flash?.success;
    const [showFlash, setShowFlash] = useState(Boolean(message));

    useEffect(() => {
        if (!message) {
            setShowFlash(false);
            return;
        }

        setShowFlash(true);
        const timeoutId = window.setTimeout(() => setShowFlash(false), 3000);

        return () => window.clearTimeout(timeoutId);
    }, [message]);

    const { user, provider,
        //  categories
         } = usePage<{
        categories: Category[];
        user: User;
        provider: Provider;
    }>().props;

    // const isProvider = provider !== null;

    return (
        <div className="animate-in fade-in duration-500">
            <Navbar action="/logout">
                <TabButton isActive={false} label="تصفح الخدمات" url="/" />
                <TabButton isActive={false} label="إدارة الطلبات" url="/" />
            </Navbar>

            <AnimatePresence mode="wait">
                {showFlash && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`rounded-md border ${message === flash?.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} m-auto p-4 shadow-sm`}
                    >
                        <div className="flex items-start gap-4">
                            {message === flash?.success ? (
                                <CheckCircle2 className="size-6 text-green-700" />
                            ) : (
                                <AlertCircle className="size-6 text-red-700" />
                            )}
                            <p
                                className={`mt-0.5 ${message === flash?.success ? 'text-sm text-green-700' : 'text-red-700'} `}
                            >
                                {message}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto mt-7 max-w-3xl">
                <div className="mb-8">
                    <h2 className="font-display mb-2 text-3xl font-bold">
                        إدارة الحساب الشخصي
                    </h2>
                    <p className="text-muted-foreground">
                        قم بتحديث بياناتك وإعدادات حسابك.
                    </p>
                </div>

                <div className="bg-card border-border overflow-hidden rounded-xl border p-6 shadow-sm md:p-8">
                    <div className="flex flex-col items-start gap-8 md:flex-row">
                        <ProfilePicture />

                        <div className="w-full flex-1 space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <h2 className="text-xl font-semibold">الاسم</h2>
                                <label className="text-foreground mb-1.5 text-sm font-medium">
                                    {user.name}
                                </label>

                                <h2 className="mb-4 text-xl font-semibold">
                                    رقم الهاتف
                                </h2>
                                <label className="text-foreground mb-1.5 text-sm font-medium">
                                    {user.phone}
                                </label>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <h2 className="mb-4 text-xl font-semibold">
                                    تاريخ الميلاد
                                </h2>
                                <label className="text-foreground mb-1.5 block text-sm font-medium">
                                    {user.birthDate}
                                </label>

                                <h2 className="mb-4 text-xl font-semibold">
                                    العنوان
                                </h2>
                                <label className="text-foreground mb-1.5 block text-sm font-medium">
                                    {user.address}
                                </label>
                            </div>

                            <div className="space-y-5">
                                <h2 className="mb-4 text-xl font-semibold">
                                    جنسيتك
                                </h2>
                                <label className="text-foreground mb-1.5 block text-sm font-medium">
                                    {user.nationality}
                                </label>
                            </div>

                            {/* {isProvider &&
                            <ProviderTools
                                providerState={provider.state}
                                handleClick={e => setData('ProviderState', data.ProviderState)}
                            />
                        } */}

                            <Link
                                href={`/profile/${user.id}/edit`}
                                className="flex justify-end pt-4"
                            >
                                <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer rounded-lg px-8 py-3 font-bold transition-colors md:w-auto">
                                    تعديل البيانات
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
