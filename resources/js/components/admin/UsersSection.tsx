import { search as searchUsers, update as updateUser } from "@/actions/App/Http/Controllers/Admin/AdminController";
import { useForm } from "@inertiajs/react";
import React from "react";
import Badge from "../Badge";
import SearchField from "../SearchField";
import Card from "../ui/Card";
import Empty from "../ui/Empty";
import Header from "../ui/Header";

type AccountState = "activated" | "suspended";

export type User = {
  user_id: number;
  user_name: string;
  phone: string;
  account_state: string;
};

interface UsersSectionProps {
  users: User[] | null;
}

export default function UsersSection({ users }: UsersSectionProps) {
  const { data, setData, processing, get } = useForm({ search: "" });
  const stateForm = useForm<{ status: AccountState }>({
    status: "activated",
  });

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    get(searchUsers.url(), {
      preserveScroll: true,
      preserveState: true,
    });
  }

  function handleToggle(user: User) {
    const nextStatus: AccountState = user.account_state === "activated" ? "suspended" : "activated";

    stateForm.transform(() => ({ status: nextStatus }));
    stateForm.put(updateUser.url(user.user_id), {
      preserveScroll: true,
    });
  }

  return (
    <>
      <Header title="إدارة المستخدمين" desc="ابحث عن مستخدم بالاسم أو رقم الجوال لعرض حالة حسابه وتعديلها." />
      <Card>
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={handleSearch}
        >
          <SearchField
            searchPlaceholder="الاسم أو رقم الجوال"
            searchValue={data.search}
            processing={processing}
            handleChange={e => setData("search", e.target.value)}
          />
        </form>
      </Card>

      <div className="mt-6">
        {users === null ? (
          <Empty title="ابدأ بالبحث" desc="أدخل اسم المستخدم أو رقم جواله لعرض بياناته." />
        ) : users.length === 0 ? (
          <Empty title="المستخدم غير موجود" desc={`لا يوجد مستخدم يطابق "${data.search}". تحقق من الاسم أو رقم الجوال.`} />
        ) : (
          <div className="grid gap-3">
            {users.map((u) => (
              <Card key={u.user_id} className="flex flex-wrap items-center justify-between gap-4 p-5!">
                <div className="flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full bg-teal-50 text-lg font-bold text-teal-800">{u.user_name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-stone-900">{u.user_name}</p>
                    <p className="mt-0.5 text-sm text-stone-500" dir="ltr">
                      {u.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {u.account_state === "activated" ? <Badge color="green">نشط</Badge> : <Badge color="red">موقوف</Badge>}
                  <button
                    type="button"
                    disabled={stateForm.processing}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50 ${u.account_state === "activated" ? "bg-destructive hover:bg-rose-700" : "bg-primary hover:bg-teal-800"}`}
                    onClick={() => handleToggle(u)}
                  >
                    {u.account_state === "activated" ? "إيقاف الحساب" : "تفعيل الحساب"}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}