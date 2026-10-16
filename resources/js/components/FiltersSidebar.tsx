import { usePage } from "@inertiajs/react";
import { Filter, Star } from "lucide-react";
import { useMemo } from "react";

type Category = {
    category_id: number;
    category_name: string;
}
interface FiltersSidebarProps {
  filter: number;
  setFilter: (value: number) => void;
}

export default function FiltersSidebar({ filter, setFilter }: FiltersSidebarProps) {
  const { categories } = usePage<{ categories: Category[]}>().props;

  const options = useMemo(
    () => [{ category_id: -1, category_name: 'الكل' }, ...categories],
    [categories]
  );

  return (
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-2 font-display font-bold text-lg mb-4 border-b border-border pb-2">
              <Filter /> تصفية النتائج
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">التخصص</h4>
                <div className="space-y-2">
                  {options.map((category) => {
                    const label = category.category_name;
                    const value = category.category_id;

                    return (
                      <label key={category.category_id} className="flex items-center gap-2 cursor-pointer">
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

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">التقييم</h4>
                <div className="space-y-2">
                  {[4, 3, 2].map(rating => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="rating" className="text-primary focus:ring-primary" />
                      <span className="text-sm flex items-center gap-1">
                        {rating} نجوم فأكثر
                        {Array.from({length: rating}).map((_,i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                        ))}
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