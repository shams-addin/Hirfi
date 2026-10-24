import Body from '@/components/Body';
import Navbar from '@/components/Navbar';
import RequestTable from '@/components/RequestTable';
import TabButton from '@/components/ui/TabButton';
import { useForm, usePage } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import TableHeader from '@/components/TableHeader';

type Request = {
    id: number;
    description: string;
    photo?: string;
    address: string;
    date: string;
    state: string;
    customerId: number;
};

type User = {
    id: number;
    name: string;
    phone: string;
    profilePicture?: string;
};

export default function RequestManagement() {
    const { requests, users } = usePage<{
        requests: Request[];
        users: User[];
    }>().props;

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

    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
            <Navbar action="/logout">
                <TabButton isActive={true} label="تصفح الخدمات" url="/" />
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

            <div className="animate-in fade-in mx-auto max-w-4xl duration-500">
                <div className="mb-8">
                    <h2 className="font-display mb-2 text-3xl font-bold">
                        لوحة إدارة الطلبات
                    </h2>
                    <p className="text-muted-foreground">
                        تابع حالة طلباتك أو قم بإدارتها (واجهة موحدة للعرض).
                    </p>
                </div>

                <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
                    <div className="overflow-x-auto">
                        <RequestTable>
                            <TableHeader />
                            <Body requests={requests} customers={users} />
                        </RequestTable>

                        {requests.length === 0 && (
                            <div className="text-muted-foreground py-12 text-center">
                                لا توجد طلبات حالية.
                            </div>
                        )}
                    </div>
                </div>
                {/* {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    provider={providers.find(p => p.id === selectedOrder.providerId)}
                    review={reviews.find(r => r.orderId === selectedOrder.id)}
                    currentUser={currentUser}
                    onSubmitReview={onSubmitReview}
                    onReport={onReport}
                    onClose={() => setSelectedId(null)}
                />
            )} */}
            </div>
        </div>
    );
}
