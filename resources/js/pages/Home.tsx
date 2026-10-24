import HomeView from "@/components/HomeView";
import Navbar from "@/components/Navbar";
import TabButton from "@/components/ui/TabButton";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function Home() {
    const [activeTab, setActiveTab] = useState<'home' | 'dashboard'>('home');
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
            <Navbar action="/logout" >
                <TabButton isActive={true} label="تصفح الخدمات" url="/"/>
                <TabButton isActive={false} label="إدارة الطلبات" url="/"/>
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
                            {message === flash?.success ? <CheckCircle2 className="size-6 text-green-700" /> : <AlertCircle className="size-6 text-red-700" />}
                            <p className={`mt-0.5 ${message === flash?.success ? 'text-sm text-green-700' : 'text-red-700'} `}>{message}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


            <main className="flex-1 container mx-auto px-4 py-8">
                <HomeView />
            </main>
        </div>
    );
}