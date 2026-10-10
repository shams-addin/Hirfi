import HomeView from "@/components/HomeView";
import Navbar from "@/components/Navbar";
import TabButton from "@/components/ui/TabButton";
import { useState } from "react";

type Category = {
    category_id: number;
    category_name: string;
}

export default function Home({ categories }: { categories: Category[] }) {
    const [activeTab, setActiveTab] = useState<'home' | 'dashboard'>('home');

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <Navbar>
                <TabButton isActive={activeTab === 'home'} label="تصفح الخدمات" handleClick={() => setActiveTab('home')} />
                <TabButton isActive={activeTab === 'dashboard'} label="إدارة الطلبات" handleClick={() => setActiveTab('dashboard')} />
            </Navbar>

            <main className="flex-1 container mx-auto px-4 py-8">
                {activeTab === 'home' ? <HomeView categories={categories} /> : <DashboardView />}
            </main>
        </div>
    );
}