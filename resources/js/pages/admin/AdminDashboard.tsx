import CategoriesSection from '@/components/admin/CategoriesSection';
import PermissionsSection from '@/components/admin/PermissionsSection';
import ReportsSection from '@/components/admin/ReportsSection';
import SupervisorsSection from '@/components/admin/SupervisorsSection';
import UsersSection from '@/components/admin/UsersSection';
import Navbar from '@/components/Navbar';
import TabButton from '@/components/ui/TabButton';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

type Section =
    | 'users'
    | 'categories'
    | 'reports'
    | 'supervisors'
    | 'permissions';

type User = {
    user_id: number;
    first_name: string;
    last_name: string;
    phone: string;
    account_state: string;
};

type Provider = {
    provider_id: number;
};

type Category = {
    category_id: number;
    category_name: string;
};

type Report = {
    report_id: number;
    report_type: string;
    description: string;
    report_date: string;
    reporter_id: number;
    reported_id: number;
    state: string;
};

type Supervisor = {
    supervisor_id: number;
    first_name: string;
    second_name: string;
    last_name: string;
    pass_key: string;
    phone: string;
};

type SupervisorPermission = {
    supervisor_id: number;
    permission_id: number;
};

type Permission = {
    permission_id: number;
    permission_type: string;
};

export default function AdminDashboard() {
    const [section, setSection] = useState<Section>('users');
    const {
        users,
        providers,
        categories,
        reports,
        supervisors,
        supervisorPermissions,
        permissions,
    } = usePage<{
        users: User[] | null;
        providers: Provider[];
        categories: Category[];
        reports: Report[];
        supervisors: Supervisor[];
        supervisorPermissions: SupervisorPermission[];
        permissions: Permission[];
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

    function renderPage(page: string) {
        switch (page) {
            case 'users':
                return <UsersSection users={users} providers={providers} />;

            case 'categories':
                return <CategoriesSection categories={categories} />;

            case 'reports':
                return <ReportsSection reports={reports} users={users ?? []} />;

            case 'supervisors':
                return (
                    <SupervisorsSection
                        supervisors={supervisors}
                        supervisorPermissions={supervisorPermissions}
                    />
                );

            case 'permissions':
                return (
                    <PermissionsSection
                        supervisors={supervisors}
                        supervisorPermissions={supervisorPermissions}
                        permissions={permissions}
                    />
                );

            default:
                return <UsersSection users={users} providers={providers} />;
        }
    }

    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
            <Navbar action="/admin-dashboard/logout">
                <TabButton
                    isActive={section === 'users'}
                    handleClick={() => setSection('users')}
                    label="إدارة المستخدمين"
                />
                <TabButton
                    isActive={section === 'categories'}
                    handleClick={() => setSection('categories')}
                    label="فئات الخدمات"
                />
                <TabButton
                    isActive={section === 'reports'}
                    handleClick={() => setSection('reports')}
                    label="البلاغات"
                />
                <TabButton
                    isActive={section === 'supervisors'}
                    handleClick={() => setSection('supervisors')}
                    label="المشرفون"
                />
                <TabButton
                    isActive={section === 'permissions'}
                    handleClick={() => setSection('permissions')}
                    label="إدارة الصلاحيات"
                />
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

            <main className="flex-1 p-5 sm:p-8 lg:p-10">
                <div className="mx-auto max-w-5xl">{renderPage(section)}</div>
            </main>
        </div>
    );
}
