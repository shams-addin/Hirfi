import { useState } from "react";
import FiltersSidebar from "./FiltersSidebar";
import ProvidersList from "./ProvidersList";

interface MainGridProps {
    searchResult: string;
}

export default function MainGrid({ searchResult }: MainGridProps) {
    const [filterSpecialty, setFilterSpecialty] = useState(-1);
    function handleClick(params:number) {
        setFilterSpecialty(params);
    }
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <FiltersSidebar filter={filterSpecialty} setFilter={handleClick}/>
            <ProvidersList searcheResult={searchResult} filterResult={filterSpecialty}/>
        </div>
    );
}