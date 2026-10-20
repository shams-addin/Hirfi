
export default function TableHeader() {
    return (
        <tr>
            <th className="px-6 py-4 font-semibold">رقم الطلب</th>
            <th className="px-6 py-4 font-semibold">الخدمة المطلوبة</th>
            <th className="px-6 py-4 font-semibold">العميل / الموقع</th>
            <th className="px-6 py-4 font-semibold">التاريخ</th>
            <th className="px-6 py-4 font-semibold">الحالة</th>
            <th className="px-6 py-4 font-semibold text-center">الإجراءات</th>
        </tr>
    );
}