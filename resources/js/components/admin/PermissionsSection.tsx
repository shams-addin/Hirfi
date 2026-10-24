import { useState } from 'react';
import Card from '../ui/Card';
import Header from '../ui/Header';
import Empty from '../ui/Empty';
import { useForm } from '@inertiajs/react';

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

interface PermissionsSectionProps {
    supervisors: Supervisor[];
    supervisorPermissions: SupervisorPermission[];
    permissions: Permission[];
}

export default function PermissionsSection({
    supervisors,
    supervisorPermissions,
    permissions,
}: PermissionsSectionProps) {
    const [selectId, setSelectId] = useState(1);
    const { data, setData, put } = useForm({});
    const current = supervisors.find((s) => s.supervisor_id === selectId);
    const currentPermission = supervisorPermissions.filter(
        (sp) => sp.supervisor_id === selectId,
    );
    return (
        <>
            <Header
                title="الصلاحيات"
                desc="اختر مشرفًا لعرض صلاحياته الحالية وتحديد مهامه الإدارية."
            />
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <Card className="!p-2">
                    {supervisors.map((s) => (
                        <button
                            key={s.supervisor_id}
                            onClick={() => setSelectId(s.supervisor_id)}
                            className={`w-full rounded-xl px-4 py-3 text-right transition ${selectId === s.supervisor_id ? 'bg-blue-50 ring-1 ring-blue-600/30' : 'hover:bg-stone-50'}`}
                        >
                            <p className="font-semibold text-stone-900">
                                {s.first_name} {s.second_name} {s.last_name}
                            </p>
                            <p className="mt-1 flex flex-wrap gap-1">
                                {supervisorPermissions
                                    .filter(
                                        (supervisorPermission) =>
                                            supervisorPermission.supervisor_id ===
                                            s.supervisor_id,
                                    )
                                    .map((supervisorPermission) => {
                                        const permission = permissions.find(
                                            (item) =>
                                                item.permission_id ===
                                                supervisorPermission.permission_id,
                                        );

                                        return permission ? (
                                            <span
                                                key={
                                                    supervisorPermission.permission_id
                                                }
                                                className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-600"
                                            >
                                                {permission.permission_type}
                                            </span>
                                        ) : null;
                                    })}
                                {!supervisorPermissions.some(
                                    (supervisorPermission) =>
                                        supervisorPermission.supervisor_id ===
                                        s.supervisor_id,
                                ) && (
                                    <span className="text-xs text-stone-400">
                                        بدون صلاحيات
                                    </span>
                                )}
                            </p>
                        </button>
                    ))}
                </Card>

                {/* {current && (
          <Card>
            <h2 className="text-lg font-bold">{current.first_name} {current.second_name} {current.last_name}</h2>
            <p className="mt-1 text-sm text-stone-500">حدد الصلاحيات الإدارية الممنوحة لهذا المشرف.</p>
            <div className="mt-5 grid gap-3">
              {permissions.map((k) => (
                <label key={k.permission_id} className={`flex cursor-pointer items-center justify-between rounded-xl border px-5 py-4 transition ${draft[k] ? 'border-teal-600/40 bg-teal-50/50' : 'border-stone-200'}`}>
                  <span className="font-medium">{k.permission_type}</span>
                    {currentPermission.map((p) => (
                  <span className="relative inline-flex">
                    <input type="checkbox" className="peer sr-only" checked={p.permission_id === k.permission_id} onChange={(e) => setDraft({ ...draft, [k]: e.target.checked })} />
                    <span className="h-6 w-11 rounded-full bg-stone-300 transition peer-checked:bg-teal-700" />
                    <span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white shadow transition peer-checked:-translate-x-5" />
                  </span>
                    ))}
                </label>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                className={btn.primary}
                disabled={!dirty}
                onClick={() => {
                  setSupervisors((all) => all.map((s) => (s.id === current.id ? { ...s, perms: { ...draft } } : s)))
                  notify('تم حفظ الصلاحيات بنجاح')
                }}
              >
                حفظ
              </button>
              {dirty && <button className={btn.ghost} onClick={() => setDraft({ ...current.perms })}>تراجع</button>}
            </div>
          </Card>
        ) : (
          <Empty title="لا يوجد مشرف محدد" desc="اختر مشرفًا من القائمة." />
        )} */}
            </div>
        </>
    );
}
