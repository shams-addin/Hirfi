import React, { useState } from 'react';
import Card from '../ui/Card';
import Header from '../ui/Header';
import InputField from '../ui/InputField';
import { useForm } from '@inertiajs/react';
import PasswordField from '../ui/PasswordField';
import Badge from '../Badge';

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

interface SupervisorSectionProps {
    supervisors: Supervisor[];
    supervisorPermissions: SupervisorPermission[];
}

export default function SupervisorsSection({
    supervisors,
    supervisorPermissions,
}: SupervisorSectionProps) {
    const [mode, setMode] = useState<'add' | 'edit' | null>(null);
    const [editId, setEditId] = useState<number | null>(null);
    const {
        data: dataAdd,
        setData: setAdd,
        errors: errorsAdd,
        post,
        processing: processingAdd,
        cancel: cancelAdd,
        reset: resetAdd,
    } = useForm({
        firstName: '',
        secondName: '',
        lastName: '',
        password: '',
        password_confirmation: '',
        phone: '',
    });

    const {
        data: dataEdit,
        setData: setEdit,
        errors: errorsEdit,
        put,
        processing: processingEidt,
        cancel: cancelEdit,
    } = useForm({
        firstName: '',
        secondName: '',
        lastName: '',
        password: '',
        password_confirmation: '',
        phone: '',
    });

    function handleAdd(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/admin-dashboard/supervisor/add', {
            onSuccess: () => resetAdd(),
        });

        setMode(null);
    }

    function handleEdit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        put(`/admin-dashboard/supervisor/${editId}/edit`);
        setMode(null);
    }
    return (
        <>
            <Header
                title="المشرفون"
                desc="سجّل مشرفين جددًا وعدّل بياناتهم. تُنشأ الحسابات الجديدة بدون صلاحيات إدارية."
                action={
                    !mode && (
                        <button
                            className="bg-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-40"
                            onClick={() => setMode('add')}
                        >
                            + إضافة مشرف
                        </button>
                    )
                }
            />

            {mode && (
                <Card className="mb-6">
                    <h2 className="mb-5 text-lg font-bold">
                        {mode === 'add'
                            ? 'تسجيل مشرف جديد'
                            : 'تعديل بيانات المشرف'}
                    </h2>
                    <form onSubmit={mode === 'add' ? handleAdd : handleEdit}>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <InputField
                                label="الاسم الأول"
                                labelClassName="block text-sm font-medium text-foreground mb-1.5"
                                inputType="text"
                                inputName="firstName"
                                inputValue={
                                    mode === 'add'
                                        ? dataAdd.firstName
                                        : dataEdit.firstName
                                }
                                handleChange={(e) => {
                                    mode === 'add'
                                        ? setAdd('firstName', e.target.value)
                                        : setEdit('firstName', e.target.value);
                                }}
                                inputPlaceholder="محمد"
                                className="bg-auth-card border-auth-border focus:ring-auth-accent/50 focus:border-auth-accent w-full rounded-lg border py-3 pr-10 pl-4 text-sm transition-all focus:ring-2 focus:outline-none"
                                error={
                                    mode === 'add'
                                        ? errorsAdd.firstName
                                        : errorsEdit.firstName
                                }
                            />

                            <InputField
                                label="الاسم الثاني"
                                labelClassName="block text-sm font-medium text-foreground mb-1.5"
                                inputType="text"
                                inputName="secondName"
                                inputValue={
                                    mode === 'add'
                                        ? dataAdd.secondName
                                        : dataEdit.secondName
                                }
                                handleChange={(e) =>
                                    mode === 'add'
                                        ? setAdd('secondName', e.target.value)
                                        : setEdit('secondName', e.target.value)
                                }
                                inputPlaceholder="أحمد"
                                className="bg-auth-card border-auth-border focus:ring-auth-accent/50 focus:border-auth-accent w-full rounded-lg border py-3 pr-10 pl-4 text-sm transition-all focus:ring-2 focus:outline-none"
                                error={
                                    mode === 'add'
                                        ? errorsAdd.secondName
                                        : errorsEdit.secondName
                                }
                            />

                            <InputField
                                label="الاسم الأخير"
                                labelClassName="block text-sm font-medium text-foreground mb-1.5"
                                inputType="text"
                                inputName="secondName"
                                inputValue={
                                    mode === 'add'
                                        ? dataAdd.lastName
                                        : dataEdit.lastName
                                }
                                handleChange={(e) =>
                                    mode === 'add'
                                        ? setAdd('lastName', e.target.value)
                                        : setEdit('lastName', e.target.value)
                                }
                                inputPlaceholder="الأوجلي"
                                className="bg-auth-card border-auth-border focus:ring-auth-accent/50 focus:border-auth-accent w-full rounded-lg border py-3 pr-10 pl-4 text-sm transition-all focus:ring-2 focus:outline-none"
                                error={
                                    mode === 'add'
                                        ? errorsAdd.lastName
                                        : dataEdit.lastName
                                }
                            />

                            <InputField
                                label="رقم الهاتف"
                                labelClassName="block text-sm font-medium text-foreground mb-1.5"
                                inputType="tel"
                                inputName="phone"
                                inputValue={
                                    mode === 'add'
                                        ? dataAdd.phone
                                        : dataEdit.phone
                                }
                                handleChange={(e) =>
                                    mode === 'add'
                                        ? setAdd('phone', e.target.value)
                                        : setEdit('phone', e.target.value)
                                }
                                inputPlaceholder="09X XXX XXXX"
                                className="bg-auth-card border-auth-border focus:ring-auth-accent/50 focus:border-auth-accent w-full rounded-lg border py-3 pr-10 pl-4 text-sm transition-all focus:ring-2 focus:outline-none"
                                error={
                                    mode === 'add'
                                        ? errorsAdd.phone
                                        : errorsEdit.phone
                                }
                            />

                            <PasswordField
                                label={
                                    mode === 'add'
                                        ? 'كلمة المرور'
                                        : 'كلمة مرور جديدة (اختياري)'
                                }
                                inputName="password"
                                inputValue={
                                    mode === 'add'
                                        ? dataAdd.password
                                        : dataEdit.password
                                }
                                handleChange={(e) =>
                                    mode === 'add'
                                        ? setAdd('password', e.target.value)
                                        : setEdit('password', e.target.value)
                                }
                                inputPlaceholder="••••••••"
                                error={
                                    mode === 'add'
                                        ? errorsAdd.password
                                        : errorsEdit.password
                                }
                            />

                            <PasswordField
                                label="تأكيد كلمة المرور"
                                inputName="password_confirmation"
                                inputValue={
                                    mode === 'add'
                                        ? dataAdd.password_confirmation
                                        : dataEdit.password_confirmation
                                }
                                handleChange={(e) =>
                                    mode === 'add'
                                        ? setAdd(
                                              'password_confirmation',
                                              e.target.value,
                                          )
                                        : setEdit(
                                              'password_confirmation',
                                              e.target.value,
                                          )
                                }
                                inputPlaceholder="••••••••"
                                error={
                                    mode === 'add'
                                        ? errorsAdd.password_confirmation
                                        : errorsEdit.password_confirmation
                                }
                            />
                        </div>
                        {mode === 'add' && (
                            <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                سيُنشأ الحساب بدون أي صلاحيات إدارية حتى يمنحها
                                مدير النظام من قسم الصلاحيات.
                            </p>
                        )}
                        <div className="mt-5 flex gap-3">
                            <button
                                type="submit"
                                disabled={
                                    mode === 'add'
                                        ? processingAdd
                                        : processingEidt
                                }
                                className="bg-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-40"
                            >
                                حفظ
                            </button>
                            <button
                                type="button"
                                className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                                onClick={() => {
                                    mode === 'add' ? cancelAdd() : cancelEdit();
                                    setMode(null);
                                }}
                            >
                                إلغاء
                            </button>
                        </div>
                    </form>
                </Card>
            )}

            <Card className="overflow-x-auto !p-0">
                <table className="w-full min-w-[560px] text-sm">
                    <thead className="bg-stone-50 text-right text-stone-500">
                        <tr>
                            <th className="px-6 py-3 font-semibold">
                                الاسم الكامل
                            </th>
                            <th className="px-6 py-3 font-semibold">
                                رقم الجوال
                            </th>
                            <th className="px-6 py-3 font-semibold">
                                الصلاحيات
                            </th>
                            <th className="px-6 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {supervisors.map((s) => {
                            const count = supervisorPermissions.filter(
                                (sp) => sp.supervisor_id === s.supervisor_id,
                            ).length;
                            return (
                                <tr key={s.supervisor_id}>
                                    <td className="px-6 py-4 font-medium text-stone-900">
                                        {s.first_name} {s.second_name}{' '}
                                        {s.last_name}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-stone-600"
                                        dir="ltr"
                                        style={{ textAlign: 'right' }}
                                    >
                                        {s.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {count ? (
                                            <Badge color="green">
                                                {count} صلاحيات
                                            </Badge>
                                        ) : (
                                            <Badge color="gray">
                                                بدون صلاحيات
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-left">
                                        <button
                                            className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                                            onClick={() => {
                                                setEditId(s.supervisor_id);
                                                setMode('edit');
                                            }}
                                        >
                                            تعديل
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </>
    );
}
