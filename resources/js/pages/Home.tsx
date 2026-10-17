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


            <main className="flex-1 container mx-auto px-4 py-8">
                <HomeView />
            </main>
        </div>
    );
}