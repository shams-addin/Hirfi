import FiltersSidebar from "./FiltersSidebar";
import ProvidersList from "./ProvidersList";

export default function MainGrid() {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <FiltersSidebar />
            <ProvidersList />
        </div>
    );
}