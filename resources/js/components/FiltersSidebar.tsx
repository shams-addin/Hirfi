import { usePage } from '@inertiajs/react';
import { Filter, Star } from 'lucide-react';
import { useMemo } from 'react';

type Category = {
    category_id: number;
    category_name: string;
};
interface FiltersSidebarProps {
    filter: number;
    setFilter: (value: number) => void;
}

export default function FiltersSidebar({
    filter,
    setFilter,
}: FiltersSidebarProps) {
    const { categories } = usePage<{ categories: Category[] }>().props;

    const options = useMemo(
        () => [{ category_id: -1, category_name: 'الكل' }, ...categories],
        [categories],
    );

    return (
        <aside className="w-full shrink-0 space-y-6 lg:w-64">
            <div className="bg-card border-border rounded-xl border p-5 shadow-sm">
                <div className="font-display border-border mb-4 flex items-center gap-2 border-b pb-2 text-lg font-bold">
                    <Filter /> تصفية النتائج
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-muted-foreground mb-2 text-sm font-semibold">
                            التخصص
                        </h4>
                        <div className="space-y-2">
                            {options.map((category) => {
                                const label = category.category_name;
                                const value = category.category_id;

                                return (
                                    <label
                                        key={category.category_id}
                                        className="flex cursor-pointer items-center gap-2"
                                    >
                                        <input
                                            type="radio"
                                            name="specialty"
                                            checked={filter === value}
                                            onChange={() => setFilter(value)}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm">{label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="border-border border-t pt-4">
                        <h4 className="text-muted-foreground mb-2 text-sm font-semibold">
                            التقييم
                        </h4>
                        <div className="space-y-2">
                            {[4, 3, 2].map((rating) => (
                                <label
                                    key={rating}
                                    className="flex cursor-pointer items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="flex items-center gap-1 text-sm">
                                        {rating} نجوم فأكثر
                                        {Array.from({ length: rating }).map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                                />
                                            ),
                                        )}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
