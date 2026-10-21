import CategoriesSection from "@/components/admin/CategoriesSection";
import PermissionsSection from "@/components/admin/PermissionsSection";
import ReportsSection from "@/components/admin/ReportsSection";
import SupervisorsSection from "@/components/admin/SupervisorsSection";
import UsersSection, { type User } from "@/components/admin/UsersSection";
import Navbar from "@/components/Navbar";
import TabButton from "@/components/ui/TabButton";
import { usePage } from "@inertiajs/react";
import { Wrench } from "lucide-react";
import { useState } from "react";

type Section = 'users' | 'categories' | 'reports' | 'supervisors' | 'permissions';


type Category = {
    category_id: number;
    category_name: string;
}

type Report = {
    report_id: number;
    report_type: string;
    description: string;
    report_date: string;
    reporter_id: number;
    reported_id: number;
    state: string;
}

type Supervisor = {
    supervisor_id: number;
    first_name: string;
    second_name: string;
    last_name: string;
    pass_key: string;
    phone: string;
}

type SupervisorPermission = {
    supervisor_id: number;
    permission_id: number;
}

type Permission = {
    permission_id: number;
    permission_type: string;
}

export default function AdminDashboard() {
    const [section, setSection] = useState<Section>('users');
    const { users, categories, reports, supervisors, supervisorPermissions, permissions } = usePage
        <{
            users: User[] | null;
            categories: Category[];
            reports: Report[];
            supervisors: Supervisor[];
            supervisorPermissions: SupervisorPermission[];
            permissions: Permission[];
        }>().props;

        function renderPage(page: string) {
                switch (page) {
                    case 'users':
                        return <UsersSection users={users} />;
        
                    case 'categories':
                        return <CategoriesSection categories={categories} />;
        
                    case 'reports':
                        return  <ReportsSection reports={reports} users={users ?? []} />;
        
                    case 'supervisors':
                        return  <SupervisorsSection supervisors={supervisors} supervisorPermissions={supervisorPermissions} />;
        
                    case 'permissions':
                        return  <PermissionsSection supervisors={supervisors} supervisorPermissions={supervisorPermissions} permissions={permissions}/>;

                    // default:
                    //     return <UsersSection users={users} />
                }
            }
        
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            {/* <aside className="bg-teal-950 text-teal-50 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0">
                <div className="flex items-center gap-3 px-6 py-6">
                    <Wrench className="grid size-10 place-items-center rounded-xl bg-primary text-lg font-bold text-teal-950" />
                    <div>
                        <p className="font-bold">منصة حرفي</p>
                        <p className="text-xs text-teal-300">لوحة تحكم مدير النظام</p>
                    </div>
                </div> */}
                <Navbar>
                    <TabButton isActive={section === 'users'} handleClick={() => setSection('users')} label="إدارة المستخدمين" />
                    <TabButton isActive={section === 'categories'} handleClick={() => setSection('categories')} label="فئات الخدمات" />
                    <TabButton isActive={section === 'reports'} handleClick={() => setSection('reports')} label="البلاغات" />
                    <TabButton isActive={section === 'supervisors'} handleClick={() => setSection('supervisors')} label="المشرفون" />
                    <TabButton isActive={section === 'permissions'} handleClick={() => setSection('permissions')} label="إدارة الصلاحيات" />
                </Navbar>
                {/* <div className="mx-6 mt-auto hidden border-t border-teal-900 pt-4 text-xs text-teal-400 lg:block">مسجل الدخول: مدير النظام</div>
            </aside> */}
            <main className="flex-1 p-5 sm:p-8 lg:p-10">
                <div className="mx-auto max-w-5xl">
                    {renderPage(section)}
                </div>
            </main>
        </div>
    );
}