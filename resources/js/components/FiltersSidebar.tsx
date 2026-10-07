import { Filter, Star } from "lucide-react";
import { useState } from "react";

export default function FiltersSidebar() {
  const [filterSpecialty, setFilterSpecialty] = useState('الكل');
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
                  {['الكل', 'كهربائي', 'سباك', 'فني تكييف (HVAC)'].map(spec => (
                    <label key={spec} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="specialty" 
                        checked={filterSpecialty === (spec === 'الكل' ? '' : spec)}
                        onChange={() => setFilterSpecialty(spec === 'الكل' ? '' : spec)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{spec}</span>
                    </label>
                  ))}
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
                        <Star />
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