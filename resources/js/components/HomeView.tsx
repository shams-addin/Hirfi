import { useState } from 'react';
import SearchField from './SearchField';
import MainGrid from './MainGrid';
import { useForm } from '@inertiajs/react';

export default function HomeView() {
    const [searchTerm, setSearchTerm] = useState('');
    const {processing} = useForm();
    return (
        <div className="animate-in fade-in space-y-8 duration-500">
            <section className="bg-primary text-primary-foreground relative overflow-hidden rounded-2xl p-8 shadow-lg md:p-12">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-48 w-48 rounded-full bg-black/10 blur-2xl"></div>

                <div className="relative z-10 max-w-2xl">
                    <h2 className="font-display mb-4 text-3xl leading-tight font-bold md:text-5xl">
                        احصل على أفضل خدمات الصيانة المنزلية
                    </h2>
                    <p className="text-primary-foreground/80 mb-8 text-lg">
                        نربطك بأمهر السباكين، وفنيي الكهرباء، وخبراء التكييف
                        المعتمدين والمقيّمين في منطقتك.
                    </p>

                    {/* <SearchField searchValue={searchTerm} searchPlaceholder="عن ماذا تبحث؟ (مثال: صيانة تكييف)" handleChange={() => setSearchTerm(searchTerm)} /> */}
                    <SearchField processing={processing} searchValue={searchTerm} searchPlaceholder="عن ماذا تبحث؟ (مثال: صيانة تكييف)" handleChange={() => setSearchTerm(searchTerm)} />
                </div>
            </section>

            <MainGrid searchResult={searchTerm} />
        </div>
    );
}
