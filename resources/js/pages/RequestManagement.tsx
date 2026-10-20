import Body from "@/components/Body";
import Navbar from "@/components/Navbar";
import RequestTable from "@/components/RequestTable";
import TabButton from "@/components/ui/TabButton";
import { useForm, usePage } from "@inertiajs/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import TableHeader from "@/components/TableHeader";

type Request = {
    id: number;
    description: string;
    photo?: string;
    address: string;
    date: string;
    state: string;
    customerId: number;
}

type User = {
    id: number;
    name: string;
    phone: string;
    profilePicture?: string;
}

export default function RequestManagement() {
    const { requests, users } = usePage<{ requests: Request[], users: User[] }>().props;
    

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
    
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
                    <Navbar>
                        <TabButton isActive={true} label="تصفح الخدمات" url="/"/>
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
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold font-display mb-2">لوحة إدارة الطلبات</h2>
                <p className="text-muted-foreground">تابع حالة طلباتك أو قم بإدارتها (واجهة موحدة للعرض).</p>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <RequestTable>
                        <TableHeader />
                        <Body requests={requests} customers={users} />
                    </RequestTable>
                    
                    {requests.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
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