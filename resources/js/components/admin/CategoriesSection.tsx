import { useForm } from '@inertiajs/react';
import Badge from '../Badge';
import Card from '../ui/Card';
import Header from '../ui/Header';
import React, { useState } from 'react';
import InputField from '../ui/InputField';
import ConfirmPanel from '../ConfirmPanel';

type Category = {
    category_id: number;
    category_name: string;
};

interface CategoriesSectionProps {
    categories: Category[];
}

export default function CategoriesSection({
    categories,
}: CategoriesSectionProps) {
    const [displayMessage, setDisplayMessage] = useState(false);
    const [name, setName] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const {
        data: categoryData,
        setData: setCategory,
        cancel: cancelCategory,
        post: postCategory,
        errors: categoryErrors,
        processing: processingCategory,
    } = useForm({
        categoryName: '',
    });

    const {
        data: editCategory,
        setData: setEdit,
        cancel: cancelEdit,
        put: putEdit,
        errors: errorEdit,
        processing: processingEdit,
        reset,
    } = useForm({
        categoryName: '',
    });

    const {
        cancel: cancelDelete,
        delete: sendDelete,
        errors: errorDelete,
        processing: processingDelete,
    } = useForm();

    function handleStore(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        postCategory('/admin-dashboard/category/store', {
            onSuccess: () => reset(),
        });
    }

    function handleEdit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        putEdit(`/admin-dashboard/category/${editId}/edit`, {
            onSuccess: () => reset(),
        });
    }

    function handleDelete(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        sendDelete(`/admin-dashboard/category/${editId}/delete`);
        setDisplayMessage(false);
    }

    return (
        <>
            <Header
                title="إدارة فئات الخدمات"
                desc="أضف فئات الخدمات المتاحة للطلب أو عدّل أسماءها أو احذفها."
            />
            <Card>
                <form
                    onSubmit={handleStore}
                    className="flex flex-col gap-3 sm:flex-row sm:items-start"
                >
                    <div className="flex-1">
                        <InputField
                            className={`w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none ${categoryErrors && 'border-rose-400'} transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10`}
                            inputPlaceholder="اسم الفئة الجديدة، مثال: النجارة"
                            inputValue={categoryData.categoryName}
                            handleChange={(e) =>
                                setCategory({
                                    ...categoryData,
                                    categoryName: e.target.value,
                                })
                            }
                            error={categoryErrors.categoryName}
                            inputType="text"
                        />
                    </div>
                    <button
                        disabled={processingCategory}
                        type="submit"
                        className="bg-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-40"
                    >
                        حفظ
                    </button>
                </form>
            </Card>

            <Card className="mt-6 !p-0">
                <div className="border-b border-stone-100 px-6 py-4 text-sm font-semibold text-stone-500">
                    الفئات الحالية ({categories.length})
                </div>
                <ul className="divide-y divide-stone-100">
                    {categories.map((c) => (
                        <li
                            key={c.category_id}
                            className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                        >
                            {editId === c.category_id ? (
                                <form
                                    onSubmit={handleEdit}
                                    className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-start"
                                >
                                    <div className="flex-1">
                                        <InputField
                                            className={`w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none ${errorEdit && 'border-rose-400'} transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10`}
                                            inputValue={c.category_name}
                                            handleChange={(e) =>
                                                setEdit({
                                                    ...editCategory,
                                                    categoryName:
                                                        e.target.value,
                                                })
                                            }
                                            error={errorEdit.categoryName}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processingEdit}
                                        className="bg-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-40"
                                    >
                                        حفظ
                                    </button>
                                    <button
                                        type="button"
                                        disabled={processingEdit}
                                        className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                                        onClick={() => {
                                            setEditId(null);
                                            cancelEdit();
                                        }}
                                    >
                                        إلغاء
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-stone-800">
                                            {c.category_name}
                                        </span>
                                        {c.category_name === 'أخرى' && (
                                            <Badge color="amber">
                                                افتراضية — غير قابلة للتعديل
                                            </Badge>
                                        )}
                                    </div>
                                    {c.category_name !== 'أخرى' && (
                                        <div className="flex gap-2">
                                            <button
                                                className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                                                onClick={() => {
                                                    setEditId(c.category_id);
                                                }}
                                            >
                                                تعديل
                                            </button>
                                            <button
                                                className="text-destructive-foreground hover:bg-destructive-foreground rounded-xl px-4 py-2 text-sm font-medium transition hover:text-white"
                                                onClick={() => {
                                                    setDisplayMessage(true);
                                                    setEditId(c.category_id);
                                                    setName(c.category_name);
                                                }}
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </Card>

            {displayMessage && (
                <form onSubmit={handleDelete}>
                    <ConfirmPanel
                        title="حذف الفئة"
                        messageOne={`سيتم حذف فئة "${name}" نهائيًا. هل تريد المتابعة؟`}
                        pendingType={true}
                        displayPanel={setDisplayMessage}
                        processing={processingDelete}
                        cancel={cancelDelete}
                    />
                </form>
            )}
        </>
    );
}
