import { useState } from "react";
import SearchField from "./SearchField";
import MainGrid from "./MainGrid";

type Category = {
    category_id: number;
    category_name: string;
}

export default function HomeView({ categories }: { categories: Category[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <section className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
                        احصل على أفضل خدمات الصيانة المنزلية
                    </h2>
                    <p className="text-primary-foreground/80 text-lg mb-8">
                        نربطك بأمهر السباكين، وفنيي الكهرباء، وخبراء التكييف المعتمدين والمقيّمين في منطقتك.
                    </p>
                    
                    <SearchField searchValue={searchTerm} searchPlaceholder="عن ماذا تبحث؟ (مثال: صيانة تكييف)" handleChange={() => setSearchTerm(searchTerm)} />
                </div>

            </section>

            <MainGrid categories={categories}/>
        </div>
    );
}