// import { MapPin, Search } from 'lucide-react';
import { Search } from 'lucide-react';
import React from 'react';
// import SelectOptions from './ui/SelectOptions';

interface SearchFieldProps {
    searchValue: string;
    processing: boolean;
    searchPlaceholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchField({
    searchValue,
    processing,
    searchPlaceholder,
    handleChange,
}: SearchFieldProps) {
    return (
        <div className="bg-card flex flex-col gap-2 rounded-xl p-2 shadow-xl md:flex-row">
            <div className="relative flex-1">
                <span className="text-muted-foreground absolute top-3 right-3">
                    <Search />
                </span>
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="text-foreground w-full bg-transparent py-3 pr-10 pl-4 outline-none"
                    value={searchValue}
                    onChange={handleChange}
                />
            </div>
            {/* <div className="w-px bg-border hidden md:block"></div>
            <div className="flex-1 relative">
                <span className="absolute right-3 top-3 text-muted-foreground"><MapPin /></span>
                <select className="w-full pr-10 pl-4 py-3 bg-transparent text-foreground outline-none appearance-none cursor-pointer">
                    <option value="">كل المناطق</option>
                    <option value="riyadh">الرياض</option>
                    <option value="jeddah">جدة</option>
                    <option value="dammam">الدمام</option>
                </select>
            </div> */}
            {/* <SelectOptions icon={MapPin}  /> */}
            <button
                type="submit"
                disabled={processing}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 font-bold transition-colors"
            >
                بحث
            </button>
        </div>
    );
}
