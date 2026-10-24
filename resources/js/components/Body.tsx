import { useForm } from '@inertiajs/react';
import { CheckIcon, XIcon } from 'lucide-react';

type Request = {
    id: number;
    description: string;
    photo?: string;
    address: string;
    date: string;
    state: string;
    customerId: number;
};

type User = {
    id: number;
    name: string;
    phone: string;
    profilePicture?: string;
};

interface BodyProps {
    requests: Request[];
    customers: User[];
}

export default function Body({ requests, customers }: BodyProps) {
    const { setData, put, processing } = useForm({ state: 'pending' });
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-800">
                        قيد الانتظار
                    </span>
                );
            case 'accepted':
                return (
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">
                        مقبول / جاري العمل
                    </span>
                );
            case 'completed':
                return (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-800">
                        مكتمل
                    </span>
                );
            case 'rejected':
                return (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
                        مرفوض
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <tbody className="divide-border divide-y">
            {requests.map((request) => (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        put(`/request-management/${request.id}`);
                    }}
                >
                    <tr
                        key={request.id}
                        className="hover:bg-muted/20 transition-colors"
                    >
                        <td className="px-6 py-4 font-mono font-medium">
                            {request.id}
                        </td>
                        {/* <td className="px-6 py-4 font-bold">{order.service}</td> */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-1 font-semibold">
                                {customers.find(
                                    (customer) =>
                                        customer.id === request.customerId,
                                )?.name ?? 'عميل غير معروف'}
                                {/* <ReportButton label="" onClick={() => onReport({ type: 'account', id: order.customerId, label: order.customerName, ownerId: order.customerId })} /> */}
                            </div>
                            <div className="text-muted-foreground text-xs">
                                {request.address}
                            </div>
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                            {request.date}
                        </td>
                        <td className="px-6 py-4">
                            {getStatusBadge(request.state)}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                                {/* <button onClick={() => setSelectedId(order.id)} className="px-3 py-1.5 bg-card border border-border text-xs font-bold rounded hover:bg-muted transition-colors">
                                عرض الطلب
                            </button> */}
                                {/* <ReportButton onClick={() => onReport({ type: 'order', id: order.id, label: `الطلب ${order.id}`, ownerId: '' })} /> */}
                                {request.state === 'pending' && (
                                    <>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            onClick={() =>
                                                setData('state', 'accepted')
                                            }
                                            className="bg-success/10 text-success hover:bg-success hover:text-success-foreground rounded p-2 transition-colors"
                                            title="قبول الطلب"
                                        >
                                            <CheckIcon />
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            onClick={() =>
                                                setData('state', 'rejected')
                                            }
                                            className="bg-destructive-foreground/10 text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground rounded p-2 transition-colors"
                                            title="رفض الطلب"
                                        >
                                            <XIcon />
                                        </button>
                                    </>
                                )}
                                {request.state === 'accepted' && (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        onClick={() =>
                                            setData('state', 'completed')
                                        }
                                        className="bg-success text-success-foreground hover:bg-success/90 rounded px-3 py-1.5 text-xs font-bold transition-colors"
                                    >
                                        إنهاء العمل
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>
                </form>
            ))}
        </tbody>
    );
}
