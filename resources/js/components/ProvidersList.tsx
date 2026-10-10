type Provider = {
    id: number;
    
}

export default function ProvidersList() {
    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-display">مقدمو الخدمات المتاحين</h3>
                <span className="text-sm text-muted-foreground">{providers.length} نتيجة</span>
                <span className="text-sm text-muted-foreground">0 نتيجة</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers
                    .filter(p => !filterSpecialty || p.specialty === filterSpecialty)
                    .map(provider => (
                        <ProviderCard key={provider.id} provider={provider} />
                    ))}
            </div>
        </div>
    );
}