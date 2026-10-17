import { useForm } from "@inertiajs/react";
import { CheckIcon, XIcon } from "lucide-react";

type Request = {
    id: number;
    description: string;
    photo?: string;
    address: string;
    date: string;
    state: string;
    customerId: number;
}

type User = {
    id: number;
    name: string;
    phone: string;
    profilePicture?: string;
}

interface BodyProps {
    requests: Request[];
    customers: User[];
}

export default function Body({ requests, customers }: BodyProps) {
    const { setData, put, processing } = useForm({ state: "pending" });
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">قيد الانتظار</span>;
            case 'accepted': return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">مقبول / جاري العمل</span>;
            case 'completed': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">مكتمل</span>;
            case 'rejected': return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">مرفوض</span>;
            default: return null;
        }
    };

    return (
        <tbody className="divide-y divide-border">
            {requests.map(request => (
                <form onSubmit={(e) => { e.preventDefault; put(`/request-management/${request.id}`) }}>
                    <tr key={request.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium">{request.id}</td>
                        {/* <td className="px-6 py-4 font-bold">{order.service}</td> */}
                        <td className="px-6 py-4">
                            <div className="font-semibold flex items-center gap-1">
                                {customers.find(customer => customer.id === request.customerId)?.name ?? "عميل غير معروف"}
                                {/* <ReportButton label="" onClick={() => onReport({ type: 'account', id: order.customerId, label: order.customerName, ownerId: order.customerId })} /> */}
                            </div>
                            <div className="text-xs text-muted-foreground">{request.address}</div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{request.date}</td>
                        <td className="px-6 py-4">{getStatusBadge(request.state)}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                                {/* <button onClick={() => setSelectedId(order.id)} className="px-3 py-1.5 bg-card border border-border text-xs font-bold rounded hover:bg-muted transition-colors">
                                عرض الطلب
                            </button> */}
                                {/* <ReportButton onClick={() => onReport({ type: 'order', id: order.id, label: `الطلب ${order.id}`, ownerId: '' })} /> */}
                                {request.state === 'pending' && (
                                    <>
                                        <button
                                            disabled={processing}
                                            onClick={() => setData('state', 'accepted')}
                                            className="p-2 bg-success/10 text-success hover:bg-success hover:text-success-foreground rounded transition-colors"
                                            title="قبول الطلب"
                                        >
                                            <CheckIcon />
                                        </button>
                                        <button
                                            disabled={processing}
                                            onClick={() => setData('state', 'rejected')}
                                            className="p-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                                            title="رفض الطلب"
                                        >
                                            <XIcon />
                                        </button>
                                    </>
                                )}
                                {request.state === 'accepted' && (
                                    <button
                                        disabled={processing}
                                        onClick={() => setData('state', 'completed')}
                                        className="px-3 py-1.5 bg-success text-success-foreground text-xs font-bold rounded hover:bg-success/90 transition-colors"
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