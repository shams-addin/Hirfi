import ProfilePicture from "@/components/ProfilePicture";
import Navbar from "@/components/Navbar";
import TabButton from "@/components/ui/TabButton";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

type Category = {
    category_id: number;
    category_name: string;
}

type User = {
    id: number;
    name: string;
    birthDate: string;
    phone: string;
    address: string;
    nationality: string;
}

type Provider = {
    id: number;
    category: string;
    starAvg: number;
    state: string;
}

export default function Profile() {
    const { flash } = usePage<{ flash?: { error?: string; success?: string } }>().props;
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
        
    const { user, provider, categories } = usePage<{
        categories: Category[];
        user: User;
        provider: Provider;
    }>().props;

    const isProvider = provider !== null;

    return (
        <div className="animate-in fade-in duration-500">
            <Navbar>
                <TabButton isActive={false} label="تصفح الخدمات" url="/"/>
                <TabButton isActive={false} label="إدارة الطلبات" url="/"/>
            </Navbar>
                <AnimatePresence mode="wait">
                    {showFlash && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`mb-6 p-4 ${message === flash?.success ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'} rounded-lg flex items-center gap-3 text-sm`}
                        >
                            {message === flash?.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                            <span>{message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
<div className="max-w-3xl mx-auto mt-7">
            <div className="mb-8">
                <h2 className="text-3xl font-bold font-display mb-2">إدارة الحساب الشخصي</h2>
                <p className="text-muted-foreground">قم بتحديث بياناتك وإعدادات حسابك.</p>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <ProfilePicture />


                    <div className="flex-1 space-y-5 w-full">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <h2 className="text-xl font-semibold">الاسم</h2>
                            <label className="text-sm font-medium text-foreground mb-1.5">{user.name}</label>
        
                            <h2 className="text-xl font-semibold mb-4">رقم الهاتف</h2>
                            <label className="text-sm font-medium text-foreground mb-1.5">{user.phone}</label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <h2 className="text-xl font-semibold mb-4">تاريخ الميلاد</h2>
                            <label className="block text-sm font-medium text-foreground mb-1.5">{user.birthDate}</label>
                        
                            <h2 className="text-xl font-semibold mb-4">العنوان</h2>
                            <label className="block text-sm font-medium text-foreground mb-1.5">{user.address}</label>
                        </div>

                        <div className="space-y-5">
                            <h2 className="text-xl font-semibold mb-4">جنسيتك</h2>
                            <label className="block text-sm font-medium text-foreground mb-1.5">{user.nationality}</label>
                        </div>

                        {/* {isProvider &&
                            <ProviderTools
                                providerState={provider.state}
                                handleClick={e => setData('ProviderState', data.ProviderState)}
                            />
                        } */}

                                <Link href={`/profile/${user.id}/edit`} className="pt-4 flex justify-end">
                                    <button
                                        className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors cursor-pointer"
                                    >
                                        تعديل البيانات  
                                    </button>
                                </Link>
                            </div>
                        </div>
</div>
            </div >
        </div >
    );
}