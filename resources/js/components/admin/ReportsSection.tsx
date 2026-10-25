// import { useForm, usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Card from '../ui/Card';
import Header from '../ui/Header';
import InputField from '../ui/InputField';
import SelectOptions from '../ui/SelectOptions';
import Empty from '../ui/Empty';
import { formatDate } from 'date-fns';
import Badge from '../Badge';

// FIXME: You should add column for report state whatever is new or in not
type Report = {
    report_id: number;
    report_type: string;
    description: string;
    report_date: string;
    reporter_id: number;
    reported_id: number;
    state: string;
};

type User = {
    user_id: number;
    first_name: string;
    last_name: string;
    phone: string;
    account_state: string;
};

interface ReportSectionProps {
    users: User[];
    reports: Report[];
}

export default function ReportsSection({ reports, users }: ReportSectionProps) {
    // const { reports, users } = usePage<{ reports: Report[]; users: User[] }>().props
    const { data, setData, get } = useForm({
        from: '',
        to: '',
        type: '',
    });
    // TODO: it should be in backend
    const reportTypes = [
        'احتيال',
        'سلوك غير لائق',
        'خدمة سيئة',
        'محتوى مسيء',
        'معلومات مضللة',
        'أخرى',
    ];

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        get(`/admin-dashboard/report`);
    }

    return (
        <>
            <Header
                title="معالجة البلاغات"
                desc="حدد معايير البلاغ ثم اضغط «إنشاء» لعرض البلاغات المطابقة."
            />

            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
                >
                    <InputField
                        label="من تاريخ"
                        labelClassName="block text-sm font-medium text-foreground mb-1.5"
                        inputType="date"
                        inputValue={data.from}
                        handleChange={(e) => setData('from', e.target.value)}
                        className="bg-auth-card border-auth-border focus:ring-auth-accent/50 focus:border-auth-accent w-full rounded-lg border py-3 pr-10 pl-4 text-sm transition-all focus:ring-2 focus:outline-none"
                    />

                    <InputField
                        label="إلى تاريخ"
                        labelClassName="block text-sm font-medium text-foreground mb-1.5"
                        inputType="date"
                        inputValue={data.to}
                        handleChange={(e) => setData('to', e.target.value)}
                        className="bg-auth-card border-auth-border focus:ring-auth-accent/50 focus:border-auth-accent w-full rounded-lg border py-3 pr-10 pl-4 text-sm transition-all focus:ring-2 focus:outline-none"
                    />

                    <SelectOptions
                        label="نوع البلاغ"
                        value={data.type}
                        placeholder="اختر نوع البلاغ..."
                        optionValue={reportTypes.map((type) => ({
                            value: String(type),
                            name: type,
                        }))}
                        handleChange={(e) => setData('type', e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-40"
                    >
                        إنشاء
                    </button>
                </form>
            </Card>

            <div className="mt-6 grid gap-4">
                {!reports ? (
                    <Empty
                        title="لم يتم إنشاء تقرير بعد"
                        desc="اختر الفترة الزمنية ونوع البلاغ ثم اضغط «إنشاء»."
                    />
                ) : reports.length === 0 ? (
                    <Empty
                        title="لا توجد نتائج"
                        desc="لا توجد بلاغات تطابق المعايير المحددة."
                    />
                ) : (
                    reports.map((r) => {
                        const reporter = users.find(
                            (u) => u.user_id === r.reporter_id,
                        );
                        const reported = users.find(
                            (u) => u.user_id === r.reported_id,
                        );
                        return (
                            <Card key={r.report_id}>
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-medium text-stone-400">
                                            بلاغ رقم #{r.report_id} ·{' '}
                                            {formatDate(r.report_date, 'P')}
                                        </p>
                                        <h3 className="mt-1 text-lg font-bold text-stone-900">
                                            {r.report_type}
                                        </h3>
                                    </div>
                                    {r.state === 'new' ? (
                                        <Badge color="green">جديد</Badge>
                                    ) : (
                                        <Badge color="amber">
                                            قيد المراجعة
                                        </Badge>
                                    )}
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                                    {r.description}
                                </p>
                                <dl className="mt-4 grid gap-3 rounded-xl bg-stone-50 p-4 text-sm sm:grid-cols-2">
                                    <div>
                                        <dt className="text-stone-400">
                                            مقدم البلاغ
                                        </dt>
                                        <dd className="mt-0.5 font-semibold">
                                            {reporter?.first_name}{' '}
                                            {reporter?.last_name}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-stone-400">
                                            الطرف المُبلَّغ عنه
                                        </dt>
                                        <dd className="mt-0.5 font-semibold">
                                            {reported?.first_name}{' '}
                                            {reported?.last_name}
                                        </dd>
                                    </div>
                                </dl>
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    {/* <button className={`${btn.ghost} mr-auto`} onClick={() => openUser(r.reportedId)}>
                    إدارة حساب المُبلَّغ عنه ←
                  </button> */}
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </>
    );
}
