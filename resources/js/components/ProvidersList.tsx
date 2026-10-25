import { usePage } from '@inertiajs/react';
import ProviderCard from './ProviderCard';

type Provider = {
    id: number;
    name: string;
    category: number;
    address: string;
    nationality?: string;
    starAvg: number;
    state: string;
    avatar?: string;
};

interface ProvidersListProps {
    filterResult: number;
    searcheResult: string;
}

export default function ProvidersList({
    // searcheResult,
    filterResult,
}: ProvidersListProps) {
    const { providers } = usePage<{ providers: Provider[] }>().props;
    const cards = providers.filter(
        (p) => filterResult === -1 || p.category === filterResult,
    );
    return (
        <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">
                    مقدمو الخدمات المتاحين
                </h3>
                <span className="text-muted-foreground text-sm">
                    {cards.length} نتيجة
                </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {cards.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                ))}
            </div>
        </div>
    );
}
