import { MapPin, Search } from "lucide-react";
import React from "react";
import SelectOptions from "./ui/SelectOptions";

interface SearchFieldProps {
    searchValue: string;
    searchPlaceholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchField({ searchValue, searchPlaceholder, handleChange }: SearchFieldProps) {
    return (
        <div className="bg-card p-2 rounded-xl flex flex-col md:flex-row gap-2 shadow-xl">
            <div className="flex-1 relative">
                <span className="absolute right-3 top-3 text-muted-foreground"><Search /></span>
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="w-full pr-10 pl-4 py-3 bg-transparent text-foreground outline-none"
                    value={searchValue}
                    onChange={handleChange}
                />
            </div>
            <div className="w-px bg-border hidden md:block"></div>
            <div className="flex-1 relative">
                <span className="absolute right-3 top-3 text-muted-foreground"><MapPin /></span>
                <select className="w-full pr-10 pl-4 py-3 bg-transparent text-foreground outline-none appearance-none cursor-pointer">
                    <option value="">كل المناطق</option>
                    <option value="riyadh">الرياض</option>
                    <option value="jeddah">جدة</option>
                    <option value="dammam">الدمام</option>
                </select>
            </div>
            {/* <SelectOptions icon={MapPin}  /> */}
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                بحث
            </button>
        </div>
    );
}