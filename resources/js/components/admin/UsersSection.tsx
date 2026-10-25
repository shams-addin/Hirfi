// import { useForm, usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Card from '../ui/Card';
import Header from '../ui/Header';
import React, { useState } from 'react';
import SearchField from '../SearchField';
import Empty from '../ui/Empty';
import Badge from '../Badge';
// import ConfirmPanel from '../ConfirmPanel';

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

interface UsersSectionProps {
    users: User[] | null;
    providers: Provider[];
}

export default function UsersSection({ providers, users }: UsersSectionProps) {
    // const [userToConfirm, setUserToConfirm] = useState<User | null>(null);
    // const { users } = usePage<{users: User[]; provider: Provider}>().props;
    const { data, setData, processing, get } = useForm({ search: '' });
    const [editId, setEditId] = useState<number | null>(null);
    const {
        // data: dataEdit,
        setData: setEdit,
        // errors: errorsEdit,
        put,
        // processing: processingEidt,
        // cancel: cancelEdit,
    } = useForm({
        status: '',
    });

    function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        get(`/admin-dashboard/search`);
    }

    function handleToggle(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        put(`/admin-dashboard/users/${editId}/status`);
    }

    return (
        <>
            <Header
                title="إدارة المستخدمين"
                desc="ابحث عن مستخدم بالاسم أو رقم الجوال لعرض حالة حسابه وتعديلها."
            />
            <Card>
                <form onSubmit={handleSearch}>
                    <SearchField
                        searchPlaceholder="الاسم أو رقم الجوال"
                        searchValue={data.search}
                        processing={processing}
                        handleChange={(e) =>
                            setData({ ...data, search: e.target.value })
                        }
                    />
                    {/* <input className={inputCls} placeholder="" value={search} onChange={} />
          <button className={btn.primary} disabled={!search.trim()}>
            بحث
          </button> */}
                </form>
            </Card>

            <div className="mt-6">
                {users == null ? (
                    <Empty
                        title="ابدأ بالبحث"
                        desc="أدخل اسم المستخدم أو رقم جواله لعرض بياناته."
                    />
                ) : users.length === 0 ? (
                    <Empty
                        title="المستخدم غير موجود"
                        desc={`لا يوجد مستخدم يطابق "${data.search}". تحقق من الاسم أو رقم الجوال.`}
                    />
                ) : (
                    <div className="grid gap-3">
                        {users.map((u) => (
                            <form onSubmit={handleToggle}>
                                <Card
                                    key={u.user_id}
                                    className="flex flex-wrap items-center justify-between gap-4 p-5!"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="grid size-12 place-items-center rounded-full bg-blue-50 text-lg font-bold text-blue-800">
                                            {u.first_name[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-stone-900">
                                                {u.first_name} {u.last_name}
                                            </p>
                                            <p
                                                className="mt-0.5 text-sm text-stone-500"
                                                dir="ltr"
                                            >
                                                {u.phone}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* <Badge color="gray" text={u.role} /> */}
                                        {u.account_state === 'activated' ? (
                                            <Badge color="green">نشط</Badge>
                                        ) : (
                                            <Badge color="red">'موقوف'</Badge>
                                        )}
                                        <button
                                            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${u.account_state === 'activated' ? 'bg-destructive-foreground hover:bg-rose-700' : 'bg-primary hover:bg-blue-800'}`}
                                            onClick={() => {
                                                setEdit(
                                                    'status',
                                                    u.account_state ===
                                                        'activated'
                                                        ? 'suspended'
                                                        : 'activated',
                                                );
                                                setEditId(u.user_id);
                                            }}
                                        >
                                            {u.account_state === 'activated'
                                                ? 'إيقاف الحساب'
                                                : 'تفعيل الحساب'}
                                        </button>
                                    </div>
                                </Card>
                            </form>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
