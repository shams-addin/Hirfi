import FiltersSidebar from "./FiltersSidebar";
import ProvidersList from "./ProvidersList";

type Category = {
    category_id: number;
    category_name: string;
}

export default function MainGrid({ categories }: { categories: Category[] }) {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <FiltersSidebar categories={categories}/>
            <ProvidersList />
        </div>
    );
}